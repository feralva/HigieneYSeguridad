import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
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

  private _currentUser: BehaviorSubject<UserLogueado> = new BehaviorSubject(null);

  currentUser = this._currentUser.asObservable();

  constructor(private hashingService: HashingService, private router: Router, private http: HttpClient) { }

  encriptarContrasenia(contrasenia: string): string {
    
    return this.hashingService.hashearString(contrasenia);
  }

  private setSession(authResult) {
    //const expiresAt = moment().add(authResult.expiresIn,'second');

    localStorage.setItem('auth_token', authResult.token);
    localStorage.setItem('auth_Refresh_token', authResult.refreshToken);
}  

  async login(usuarioFromForm) {

    var usuario;
    var dataToken;

    const authentificationData = await this.http.post<any>(environment.UrlBaseApi +'Authenticate/Login', { username: usuarioFromForm.email, 
      password: this.encriptarContrasenia(usuarioFromForm.password) }, 
      {headers: new HttpHeaders({ 'Content-Type': 'application/json' })}).toPromise()

    console.log(authentificationData)
    dataToken = authentificationData

    this.setSession(authentificationData)

    const detalleUsuario = await this.obtenerDetalleUsuario(usuarioFromForm.email).toPromise()

    usuario = detalleUsuario
    this._currentUser.next(usuario);

    return true;
  }

  getUserSubject() {
    return this._currentUser.asObservable();
  }

  isLoggedIn() {
    return !!this._currentUser.value;
  }

  obtenerDetalleUsuario(usuario: string): Observable<any>{

    return this.http.get<any>(environment.UrlBaseApi + `Authenticate/user/${usuario}`);
 
  }

  logout() {

      /* localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_Refresh_token') */
      localStorage.clear()
      
      this.router.navigate(['/login'])

      this._currentUser.next(null);
      //this._currentUser.complete();
  }

  hasRoles(roles: string[]): boolean {
    for (const oneRole of roles) {
      if (!this._currentUser.value || !this._currentUser.value.roles.includes(oneRole)) {
        return false;
      }
    }
    return true;
  }

  refrescarToken(token: string, refreshToken: string): Observable<any> {

    const credentials = JSON.stringify({ accessToken: token, refreshToken: refreshToken });
  
    return this.http.post(environment.UrlBaseApi + "Authenticate/refreshToken", credentials, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })})

  }

  establecerNuevaPassword(emailUsuario: string, nuevaPass: any, token: string): Observable<any> {
    return this.http.post<any>(environment.UrlBaseApi +'Authenticate/User/ReestablecerPass', 
      { emailUsuario: emailUsuario, 
        nuevaPass: this.encriptarContrasenia(nuevaPass), 
        tokenRefresh: token 
      }, {headers: new HttpHeaders({ 'Content-Type': 'application/json' })})
  }

  solicitarMailPasswordReset(emailUsuario: string): Observable<any>{
    return this.http.post<any>(environment.UrlBaseApi +`Authenticate/user/${emailUsuario}/forgotPassword`, {headers: new HttpHeaders({ 'Content-Type': 'application/json' })})
  }
  
}
