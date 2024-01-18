import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Account, Client, create } from '@web3-storage/w3up-client';
import { W3spaceCreateComponent } from '../w3space-create/w3space-create.component';
import { filter } from 'rxjs';
import { UploadListItem } from '@web3-storage/w3up-client/dist/src/types';
import { parseXml } from 'src/app/utils/xml-utils';
import { XMLElement } from 'src/app/models/evt-models';
import { buildGatewayURL } from '../../helpers/url.helpers';
import { saveAs } from 'file-saver';

@Component({
  selector: 'evt-w3upload',
  templateUrl: './w3upload.component.html',
  styleUrls: ['./w3upload.component.scss']
})
export class W3uploadComponent implements OnInit {
  isAuthenticating = false;
  isAccountReady = false;
  isCreatingSpace = false;
  isDeletingDirectory = false;
  isUploading = false;
  isConverting = false;

  account: Account.Account;
  currentSpace;
  /** CIDs of the uploaded directories within the current space */
  directoriedOfSpace: UploadListItem[] = [];

  readonly spacesDropdown = new FormControl('');
  @ViewChild('fileInput') fileInput?: ElementRef<HTMLInputElement>;
  filesToUpload: File[] = [];

  @ViewChild('editionInput') editionInput?: ElementRef<HTMLInputElement>;
  editionToConvert: File | null = null;

  get spaces() {
    return Array.from(this.account.agent.spaces.entries()).map(([id, space]) => ({ id, space }));
  }

  buildGatewayURL = buildGatewayURL;

  private client: Client;

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  async ngOnInit() {
    this.client = await create();
    this.spacesDropdown.valueChanges.subscribe((id: `did:key:${string}`) => {
      this.selectSpace(id);
    });
  }

  async login(email: `${string}@${string}`) {
    try {
      this.isAuthenticating = true;
      this.account = await this.client.login(email);

      if (!(await this.account.plan.get()).ok) {
        this.snackBar.open('Please select a payment plan.', null, { duration: 5000 });
      }

      while (true) {
        const res = await this.account.plan.get();
        if (res.ok) {
          break;
        }
        console.log('Waiting for payment plan to be selected...');
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      this.isAccountReady = true;
    } catch (err) {
      this.snackBar.open(err, null, { duration: 5000 });
    } finally {
      this.isAuthenticating = false;
    }
  }

  async createSpace(name: string) {
    try {
      this.isCreatingSpace = true;

      const space = await this.account.agent.createSpace(name);
      console.log('Created space:', space);

      await this.account.provision(space.did());
      console.log('Provisioned space:', space);

      await space.createRecovery(this.account.did());
      console.log('Created recovery for space:', space);

      const saveResult = await space.save();
      console.log('Saved space:', space, saveResult);

      this.snackBar.open(`Space created: ${space.name}`, null, { duration: 5000 });
    } catch (err) {
      this.snackBar.open(err, null, { duration: 5000 });
    } finally {
      this.isCreatingSpace = false;
    }
  }

  async selectSpace(id: `did:key:${string}`) {
    try {
      this.directoriedOfSpace = [];
      console.log('Selecting space:', id);
      await this.account.agent.setCurrentSpace(id);
      this.currentSpace = this.account.agent.currentSpaceWithMeta();
      this.directoriedOfSpace = await this.getDirectoryCIDs();
    } catch (err) {
      this.toast(err);
    }
  }

  openFilePicker() {
    this.fileInput?.nativeElement.click();
  }

  openEditionPicker() {
    this.editionInput?.nativeElement.click();
  }

  onEditionSelected(files: FileList | null) {
    if (!files.length) {
      return;
    }

    this.editionToConvert = files.item(0);
  }

  onFilesSelected(files: FileList | null) {
    if (!files.length) {
      return;
    }

    for (let i = 0; i < files.length; i++) {
      this.filesToUpload.push(files.item(i));
    }
  }

  unselectFile(index: number) {
    this.filesToUpload.splice(index, 1);
  }

  async uploadFiles() {
    this.isUploading = true;
    const dirCID = await this.client.uploadDirectory(this.filesToUpload);
    this.isUploading = false;
    this.filesToUpload = [];
    this.toast(`Uploaded files successfully!`);
    console.log('uploaded directory:', dirCID.toString());
    this.directoriedOfSpace = await this.getDirectoryCIDs();
  }

  async deleteDirectory(item: UploadListItem) {
    this.isDeletingDirectory = true;
    await this.client.capability.upload.remove(item.root);
    this.directoriedOfSpace = await this.getDirectoryCIDs();
    this.toast(`Deleted directory!`);
    this.isDeletingDirectory = false;
  }

  async convertEdition() {
    this.isConverting = true;

    const text = await this.editionToConvert.text();
    const parsedXml = parseXml(text);
    const graphics = Array.from(parsedXml.querySelectorAll<XMLElement>('graphic'));

    const mappedGraphics: Record<string, string> = {};

    for (const graphic of graphics) {
      const url = graphic.getAttribute('url');

      if (!url.startsWith('http')) {
        return;
      }

      const res = await fetch(url);
      const blob = await res.blob();

      const fileName = url.substring(url.lastIndexOf('/') + 1);
      const file = new File([blob], fileName, { type: 'image/jpeg' });

      const cid = await this.client.uploadFile(file);
      this.toast(`Uploaded image: ${fileName}`);
      console.log('uploaded image', fileName, cid.toString());
      mappedGraphics[url] = cid.toString();
    }

    parsedXml.querySelectorAll<XMLElement>('graphic').forEach(graphic => {
      const url = graphic.getAttribute('url');
      const urlToSet = mappedGraphics[url];
      const fileName = url.substring(url.lastIndexOf('/') + 1);
      graphic.setAttribute('url', buildGatewayURL(urlToSet) + `?filename=${fileName}`);
    });

    const fileToSave = new Blob([new XMLSerializer().serializeToString(parsedXml)], { type: 'text/xml' });
    const convertedName = this.editionToConvert.name.replace('.xml', '_converted.xml');
    saveAs(fileToSave, convertedName);

    this.toast(`Converted edition!`);
    this.isConverting = false;
    this.editionToConvert = null;
  }

  openCreationDialog() {
    this.dialog
      .open(W3spaceCreateComponent, { width: '400px' })
      .afterClosed()
      .pipe(filter(name => !!name))
      .subscribe((name: string) => {
        this.createSpace(name);
      });
  }

  private toast(message: string) {
    this.snackBar.open(message, null, { duration: 5000 });
  }

  private async getDirectoryCIDs() {
    return (await this.client.capability.upload.list()).results;
  }
}
