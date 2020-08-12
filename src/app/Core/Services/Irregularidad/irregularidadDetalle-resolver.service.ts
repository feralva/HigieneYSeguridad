import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IrregularidadService } from './irregularidad.service';

@Injectable({
  providedIn: 'root'
})
export class IrregularidadDetalleResolver implements Resolve<any[]>{

  constructor(private irregularidadService: IrregularidadService){}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]>{

    const idIrregularidad = +route.paramMap.get('idEstablecimiento');
    return this.irregularidadService.ObtenerIrregularidades(undefined, undefined, undefined, idIrregularidad);
  }

}