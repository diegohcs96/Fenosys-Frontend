import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignupAdmin } from './signup-admin';
import { GlobalUrl } from 'src/app/util/global-url';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class SignupAdminService {

  private API_admin = GlobalUrl.BASE_URL + 'api/admin/signup';

  private API_PAISES = GlobalUrl.BASE_URL + 'api/ubicacion/show/paises';
  private API_DEPARTAMENTOS = GlobalUrl.BASE_URL + 'api/ubicacion/find/departamentos/from_pais';
  private API_PROVINCIAS = GlobalUrl.BASE_URL + 'api/ubicacion/find/provincias/from_departamento';
  private API_DISTRITOS = GlobalUrl.BASE_URL + 'api/ubicacion/find/distritos/from_provincia';

  constructor( private http:HttpClient ) { }

  auxfotoperfil = new File([], '');

  SignUpAdmin(usuario: SignupAdmin, fotoperfil: File): Observable<any> {

    const admindata = new Blob([JSON.stringify(usuario)], {type: 'application/json'})

    var admin: FormData = new FormData();

    admin.append('usuario', admindata);

    if (fotoperfil != null) {
      admin.append('foto', fotoperfil);      
    } else {
      admin.append('foto', this.auxfotoperfil);
    }

    return this.http.put(
      this.API_admin,
      admin
    );   
  }

  getPaises(): Observable<any> {
    return this.http.get(
      this.API_PAISES);      
  }  

  getDepartamentos(id: any): Observable<any>  {
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
}
    
  
