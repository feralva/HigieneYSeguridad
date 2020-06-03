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
  rutasServicios = {
    Alta : ''
  };

  constructor(private http: HttpClient) { }

  obtenerClientesEmpresa(idEmpresa: number): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(environment.UrlBaseApi + `Empresa/${idEmpresa}/Clientes`, this.httpOptions);
  }
  obtenerDetalleCliente(idCliente: number): Observable<Cliente> {
    return this.http.get<Cliente>(environment.UrlBaseApi + `Cliente/${idCliente}`, this.httpOptions);
  }
  obtenerPlanesActivosCliente(idCliente: number): Observable<any[]> {
    return this.http.get<any[]>(environment.UrlBaseApi + `Cliente/${idCliente}/Planes?activo=true`, this.httpOptions);
  }
}
