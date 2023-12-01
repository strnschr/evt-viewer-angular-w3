import { Component } from '@angular/core';
import { W3UpService } from '../../services/w3up.service';

@Component({
  selector: 'evt-w3upload',
  templateUrl: './w3upload.component.html',
  styleUrls: ['./w3upload.component.scss']
})
export class W3uploadComponent {
  email?: `${string}@${string}`;

  constructor(private w3up: W3UpService) {}

  onAuthenticateClick() {
    this.w3up.login(this.email);
  }
}
