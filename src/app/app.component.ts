import { Component, ElementRef, HostBinding, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AppConfig } from './app.config';
import { ThemesService } from './services/themes.service';
import { ShortcutsService } from './shortcuts/shortcuts.service';
import { EvtIconInfo } from './ui-components/icon/icon.component';
import { EditionDataService } from './services/edition-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'evt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('mainSpinner') mainSpinner: ElementRef;
  private subscriptions: Subscription[] = [];
  public hasNavBar = AppConfig.evtSettings.ui.enableNavBar;
  public navbarOpened$ = new BehaviorSubject(this.hasNavBar && AppConfig.evtSettings.ui.initNavBarOpened);

  public navbarTogglerIcon$: Observable<EvtIconInfo> = this.navbarOpened$.pipe(
    map((opened: boolean) => (opened ? { icon: 'caret-down', iconSet: 'fas' } : { icon: 'caret-up', iconSet: 'fas' }))
  );

  private readonly fonts: FontFace[] = [
    new FontFace('Junicode', `url(${environment.assetPathPrefix('fonts')}Junicode.woff)`, {
      weight: 'normal',
      style: 'normal'
    }),
    new FontFace('Junicode', `url(${environment.assetPathPrefix('fonts')}Junicode-Bold.woff)`, {
      weight: 'bold',
      style: 'normal'
    }),
    new FontFace('Junicode', `url(${environment.assetPathPrefix('fonts')}Junicode-Italic.woff)`, {
      weight: 'normal',
      style: 'italic'
    }),
    new FontFace('Junicode', `url(${environment.assetPathPrefix('fonts')}Junicode-BoldItalic.woff)`, {
      weight: 'bold',
      style: 'italic'
    }),
    new FontFace('evt-icons', `url(${environment.assetPathPrefix('fonts')}evt-icons.woff?yo01vg)`, {
      weight: 'normal',
      style: 'normal',
      display: 'block'
    }),
    new FontFace('Roboto', `url(${environment.assetPathPrefix('fonts')}Roboto-Regular.ttf)`, {
      weight: 'normal',
      style: 'normal'
    })
  ];

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private shortcutsService: ShortcutsService,
    private themes: ThemesService,
    private titleService: Title,
    private editionData: EditionDataService
  ) {
    this.router.events.subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart:
          this.spinner.show();
          break;
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError:
          this.spinner.hide();
          break;
        default:
          break;
      }
    });
    this.titleService.setTitle(AppConfig.evtSettings.edition.editionTitle || 'EVT');

    this.editionData.loadAndParseEditionData(AppConfig.evtSettings.files.editionUrls[0]).pipe(take(1)).subscribe();
  }

  ngOnInit() {
    this.loadFonts();
  }

  @HostBinding('attr.data-theme') get dataTheme() {
    return this.themes.getCurrentTheme().value;
  }

  toggleToolbar() {
    this.navbarOpened$.next(!this.navbarOpened$.getValue());
    window.dispatchEvent(new Event('resize')); // Needed to tell Gridster to resize
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(e: KeyboardEvent) {
    this.shortcutsService.handleKeyboardEvent(e);
  }

  loadFonts() {
    this.fonts.forEach(font => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (document.fonts as any).add(font);
      font.load();
    });
  }
}
