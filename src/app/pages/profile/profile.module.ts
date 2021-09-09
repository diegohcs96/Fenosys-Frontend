import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AgricultorProfileComponent } from './agricultor-profile/agricultor-profile.component';

@NgModule({
  declarations: [
    AdminProfileComponent,
    AgricultorProfileComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule { }
