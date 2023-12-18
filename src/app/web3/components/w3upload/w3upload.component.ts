import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Account, Client, create } from '@web3-storage/w3up-client';
import { W3spaceCreateComponent } from '../w3space-create/w3space-create.component';
import { filter } from 'rxjs';
import { UploadListItem } from '@web3-storage/w3up-client/dist/src/types';

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

  account: Account.Account;
  currentSpace;
  /** CIDs of the uploaded directories within the current space */
  directoriedOfSpace: UploadListItem[] = [];

  readonly spacesDropdown = new FormControl('');
  @ViewChild('fileInput') fileInput?: ElementRef<HTMLInputElement>;
  filesToUpload: File[] = [];

  get spaces() {
    return Array.from(this.account.agent.spaces.entries()).map(([id, space]) => ({ id, space }));
  }

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

    // dev
    this.account = await this.client.login('robin2go_no1@yahoo.de');
    this.isAccountReady = true;
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

  async onFilesSelected(files: FileList | null) {
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

  openCreationDialog() {
    this.dialog
      .open(W3spaceCreateComponent, { width: '400px' })
      .afterClosed()
      .pipe(filter(name => !!name))
      .subscribe((name: string) => {
        this.createSpace(name);
      });
  }

  buildGatewayURL(cid: string) {
    return `https://${cid}.ipfs.w3s.link`;
  }

  private toast(message: string) {
    this.snackBar.open(message, null, { duration: 5000 });
  }

  private async getDirectoryCIDs() {
    return (await this.client.capability.upload.list()).results;
  }
}
