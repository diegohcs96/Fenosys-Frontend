import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignupAgricultor } from './signup-agricultor';
import { GlobalUrl } from 'src/app/util/global-url';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class SignupAgricultorService {

  private API_agricultor = GlobalUrl.BASE_URL + 'api/agricultor/signup';

  private API_PAISES = GlobalUrl.BASE_URL + 'api/ubicacion/show/paises';
  private API_DEPARTAMENTOS = GlobalUrl.BASE_URL + 'api/ubicacion/show/departamentos';
  private API_PROVINCIAS = GlobalUrl.BASE_URL + 'api/ubicacion/show/provincias';
  private API_DISTRITOS = GlobalUrl.BASE_URL + 'api/ubicacion/show/distritos';


  auxfotoperfil = new File([], '');
  
  constructor( private http:HttpClient ) { }

  SignUpAgricultor(usuario: SignupAgricultor, foto: File): Observable<any> {

    const agricultordata = new Blob([JSON.stringify(usuario)], {type: 'application/json'})

    var agricultor: FormData = new FormData();

    agricultor.append('usuario', agricultordata);

    if (foto != null) {
      agricultor.append('foto', foto);      
    } else {
      agricultor.append('foto', this.auxfotoperfil);
    }

    return this.http.post(
      this.API_agricultor,
      agricultor
    );
  }

  getPais(): Observable<any> {
    return this.http.get(
      this.API_PAISES);
  }

  getDepartamentos(): Observable<any>  {
    return this.http.get(
      this.API_DEPARTAMENTOS);
  }

  getProvincias(): Observable<any> {
    return this.http.get(
      this.API_PROVINCIAS);
  }

  getDistritos(): Observable<any> {
    return this.http.get(
      this.API_DISTRITOS);
  }

}
