import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppConfig } from 'src/app/app.config';

@Component({
  selector: 'evt-w3home',
  templateUrl: './w3home.component.html',
  styleUrl: './w3home.component.scss'
})
export class W3homeComponent {
  configDirectoryForm = new FormControl();

  constructor(private appConfig: AppConfig) {}

  async loadConfig() {
    try {
      await this.appConfig.load(this.configDirectoryForm.value);
      this.configDirectoryForm.reset();

      console.log('loaded');
    } catch (err) {
      console.log(err);
    }
  }
}
