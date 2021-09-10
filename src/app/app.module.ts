import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { authInterceptorProviders } from './util/auth.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IndexModule } from './pages/index/index.module';
import { SigninModule } from './pages/signin/signin.module';
import { SignupModule } from './pages/signup/signup.module'
import { ProfileModule } from './pages/profile/profile.module';
import { ResetPasswordModule } from './pages/reset-password/reset-password.module'
import { MasterModule } from './pages/master/master.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IndexModule,
    SigninModule,
    SignupModule,
    ProfileModule,
    MasterModule,
    ResetPasswordModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    NgbModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
