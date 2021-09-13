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
  { path: '', component: IndexComponent, data: { title: 'Dessmo' } },

  //Inicio Signin//
  { path: 'signin/master', component: SigninMasterComponent, data: { title: 'Iniciar Sesión Master – Dessmo' } },
  { path: 'signin/admin', component: SigninAdminComponent, data: { title: 'Iniciar Sesión Administrador – Dessmo' } },
  { path: 'signin/usuario', component: SigninAgricultorComponent, data: { title: 'Iniciar Sesión Agricultor – Dessmo' } },

  //Inicio Signup//
  { path: 'request/admin', component: AdminRequestComponent, data: { title: 'Permiso Administrador – Dessmo' } },
  { path: 'signup/admin/:token', component: SignupAdminComponent, data: { title: 'Registro Administrador – Dessmo' } },
  { path: 'signup/usuario', component: SignupAgricultorComponent, data: { title: 'Registro Agricultor – Dessmo' } },


   //Profile//
  { path: 'profile/admin', component: ProfileAdminComponent, data: { title: 'Perfil Administrador – Dessmo' } },
  { path: 'profile/usuario', component: ProfileAgricultorComponent, data: { title: 'Perfil Agricultor – Dessmo' } },

  //Reset Password//
  { path: 'request/password', component: RequestPasswordComponent, data: { title: 'Recuperar Contraseña – Dessmo' } },
  { path: 'password/restart/:token', component: UpdatePasswordComponent, data: { title: 'Recuperar Contraseña – Dessmo' } },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
