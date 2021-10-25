import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignupAgricultor } from './signup-agricultor';
import { GlobalUrl } from 'src/app/util/global-url';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SignupAgricultorService {

  private API_SIGNUP = GlobalUrl.BASE_URL + 'api/agricultor/signup';

  private API_PAISES = GlobalUrl.BASE_URL + 'api/ubicacion/show/paises';
  private API_DEPARTAMENTOS = GlobalUrl.BASE_URL + 'api/ubicacion/find/departamentos/from_pais';
  private API_PROVINCIAS = GlobalUrl.BASE_URL + 'api/ubicacion/find/provincias/from_departamento';
  private API_DISTRITOS = GlobalUrl.BASE_URL + 'api/ubicacion/find/distritos/from_provincia';

  private API_VERIFY = GlobalUrl.BASE_URL + 'api/agricultor/signup/verify';

  constructor(private http: HttpClient) { }

  SignUpAgricultor(usuario: SignupAgricultor): Observable<any> {
    
    return this.http.post(
      this.API_SIGNUP,
      usuario
    );
  }

  getPaises(): Observable<any> {
    
    return this.http.get(
      this.API_PAISES);
  }

  getDepartamentos(id: any): Observable<any> {
    
    return this.http.get(
      `${this.API_DEPARTAMENTOS}/${id}`
    );
  }

  getProvincias(id: any): Observable<any> {
    
    return this.http.get(
      `${this.API_PROVINCIAS}/${id}`
    );
  }

  getDistritos(id: any): Observable<any> {
    
    return this.http.get(
      `${this.API_DISTRITOS}/${id}`
    );
  }
  
  SignupAgricultorVerify(token: any): Observable<any> {

    return this.http.put(
      this.API_VERIFY,
      token,
      httpOptions
      );
  }
}
