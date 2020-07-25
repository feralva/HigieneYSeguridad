import { Component, OnInit } from '@angular/core';
import { Ubicacion } from 'src/app/Models/Ubicacion';
import { ModalController } from '@ionic/angular';
import { Geolocation} from '@capacitor/core';

@Component({
  selector: 'app-ubicacion-alta',
  templateUrl: './ubicacion-alta.component.html',
  styleUrls: ['./ubicacion-alta.component.scss'],
})
export class UbicacionAltaComponent implements OnInit {

  model: Ubicacion= {
    id: 0,
    nombre: '',
    latitud: '',
    longitud: ''
  };
  constructor(private modalctrl: ModalController) {}

  ngOnInit() {
    this.getLocation();
  }

  onAgregarUbicacion(){

    this.modalctrl.dismiss(
      {
        ubicacion: this.model
      }
    );
  }

  async closeModal() {
    await this.modalctrl.dismiss();
  }

  async getLocation() {
    
    const position = await Geolocation.getCurrentPosition();
    this.model.latitud = position.coords.latitude.toString();
    this.model.longitud = position.coords.longitude.toString();

  }
}
