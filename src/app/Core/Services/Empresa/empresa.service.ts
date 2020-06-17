import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Empresa } from '../../../Models/Empresa';
import { Empleado } from 'src/app/Models/Empleado';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  rutasServicios = {
    Alta : 'https://localhost:44380/api/Empresa',
    //ObtenerEmpleadosEmpresa : 
  };

  constructor(private http: HttpClient) { }

  addEmpresa(empresa: Empresa): Observable<any> {
    return this.http.post<Empresa>(this.rutasServicios.Alta, {Model: empresa}, this.httpOptions);
  }
  
  ObtenerEmpleadosEmpresa(idEmpresa: number): Observable<Empleado[]> {

    return this.http.get<Empleado[]>(environment.UrlBaseApi +`Empresa/${idEmpresa}/Empleados`, this.httpOptions);
  }

  ObtenerEmpresas(): Observable<any[]> {

    return this.http.get<any[]>(environment.UrlBaseApi + `Empresa`, this.httpOptions);
  }

  ActualizarEmpresa(empresa: Empresa): Observable<any[]> {

    return this.http.put<any[]>(environment.UrlBaseApi + `Empresa`, {Model: empresa}, this.httpOptions);
  }

}
