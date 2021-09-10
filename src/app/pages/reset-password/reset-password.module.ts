import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestPasswordComponent } from './request-password/request-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdatePasswordComponent } from './update-password/update-password.component';


@NgModule({
  declarations: [
    RequestPasswordComponent,
    UpdatePasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class ResetPasswordModule { }
