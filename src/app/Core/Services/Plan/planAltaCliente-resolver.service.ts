import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ClienteService } from '../Cliente/cliente.service';

@Injectable({
  providedIn: 'root'
})
export class PlanAltaClienteResolverService implements Resolve<any[]>{

  constructor(private clienteService: ClienteService, private authService:AuthService){}

  idEmpresa: number;
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>{

    this.authService.getUserSubject().subscribe(
        data => this.idEmpresa = data.empresaId,
        error => console.log(error)
      );

      return this.clienteService.obtenerClientesEmpresa(+route.paramMap.get('id'));
  }


}