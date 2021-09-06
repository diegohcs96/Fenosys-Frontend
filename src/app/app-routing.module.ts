import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { SigninMasterComponent } from './pages/signin/signin-master/signin-master.component';
import { SigninAdminComponent } from './pages/signin/signin-admin/signin-admin.component';
import { SigninAgricultorComponent } from './pages/signin/signin-agricultor/signin-agricultor.component';

const routes: Routes = [
  { path: '', component: IndexComponent, data: { title: 'Fenosys' } },

  //Inicio Signin//
  { path: 'signin/master', component: SigninMasterComponent, data: { title: 'Iniciar Sesión Master – Fenosys' } },
  { path: 'signin/admin', component: SigninAdminComponent, data: { title: 'Iniciar Sesión Administrador – Fenosys' } },
  { path: 'signin/agricultor', component: SigninAgricultorComponent, data: { title: 'Iniciar Sesión Agricultor – Fenosys' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
