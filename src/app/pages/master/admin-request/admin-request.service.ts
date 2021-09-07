import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GlobalUrl } from 'src/app/util/global-url';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AdminRequestService {

  private API_signupadminRequest = GlobalUrl.BASE_URL + 'api/admin/signup_request';

  constructor(private http: HttpClient) { }
  
  SignupAdminRequest(signupadminRequest: any): Observable<any> {
    
    return this.http.post(
      this.API_signupadminRequest,
      signupadminRequest,
      httpOptions
    )
  }
}



