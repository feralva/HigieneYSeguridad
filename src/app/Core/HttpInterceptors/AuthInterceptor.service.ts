import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, EMPTY } from 'rxjs';
import { catchError, retryWhen, finalize, delay, tap, map, switchMap } from 'rxjs/operators';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../Services/auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private toastCtrl: ToastController, private loadingCtrl: LoadingController,
        private authService: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        if(!req.url.includes('Authenticate/refreshToken') 
            && !req.url.includes('user/ReestablecerPass')
            && !req.url.includes('forgotPassword')){
            const token = localStorage.getItem('auth_token');
            if (!token) {
                return next.handle(req);
            }
            const reqWithHeaders = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`)
                });
            console.log(reqWithHeaders)
            return next.handle(reqWithHeaders).pipe(
                catchError(err =>{
                    if(err instanceof HttpErrorResponse){
                        switch((<HttpErrorResponse>err).status){
                            case 401:
                                return this.handle401Error(reqWithHeaders, next,err);
                            default:
                                return throwError(err);
                        }
                    }else{
                        return throwError(err)
                    }
                }),
                retryWhen(err => {
                    console.log(err)
                    let retries = 1;
                    return err.pipe(
                        delay(1000),
                        tap(() => {
                            this.showRetryToast(retries)
                        }),
                        map(error => {
                            console.log(error)
                            if(error instanceof HttpErrorResponse){
                                if(error.status === 409){
                                    throw error;
                                }
                            }
                            if(retries++ === 3){
                                console.log(error)
                                throw error;
                            }
                            return error;
                        })
                    )
                }) ,
                catchError(err => {
                    //console.log('error: ', err);
                    if(err instanceof HttpErrorResponse){
                        if(err.status === 409){
                            throw err;
                        }
                    }
                    console.log('redirijo a login');
                    this.authService.logout()
                    return EMPTY;
                }) 
            )
        }else return next.handle(req)
        
  }

  async showRetryToast(retryCount){
      const toast = await this.toastCtrl.create({
          message:`Retry: ${retryCount}/3`,
          duration: 1000
      });
      toast.present();
  }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler, err: HttpErrorResponse){

        console.log('handle401Error')
        const token = localStorage.getItem("auth_token");

        const jwtHelperService = new JwtHelperService();

        if (token && jwtHelperService.isTokenExpired(token) && this.authService.isLoggedIn()) {
                console.log('obtengo nuevo token')
                const refreshToken: string = localStorage.getItem("auth_Refresh_token");
                return this.authService.refrescarToken(token,refreshToken).pipe(
                    tap(res => console.log('tap', res)),
                    catchError(err => {return throwError(err)}),
                    switchMap(res => {
                        if(!(res instanceof HttpErrorResponse)){
                            localStorage.setItem('auth_token', res.accessToken);
                            request = request.clone({
                                headers: request.headers.set('Authorization', `Bearer ${res.accessToken}`)
                                });
                            return next.handle(request)
                        }else next.handle(request)
                    }) 
                )
        }
    }
}