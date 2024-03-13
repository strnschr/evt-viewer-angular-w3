import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';

@Component({
  selector: 'evt-w3home',
  templateUrl: './w3home.component.html',
  styleUrl: './w3home.component.scss'
})
export class W3homeComponent {
  constructor(private dialog: MatDialogRef<W3homeComponent>) {}

  closeDialog() {
    this.dialog.close();
  }
}
