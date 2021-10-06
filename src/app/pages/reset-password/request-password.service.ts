import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalUrl } from 'src/app/util/global-url';
import { PasswordRequest, PasswordUpdate } from './request-password-interface';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class RequestPasswordService {

  private API_Request = GlobalUrl.BASE_URL + 'api/restore_password/request';
  private API_Update = GlobalUrl.BASE_URL + 'api/restore_password/update';
  constructor(private http: HttpClient) { }

  SendUrlPasswordReset(passwordreset: PasswordRequest): Observable<any> {
    
    return this.http.post(
      this.API_Request,
      passwordreset,
      httpOptions
    )
  }

  PasswordUpdate(passwordUpdate: PasswordUpdate): Observable<any> {

    return this.http.put(
      this.API_Update,
      passwordUpdate,
      httpOptions
      );
  }

}
