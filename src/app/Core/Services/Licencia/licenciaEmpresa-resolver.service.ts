import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LicenciaService } from './licencia.service';
import { AuthService } from '../auth/auth.service';
import { UserLogueado } from 'src/app/Models/UserLogueado';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LicenciaEmpresaResolver implements Resolve<any[]>{

  currentUser: UserLogueado;
  constructor(private licenciaService: LicenciaService, private authService: AuthService){}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]>{

    this.authService.getUserSubject().pipe(first()).subscribe(
        data => {
          this.currentUser = data
        },
        error => console.log(error)
      );
    
    return this.licenciaService.obtenerLicenciaEmpresa(this.currentUser.empresaId);
  }

}