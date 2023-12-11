import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { W3homeComponent } from './components/w3home/w3home.component';

const routes = [
  {
    path: '',
    component: W3homeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Web3RoutingModule {}
