import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/Core/Services/loader.service';
import { tap } from 'rxjs/operators';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {

  emailUsuario: string = ''
  nuevaPass: string = ''
  token: string = ''
  constructor(private authService: AuthService, private router: Router, private loader: LoaderService,
    private route: ActivatedRoute, private alertController: AlertController,
    private toastController: ToastController) { }

  ngOnInit() {

    this.emailUsuario = this.route.snapshot.paramMap.get('idUsuario')
    this.token = this.route.snapshot.paramMap.get('token')
  }

  reEstablecerContrasenia(form){

    this.nuevaPass = form.form.controls.password.value;
    const nuevaPassConfirm = form.form.controls.passwordConfirm.value

    if(this.nuevaPass != nuevaPassConfirm) throw Error('Las constraseñas no coinciden')

    this.cambiarPasswordConfirm()
    
  }

  async cambiarPasswordConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Nueva Password',
      message: '¿Esta seguro que desea establecer nueva Contraseña?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          handler: () => {
            this.authService.establecerNuevaPassword(this.emailUsuario, this.nuevaPass, this.token).pipe(
              tap(res => console.log(res))
            ).subscribe(     
              (data)=>{
                this.MostrarMensajeOperacion('Operación Exitosa')
                this.router.navigate(['/login']);
              },
              (error) => this.MostrarMensajeOperacion(error.error)
            );
          }
        }
      ]
    });

    await alert.present();
  }

  async MostrarMensajeOperacion(mensaje:string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

}
