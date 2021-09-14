import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupAdminComponent } from './signup-admin/signup-admin.component';
import { SignupAgricultorComponent } from './signup-agricultor/signup-agricultor.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { DepartamentoPipe } from './filtros/departamento.pipe';
import { ProvinciaPipe } from './filtros/provincia.pipe';
import { DistritoPipe } from './filtros/distrito.pipe';



@NgModule({
  declarations: [
    SignupAdminComponent,
    SignupAgricultorComponent,
    DepartamentoPipe,
    ProvinciaPipe,
    DistritoPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SignupModule { }
