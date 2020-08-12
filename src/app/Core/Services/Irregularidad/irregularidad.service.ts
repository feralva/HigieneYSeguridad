import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IrregularidadService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  alta(irregularidad:any) : Observable<any> {
    return this.http.post<any>(environment.UrlBaseApi + 'Irregularidad', {Model: irregularidad}, this.httpOptions); 
  }

  ObtenerIrregularidades(idEmpresa: number = null, estado: number = null, idCliente: number = null, idIrregularidad: number = null):
     Observable<any[]> {

    let params = new HttpParams();
    
    if(idCliente) params = params.set('idCliente', idCliente.toString())
    if(idEmpresa) params = params.set('idEmpresa', idEmpresa.toString())
    if(estado) params = params.set('estado', estado.toString())
    if(idIrregularidad) params = params.set('idIrregularidad', idIrregularidad.toString())
    
    var httpOptions = 
      { ...this.httpOptions,
        params: params
      }
      
    return this.http.get<any[]>(environment.UrlBaseApi + `Irregularidad`, httpOptions);
  }

  obtenerTiposIrregularidades() : Observable<any> {
    return this.http.get<any>(environment.UrlBaseApi + 'Irregularidad/tipos', this.httpOptions); 
  }

  completarIrregularidad(irregularidad: any): Observable<any> {
    return this.http.put<any>(environment.UrlBaseApi + 'Irregularidad', {Model: irregularidad}, this.httpOptions); 
  }
}
