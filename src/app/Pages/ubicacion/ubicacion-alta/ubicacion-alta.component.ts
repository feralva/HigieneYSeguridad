import { Component, OnInit } from '@angular/core';
import { Ubicacion } from 'src/app/Models/Ubicacion';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ubicacion-alta',
  templateUrl: './ubicacion-alta.component.html',
  styleUrls: ['./ubicacion-alta.component.scss'],
})
export class UbicacionAltaComponent implements OnInit {

  model: Ubicacion= {
    id: 0,
    nombre: ''
  };
  
  constructor(private modalctrl: ModalController) { }

  ngOnInit() {}

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

}
