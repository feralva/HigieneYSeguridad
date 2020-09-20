import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { LoaderService } from 'src/app/Core/Services/loader.service';
import { skip } from 'rxjs/operators';
import { LanguagePopupPage } from '../language-popup/language-popup.page';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService, private router: Router, private popOverCtrl: PopoverController, private loader: LoaderService) { }

  ngOnInit() {
  }

  async openLanguagePopover(ev) {
    const popOver = await this.popOverCtrl.create({
      component: LanguagePopupPage,
      event: ev
    });
    await popOver.present();
  }

  login(form){

    this.authService.login(form.value);
    
    this.authService.currentUser.subscribe(
      (data)=>{
        console.log(data);
        if(data) {this.router.navigateByUrl('home')}
          else {
            
            this.router.navigateByUrl('/login')
          }
      },
      (error) => {throw Error(error)}
    );
  }
}
