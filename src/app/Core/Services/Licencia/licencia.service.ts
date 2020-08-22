import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { first, map } from 'rxjs/operators';

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
  
  AltaTipoLicencia(licencia: any): Observable<any> {
    return this.http.post<any[]>(environment.UrlBaseApi + `TipoLicencia`, { model: licencia }, this.httpOptions);
  }

  obtenerLicenciaEmpresa(idEmpresa: number): Observable<any> {

    return this.http.get<any>(environment.UrlBaseApi + 'Licencia', this.httpOptions).pipe(
      map(licencias => licencias[0])
    )
  }

  actualizarPrecioLicencia(licencia: any): Observable<any> {
    return this.http.post<any[]>(environment.UrlBaseApi + `TipoLicencia/Precio`, { model: licencia }, this.httpOptions);
  }

  modificarTipoLicencia(tipoLicencia: any): Observable<any> {
    return this.http.put<any[]>(environment.UrlBaseApi + `TipoLicencia`, { model: tipoLicencia }, this.httpOptions);
  }
  
  obtenerTipoLicenciaDetalle(idTipoLicencia: number) : Observable<any> {
    return this.http.get<any>(environment.UrlBaseApi + `TipoLicencia/${idTipoLicencia}`, this.httpOptions); 
  }

}
