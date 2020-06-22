import { Injectable } from '@angular/core';
import { Empleado } from 'src/app/Models/Empleado';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  rutasServicios = {
    Alta : 'https://localhost:44380/api/Empleado'
  };

  addEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(environment.UrlBaseApi + 'Empleado', {Model: empleado}, this.httpOptions);
  }

  actualizarEmpleado(empleado: any): Observable<Empleado> {
    return this.http.put<any>(environment.UrlBaseApi + 'Empleado', {Model: empleado}, this.httpOptions);
  }

  obtenerDetalleEmpleado(idEmpleado: number): Observable<any> {
    return this.http.get<any>(environment.UrlBaseApi + `Empleado/${idEmpleado}`, this.httpOptions);
  }

}
