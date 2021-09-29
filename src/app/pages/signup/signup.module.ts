import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupAdminComponent } from './signup-admin/signup-admin.component';
import { SignupAgricultorComponent } from './signup-agricultor/signup-agricultor.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SignupAdminComponent,
    SignupAgricultorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SignupModule { }
