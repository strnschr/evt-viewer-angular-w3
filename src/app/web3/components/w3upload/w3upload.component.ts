import { Component, OnInit } from '@angular/core';
import { Account, Client, create } from '@web3-storage/w3up-client';

@Component({
  selector: 'evt-w3upload',
  templateUrl: './w3upload.component.html',
  styleUrls: ['./w3upload.component.scss']
})
export class W3uploadComponent implements OnInit {
  email?: `${string}@${string}`;
  spaceName?: string;
  selectedSpaceId: `did:key:${string}` | null = null;
  files: File[] = [];

  error: string | null = null;
  isAuthenticating = false;
  account: Account.Account;
  isAccountReady = false;
  isCreatingSpace = false;
  currentSpace;

  get spaces() {
    return Array.from(this.account.agent.spaces.entries()).map(([id, space]) => ({ id, space }));
  }

  private client: Client;

  async ngOnInit() {
    this.client = await create();
  }

  async onAuthenticateClick() {
    try {
      this.error = null;
      this.isAuthenticating = true;
      this.account = await this.client.login(this.email);

      if (!(await this.account.plan.get()).ok) {
        this.error = 'Please select a payment plan.';
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
      this.error = err;
    } finally {
      this.isAuthenticating = false;
    }
  }

  async onSpaceCreateClick() {
    try {
      this.error = null;
      this.isCreatingSpace = true;
      const space = await this.account.agent.createSpace(this.spaceName);
      console.log('Created space:', space);
      await this.account.provision(space.did());
      console.log('Provisioned space:', space);
      await space.createRecovery(this.account.did());
      console.log('Created recovery for space:', space);
      await space.save();
      console.log('Saved space:', space);
    } catch (err) {
      this.error = err;
    } finally {
      this.isCreatingSpace = false;
    }
  }

  async onSelectSpaceClick() {
    try {
      console.log('Selecting space:', this.selectedSpaceId);
      this.error = null;
      await this.account.agent.setCurrentSpace(this.selectedSpaceId);
      this.currentSpace = this.account.agent.currentSpaceWithMeta();
    } catch (err) {
      this.error = err;
    }
  }

  onFilesSelected(event: Event) {
    console.log(event);
  }

  async onUploadClick() {
    console.log(this.files);
  }
}
