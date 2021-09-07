import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestPasswordComponent } from './request-password/request-password.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RequestPasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ResetPasswordModule { }
