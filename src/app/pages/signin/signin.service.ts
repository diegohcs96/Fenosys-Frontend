import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GlobalUrl } from 'src/app/util/global-url';
import { SigninInterface } from './signin-interface';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class SigninService {
  
  private API_master = GlobalUrl.BASE_URL + 'api/master/signin';
  private API_admin = GlobalUrl.BASE_URL + 'api/admin/signin';
  private API_agricultor = GlobalUrl.BASE_URL + 'api/agricultor/signin';
  
  constructor(private http: HttpClient) { }

  SigninMaster(master: SigninInterface): Observable<any> {

    return this.http.post(
      this.API_master,
      master,
      httpOptions
    );
  }

  SigninAdmin(admin: SigninInterface): Observable<any> {

    return this.http.post(
      this.API_admin,
      admin,
      httpOptions
    );
  }

  SigninAgricultor(agricultor: SigninInterface): Observable<any> {

    return this.http.post(
      this.API_agricultor,
      agricultor,
      httpOptions
    );
  }
}
