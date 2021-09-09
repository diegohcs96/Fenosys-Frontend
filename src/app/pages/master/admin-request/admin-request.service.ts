import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalUrl } from 'src/app/util/global-url';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class AdminRequestService {
  
  private API_URL = GlobalUrl.BASE_URL + 'api/admin/signup_request';

  constructor(private http: HttpClient) { }

  PasswordRequest(restorePasswordRequest: any): Observable<any> {
    
    return this.http.post(
      this.API_URL,
      restorePasswordRequest,
      httpOptions
    )
  }
  
  
}
