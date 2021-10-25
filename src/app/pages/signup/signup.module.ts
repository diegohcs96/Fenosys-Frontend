import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupAdminComponent } from './signup-admin/signup-admin.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { SignupAgricultorVerifyComponent } from './signup-agricultor/signup-agricultor-verify/signup-agricultor-verify.component';
import { SignupAgricultorFormComponent } from './signup-agricultor/signup-agricultor-form/signup-agricultor-form.component';

@NgModule({
  declarations: [
    SignupAdminComponent,
    SignupAgricultorVerifyComponent,
    SignupAgricultorFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SignupModule { }
