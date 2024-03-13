import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Rendition } from '../../models/evt-models';
import { register } from '../../services/component-register.service';
import { EVTModelService } from '../../services/evt-model.service';
import { snakeToCamelCased } from '../../utils/js-utils';

@Component({
  selector: 'evt-rendition',
  templateUrl: './rendition.component.html',
  styleUrls: ['./rendition.component.scss']
})
@register(Rendition)
export class RenditionComponent {
  @Input() data: Rendition;

  get scopeDescription$() {
    if (this.data.scope) {
      const descKey = snakeToCamelCased(`rendition-${this.data.scope}-desc`);

      return this.translateService
        .get(descKey)
        .pipe(map(translation => (translation === descKey ? '' : `(${translation})`)));
    }

    return of('');
  }

  get scheme$() {
    if (this.data.scheme) {
      return of(this.data.scheme);
    }

    return this.evtModelService.styleDefaults$.pipe(map(styleDefaults => styleDefaults?.scheme ?? ''));
  }

  get schemeVersion$() {
    if (this.data.schemeVersion) {
      return of(this.data.schemeVersion);
    }

    return this.evtModelService.styleDefaults$.pipe(map(styleDefaults => styleDefaults?.schemeVersion ?? ''));
  }

  get noDetails$() {
    return this.scheme$.pipe(map(scheme => !scheme && !this.data?.scope && !this.data?.selector && this.data?.id));
  }

  constructor(
    private translateService: TranslateService,
    private evtModelService: EVTModelService
  ) {}
}
