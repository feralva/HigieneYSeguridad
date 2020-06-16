import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { EmpresaService } from './empresa.service';

@Injectable({
  providedIn: 'root'
})
export class EmpresasResolverService implements Resolve<any[]>{

    constructor(private empresaService: EmpresaService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>{
  
        return this.empresaService.ObtenerEmpresas();
    }
}