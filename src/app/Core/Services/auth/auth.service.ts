import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/Models/User';
import { LanguagePopupPageRoutingModule } from 'src/app/Pages/language-popup/language-popup-routing.module';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: BehaviorSubject<User> = new BehaviorSubject(null);
  constructor() { }
  // Funcion dummy login TODO: generar la funcion real
  login(name) {
    if (name === 'user') {
      this.currentUser.next({
        name: 'Dummy User',
        roles: ['Contenido1', 'Contenido2' ]
      });
    } else if (name === 'admin') {
      this.currentUser.next({
        name: 'Admin',
        roles: ['Contenido1', 'Contenido2', 'Contenido3', 'Contenido4']
      });
    }
  }

  getUserSubject() {
    return this.currentUser.asObservable();
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
