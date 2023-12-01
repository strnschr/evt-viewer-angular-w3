import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { W3uploadComponent } from './components/w3upload/w3upload.component';

const routes = [
  {
    path: '',
    component: W3uploadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Web3RoutingModule {}
