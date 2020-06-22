import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { RolService } from './rol.service';

@Injectable({
  providedIn: 'root'
})
export class RolesDisponiblesResolverService implements Resolve<any[]>{

  constructor(private rolService: RolService){}

  idEmpresa: number;
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>{

      return this.rolService.obtenerRolesDisponibles();
  }


}