import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, of, ReplaySubject } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { AppConfig } from '../app.config';
import { OriginalEncodingNodeType } from '../models/evt-models';
import { parseXml } from '../utils/xml-utils';

@Injectable({
  providedIn: 'root'
})
export class EditionDataService {
  private parsedEditionSourceChanged$ = new ReplaySubject<OriginalEncodingNodeType>();
  public parsedEditionSource$ = this.parsedEditionSourceChanged$.asObservable();

  constructor(private http: HttpClient) {}

  private getEditionUrls() {
    return AppConfig.evtSettings.files.editionUrls || [];
  }

  loadAndParseEditionData(url?: string) {
    const editionUrl = url || this.getEditionUrls()[0];

    return this.http.get(editionUrl, { responseType: 'text' }).pipe(
      map(source => parseXml(source)),
      mergeMap(editionData =>
        this.loadXIinclude(editionData, editionUrl.substring(0, editionUrl.lastIndexOf('/') + 1))
      ),
      tap(editionData => this.parsedEditionSourceChanged$.next(editionData)),
      catchError(() => this.handleLoadingError())
    );
  }

  loadXIinclude(doc: HTMLElement, baseUrlPath: string) {
    const filesToInclude = Array.from(doc.getElementsByTagName('xi:include'));
    const xiIncludeLoadsSubs = filesToInclude.map(element =>
      this.http.get(baseUrlPath + element.getAttribute('href'), { responseType: 'text' }).pipe(
        tap(fileData => {
          const includedDoc = parseXml(fileData);
          const fileXpointer = element.getAttribute('xpointer');
          let includedTextElem: Node;
          if (fileXpointer) {
            includedTextElem = doc.querySelector(`[*|id="${fileXpointer}"]`) || includedDoc.querySelector('text');
          } else {
            includedTextElem = includedDoc.querySelector('text');
          }
          // element.parentNode.replaceChild(includedTextElem, element);
          element.parentNode.appendChild(includedTextElem);
        }),
        catchError(_ => {
          Array.from(element.getElementsByTagName('xi:fallback'))
            .map(el => {
              const divEl = document.createElement('div');
              divEl.classList.add('xiinclude-fallback');
              divEl.setAttribute('xml:id', element.getAttribute('xpointer'));
              divEl.innerHTML = `<p>${el.innerHTML}</p>`;

              return divEl;
            })
            .forEach(el => element.parentNode.replaceChild(el, element));

          return of(doc);
        })
      )
    );
    if (xiIncludeLoadsSubs.length > 0) {
      return forkJoin(xiIncludeLoadsSubs).pipe(map(() => doc));
    }

    return of(doc);
  }

  private handleLoadingError() {
    // TODO: TEMP
    const errorEl: HTMLElement = document.createElement('div');
    if (!this.getEditionUrls() || this.getEditionUrls().length === 0) {
      errorEl.textContent = 'Missing configuration for edition files. Data cannot be loaded.';
    } else {
      errorEl.textContent = 'There was an error in loading edition files.';
    }

    return of(errorEl);
  }
}
