import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterComponent } from './master/master.component';
import { RequestAdminComponent } from './master/request-admin/request-admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AgricultorComponent } from './agricultor/agricultor.component';
import { AdminComponent } from './admin/admin.component';



@NgModule({
  declarations: [
    MasterComponent,
    RequestAdminComponent,
    AgricultorComponent,
    AdminComponent,
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule { }
