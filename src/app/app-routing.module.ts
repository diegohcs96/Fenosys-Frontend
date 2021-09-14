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
import { AdminRequestComponent } from './pages/master/admin-request/admin-request.component';

//Request Password
import { RequestPasswordComponent } from './pages/reset-password/request-password/request-password.component'
import { ProfileAdminComponent } from './pages/profile/profile-admin/profile-admin.component';
import { ProfileAgricultorComponent } from './pages/profile/profile-agricultor/profile-agricultor.component';
import { UpdatePasswordComponent } from './pages/reset-password/update-password/update-password.component';


//Profile


const routes: Routes = [
  { path: '', component: IndexComponent, data: { title: 'Fenosys' } },

  //Inicio Signin//
  { path: 'signin/master', component: SigninMasterComponent, data: { title: 'Iniciar Sesión Master – Fenosys' } },
  { path: 'signin/admin', component: SigninAdminComponent, data: { title: 'Iniciar Sesión Administrador – Fenosys' } },
  { path: 'signin/usuario', component: SigninAgricultorComponent, data: { title: 'Iniciar Sesión Agricultor – Fenosys' } },

  //Inicio Signup//
  { path: 'request/admin', component: AdminRequestComponent, data: { title: 'Permiso Administrador – Fenosys' } },
  { path: 'signup/admin/:token', component: SignupAdminComponent, data: { title: 'Registro Administrador – Fenosys' } },
  { path: 'signup/usuario', component: SignupAgricultorComponent, data: { title: 'Registro Agricultor – Fenosys' } },


   //Profile//
  { path: 'profile/admin', component: ProfileAdminComponent, data: { title: 'Perfil Administrador – Fenosys' } },
  { path: 'profile/usuario', component: ProfileAgricultorComponent, data: { title: 'Perfil Agricultor – Fenosys' } },

  //Reset Password//
  { path: 'request/password', component: RequestPasswordComponent, data: { title: 'Recuperar Contraseña – Fenosys' } },
  { path: 'password/restart/:token', component: UpdatePasswordComponent, data: { title: 'Recuperar Contraseña – Fenosys' } },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
