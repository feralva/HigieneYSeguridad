import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class GenericAlertMessageService {

  constructor(private alertCtrl: AlertController, private translate: TranslateService) { }

  public async mostrarMensajeGenerico(mensaje: string){

    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header:  'Header'/* this.translate.instant('Mensaje') */,
      subHeader: 'Subtitle',
      message: this.translate.instant(mensaje),
      buttons: ['OK']
    });
    alert.present();
  }
}
