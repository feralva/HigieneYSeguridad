import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../Services/auth/auth.service';
import { first, map } from 'rxjs/operators';
import { ClienteService } from '../../Services/Cliente/cliente.service';

@Injectable({
  providedIn: 'root'
})
export class ClientePropioGuard implements CanActivate {

  constructor(private authService: AuthService, private clienteService: ClienteService){}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

    const idCliente = +next.paramMap.get('id');
        
    const usuario = await  this.authService.getUserSubject().pipe(first()).toPromise()
    const cliente = await  this.clienteService.obtenerCliente(idCliente).pipe(first()).toPromise()

    return new Promise<boolean>((resolve, reject) => {
      resolve(usuario.empresaId === cliente.empresaId)
    }) 
  }

}
