import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EditionDataService } from 'src/app/services/edition-data.service';
import { buildGatewayURL } from '../../helpers/url.helpers';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'evt-w3edition',
  templateUrl: './w3edition.component.html',
  styleUrl: './w3edition.component.scss'
})
export class W3editionComponent {
  readonly editionCIDForm = new FormControl();

  isLoadingEdition = false;

  constructor(
    private editionData: EditionDataService,
    private snackBar: MatSnackBar
  ) {}

  loadEdition() {
    this.isLoadingEdition = true;
    this.editionData.loadAndParseEditionData(buildGatewayURL(this.editionCIDForm.value)).subscribe({
      next: () => {
        this.isLoadingEdition = false;
        this.editionCIDForm.reset();
        this.snackBar.open('Edition loaded', null, { duration: 2000 });
      },
      error: () => {
        this.isLoadingEdition = false;
        this.snackBar.open('Error loading edition', null, { duration: 2000 });
      }
    });
  }
}
