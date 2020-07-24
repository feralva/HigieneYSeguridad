import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PlanService } from './plan.service';

@Injectable({
  providedIn: 'root'
})
export class PlanEstadosPosiblesResolver implements Resolve<any[]>{

  constructor(private planService: PlanService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>{

      return this.planService.obtenerEstadosPosiblesPlan();
  }


}