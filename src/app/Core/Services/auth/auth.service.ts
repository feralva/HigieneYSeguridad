import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserLogueado } from 'src/app/Models/UserLogueado';
import { LanguagePopupPageRoutingModule } from 'src/app/Pages/language-popup/language-popup-routing.module';
import * as moment from "moment";
import { HashingService } from '../hashing.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private hashingService: HashingService, private router: Router, private http: HttpClient) { }

  encriptarContrasenia(contrasenia: string): string {
    
    return this.hashingService.hashearString(contrasenia);
  }

  private setSession(authResult) {
    //const expiresAt = moment().add(authResult.expiresIn,'second');

    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem("expires_at", authResult.expiration);
}  

  currentUser: BehaviorSubject<UserLogueado> = new BehaviorSubject(null);

  //TODO Funcion dummy login, generar la funcion real
  login(usuarioFromForm): Observable<any> {

    this.encriptarContrasenia(usuarioFromForm.password)
    var usuario;

    var dataToken;
    this.http.post<any>(environment.UrlBaseApi +'Authenticate/Login', { username: usuarioFromForm.email, password: usuarioFromForm.password }, 
      {headers: new HttpHeaders({ 'Content-Type': 'application/json' })})
      .subscribe(
        data => {
          console.log(data)
          dataToken = data
          this.setSession(data)
          //TODO Obtener informacion Usuario
        },
        (error) => {
          // TODO Tomar el error code y mostrar mensaje de error
          console.log(error)
        }
    )

    if (usuarioFromForm.email === 'user') {
      usuario = {
        idUsuario: 'fernando@Ternium.com',
        name: 'Fernando Alvarez',
        roles: ['Auditor','Coordinador'],
        empresaId: 3006,
        empleadoId: 1027,
        empresaNombre: 'Disney',
        urlFotoEmpleado: 'https://firebasestorage.googleapis.com/v0/b/higiene-y-seguridad-feaf5.appspot.com/o/FotosEmpleados%2F3006%2FFernando1%40enterprise.com.jpg?alt=media&token=cb9ec6d5-5982-4b5c-8224-fa250416631a',
        urlFotoEmpresa: 'https://firebasestorage.googleapis.com/v0/b/higiene-y-seguridad-feaf5.appspot.com/o/FotosEmpresas%2F3006.jpg?alt=media&token=3dcca304-e941-4dfc-b055-f8affe931681'
      } 
    } else if (usuarioFromForm.email === 'admin') {
      usuario = {
        idUsuario: 'fernando@Ternium.com',
        name: 'Fernando Alvarez',
        roles:  ['Auditor','Coordinador'],
        empresaId: 3006,
        empleadoId: 1027,
        empresaNombre: 'Disney',
        urlFotoEmpleado: 'https://firebasestorage.googleapis.com/v0/b/higiene-y-seguridad-feaf5.appspot.com/o/FotosEmpleados%2F3006%2FFernando1%40enterprise.com.jpg?alt=media&token=cb9ec6d5-5982-4b5c-8224-fa250416631a',
        urlFotoEmpresa: 'https://firebasestorage.googleapis.com/v0/b/higiene-y-seguridad-feaf5.appspot.com/o/FotosEmpresas%2F3006.jpg?alt=media&token=3dcca304-e941-4dfc-b055-f8affe931681'
      }
    } else {
      usuario = {
        idUsuario: 'Anonimo',
        name: 'Anonimo',
        roles: [],
        empresaId: 3006,
        empleadoId: 1027,
        empresaNombre: 'Disney',
        urlFotoEmpleado: 'https://firebasestorage.googleapis.com/v0/b/higiene-y-seguridad-feaf5.appspot.com/o/FotosEmpleados%2F3006%2FFernando1%40enterprise.com.jpg?alt=media&token=cb9ec6d5-5982-4b5c-8224-fa250416631a',
        urlFotoEmpresa: 'https://firebasestorage.googleapis.com/v0/b/higiene-y-seguridad-feaf5.appspot.com/o/FotosEmpresas%2F3006.jpg?alt=media&token=3dcca304-e941-4dfc-b055-f8affe931681'
      }
    }

    this.currentUser.next(usuario);
    return this.currentUser.asObservable();
  }

  getUserSubject() {
    return this.currentUser.asObservable();
  }

  isLoggedIn() {
    return !!this.currentUser.value;
  }

  logout() {
    localStorage.remove('id_token')
    localStorage.remove('expires_at')
    this.currentUser.next(null);
    this.router.navigateByUrl('/login')
  }

  hasRoles(roles: string[]): boolean {
    for (const oneRole of roles) {
      if (!this.currentUser.value || !this.currentUser.value.roles.includes(oneRole)) {
        return false;
      }
    }
    return true;
  }


}
