import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LicenciaService } from './licencia.service';

@Injectable({
  providedIn: 'root'
})
export class TipoLicenciaDetalleResolver implements Resolve<any[]>{

  constructor(private licenciaService: LicenciaService){}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]>{

    const idTipoLicencia = +route.paramMap.get('id');
    
    return this.licenciaService.obtenerTipoLicenciaDetalle(idTipoLicencia);
  }

}