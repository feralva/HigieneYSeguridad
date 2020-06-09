import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserLogueado } from 'src/app/Models/UserLogueado';
import { LanguagePopupPageRoutingModule } from 'src/app/Pages/language-popup/language-popup-routing.module';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  
  encriptarContrasenia(contrasenia: string): string {
    //TODO implementar encriptacion real
    return contrasenia;
  }

  currentUser: BehaviorSubject<UserLogueado> = new BehaviorSubject(null);
  constructor() { }
  //TODO Funcion dummy login, generar la funcion real
  login(name) {
    if (name === 'user') {
      this.currentUser.next({
        idUsuario: 'fernando@Ternium.com',
        name: 'Dummy User',
        roles: ['Contenido1', 'Contenido2' ],
        empresaId: 1
      });
    } else if (name === 'admin') {
      this.currentUser.next({
        idUsuario: 'fernando@Ternium.com',
        name: 'Admin',
        roles: ['Contenido1', 'Contenido2', 'Contenido3', 'Contenido4'],
        empresaId: 1
      });
    }
  }

  getUserSubject() {
    return this.currentUser.asObservable();
  }

  isLoggedIn() {
    return !!this.currentUser.value;
  }

  logout() {
    this.currentUser.next(null);
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
