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

  private API_URL = GlobalUrl.BASE_URL + 'api/restart_password/send';
  private API_URL1 = GlobalUrl.BASE_URL + 'api';
  constructor(private http: HttpClient) { }

  SendUrlPasswordReset(passwordreset: PasswordRequest): Observable<any> {
    
    return this.http.post(
      this.API_URL,
      passwordreset,
      httpOptions
    )
  }

  PasswordUpdate(passwordUpdate: PasswordUpdate): Observable<any> {

    return this.http.put(
      this.API_URL1 + `/restart_password/update`,
      passwordUpdate,
      httpOptions
      );
  }

}
