import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EquipoMedicion } from 'src/app/Models/EquipoMedicion';

@Injectable({
  providedIn: 'root'
})
export class EquipoMedicionService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  rutasServicios = {
    Alta : 'https://localhost:44380/api/EquipoMedicion',
    ObtenerTiposEquipoMedicion : `https://localhost:44380/api/EquipoMedicion/tipos`
  };

  constructor(private http: HttpClient) { }
  
  ObtenerEquiposMedicionTotalizadosEmpresa(idEmpresa: number): Observable<any[]> {

    return this.http.get<any[]>(`https://localhost:44380/api/Empresa/${idEmpresa}/EquiposMedicionTotalizado`, this.httpOptions);
  }

  ObtenerTiposEquiposMedicionPosibles(): Observable<any[]> {

    return this.http.get<any[]>(this.rutasServicios.ObtenerTiposEquipoMedicion, this.httpOptions);
  }

  addEquipoMedicion(equipoMedicion: EquipoMedicion): Observable<EquipoMedicion> {
    return this.http.post<EquipoMedicion>(this.rutasServicios.Alta, {Model: equipoMedicion}, this.httpOptions);
  }

}
