import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';

@Component({
  selector: 'evt-w3home',
  templateUrl: './w3home.component.html',
  styleUrl: './w3home.component.scss'
})
export class W3homeComponent {
  constructor(private dialog: DialogRef) {}

  closeDialog() {
    this.dialog.close();
  }
}
