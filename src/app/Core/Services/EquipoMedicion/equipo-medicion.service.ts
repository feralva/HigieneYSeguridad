import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipoMedicionService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  rutasServicios = {
    Alta : 'https://localhost:44380/api/Empresa/{idEmpresa}/EquiposMedicionTotalizado',
    //ObtenerEmpleadosEmpresa : 
  };

  constructor(private http: HttpClient) { }
  
  ObtenerEquiposMedicionTotalizadosEmpresa(idEmpresa: number): Observable<any[]> {

    return this.http.get<any[]>(`https://localhost:44380/api/Empresa/${idEmpresa}/EquiposMedicionTotalizado`, this.httpOptions);
  }

}
