import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { LoaderService } from 'src/app/Core/Services/loader.service';
import { skip } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService, private router: Router, private loader: LoaderService) { }

  ngOnInit() {
  }

  login(form){
    this.loader.present();
    this.authService.login(form.value).pipe(skip(1)).subscribe(
      
      (data)=>{
        console.log(data);
        this.router.navigateByUrl('home');
        this.loader.dismiss();
      },
      (error) => console.log(error)
    );
  }
}
