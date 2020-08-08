import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError, empty } from 'rxjs';
import { map, catchError, retryWhen, delay, tap, finalize } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class LoaderInterceptorService {

  isLoading = false;
  loaderToShow: any;
  constructor(
    public loadingController: LoadingController
    ) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this.present();
      return next.handle(req).pipe(
                map((event: HttpEvent<any>) => {
                  
                    if (event instanceof HttpResponse) {
                        this.dismiss();
                        console.log('event--->>>', event);
                    }
                    return event;
                }));
  }

  public loader:any
  async present() {
    this.loader = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...'
    });
    await this.loader.present();
  }


    async dismiss() {
      let topLoader = await this.loadingController.getTop();
      while (topLoader) {
        if (!(await topLoader.dismiss())) {
          // throw new Error('Could not dismiss the topmost loader. Aborting...');
          break
        }
        topLoader = await this.loadingController.getTop();
      }
    }

    /* intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      this.loadingController.getTop().then(hasLoading => {
        if(!hasLoading){
          this.loadingController.create({
            spinner: 'circular',
            translucent: true
          }).then(loading => loading.present())
        }
      })

      return next.handle(req).pipe(
        retryWhen(err => {
          let retries = 1;
          return err.pipe(
            delay(1000),
            tap(() => {
              //this.showRetryToast(retries)
            }),
            map(error => {
              if (retries++ === 3){
                throw error
              }
              return error
            })
          )
        }),
        catchError(err => {
          console.log('error: ', err);
          //this.presentFailedAlert(err.error['msg'];
          return empty         
        }),
        finalize(() => {
          this.loadingController.getTop().then(hasLoading =>{
            if(hasLoading) {
              this.loadingController.dismiss()
            }
          })
        })
      )


    } */

}
