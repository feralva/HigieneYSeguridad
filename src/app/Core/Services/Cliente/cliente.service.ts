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
    Alta : '',
    //ObtenerEmpleadosEmpresa : 
  };

  constructor(private http: HttpClient) { }

  obtenerClientesEmpresa(idEmpresa: number): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(environment.UrlBaseApi + `Empresa/${idEmpresa}/Clientes`, this.httpOptions);
  }
  obtenerDetalleCliente(idCliente: number): Observable<Cliente> {
    return this.http.get<Cliente>(environment.UrlBaseApi + `Cliente/${idCliente}`, this.httpOptions);
  }
}
