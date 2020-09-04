import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { AlertController, ToastController } from '@ionic/angular';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitar-forgot-password',
  templateUrl: './solicitar-forgot-password.component.html',
  styleUrls: ['./solicitar-forgot-password.component.scss'],
})
export class SolicitarForgotPasswordComponent implements OnInit {

  emailUsuario: string = ''

  constructor(private authService: AuthService, private alertController: AlertController,
    private toastController: ToastController, private router: Router) { }

  ngOnInit() {}

  solicitarContraseniaNueva(form){

    this.emailUsuario = form.form.controls.email.value;

    this.cambiarPasswordConfirm()
    
  }

  async MostrarMensajeOperacion(mensaje:string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  async cambiarPasswordConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Nueva Password',
      message: '¿Esta seguro que desea establecer solicitar cambio de contraseña?',
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
            this.authService.solicitarMailPasswordReset(this.emailUsuario).pipe(
              tap(res => console.log(res))
            ).subscribe(     
              (data)=>{
                console.log(data);
                this.MostrarMensajeOperacion('Siga Instrucciones Correo Electronico')
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

}
