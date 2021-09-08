import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Index
import { IndexComponent } from './pages/index/index.component';

//Signin
import { SigninAdminComponent } from './pages/signin/signin-admin/signin-admin.component'
import { SigninAgricultorComponent } from './pages/signin/signin-agricultor/signin-agricultor.component'
import { SigninMasterComponent } from './pages/signin/signin-master/signin-master.component';

//Signup
import { SignupAdminComponent } from './pages/signup/signup-admin/signup-admin.component'
import { SignupAgricultorComponent } from './pages/signup/signup-agricultor/signup-agricultor.component'
import { RequestAdminComponent } from './pages/profile/master/request-admin/request-admin.component'

//Request Password
import { RequestPasswordComponent } from './pages/reset-password/request-password/request-password.component'

//Profile
import { MasterComponent } from './pages/profile/master/master.component';
import { AgricultorComponent } from './pages/profile/agricultor/agricultor.component';
import { AdminComponent } from './pages/profile/admin/admin.component';

const routes: Routes = [
  { path: '', component: IndexComponent, data: { title: 'Fenosys' } },

  //Inicio Signin//
  { path: 'signin/master', component: SigninMasterComponent, data: { title: 'Iniciar Sesión Master – Fenosys' } },
  { path: 'signin/admin', component: SigninAdminComponent, data: { title: 'Iniciar Sesión Administrador – Fenosys' } },
  { path: 'signin/agricultor', component: SigninAgricultorComponent, data: { title: 'Iniciar Sesión Agricultor – Fenosys' } },

  //Inicio Signup// /
  { path: 'signup/admin/:token', component: SignupAdminComponent, data: { title: 'Registro Administrador – Fenología' } },
  { path: 'signup/agricultor', component: SignupAgricultorComponent, data: { title: 'Registro Agricultor – Fenología' } },
  { path: 'request/admin', component: RequestAdminComponent, data: { title: 'Permiso Administrador – Fenología' } },

   //Profile//
  { path: 'profile/admin', component: AdminComponent, data: { title: 'Perfil Administrador – Fenología' } },
  { path: 'profile/agricultor', component: AgricultorComponent, data: { title: 'Perfil Agricultor – Fenología' } },
  { path: 'profile/maestro', component: MasterComponent, data: { title: 'Perfil Maestro – Fenología' } },

  //Reset Password//
  { path: 'request/password', component: RequestPasswordComponent, data: { title: 'Recuperar Contraseña – Fenología' } },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
