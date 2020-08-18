import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LicenciaService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  obtenerTiposLicencia() : Observable<any[]> {
    return this.http.get<any[]>(environment.UrlBaseApi + 'Licencia/tipos', this.httpOptions); 
  }

  obtenerLicencias(): Observable<any[]> {

    return this.http.get<any[]>(environment.UrlBaseApi + 'Licencia', this.httpOptions); 
  }

  actualizarLicenciaEmpresa(licencia: any): Observable<any> {
    return this.http.post<any[]>(environment.UrlBaseApi + `Licencia`, { model: licencia }, this.httpOptions);
  }
}