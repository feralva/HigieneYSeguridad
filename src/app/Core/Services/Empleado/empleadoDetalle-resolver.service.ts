import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { EmpleadoService } from './empleado.service';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoDetalleResolverService implements Resolve<any[]>{

    constructor(private empleadoService: EmpleadoService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>{
  
        return this.empleadoService.obtenerDetalleEmpleado(+route.paramMap.get('id'));
    }
}