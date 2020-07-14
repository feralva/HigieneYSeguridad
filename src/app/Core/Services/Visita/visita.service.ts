import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisitaService {


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient) { }


  obtenerVisitasEmpresa(idEmpresa: number): Observable<any[]> {
    return this.http.get<any[]>(environment.UrlBaseApi + `Empresa/${idEmpresa}/Visitas?activo=true`, this.httpOptions);
  }
  obtenerVisitasPendientesEmpleado(idEmpleado: number): Observable<any[]> {
    return this.http.get<any[]>(environment.UrlBaseApi + `Visita/Empleado/${idEmpleado}?activo=true&estado=1`, this.httpOptions);
  }

  obtenerTiposVisita(): Observable<any[]> {
    return this.http.get<any[]>(environment.UrlBaseApi + `Visita/Tipos`, this.httpOptions);
  }

  alta(visita:any) : Observable<any> {
    return this.http.post<any>(environment.UrlBaseApi + 'Visita', {Model: visita}, this.httpOptions); 
  }

  obtenerVisitaDetalle(idVisita: number): Observable<any> {
    return this.http.get<any[]>(environment.UrlBaseApi + `Visita/${idVisita}`, this.httpOptions);
  }
}
