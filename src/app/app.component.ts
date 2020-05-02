import { Component, OnInit } from '@angular/core';

import { Platform, PopoverController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LanguageService } from './Core/Services/language-service.service';
import { AppDataService } from './Core/Services/Data/app-data.service';
import { LanguagePopupPage } from './Pages/language-popup/language-popup.page';
import { AuthService } from './Core/Services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  public selectedIndex = 0;
  pageName: string;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private languageService: LanguageService,
    private appDataService: AppDataService,
    private popOverCtrl: PopoverController,
    private auth: AuthService
  ) {
    this.initializeApp();
  }
  ngOnInit(): void {
    this.appDataService.currentPageName.subscribe(pageNameCurrent => this.pageName = pageNameCurrent);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.languageService.setInitialAppLanguage();
      this.auth.login('user');
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
