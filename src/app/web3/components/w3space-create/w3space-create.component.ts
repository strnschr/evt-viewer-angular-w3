import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'evt-w3space-create',
  templateUrl: './w3space-create.component.html',
  styleUrl: './w3space-create.component.scss'
})
export class W3spaceCreateComponent {
  readonly spaceNameForm = new FormControl('', [Validators.required]);

  constructor(public dialogRef: MatDialogRef<W3spaceCreateComponent>) {}

  close() {
    this.dialogRef.close(this.spaceNameForm.value);
  }
}
