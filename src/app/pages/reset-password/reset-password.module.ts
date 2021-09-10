import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestPasswordComponent } from './request-password/request-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { LoadRequestComponent } from './load-request/load-request.component';


@NgModule({
  declarations: [
    RequestPasswordComponent,
    UpdatePasswordComponent,
    LoadRequestComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class ResetPasswordModule { }
