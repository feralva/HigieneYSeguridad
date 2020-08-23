import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../Services/auth/auth.service';
import { EmpresaService } from '../../Services/Empresa/empresa.service';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MiembroEmpresaGuard implements CanActivate {

  constructor(private authService: AuthService, private empresaService: EmpresaService){}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean>{
      
      const idCliente = +next.paramMap.get('id');
        
      const usuario = await  this.authService.getUserSubject().pipe(first()).toPromise()
      const empresa = await  this.empresaService.obtenerEmpresa(idCliente).pipe(first()).toPromise()
  
      return new Promise<boolean>((resolve, reject) => {
        resolve(usuario.empresaId === empresa.id)
      }) 
  }
  
}
