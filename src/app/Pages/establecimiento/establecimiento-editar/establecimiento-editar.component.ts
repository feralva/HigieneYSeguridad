import { Component, OnInit } from '@angular/core';
import { UbicacionAltaComponent } from '../../ubicacion/ubicacion-alta/ubicacion-alta.component';
import { Establecimiento } from 'src/app/Models/Establecimiento';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { TranslateService } from '@ngx-translate/core';
import { EstablecimientoService } from 'src/app/Core/Services/Establecimiento/establecimiento.service';
import { AlertController, ModalController, ToastController, Platform, ActionSheetController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/Core/Services/loader.service';
import { DireccionService } from 'src/app/Core/Services/Direccion/direccion.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-establecimiento-editar',
  templateUrl: './establecimiento-editar.component.html',
  styleUrls: ['./establecimiento-editar.component.scss'],
})
export class EstablecimientoEditarComponent implements OnInit {

  partidos: any[];
  partidoSeleccionado: any;
  provincias: any[];
  provinciaSeleccionada: any;

  model: any = null;

  constructor(
    private appDataService: AppDataService,
    private translate: TranslateService,
    private establecimientoService: EstablecimientoService,
    public alertController: AlertController,
    private modalctrl: ModalController,
    public toastController: ToastController,
    private route: ActivatedRoute, private loaderService: LoaderService,
    private plt: Platform, private direccionService: DireccionService,
    private actionSheetCtrl: ActionSheetController
  ) {}

  ngOnInit() {
    this.model = this.route.snapshot.data['establecimiento'];
    this.direccionService.obtenerProvincias().subscribe(
      data => {
        this.provincias = data

        this.provinciaSeleccionada = this.provincias.find(p => p.id == this.model.direccion.provinciaId);
      },
      (error) => console.log(error)
    )

    this.ObtenerPartidos(this.model.direccion.provinciaId).subscribe(
      data => {
        this.partidos = data,
        this.partidoSeleccionado = this.partidos.find(element => element.id == this.model.direccion.partidoId);
        console.log(this.partidoSeleccionado)
      },
      (error) => console.log(error)
    )

    
    this.partidoSeleccionado = this.model.direccion.partidoId;
    console.log(this.model);
  }

  ionViewWillEnter() {
/*     this.appDataService.changePageName("Establecimiento.Alta.title");
    this.model = this.route.snapshot.data['establecimiento'];
    this.direccionService.obtenerProvincias().subscribe(
      data => this.provincias = data,
      (error) => console.log(error)
    )

    this.provinciaSeleccionada = this.model.direccion.provinciaId;

    this.ObtenerPartidos(this.model.direccion.provinciaId).subscribe(
      data => {
        console.log(data)
        this.partidos = data,
        this.partidoSeleccionado = this.partidos.find(element => element.id == this.model.direccion.partidoId);
        console.log(this.partidoSeleccionado)
      },
      (error) => console.log(error)
    )

    
    this.partidoSeleccionado = this.model.direccion.partidoId;
    console.log(this.model); */
  }

  actualizarPartidos(event){
    console.log('Actualizo Partidos')
    this.partidos = [];
    this.partidoSeleccionado = null;
    this.loaderService.present(); 
    console.log(event)
    this.direccionService.obtenerPartidosProvincia(event.id).subscribe(
      data => {
        this.partidos = data;
        this.loaderService.dismiss();
      },
      (error) => console.log(error)
    )
  }

  ObtenerPartidos(idProvincia){
    console.log('Actualizo Partidos')
    this.partidos = [];
    return this.direccionService.obtenerPartidosProvincia(idProvincia)
  }

  async abrirModalUbicacion() {
    const modal = await this.modalctrl.create({
      component: UbicacionAltaComponent /*,
       componentProps: {
        idCliente: this.clienteSeleccionado
      } */,
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    console.log(data);

    this.model.ubicaciones.push(data.ubicacion);

    console.log(this.model.ubicaciones);
  }

  onSubmit(form: NgForm) {
    console.log(this.model);
    this.model.direccion.partidoId = this.partidoSeleccionado.id
    this.AltaEstablecimientoConfirm();
  }

  async AltaEstablecimientoConfirm() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Actualizar Establecimiento",
      message: "¿Esta seguro que desea actualizar Establecimiento?",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            console.log("Confirm Cancel: blah");
          },
        },
        {
          text: "Ok",
          handler: () => {
            this.establecimientoService.ActualizarEstablecimiento(this.model).subscribe(
              (result) => this.MostrarMensajeOperacion("Modificación Exitosa"),
              (err: any) => this.MostrarMensajeOperacion("Falla")
            );
          },
        },
      ],
    });

    await alert.present();
  }

  public borrarUbicacionLista(index: number) {
    this.model.ubicaciones.splice(index, 1);
  }

  async MostrarMensajeOperacion(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
    });
    toast.present();
  }
}
