import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login(form){
    this.authService.login(form.value).subscribe(
      (res)=>{
      //console.log(res);
      this.router.navigateByUrl('home');
      },
      (error) => console.log(error)
    );
  }
}
