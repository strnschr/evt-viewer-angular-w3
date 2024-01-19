# EVT 3.0 (evt-viewer-angular) [![Build Status](https://travis-ci.org/evt-project/evt-viewer-angular.svg?branch=master)](https://travis-ci.org/evt-project/evt-viewer-angular)

## 1 - Introduction

### 1.1 - About EVT

[EVT (Edition Visualization Technology)](http://evt.labcd.unipi.it/) is a light-weight, open source tool specifically designed to create digital editions from texts encoded according to the [TEI XML schemas and Guidelines](http://www.tei-c.org/Guidelines/P5/), freeing the scholars from the burden of web programming and enabling the final users to browse, explore and study digital editions by means of a user-friendly interface.

This tool was born in the context of the [Digital Vercelli Book](http://vbd.humnet.unipi.it/) project, in order to allow the creation of a digital edition (which has been available in beta form for more than two years) of the Vercelli Book, a parchment codex of the late tenth century, now preserved in the Archivio e Biblioteca Capitolare of Vercelli and regarded as one of the four most important manuscripts of the Anglo-Saxon period as it regards the transmission of poetic texts in the Old English language.
However it has evolved into a tool suitable to fit different texts and needs. For example, it is now being used to publish the digital edition of the [Codice Pelavicino manuscript](http://pelavicino.labcd.unipi.it), a medieval codex preserving charters dating back to the XIII century. The continuous development and need to adapt it to different types of documents and TEI-encoded texts has shifted the development focus towards the creation of a more general tool for the web publication of TEI-based digital editions, able to cater for multiple use cases.

The entire structure of the software has been remodeled, in order to make it lighter, more usable and more adaptable; we decided to use the Model View Controller (MVC) approach, that is a very common architectural pattern in object-oriented programming, that allows to separate the logical presentation of the data, from the application logic and the processing core.
Wanting to maintain the original feature of EVT, and therefore do not give up the client only approach, we decided to use [Angular](https://angular.io/), a JavaScript framework inspired by the MVC programming logic, especially suitable for the development of client-side Web applications; among other things, this framework allows to define custom HTML components and use the data-binding mechanism to associate the model of the data to the UI elements, and manage the updates of the latter avoiding the direct DOM manipulation.

### 1.2 - How it works

Before the refactoring, EVT was composed of two main units: EVT Builder, for the transformation of the encoded text using special XSLT 2.0 templates, and EVT Viewer, for the visualization into a browser of the results of the transformations and the interaction with them. The idea under the new version of EVT is instead to leave to EVT Viewer the task of reading and parsing with JavaScript functions the encoded text, and “save” as much as possible within a data model, that persists in the client main memory, and is organized in a way that allows a very quick access to the data in case of need. This has obviously led to the elimination of the EVT Builder level, and therefore it allows to open a digital edition directly in the browser without any previous XSLT transformation.

### 1.3 - Main features

At the present moment, EVT is being moved from AngularJS to Angular 2+.
For a complete list of features, please refer to the [AngularJS version] (https://github.com/evt-project/evt-viewer)

## 2 - A short guide to EVT

If you are interested in **using** EVT to prepare an edition right away, you should probably download the ready-to-use release package that can be downloaded from [SourceForge](https://sourceforge.net/projects/evt-project/). See the _Installation and use_ section first, then _Configuration_, to understand how EVT works and how you can use it to publish your editions. A more detailed guide will be published separately, as a reference manual, and will also include instructions about customization.

If, on the other hand, you are interested in **developing** a specific functionality in EVT, or in modifying an existing one, or preparing your edition with the most recent (yet stable) version of EVT, you should download the [_GitHub Development framework_](https://github.com/evt-project/evt-viewer). See the _Development framework installation and use_ section to know how to install and configure the environment needed for this purpose. If you intend to change the source code for personal needs, please **fork** the project. If you want to contribute to the main project (by fixing a bug or adding a feature), please ask for a **pull request** and/or contact us at evt.developers@gmail.com.

### 2.1 - Installation and use

EVT 3 can be used to prepare an edition right away, immediately after downloading the release package on your hard drive: see the [​Installation and management of the edition data](https://github.com/evt-project/evt-viewer-angular/wiki/Installation-and-use#installation-and-management-of-the-edition-data) section of the Wiki first, then [Configuration​](https://github.com/evt-project/evt-viewer-angular/wiki/Configuration), to understand how EVT works and how you can use it to publish your editions.

If, on the other hand, you are interested in ​developing a specific functionality in EVT 3, or in modifying an existing one, we suggest that you clone the project as it is.​ The ​README.md explains how to install and configure the development environment needed for this purpose. This step is only needed if you want to start working with EVT source code, so it is in no way necessary for basic users. See [Development](https://github.com/evt-project/evt-viewer-angular/wiki/Development) section and subsections of the Wiki for further information on development guidelines.

### 2.2 - Configuration

There are several configuration options, ranging from setting the folders where edition data is stored to choosing the User Interface layout and the tools to be made available for the final user, that can be set by editing the configuration files in the `assets/config` directory. To facilitate the configuration work, configuration options are divided into three macro groups:

- Edition Configuration (`edition_config.json`), where to set the configurations closely related to the digital edition, such as the title, the edition level(s), etc. [See details in the Wiki page](https://github.com/evt-project/evt-viewer-angular/wiki/Edition-Configuration).
- File Configuration (`file_config.json`), where to set the path(s) to the file(s) of the digital edition. [See details in the Wiki page](https://github.com/evt-project/evt-viewer-angular/wiki/File-Configuration).
- UI Configuration (`ui_config.json`), where to set the configuration closely related to the UI, such as the default language, the default/available theme(s), etc. [See details in the Wiki page](https://github.com/evt-project/evt-viewer-angular/wiki/Ui-Configuration).

It is also possible to configurate the style of editorial phenomena (e.g. addition, deletion, etc), in order to override the EVT default layouts. This particular configuration should be defined in the file `editorial_conventions_config.json`. [See details in the Wiki page](https://github.com/evt-project/evt-viewer-angular/wiki/Editorial-Conventions-Configuration)

For more information please refer to the [Configuration section](https://github.com/evt-project/evt-viewer-angular/wiki/Configuration) on the Wiki.

## 3 - Development framework installation and use

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.3.

### 3.1 - Requirements

For development, you will only need Node.js installed on your environement. And please use the appropriate Editorconfig plugin for your Editor (not mandatory).

### 3.2 - Node

[Node](http://nodejs.org/) is really easy to install & now include [NPM](https://npmjs.org/).
You should be able to run the following command after the installation procedure
below. To properly install all the dependency, please use 12.20.x/14.15.x/16.10.x or later minor version of NodeJS.

    $ node --version
    v14.15.0

    $ npm --version
    v6.14.8

### 3.3 - Install

    $ git clone https://github.com/evt-project/evt-viewer-angular.git
    $ cd evt-viewer-angular
    $ npm install

### 3.4 - Start & watch with development server

    $ npm run start

If nothing happens, then open your browser and navigate to `http://localhost:4205/`.
The app will automatically reload if you change any of the source files.

If you want to use a different port where to run the application you can run `npm run ng serve -- --port=4200`, then connecto to `http://localhost:4200/`).

### 3.5 - Code scaffolding

Run `npm run ng generate component component-name` to generate a new component. You can also use `npm run ng generate directive|pipe|service|class|guard|interface|enum|module`.

### 3.6 - Simple build for production

    $ npm run build

The build artifacts will be stored in the `dist/` directory.
With the second instruction you can use the `--c=production` flag for a production build.

## 3.6.1 - Build for release

    $ npm run build:release

The build artifacts will be stored in the `release/` directory. If you set properly the variables in user_paths.sh file, both xml sample data and sample config will be copied in `release/assets` folder.

### 3.7 - Generate documentation

For the documentation we use [Compodoc](https://compodoc.github.io/website/)

- Run `npm run doc:build` for generating the documentation, which will be created in `documentation` folder.
- Run `npm run doc:serve` for serving it (then just open `http://localhost:8080` in your browser).
- Run `npm run doc:buildandserve` for generatin and serving it.

### 3.8 - Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### 3.9 - Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## 4 - Main Development Instruction

### 4.1 - Handle color theme

This new version of EVT is able to handle multiple themes at runtime. A "theme" is intended as a particular palette or set of color used for the main UI components. The theme can also change dimensions or other properties.

In the file `assets/scss/_themes.scss` we defined a global variable `$theme` where we declare every single color used in the UI components. Each color must exist in every single theme.

The themed rules depend on the `data-theme` attribute added to a `div` element of the `AppComponent` that encloses the whole application. The `data-theme` attribute is constantly linked to the current theme variable.
We decided to embody everything in this external `div` in order to lighten the number of bindings of elements that need a connection to the current theme.

#### 4.1.1 - Add a new theme

To add a new theme just follow the steps below:

- add an object at the end of the current list of themes, which has all the properties of an existing one (we recommend doing copy-paste to be sure not to lose anything);
- change the color codes as desired;
- add the new theme id to the list of available themes in the `ThemeService` (`themes.service.ts`):
  ```
  {
      value: 'myThemeKey',
      label: 'My Theme Label'
  }
  ```
  - the `value` is the ID of the new theme, the key of the object previously created;
  - the `label` is the label to be displayed in the theme selector in the UI.

#### 4.1.2 - Add new themed CSS rules

To add new CSS rules so that colors are retrieved from the current theme (and change automatically when the theme changes at runtime), just follow the steps below:

- import the file `_themes.scss` in the `*.scss` file of the component
  ```
  @import "path/to/_theme.scss";
  ```
- Embody every css rule to be themed in the following instruction:
  ```
  h1 {
        @include themify($themes){
            color: themed('baseColorDark');
        }
    }
  ```
  Within this instruction, every css rule that uses a color and need to be linked to the current theme, must be defined as
  ```
    themed("colorKey");
  ```
  where `colorKey` is the key of the color within the object representing a theme defined in the file `_theme.scss`.

#### 4.1.3 - The `themify` mixin

The `themify` mixin will add a CSS rule for each theme for the CSS rules defined within it.
The `@each $theme, $map in $themes` tell Sass to loop over the `$themes` map that was defined above.
On each loop, it assigns these values to `$theme` and `$map` respectively.

- `$theme` - Theme name
- `$map` - Map of all theme variables

Then the `map-get()` function is used to get any theme variable from `$map` and output the correct property for each theme.
The `&` refer to parent selectors and placing it after `[data-theme="#{$theme}"]` tells Sass to output any parent selectors after the theme name.
To use this mixin, just be sure that the element for which you are defining the CSS rules is included in a `*[data-theme]="theme-name"` element and embody every CSS rule that needs to be themified within the mixin:

```
btn-primary {
    @include themify($themes) {
        color: themed('baseColorDark');
    }
}
```

### 4.2 - Localization

To handle localization we use the plugin angular-l10n[https://github.com/robisim74/angular-l10n]; in this way we can offer a runtime solution for language switching without fully reload the application.

Translations are defined in a JSON file (one for each language), saved inside the folder `assets/l10n`. This JSON is organized as follows:

```
{
	"KEY": "Text in a particular language",
	...
}
```

The `KEY` is the unique identifier used in the angular application (usually in the HTML template) whenever we need to retrieve a translated text.

#### 4.2.1 - Add a text in the localization

To add a new text in the localization, you just need to add a pair `"KEY": "Text"` for every language already esisting.
If you don't know the translation in a particular language use the English and let us know: we will handle the missing translations.

#### 4.2.2 - Work with localization in angular templates

To add a text in the UI so that it will be correctly translated when needed, just follow the steps below:

- In the HTML template, use the _pipe_ `translate` whenever you need to insert a localized text, referring to the `KEY` that represents the text in question. (_NB: the KEY must exist in the JSON of the translations!_):
  ```
  <span [title]="'myTitle' | translate">
      {{'myText' | translate}}
  </span>
  ```
- In every existing json file for localization, add the new KEY and its translation:
  ```
  en.json
  {
      "myTitle": "My Title",
      "myText": "This is my text"
  }
  it.json
  {
      "myTitle": "Il mio titolo",
      "myText": "Questo è il mio testo"
  }
  ```

#### 4.2.3 - Add a new language

To add a new language to the localization so that it is automatically displayed in the language selector, just follow the steps below:

- Add the JSON file of the new language in the `assets/i18n` folder.
  - This file must be named as `"LANGUAGE_CODE.json"`, where `"LANGUAGE_CODE"` is the reference code of the new language;
  - this file must present ALL the keys that exist in the other files, so it is advisable to make a copy-paste of one of the files already present before starting with the translations.
- In the `ui_config.json` file, add an element to the list of `availableLanguages`. This element must be structured as follows:
  ```
  {
      "code": "CD",
      "dir": "ltr",
      "label": "Lang Label",
      "enable": true
  }
  ```
  - `code` indicates the language code (the one used to name the JSON file);
  - `label` indicates the language label, to be shown in the UI
  - `enable` indicates if the language should be activated or deactivated
- In every other JSON translations file the key `"language_LANGUAGE_CODE"` to have a translation of the name of the new language in all the others already present and managed.
- Finally, add a `.png` file that depicts the flag identifying the new language in the `assets/images` folder. This file must be named with the code of the new language and must preferably be a square with not too large dimensions.
- For further information please refer to official documentation og [ngx-translate/core plugin](https://github.com/ngx-translate/core)

### 4.3 - SCSS

EVT uses `.scss` files.
During development you can use some useful global variables and mixins.
They are defined respectively in the files below:

- `/assets/scss/_variables.scss`
- `/assets/scss/_mixins.scss`

To use them, please refer to official scss documentation.

## 5 - EVT Configuration: technical details

Configurations is defined as a `AppConfig` provider and is injected into main app module. It is loaded during app initialization, to that it will be immediately available for every component.
The four groups are gathered (although kept divided) in a single `EVTConfig` object.

```
interface EVTConfig {
    ui: UiConfig;
    edition: EditionConfig;
    files: FileConfig;
    editorialConventions: EditorialConventionsConfig;
}
```

If you want to use a parameter from configuration in your component, you just need to import `AppConfig` and directly use its properties:

```
import { AppConfig } from '../app.config';
@Component({
  selector: 'my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.scss']
})
export class MyComponent {
    private editionTitle: string;
    constructor() {
        this.editionTitle = AppConfig.evtSettings.edition.title;
    }
}
```

If you want to add a parameter in configuration, you need to add it first to the interface of the specific group, indicating the exact type of data you expect for it.

## 6 - EVT Manual

As a user manual please refer to the [Wiki](https://github.com/evt-project/evt-viewer-angular/wiki). It will always be updated based on the features merged into the `develop` branch.

For the functionalities and instructions related to a specific release, it is possible to refer to the `evt-documentation.pdf` file inside the `doc` folder in the release package.

## 7 - Feedback

User feedback is very much appreciated: please send all comments, suggestions, bug reports, etc. to evt.developers@gmail.com.

## 8 - Web3 Extension

This version of the EVT viewer features several additions and modifications to support the usage of decentralized Web3 storage.
In this section, the main differences compared to the base EVT viewer repository are explained.

### Changes to App Dependencies

#### Angular Update

To support the library `@web3-storage/w3up-client` that interacts with the `web3.storage` provider, the project's TypeScript version had to be updated. To support the corresponding TypeScript version, the whole project had to be updated to Angular 17. We followed the official [Angular update guide](https://update.angular.io/).
Apart from automatically performed adjustments, we had to perform several changes to the existing code base.

#### Code Formatting

The code formatter `prettier` has been added to the project to unify code styles. Formatting settings can be check in `.prettierc`

### Changes to the Base Application

#### Component Mixins

Due to the updated Angular version, changes to the component mixins `EditionlevelSusceptible`, `Highlightable`, and `TextFlowSusceptible` had to be made. Implicit component inputs did not work anymore, meaning that they had to be added explicitly to each implementing component.

```typescript
export class ChoiceComponent implements EditionlevelSusceptible, Highlightable, TextFlowSusceptible {
  @Input() textFlow: TextFlow;
  @Input() editionLevel: EditionLevelType;
  @Input() highlightData: HighlightData;
  @Input() itemsToHighlight: EntitiesSelectItem[];
}
```

#### EditionDataService

The `EditionDataService` has been adjusted to support loading an edition during application runtime, not only at startup. This means that a different edition from the initially selected one can be loaded while the app is running. While this does not make a lot of sense for an actual use case, this feature was only implemented to showcase loading digital editions from Web3 storage.

### Changes related to Web3 Storage

#### Dynamic Base URL

Websites deployed to decentralized Web3 storage have to be accessed through a gateway. Each Web3 gateway may use a different routing syntax, such as:

```
https://{CID}.ipfs.w3s.link/
https://ipfs.io/ipfs/{CID}
```

Since application's assets (scripts, stylesheets, etc...) are loaded using paths relative to the base URL, the base URL needs to be set dynamically in order to support this functionality regardless of the used Web3 gateway. Otherwise, in the case of the `ipfs.io` gateway, the application would try to load assets from `ipfs.io/<asset>` instead of `ipfs.io/ipfs/{CID}/<asset>`.

We achieve this by editing `index.html` and replacing

```html
<base href="/" />
```

with the following

```html
<script>
  document.write('<base href="' + window.location.pathname + '"/>');
</script>
```

#### Dynamic Font Loading

Unfortunately, the dynamic base URL is not respected for relative paths defined in sylesheets. To circumvent this issue, we moved definition and loading of fonts, such as `Junicode`, to `app.component.ts`.

#### URL-encoded Asset Paths

`web3.storage` uses Filecoin and IPFS to store uploaded files. In IPFS, addressing files in sub-paths of directories works with backward slashes. So instead of `./path/to/file.js` it uses `./path\to\file.js`. Since modern browser such as Firefox and Chrome automatically replace backward slashes with forward slashes, we use the URL-encoded version, i.e. `./path%5Cto%5Cfile.js`.

#### AppConfig Adjustments

`app.config.ts` has been adjusted to support loading app configuration from decentralized Web3 storage. This works by allowing a Content Identifier of a directory containing all configuration files as a parameter. The CID will be converted to a gateway URL, from which all related files can be retrieved.

#### Web3 Components

Several UI components have been added to showcase various features related to decentralized Web3 storage. By leveraging the features of `web3.storage`, these components offer the following functionalities

- Loading a digital edition from IPFS using a CID
- Loading EVT configuration files from IPFS using a CID
- Uploading files to IPFS / Listing uploaded files
- "Converting" a digital edition, by scanning it URLs to images/facsimile, uploading them to IPFS, and replacing the URLs with CIDs/Gateway URLs
