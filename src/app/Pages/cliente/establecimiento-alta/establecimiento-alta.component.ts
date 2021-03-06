import { Component, OnInit } from "@angular/core";
import { AppDataService } from "src/app/Core/Services/Data/app-data.service";
import { TranslateService } from "@ngx-translate/core";
import {
  AlertController,
  ToastController,
  Platform,
  ActionSheetController,
  ModalController,
} from "@ionic/angular";
import { Establecimiento } from "src/app/Models/Establecimiento";
import { EstablecimientoService } from "src/app/Core/Services/Establecimiento/establecimiento.service";
import { NgForm } from "@angular/forms";
import { UbicacionAltaComponent } from "../../ubicacion/ubicacion-alta/ubicacion-alta.component";
import { ActivatedRoute, Router } from "@angular/router";
import { DireccionService } from 'src/app/Core/Services/Direccion/direccion.service';
import { LoaderService } from 'src/app/Core/Services/loader.service';
import { Geolocation} from '@capacitor/core';

@Component({
  selector: "app-establecimiento-alta",
  templateUrl: "./establecimiento-alta.component.html",
  styleUrls: ["./establecimiento-alta.component.scss"],
})
export class EstablecimientoAltaComponent implements OnInit {

  partidos: any[];
  partidoSeleccionado: any;
  provincias: any[];
  provinciaSeleccionada: any;

  model: Establecimiento = {
    id: 0,
    nombre: "",
    direccion: {
      calle: "",
      altura: null,
      partidoId: 0,
      provinciaId: 0,
      partido: {
        nombre: "",
        provinciaId: null,
        provincia: {
          nombre: ""
        }
      }
    },
    clienteId: 0,
    ubicaciones: [],
    latitud: null,
    longitud: null
  };

  constructor(
    private appDataService: AppDataService,
    private translate: TranslateService,
    private establecimientoService: EstablecimientoService,
    public alertController: AlertController,
    private modalctrl: ModalController,
    public toastController: ToastController,
    private route: ActivatedRoute, private loaderService: LoaderService,
    private plt: Platform, private direccionService: DireccionService,
    private actionSheetCtrl: ActionSheetController, private router: Router
  ) {}

  set altura(altura:string){
    this.model.direccion.altura = +altura;
  }

  get altura(){
    return (this.model.direccion.altura)? this.model.direccion.altura.toString(): '';
  }

  ngOnInit() {
    this.model.clienteId = +this.route.snapshot.paramMap.get("id");

    this.getLocation()
    this.direccionService.obtenerProvincias().subscribe(
      data => this.provincias = data,
      (error) => console.log(error)
    )
    console.log(this.model);
  }

  ionViewWillEnter() {
    this.appDataService.changePageName("Establecimiento.Alta");
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

    if(data) this.model.ubicaciones.push(data.ubicacion);

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
      header: this.translate.instant("Establecimiento.Alta"),
      message: this.translate.instant('Mensaje.Confirmacion',{accion: this.translate.instant('Accion.Crear'),
      entidad: this.translate.instant('Establecimiento.Establecimiento')}),
      buttons: [
        {
          text: this.translate.instant('Mensaje.Cancelar'),
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            console.log("Confirm Cancel: blah");
          },
        },
        {
          text: "Ok",
          handler: () => {
            
            this.establecimientoService.alta(this.model).subscribe(
              (result) => {
                this.MostrarMensajeOperacion(this.translate.instant('Mensaje.Exito'))
                this.router.navigate(['/cliente', this.model.clienteId ,'establecimientos'])
              },
              (err: any) => this.MostrarMensajeOperacion(this.translate.instant('Mensaje.Falla'))
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

  async getLocation() {
    
    const position = await Geolocation.getCurrentPosition();
    this.model.latitud = position.coords.latitude.toString();
    this.model.longitud = position.coords.longitude.toString();

  }

  async MostrarMensajeOperacion(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
    });
    toast.present();
  }



}
