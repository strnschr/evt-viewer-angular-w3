import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Web3RoutingModule } from './web3-routing.module';
import { W3uploadComponent } from './components/w3upload/w3upload.component';

@NgModule({
  declarations: [
    W3uploadComponent
  ],
  imports: [CommonModule, Web3RoutingModule]
})
export class Web3Module {}
