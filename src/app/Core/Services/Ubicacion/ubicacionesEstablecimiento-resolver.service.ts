import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UbicacionService } from './ubicacion.service';

@Injectable({
  providedIn: 'root'
})
export class UbicacionesEstablecimientoResolverService implements Resolve<any[]>{

  constructor(private ubicacionService: UbicacionService){}

  idEmpresa: number;
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>{

      return this.ubicacionService.obtenerUbicacionesEstablecimiento(+route.paramMap.get('idEstablecimiento'));
  }


}