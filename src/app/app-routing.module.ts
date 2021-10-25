import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Index
import { IndexComponent } from './pages/index/index.component';

//Signin
import { SigninAdminComponent } from './pages/signin/signin-admin/signin-admin.component'
import { SigninAgricultorComponent } from './pages/signin/signin-agricultor/signin-agricultor.component'
import { SigninMasterComponent } from './pages/signin/signin-master/signin-master.component';

//Signup
import { AdminRequestComponent } from './pages/master/admin-request/admin-request.component';
import { SignupAdminComponent } from './pages/signup/signup-admin/signup-admin.component'
import { SignupAgricultorFormComponent } from './pages/signup/signup-agricultor/signup-agricultor-form/signup-agricultor-form.component';
import { SignupAgricultorVerifyComponent } from './pages/signup/signup-agricultor/signup-agricultor-verify/signup-agricultor-verify.component';

//Request Password
import { RequestPasswordComponent } from './pages/reset-password/request-password/request-password.component'
import { UpdatePasswordComponent } from './pages/reset-password/update-password/update-password.component';

//Profile
import { ProfileAdminComponent } from './pages/profile/profile-admin/profile-admin.component';
import { ProfileAgricultorComponent } from './pages/profile/profile-agricultor/profile-agricultor.component';
import { ErrorComponent } from './pages/error/error.component';

const routes: Routes = [
  { path: '', component: IndexComponent, data: { title: 'Fenosys' } },

  //Signin//
  { path: 'signin/master', component: SigninMasterComponent, data: { title: 'Iniciar Sesión Master – Fenosys' } },
  { path: 'signin/admin', component: SigninAdminComponent, data: { title: 'Iniciar Sesión Administrador – Fenosys' } },
  { path: 'signin/agricultor', component: SigninAgricultorComponent, data: { title: 'Iniciar Sesión Agricultor – Fenosys' } },

  //Signup//
  { path: 'request/admin', component: AdminRequestComponent, data: { title: 'Solicitud Administrador – Fenosys' } },
  { path: 'signup/admin/:token', component: SignupAdminComponent, data: { title: 'Registro Administrador – Fenosys' } },
  { path: 'signup/agricultor', component: SignupAgricultorFormComponent, data: { title: 'Registro Agricultor – Fenosys' } },
  { path: 'signup/agricultor/verify/:token', component: SignupAgricultorVerifyComponent, data: { title: 'Registro Agricultor – Fenosys' } },

   //Profile//
  { path: 'profile/admin', component: ProfileAdminComponent, data: { title: 'Perfil Administrador – Fenosys' } },
  { path: 'profile/agricultor', component: ProfileAgricultorComponent, data: { title: 'Perfil Agricultor – Fenosys' } },

  //Restore Password//
  { path: 'restore/password/request', component: RequestPasswordComponent, data: { title: 'Restaurar Contraseña – Fenosys' } },
  { path: 'restore/password/:token', component: UpdatePasswordComponent, data: { title: 'Restaurar Contraseña – Fenosys' } },

  //Error
  { path: 'error/403', component: ErrorComponent, data: { title: 'Error 403 – Fenosys' } },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
