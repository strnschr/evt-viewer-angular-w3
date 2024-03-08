import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { EntitiesSelectItemGroup } from './components/entities-select/entities-select.component';
import { ViewMode, ViewModeId } from './models/evt-models';
import { Attributes, EditorialConventionLayout } from './models/evt-models';
import { buildGatewayURL } from './web3/helpers/url.helpers';
import { EditionDataService } from './services/edition-data.service';

@Injectable()
export class AppConfig {
  static evtSettings: EVTConfig;
  private readonly uiConfigUrl = 'assets%5Cconfig%5Cui_config.json';
  private readonly fileConfigUrl = 'assets%5Cconfig%5Cfile_config.json';
  private readonly editionConfigUrl = 'assets%5Cconfig%5Cedition_config.json';
  private readonly editorialConventionsConfigUrl = 'assets%5Cconfig%5Ceditorial_conventions_config.json';

  constructor(
    public translate: TranslateService,
    private http: HttpClient,
    private editionData: EditionDataService
  ) {}

  load(configDirectoryCID?: string) {
    return new Promise<void>(resolve => {
      this.http
        .get<FileConfig>(
          configDirectoryCID ? buildGatewayURL(configDirectoryCID, 'file_config.json') : this.fileConfigUrl
        )
        .pipe(
          switchMap((files: FileConfig) =>
            forkJoin([
              this.http.get<UiConfig>(
                configDirectoryCID
                  ? buildGatewayURL(configDirectoryCID, files.configurationUrls.ui)
                  : files.configurationUrls?.ui ?? this.uiConfigUrl
              ),
              this.http.get<EditionConfig>(
                configDirectoryCID
                  ? buildGatewayURL(configDirectoryCID, files.configurationUrls.edition)
                  : files.configurationUrls?.edition ?? this.editionConfigUrl
              ),
              this.http.get<EditorialConventionsConfig>(
                configDirectoryCID
                  ? buildGatewayURL(configDirectoryCID, files.configurationUrls.editorialConventions)
                  : files.configurationUrls?.editorialConventions ?? this.editorialConventionsConfigUrl
              )
            ]).pipe(
              map(([ui, edition, editorialConventions]) => {
                console.log(ui, edition, files);
                // Handle default values => TODO: Decide how to handle defaults!!
                if (ui.defaultLocalization) {
                  if (ui.availableLanguages.find(l => l.code === ui.defaultLocalization && l.enable)) {
                    this.translate.use(ui.defaultLocalization);
                  } else {
                    const firstAvailableLang = ui.availableLanguages.find(l => l.enable);
                    if (firstAvailableLang) {
                      this.translate.use(firstAvailableLang.code);
                    }
                  }
                }

                return { ui, edition, files, editorialConventions };
              })
            )
          )
        )
        .subscribe(evtConfig => {
          AppConfig.evtSettings = evtConfig;
          console.log('evtConfig', evtConfig);

          if (configDirectoryCID) {
            this.editionData
              .loadAndParseEditionData(buildGatewayURL(configDirectoryCID, evtConfig.files.editionUrls[0]))
              .subscribe(() => resolve());
          } else {
            resolve();
          }
        });
    });
  }
}
export interface EVTConfig {
  ui: UiConfig;
  edition: EditionConfig;
  files: FileConfig;
  editorialConventions: EditorialConventionsConfig;
}

export interface UiConfig {
  availableViewModes: ViewMode[];
  localization: boolean;
  defaultLocalization: string;
  availableLanguages: Array<{
    code: string;
    label: string;
    enable: boolean;
  }>;
  enableNavBar: boolean;
  initNavBarOpened: boolean;
  thumbnailsButton: boolean;
  viscollButton: boolean;
  theme: 'neutral' | 'modern' | 'classic';
}

export interface EditionConfig {
  editionTitle: string;
  badge: string;
  editionHome: string;
  showLists: boolean;
  availableEditionLevels: EditionLevel[];
  namedEntitiesLists: Partial<{
    persons: NamedEntitiesListsConfig;
    places: NamedEntitiesListsConfig;
    organizations: NamedEntitiesListsConfig;
    relations: NamedEntitiesListsConfig;
    events: NamedEntitiesListsConfig;
  }>;
  entitiesSelectItems: EntitiesSelectItemGroup[];
  notSignificantVariants: string[];
  defaultEdition: EditionLevelType;
  defaultViewMode: ViewModeId;
  proseVersesToggler: boolean;
  defaultTextFlow: TextFlow;
  verseNumberPrinter: number;
  readingColorLight: string;
  readingColorDark: string;
}

export type EditionImagesSources = 'manifest' | 'graphics';

export interface FileConfig {
  editionUrls: string[];
  editionImagesSource: {
    [T in EditionImagesSources]: EditionImagesConfig;
  };
  logoUrl?: string;
  imagesFolderUrl?: string;
  configurationUrls?: {
    edition: string;
    ui: string;
    editorialConventions: string;
  };
}

export interface EditionImagesConfig {
  value: string;
  enable: boolean;
}

export interface NamedEntitiesListsConfig {
  defaultLabel: string;
  enable: boolean;
}
export type EditionLevelType = 'diplomatic' | 'interpretative' | 'critical';
export interface EditionLevel {
  id: EditionLevelType;
  label: string;
  title?: string;
  enable?: boolean;
}

export interface EditorialConventionsConfig {
  [key: string]: CustomEditorialConvention;
}

export interface CustomEditorialConvention {
  layouts: {
    // indicate the output style to be assigned for the indicated encoding for each edition level
    [key in EditionLevelType]: EditorialConventionLayout;
  };
  markup: {
    // Identifies the element depending on its encoding
    element: string;
    attributes: Attributes;
  };
}

export type TextFlow = 'prose' | 'verses';
