import { Component, OnInit } from '@angular/core';
import { Ubicacion } from 'src/app/Models/Ubicacion';
import { VerQrUbicacionModalComponent } from '../../ubicacion/ver-qr-ubicacion-modal/ver-qr-ubicacion-modal.component';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { TranslateService } from '@ngx-translate/core';
import { EstablecimientoService } from 'src/app/Core/Services/Establecimiento/establecimiento.service';
import { AlertController, ModalController, ToastController, Platform, ActionSheetController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/Core/Services/loader.service';

@Component({
  selector: 'app-establecimiento-detalle',
  templateUrl: './establecimiento-detalle.component.html',
  styleUrls: ['./establecimiento-detalle.component.scss'],
})
export class EstablecimientoDetalleComponent implements OnInit {

  model:any;

  constructor(private appDataService: AppDataService,
    private translate: TranslateService,
    private establecimientoService: EstablecimientoService,
    public alertController: AlertController,
    private modalctrl: ModalController,
    public toastController: ToastController,
    private route: ActivatedRoute, private loaderService: LoaderService,
    private plt: Platform,
    private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
    this.appDataService.changePageName("Establecimiento.Detalle.title");
    this.model = this.route.snapshot.data['establecimiento'];
  }

  async verQRUbicacion(ubicacion: Ubicacion){

    const modal = await this.modalctrl.create({
      component: VerQrUbicacionModalComponent,
       componentProps: {
        ubicacion: ubicacion
      } 
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    console.log(data);

  }

  borrarUbicacion(ubicacion: Ubicacion){
    //TODO implementar borrado logico de ubicacion
  }

  doRefresh(event) {

    this.establecimientoService.obtenerEstablecimiento(+this.route.snapshot.paramMap.get('id')).subscribe(
      data => this.model = data,
      (error) => console.log(error)
    )

    event.target.complete();
  }

}
