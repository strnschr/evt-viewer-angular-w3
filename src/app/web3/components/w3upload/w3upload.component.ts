import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Account, Client, create } from '@web3-storage/w3up-client';
import { W3spaceCreateComponent } from '../w3space-create/w3space-create.component';
import { filter } from 'rxjs';

@Component({
  selector: 'evt-w3upload',
  templateUrl: './w3upload.component.html',
  styleUrls: ['./w3upload.component.scss']
})
export class W3uploadComponent implements OnInit {
  files: File[] = [];

  isAuthenticating = false;
  account: Account.Account;
  isAccountReady = false;
  isCreatingSpace = false;
  currentSpace;

  readonly spacesDropdown = new FormControl('');

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

      await space.save();
      console.log('Saved space:', space);

      this.snackBar.open(`Space created: ${space.name}`, null, { duration: 5000 });
    } catch (err) {
      this.snackBar.open(err, null, { duration: 5000 });
    } finally {
      this.isCreatingSpace = false;
    }
  }

  async selectSpace(id: `did:key:${string}`) {
    try {
      console.log('Selecting space:', id);
      await this.account.agent.setCurrentSpace(id);
      this.currentSpace = this.account.agent.currentSpaceWithMeta();
    } catch (err) {
      this.snackBar.open(err, null, { duration: 5000 });
    }
  }

  onFilesSelected(event: Event) {
    console.log(event);
  }

  async onUploadClick() {
    console.log(this.files);
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
}
