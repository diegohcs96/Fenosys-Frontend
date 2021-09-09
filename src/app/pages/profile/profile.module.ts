import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileAdminComponent } from './profile-admin/profile-admin.component';
import { ProfileAgricultorComponent } from './profile-agricultor/profile-agricultor.component';

@NgModule({
  declarations: [
    ProfileAdminComponent,
    ProfileAgricultorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule { }
