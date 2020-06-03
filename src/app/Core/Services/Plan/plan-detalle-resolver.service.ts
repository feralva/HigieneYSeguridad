import { Injectable } from '@angular/core';
import { PlanService } from './plan.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanDetalleResolverService implements Resolve<any[]>{

  constructor(private planService: PlanService){}

  idEmpresa: number;
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>{

      return this.planService.obtenerDetallePlan(+route.paramMap.get('id'));
  }


}