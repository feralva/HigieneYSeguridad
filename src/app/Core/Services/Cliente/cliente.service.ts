import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/Models/Cliente';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private http: HttpClient) { }

  addCliente(cliente: Cliente): Observable<any> {
    return this.http.post<Cliente>(environment.UrlBaseApi + `Cliente`, {Model: cliente}, this.httpOptions);
  }

  obtenerClientesEmpresa(idEmpresa: number): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(environment.UrlBaseApi + `Empresa/${idEmpresa}/Clientes`, this.httpOptions);
  }

  obtenerClientesResumenEmpresa(idEmpresa: number): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(environment.UrlBaseApi + `Empresa/${idEmpresa}/ClientesResumen`, this.httpOptions);
  }

  obtenerDetalleCliente(idCliente: number): Observable<Cliente> {
    return this.http.get<Cliente>(environment.UrlBaseApi + `Cliente/${idCliente}`, this.httpOptions);
  }

  obtenerPlanesActivosCliente(idCliente: number): Observable<any[]> {
    return this.http.get<any[]>(environment.UrlBaseApi + `Cliente/${idCliente}/Planes?activo=true`, this.httpOptions);
  }

  obtenerEstablecimientosCliente(idCliente: number) : Observable<any[]> {
    return this.http.get<any[]>(environment.UrlBaseApi + `Cliente/${idCliente}/Establecimientos`, this.httpOptions);
  }

  obtenerEstablecimientosActivosCliente(idCliente: number): Observable<any> {
    return this.http.get<any[]>(environment.UrlBaseApi + `Cliente/${idCliente}/Establecimientos?activo=true`, this.httpOptions);
  }

  ActualizarCliente(cliente: Cliente): Observable<any[]> {

    return this.http.put<any[]>(environment.UrlBaseApi + `Cliente`, {Model: cliente}, this.httpOptions);
  }

  obtenerCliente(idCliente: number): Observable<any[]> {
    return this.http.get<any[]>(environment.UrlBaseApi + `Cliente/${idCliente}`, this.httpOptions);
}
}
