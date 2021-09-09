import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRequestComponent } from './admin-request/admin-request.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminRequestComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class MasterModule { }
