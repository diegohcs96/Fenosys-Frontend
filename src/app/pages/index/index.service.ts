import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalUrl } from 'src/app/util/global-url';

@Injectable({
  providedIn: 'root'
})
export class IndexService {
  
  




  private API_PAISES = GlobalUrl.BASE_URL + 'api/ubicacion/show/paises';
  private API_DEPARTAMENTOS = GlobalUrl.BASE_URL + 'api/ubicacion/show/departamentos';
  private API_PROVINCIAS = GlobalUrl.BASE_URL + 'api/ubicacion/show/provincias';
  private API_DISTRITOS = GlobalUrl.BASE_URL + 'api/ubicacion/show/distritos';


  constructor(private http: HttpClient) { }

  getPais(): Observable<any> {
    return this.http.get(
      this.API_PAISES);
  }

  getDepartamentos(): any {
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
