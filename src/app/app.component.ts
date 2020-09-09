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
import { OfflineManagerService } from './Core/Services/offline-manager-service.service';
import { NetworkService, ConnectionStatus } from './Core/Services/network-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  public selectedIndex = 0;
  pageName: string;
  currentUser
  
  constructor(
    private platform: Platform, private loaderService: LoaderService,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private languageService: LanguageService,
    private appDataService: AppDataService,
    private popOverCtrl: PopoverController,
    public auth: AuthService, private router: Router,
    private offlineManager: OfflineManagerService,
    private networkService: NetworkService
  ) {
      this.initializeApp();
  }


  ngOnInit(): void {
    this.appDataService.currentPageName.subscribe(pageNameCurrent => this.pageName = pageNameCurrent);

    this.auth.getUserSubject().subscribe(
      (res)=>{
        console.log(res)

        if(res == null) this.router.navigateByUrl('/login')
        this.currentUser = res;
      },
      (error) => console.log(error)
    );
    
  }

  isLoggedIn(){
    return this.auth.isLoggedIn()
  }

  logOut(){
    this.auth.logout()
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
     
      this.networkService.onNetworkChange().subscribe((status: ConnectionStatus) => {
        if (status == ConnectionStatus.Online) {
          this.offlineManager.checkForEvents().subscribe();
        }
      });
      this.languageService.setInitialAppLanguage();

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
