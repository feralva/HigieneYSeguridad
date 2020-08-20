import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastController, LoadingController, Platform, AlertController, ActionSheetController } from '@ionic/angular';
import { ControlService } from 'src/app/Core/Services/Control/control.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { UbicacionService } from 'src/app/Core/Services/Ubicacion/ubicacion.service';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { NgForm } from '@angular/forms';
import { IrregularidadService } from 'src/app/Core/Services/Irregularidad/irregularidad.service';
import { EstablecimientoService } from 'src/app/Core/Services/Establecimiento/establecimiento.service';
import { ClienteService } from 'src/app/Core/Services/Cliente/cliente.service';
import { BuscarUbicacionComponent } from '../../ubicacion/buscar-ubicacion/buscar-ubicacion.component';
import { UserLogueado } from 'src/app/Models/UserLogueado';
import { CameraPhoto, CameraSource } from '@capacitor/core';
import { PhotoService } from 'src/app/Core/Services/photo/photo.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-alta-irregularidad',
  templateUrl: './alta-irregularidad.component.html',
  styleUrls: ['./alta-irregularidad.component.scss'],
})
export class AltaIrregularidadComponent implements OnInit {

  ubicaciones: any[];
  clientes: any[];
  clienteSeleccionado: any;
  establecimientoSeleccionado: any;
  establecimientos: any[];
  tiposIrregularidad: any[];
  model: any = {};
  imageBase64: string;
  currentUser: UserLogueado = null;
  imagenEvidencia: CameraPhoto = null;
  
  @ViewChild(BuscarUbicacionComponent, { static: true }) buscadorUbicacionComponent: BuscarUbicacionComponent
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

  constructor(private toastCtrl: ToastController, private irregularidadService: IrregularidadService,
    private loadingCtrl: LoadingController, private establecimientoService: EstablecimientoService,
    private plt: Platform, private translate: TranslateService, private route: ActivatedRoute,
    private appDataService: AppDataService, private ubicacionService: UbicacionService, 
    private authService: AuthService, public alertController: AlertController,
    private clienteService: ClienteService, public photoService: PhotoService,
    private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {}

  ionViewWillEnter() {

    this.authService.getUserSubject().subscribe(
      (res)=>{
      this.currentUser = res;
      },
      (error) => console.log(error)
    );

    this.clientes = this.route.snapshot.data['clientes'];
    this.tiposIrregularidad = this.route.snapshot.data['tiposIrregularidades'];
    
    this.appDataService.changePageName('Irregularidad.Alta.Title');
    
    if(+this.route.snapshot.paramMap.get("idEstablecimiento")){

      var establecimiento;
      
      this.establecimientoService.obtenerEstablecimiento(+this.route.snapshot.paramMap.get("idEstablecimiento")).subscribe(
        data => {
          establecimiento = data

          this.clienteSeleccionado = this.clientes.find(cli => cli.id == establecimiento.clienteId)

          this.clienteService.obtenerEstablecimientosActivosCliente(this.clienteSeleccionado.id).subscribe(
            data => {
              this.establecimientos = data
              this.establecimientoSeleccionado = this.establecimientos.find(establecimiento => establecimiento.id == establecimiento.id);

              this.ubicacionService.obtenerUbicacionesEstablecimiento(this.establecimientoSeleccionado.id).subscribe(
                data => this.ubicaciones = data,
                (error) => console.log(error)
              )},
            (error) => console.log(error)
          ) 
        },
        (error) => console.log(error)
      )
    }
  }

  async AltaIrregularidadConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alta Irregularidad',
      message: '¿Esta seguro que desea registrar Irregularidad?',
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

            this.guardarImagenEvidencia().then(result => { 
                
              var rutaImagen = result.ref.getDownloadURL().then(
                result =>{
                  this.model.url = result
                  this.irregularidadService.alta(this.model).subscribe(
                    result => this.MostrarMensajeOperacion('Alta Exitosa'),
                    (err: any) => this.MostrarMensajeOperacion('Falla')
                  );
                }
              );
            })
          }
        }
      ]
    });

    await alert.present();
  }

  async MostrarMensajeOperacion(mensaje:string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  onSubmit(form: NgForm) {

    this.validarModelo();
    this.model.estadoId = 1
    this.model.UbicacionId = this.buscadorUbicacionComponent.ubicacionSeleccionada.id
    this.model.empleadoId = this.currentUser.empleadoId
    this.model.clienteId = this.clienteSeleccionado.id
    this.model.empresaId = this.currentUser.empresaId

    this.AltaIrregularidadConfirm()
  }

  private validarModelo() {
    if(!this.imageBase64)
      throw new Error("Debe ingresar evidencia Fotografica de Irregularidad");
  }

  onClienteSeleccionado(){

    if(this.clienteSeleccionado){
      this.establecimientoSeleccionado = null
      //this.seleccionUbicacionComponent.ubicacionSeleccionada = null

      this.clienteService.obtenerEstablecimientosActivosCliente(this.clienteSeleccionado.id).subscribe(
        data => this.establecimientos = data,
        (error) => console.log(error)
      )
    }
  }
  onEstablecimientoSeleccionado(){

    if(this.establecimientoSeleccionado){

      this.ubicacionService.obtenerUbicacionesEstablecimiento(this.establecimientoSeleccionado.id).subscribe(
        data => this.ubicaciones = data,
        (error) => console.log(error)
      )
    }
  }

  async selectImageSource() {
    const buttons = [
      {
        text: 'Take Photo',
        icon: 'camera',
        handler: () => {
          this.addImage(CameraSource.Camera);
        }
      },
      {
        text: 'Choose From Photos Photo',
        icon: 'image',
        handler: () => {
          this.addImage(CameraSource.Photos);
        }
      }
    ];
 
    // Only allow file selection inside a browser
    if (!this.plt.is('hybrid')) {
      buttons.push({
        text: 'Choose a File',
        icon: 'attach',
        handler: () => {
          this.fileInput.nativeElement.click();
        }
      });
    }
 
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Image Source',
      buttons
    });
    await actionSheet.present();
  }

  async addImage(source: CameraSource) {

    this.photoService.takePicture(source).then(result => {
      this.imagenEvidencia = result
      this.imageBase64 = result.dataUrl
    })
  }

  guardarImagenEvidencia(){

    let ruta:string = environment.rutaFotosEmpresaBase + 
      `/${this.currentUser.empresaId.toString()}/Clientes/${this.clienteSeleccionado.id.toString()}/EvidenciaIrregularidades/Establecimientos/`+
      `${this.establecimientoSeleccionado.id.toString()}/Ubicaciones/${this.buscadorUbicacionComponent.ubicacionSeleccionada.id.toString()+Date.now().toString()}.jpg`

    return this.photoService.uploadImage(this.imageBase64, ruta);
  }
  // Used for browser direct file upload
  uploadFile(event: EventTarget) {
    const eventObj: MSInputMethodContext = event as MSInputMethodContext;
    const target: HTMLInputElement = eventObj.target as HTMLInputElement;
    const file: File = target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
       this.imageBase64 = reader.result.toString();
    };

  }

}
