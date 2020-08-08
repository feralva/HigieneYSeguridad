import { Component, OnInit } from '@angular/core';

import { Platform, PopoverController, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LanguageService } from './Core/Services/language-service.service';
import { AppDataService } from './Core/Services/Data/app-data.service';
import { LanguagePopupPage } from './Pages/language-popup/language-popup.page';
import { AuthService } from './Core/Services/auth/auth.service';
import { Router, Event, NavigationCancel, NavigationEnd, NavigationError,
  NavigationStart } from '@angular/router';
import { LoaderService } from './Core/Services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  public selectedIndex = 0;
  pageName: string;
  currentUser: any;
  
  constructor(
    private platform: Platform, private loaderService: LoaderService,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private languageService: LanguageService,
    private appDataService: AppDataService,
    private popOverCtrl: PopoverController,
    private auth: AuthService, private router: Router
  ) {
      this.initializeApp();
  }


  ngOnInit(): void {
    this.appDataService.currentPageName.subscribe(pageNameCurrent => this.pageName = pageNameCurrent);

    this.auth.getUserSubject().subscribe(
      (res)=>{
      this.currentUser = res;
      },
      (error) => console.log(error)
    );
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      /* this.router.events.subscribe((event: Event) => {
        switch(true){
          case event instanceof NavigationStart: {
            this.loaderService.present();
          
            break;
          }
  
          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            this.loaderService.dismiss();
            break;
          }
          default: {
            break;
          }
        }
      }) */
      this.languageService.setInitialAppLanguage();

/*       this.auth.currentUser.subscribe(
        data=> {
          if(data){
            this.router.navigate(['home'])
          } else{
            this.router.navigate(['login'])
          }
        }
      ) */

      //this.auth.login('user');
    });
  }

  async openLanguagePopover(ev) {
    const popOver = await this.popOverCtrl.create({
      component: LanguagePopupPage,
      event: ev
    });
    await popOver.present();
  }
}
