import { Injectable } from '@angular/core';
import { PlanService } from './plan.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlanesEmpresaResolverService implements Resolve<any[]>{

    constructor(private planService: PlanService, private authService:AuthService){}
  
    idEmpresa: number;
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>{
  
      this.authService.getUserSubject().pipe(first()).subscribe(
        data => this.idEmpresa = data.empresaId,
        error => console.log(error)
      );
        return this.planService.obtenerPlanesEmpresa(this.idEmpresa);
    }
}