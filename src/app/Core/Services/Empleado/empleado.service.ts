import { Injectable } from '@angular/core';
import { Empleado } from 'src/app/Models/Empleado';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    return this.http.post<Empleado>(this.rutasServicios.Alta, {Empleado: empleado}, this.httpOptions);
  }
}
