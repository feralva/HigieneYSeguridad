import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot,
   RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../Services/auth/auth.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticatedGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private authService: AuthService, private router: Router,private auth: AuthService, 
    private http: HttpClient){}

  async canActivate() {

/*     const token = localStorage.getItem("auth_token");

    const jwtHelperService = new JwtHelperService();

    if (token && !jwtHelperService.isTokenExpired(token) && this.authService.isLoggedIn()) {
      console.log(jwtHelperService.decodeToken(token));
      return true;
    }else{
      
      return this.router.parseUrl('/login'); */

    if(this.authService.isLoggedIn()){
      return true;
    }else{
      return this.router.parseUrl('/login');
    }
  }  
  

  private async tryRefreshingTokens(token: string): Promise<boolean> {
    // Try refreshing tokens using refresh token
    const refreshToken: string = localStorage.getItem("auth_Refresh_token");
    const credentials = JSON.stringify({ accessToken: token, refreshToken: refreshToken });
  
    let isRefreshSuccess: boolean;
    try {
      const response = await this.http.post(environment.UrlBaseApi + "Authenticate/refreshToken", credentials, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        }),
        observe: 'response'
      }).toPromise();
      // If token refresh is successful, set new tokens in local storage.
      const newToken = (<any>response).body.accessToken;
      const newRefreshToken = (<any>response).body.refreshToken;
      localStorage.setItem("auth_token", newToken);
      isRefreshSuccess = true;
    }
    catch (ex) {
      throwError(ex)
    }
    return isRefreshSuccess;
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
