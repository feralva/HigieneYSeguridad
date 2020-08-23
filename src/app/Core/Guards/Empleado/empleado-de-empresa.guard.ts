import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../Services/auth/auth.service';
import { EmpleadoService } from '../../Services/Empleado/empleado.service';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoDeEmpresaGuard implements CanActivate {

  constructor(private authService: AuthService, private empleadoService: EmpleadoService){}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

    const idEmpleado = +next.paramMap.get('id');
        
    const usuario = await  this.authService.getUserSubject().pipe(first()).toPromise()
    const empleado = await  this.empleadoService.obtenerDetalleEmpleado(idEmpleado).pipe(first()).toPromise()

    return new Promise<boolean>((resolve, reject) => {
      resolve(usuario.empresaId === empleado.empresaId)
    }) 
  }
  
}
