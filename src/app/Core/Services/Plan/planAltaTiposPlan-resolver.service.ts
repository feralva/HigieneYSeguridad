import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { PlanService } from './plan.service';

@Injectable({
  providedIn: 'root'
})
export class PlanAltaTiposPlanResolverService implements Resolve<any[]>{

  constructor(private planService: PlanService, private authService:AuthService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>{

      return this.planService.obtenerTiposPlan();
  }


}