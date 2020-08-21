import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EquipoMedicion } from 'src/app/Models/EquipoMedicion';

import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EquipoMedicionService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }
  
  ObtenerEquiposMedicionTotalizadosEmpresa(idEmpresa: number): Observable<any[]> {

    return this.http.get<any[]>(environment.UrlBaseApi + `Empresa/${idEmpresa}/EquiposMedicionTotalizado`, this.httpOptions);
  }

  ObtenerTiposEquiposMedicionPosibles(): Observable<any[]> {

    return this.http.get<any[]>(environment.UrlBaseApi + 'EquipoMedicion/tipos', this.httpOptions);
  }

  addEquipoMedicion(equipoMedicion: EquipoMedicion): Observable<EquipoMedicion> {
    return this.http.post<EquipoMedicion>(environment.UrlBaseApi + 'EquipoMedicion' , {Model: equipoMedicion}, this.httpOptions);
  }

  ObtenerTipoEquipoMedicion(nombre: string, idEmpresa: number): Observable<any> {

    return this.http.get<any>(environment.UrlBaseApi + `EquipoMedicion/tipo/${nombre}?empresaID=${idEmpresa}`, this.httpOptions);
  }

  actualizarCantidadEquiposMedicion(equipoMedicionNombre: string, idEmpresa: number, 
                deltaCantidad: number) {

    return this.http.put<EquipoMedicion>(environment.UrlBaseApi + `Empresa/${idEmpresa}/EquipoMedicion/ActualizacionCantidad` , 
    {
      Model: 
      { 
        equipoMedicionNombre: equipoMedicionNombre,
        cantidad: deltaCantidad
      }
    }, this.httpOptions);

  }
}
