import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/Models/Cliente';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ClienteService } from './cliente.service';
import { AuthService } from '../auth/auth.service';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteResolver implements Resolve<any[]>{

    constructor(private clienteService: ClienteService, private authService: AuthService){}

    idEmpresa: number;
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]>{

        this.authService.getUserSubject().pipe(first()).subscribe(
          data => this.idEmpresa = data.empresaId,
          error => console.log(error)
        );
        return this.clienteService.obtenerClientesEmpresa(this.idEmpresa);
    }

}