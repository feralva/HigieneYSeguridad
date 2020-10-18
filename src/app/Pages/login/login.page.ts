import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { LoaderService } from 'src/app/Core/Services/loader.service';
import { skip } from 'rxjs/operators';
import { LanguagePopupPage } from '../language-popup/language-popup.page';
import { LoadingController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService, private router: Router, private popOverCtrl: PopoverController, 
    private loader: LoaderService, private loadingController: LoadingController) { }

  ngOnInit() {
  }

  async openLanguagePopover(ev) {
    const popOver = await this.popOverCtrl.create({
      component: LanguagePopupPage,
      event: ev
    });
    await popOver.present();
  }

  async login(form){

    const loading = await this.loadingController.create({
      spinner: 'circular',
      translucent: true,
      
    });
    await loading.present();

    this.authService.login(form.value);
    
    this.authService.currentUser.subscribe(
      (data)=>{
        console.log(data);
        if(data) {this.router.navigateByUrl('home')}
          else {
            loading.dismiss();
            this.router.navigateByUrl('/login')
          }
      },
      (error) => {
        loading.dismiss();
        throw Error(error)
      }
    );
  }
}
