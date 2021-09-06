import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninMasterComponent } from './signin-master/signin-master.component';
import { SigninAdminComponent } from './signin-admin/signin-admin.component';
import { SigninAgricultorComponent } from './signin-agricultor/signin-agricultor.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SigninMasterComponent,
    SigninAdminComponent,
    SigninAgricultorComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule
  ]
})
export class SigninModule { }
