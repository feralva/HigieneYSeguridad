import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PlanService } from '../../Services/Plan/plan.service';
import { AuthService } from '../../Services/auth/auth.service';
import { first } from 'rxjs/operators';
import { ClienteService } from '../../Services/Cliente/cliente.service';

@Injectable({
  providedIn: 'root'
})
export class PlanDeClientePropioGuard implements CanActivate {

  constructor(private authService: AuthService, private planService: PlanService, private clienteService: ClienteService){}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

    const idPlan = +next.paramMap.get('id');
        
    const usuario = await  this.authService.getUserSubject().pipe(first()).toPromise()
    const plan = await  this.planService.obtenerDetallePlan(idPlan).pipe(first()).toPromise()
    const cliente = await  this.clienteService.obtenerCliente(plan.idCliente).pipe(first()).toPromise()

    return new Promise<boolean>((resolve, reject) => {
      resolve(usuario.empresaId === cliente.empresaId)
    }) 
  }
  
}
