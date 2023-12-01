import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Web3RoutingModule } from './web3-routing.module';
import { W3uploadComponent } from './components/w3upload/w3upload.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [W3uploadComponent],
  imports: [CommonModule, Web3RoutingModule, TranslateModule, FormsModule]
})
export class Web3Module {}
