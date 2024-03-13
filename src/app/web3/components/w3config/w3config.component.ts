import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConfig } from 'src/app/app.config';

@Component({
  selector: 'evt-w3config',
  templateUrl: './w3config.component.html',
  styleUrl: './w3config.component.scss'
})
export class W3configComponent {
  readonly configDirectoryForm = new FormControl();

  isLoadingConfig = false;

  constructor(
    private appConfig: AppConfig,
    private snackBar: MatSnackBar
  ) {}

  async loadConfig() {
    try {
      this.isLoadingConfig = true;
      this.configDirectoryForm.disable();
      await this.appConfig.load(this.configDirectoryForm.value);
      this.configDirectoryForm.reset();
      this.configDirectoryForm.enable();
      this.snackBar.open('Config loaded', null, { duration: 2000 });
    } catch (err) {
      console.log(err);
    } finally {
      this.isLoadingConfig = false;
    }
  }
}
