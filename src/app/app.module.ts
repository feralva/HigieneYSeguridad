import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './Core/Components/menu/menu.component';

import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { IonicStorageModule } from '@ionic/storage';
import { LanguagePopupPageModule } from './Pages/language-popup/language-popup.module';
import { HasRoleDirective } from './Core/Directives/has-role.directive';

import { SharedDirectivesModule } from './Core/Directives/shared-directives.module';

import { environment } from '../environments/environment'
import { AngularFireModule } from 'angularfire2'
import { AngularFirestoreModule } from 'angularfire2/firestore'

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
import { Camera } from '@ionic-native/camera/ngx';

import * as firebase from 'firebase';

import { LoaderInterceptorService } from './Core/HttpInterceptors/loader-interceptor.service';
import { AuthInterceptor } from './Core/HttpInterceptors/AuthInterceptor.service';
import { GlobalErrorHandlerService } from './Core/Services/global-error-handler.service';
import { PipesModule } from './Core/pipes/pipes.module';

import { Network } from '@ionic-native/network/ngx';

firebase.initializeApp(environment.firebaseConfig);

@NgModule({
  declarations: [AppComponent, MenuComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    SharedDirectivesModule,
    PipesModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    LanguagePopupPageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFirestoreModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {provide: ErrorHandler, useClass: GlobalErrorHandlerService},
    Network
    
    /* ,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true } */
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
