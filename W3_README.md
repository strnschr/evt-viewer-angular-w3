# Web3 Extension

This version of the EVT viewer features several additions and modifications to support the usage of decentralized Web3 storage.
In this readme, the main differences compared to the base EVT viewer repository are explained.

## Changes to App Dependencies

### Angular Update

To support the library `@web3-storage/w3up-client` that interacts with the `web3.storage` provider, the project's TypeScript version had to be updated. To support the corresponding TypeScript version, the whole project had to be updated to Angular 17. We followed the official [Angular update guide](https://update.angular.io/).
Apart from automatically performed adjustments, we had to perform several changes to the existing code base.

### Code Formatting

The code formatter `prettier` has been added to the project to unify code styles. Formatting settings can be check in `.prettierc`

## Changes to the Base Application

### Component Mixins

Due to the updated Angular version, changes to the component mixins `EditionlevelSusceptible`, `Highlightable`, and `TextFlowSusceptible` had to be made. Implicit component inputs did not work anymore, meaning that they had to be added explicitly to each implementing component.

```typescript
export class ChoiceComponent implements EditionlevelSusceptible, Highlightable, TextFlowSusceptible {
  @Input() textFlow: TextFlow;
  @Input() editionLevel: EditionLevelType;
  @Input() highlightData: HighlightData;
  @Input() itemsToHighlight: EntitiesSelectItem[];
}
```

### EditionDataService

The `EditionDataService` has been adjusted to support loading an edition during application runtime, not only at startup. This means that a different edition from the initially selected one can be loaded while the app is running. While this does not make a lot of sense for an actual use case, this feature was only implemented to showcase loading digital editions from Web3 storage.

## Changes related to Web3 Storage

### Dynamic Base URL

Websites deployed to decentralized Web3 storage have to be accessed through a gateway. Each Web3 gateway may use a different routing syntax, such as:

```text
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

### Dynamic Font Loading

Unfortunately, the dynamic base URL is not respected for relative paths defined in sylesheets. To circumvent this issue, we moved definition and loading of fonts, such as `Junicode`, to `app.component.ts`.

### URL-encoded Asset Paths

`web3.storage` uses Filecoin and IPFS to store uploaded files. In IPFS, addressing files in sub-paths of directories works with backward slashes. So instead of `./path/to/file.js` it uses `./path\to\file.js`. Since modern browser such as Firefox and Chrome automatically replace backward slashes with forward slashes, we use the URL-encoded version, i.e. `./path%5Cto%5Cfile.js`.

### AppConfig Adjustments

`app.config.ts` has been adjusted to support loading app configuration from decentralized Web3 storage. This works by allowing a Content Identifier of a directory containing all configuration files as a parameter. The CID will be converted to a gateway URL, from which all related files can be retrieved.

### Web3 Components

Several UI components have been added to showcase various features related to decentralized Web3 storage. By leveraging the features of `web3.storage`, these components offer the following functionalities

- Loading a digital edition from IPFS using a CID
- Loading EVT configuration files from IPFS using a CID
- Uploading files to IPFS / Listing uploaded files
- "Converting" a digital edition, by scanning it URLs to images/facsimile, uploading them to IPFS, and replacing the URLs with CIDs/Gateway URLs
