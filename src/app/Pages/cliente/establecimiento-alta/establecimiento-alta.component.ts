import { Component, OnInit } from '@angular/core';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, ToastController, Platform, ActionSheetController, ModalController } from '@ionic/angular';
import { Establecimiento } from 'src/app/Models/Establecimiento';
import { EstablecimientoService } from 'src/app/Core/Services/Establecimiento/establecimiento.service';
import { NgForm } from '@angular/forms';
import { UbicacionAltaComponent } from '../../ubicacion/ubicacion-alta/ubicacion-alta.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-establecimiento-alta',
  templateUrl: './establecimiento-alta.component.html',
  styleUrls: ['./establecimiento-alta.component.scss'],
})
export class EstablecimientoAltaComponent implements OnInit {

  model: Establecimiento= {
    id: 0,
    nombre: '',
    direccion: {
      calle: '',
      altura: null,
      partido: '',
      provincia: ''
    },
    clienteId: 0,
    ubicaciones: []
  };
  
  constructor(private appDataService: AppDataService, private translate: TranslateService, 
    private establecimientoService: EstablecimientoService,
    public alertController: AlertController,private modalctrl: ModalController,
    public toastController: ToastController,private route: ActivatedRoute,
    private plt: Platform, private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {

    this.model.clienteId = +this.route.snapshot.paramMap.get('id');
    console.log(this.model)

  }

  ionViewWillEnter(){
    
    this.appDataService.changePageName('Establecimiento.Alta.title');
  }

  async abrirModalUbicacion(){

    const modal = await this.modalctrl.create({
      component: UbicacionAltaComponent/*,
       componentProps: {
        idCliente: this.clienteSeleccionado
      } */
    })

    await modal.present();

    const { data } = await modal.onDidDismiss();
    console.log(data)

    this.model.ubicaciones.push(data.ubicacion); 

    console.log(this.model.ubicaciones)
  }

  onSubmit(form: NgForm) {
    console.log(this.model)
    this.AltaEstablecimientoConfirm();
  }

  async AltaEstablecimientoConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alta Establecimiento',
      message: '¿Esta seguro que desea crear Establecimiento?',
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
            
                this.establecimientoService.alta(this.model).subscribe(
                  result => this.MostrarMensajeOperacion('Alta Exitosa'),
                  (err: any) => this.MostrarMensajeOperacion('Falla')
                );              
          }
        }
      ]
    });

    await alert.present();
  }

  public borrarUbicacionLista(index:number){

    this.model.ubicaciones.splice(index,1)
  }

  async MostrarMensajeOperacion(mensaje:string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }
}
