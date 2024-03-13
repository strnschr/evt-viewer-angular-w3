import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'evt-w3login',
  templateUrl: './w3login.component.html',
  styleUrl: './w3login.component.scss'
})
export class W3loginComponent {
  @Input() isLoading = false;
  @Output() login = new EventEmitter<string>();

  readonly emailForm = new FormControl('', [Validators.email, Validators.required]);
}
