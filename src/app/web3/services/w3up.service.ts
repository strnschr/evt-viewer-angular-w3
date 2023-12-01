import { Injectable } from '@angular/core';
import { Client, create } from '@web3-storage/w3up-client';

@Injectable({ providedIn: 'root' })
export class W3UpService {
  private client: Client;

  constructor() {
    this.init();
  }

  private async init() {
    this.client = await create();
  }

  async login(email: `${string}@${string}`) {
    return await this.client.login(email);
  }
}
