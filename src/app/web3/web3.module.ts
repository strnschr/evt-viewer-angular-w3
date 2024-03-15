import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Web3RoutingModule } from './web3-routing.module';
import { W3uploadComponent } from './components/w3upload/w3upload.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { W3loginComponent } from './components/w3login/w3login.component';
import { W3spaceCreateComponent } from './components/w3space-create/w3space-create.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { W3homeComponent } from './components/w3home/w3home.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { W3configComponent } from './components/w3config/w3config.component';
import { W3editionComponent } from './components/w3edition/w3edition.component';

@NgModule({
  declarations: [
    W3uploadComponent,
    W3loginComponent,
    W3spaceCreateComponent,
    W3homeComponent,
    W3configComponent,
    W3editionComponent
  ],
  imports: [
    CommonModule,
    Web3RoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDialogModule,
    MatExpansionModule,
    MatProgressSpinnerModule
  ],
  providers: [{ provide: MatDialogRef, useValue: {} }]
})
export class Web3Module {}
