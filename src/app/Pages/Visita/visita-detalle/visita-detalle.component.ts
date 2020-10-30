import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import { UserLogueado } from 'src/app/Models/UserLogueado';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { NavController, ModalController, AlertController, ToastController, LoadingController } from '@ionic/angular';
import { ControlService } from 'src/app/Core/Services/Control/control.service';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { VisitaService } from 'src/app/Core/Services/Visita/visita.service';
import { UbicacionService } from 'src/app/Core/Services/Ubicacion/ubicacion.service';
import { CambiarAuditorModalComponent } from '../cambiar-auditor-modal/cambiar-auditor-modal.component';
import { CambiarFechaModalComponent } from '../cambiar-fecha-modal/cambiar-fecha-modal.component';

import { FileOpener } from '@ionic-native/file-opener/ngx';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { MedicionService } from 'src/app/Core/Services/Mediciones/medicion.service';
import { ReportingService } from 'src/app/Core/Services/reporting-service.service';
import { EstablecimientoService } from 'src/app/Core/Services/Establecimiento/establecimiento.service';
import { forkJoin } from 'rxjs';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { Plugins } from '@capacitor/core';
import { first } from 'rxjs/operators';
const { Geolocation } = Plugins;

declare var google;

@Component({
  selector: 'app-visita-detalle',
  templateUrl: './visita-detalle.component.html',
  styleUrls: ['./visita-detalle.component.scss'],
})
export class VisitaDetalleComponent implements OnInit, OnDestroy {

  controles: any[] = [];
  currentUser: UserLogueado;
  idVisita: number;
  visita: any;
  vista: any = 'visitaDetalle';
  userYEmpleadoAsignadoSonIguales: boolean = false;

  tramos: any[] = []

  //Maps
  @ViewChild('map', {static: false}) mapElement: ElementRef;
  map: any;
  markers = [];
  currentPosition: any

  // Misc
  isTracking = false;
  watch: string;
  user = null;
 

  constructor(private translate: TranslateService, private route: ActivatedRoute,
    private appDataService: AppDataService,private router: Router, public navCtrl: NavController,
    private controlService: ControlService, private authService: AuthService,
    private visitaService: VisitaService, private ubicacionService: UbicacionService,
    private modalController: ModalController, public alertController: AlertController,
    public toastController: ToastController, private medicionService: MedicionService,
    private reportingService: ReportingService, private establecimientoService: EstablecimientoService,
    private loadingController: LoadingController) { }
  
  
    ngOnDestroy(): void {
      this.stopTracking();
    }

    ionViewWillEnter(){
      this.appDataService.changePageName('Visita.Detalle');

      this.controles = this.route.snapshot.data['controles'];
      this.visita = this.route.snapshot.data['visita'];
  
      this.idVisita = +this.route.snapshot.paramMap.get('id');
  
      this.authService.getUserSubject().pipe(first()).subscribe(
        data => {
          this.currentUser = data
          this.userYEmpleadoAsignadoSonIguales = (this.visita.empleado != null && data.id == this.visita.empleado.usuarioId)
        },
        error => console.log(error)
      );
   
      console.log(this.controles)
      for(let control of this.controles){
  
        //Convierto tipo de datos firestore en date
        if(control.fecha.seconds) control.fecha = new Date(control.fecha.seconds * 1000)
  
        this.ubicacionService.obtenerUbicacion(control.ubicacionId).subscribe(
          data => {
            control.ubicacion = data.nombre
            console.log(control)
          },
          (error) => console.log(error)
        )
      }
      
      this.ubicacionService.obtenerUbicacionesEstablecimiento(this.visita.establecimientoId).subscribe(
        data => console.log(data)
      );

      //this.loadMap();
      this.startTracking();
      console.log(this.controles)
      console.log(this.visita) 

    }

  ngOnInit() {

    this.getCurrentPosition();
    /* this.appDataService.changePageName('Visita.Detalle.title');

      this.controles = this.route.snapshot.data['controles'];
      this.visita = this.route.snapshot.data['visita'];
  
      this.idVisita = +this.route.snapshot.paramMap.get('id');
  
      this.authService.getUserSubject().subscribe(
        data => this.currentUser = data,
        error => console.log(error)
      );
   
      console.log(this.controles)
      for(let control of this.controles){
  
        //Convierto tipo de datos firestore en date
        if(control.fecha.seconds) control.fecha = new Date(control.fecha.seconds * 1000)
  
        this.ubicacionService.obtenerUbicacion(control.ubicacionId).subscribe(
          data => {
            control.ubicacion = data.nombre
            console.log(control)
          },
          (error) => console.log(error)
        )
      }  
  
      console.log(this.controles)
      console.log(this.visita) */
  }

  doRefresh(event) {

    this.visitaService.obtenerVisitaDetalle(+this.route.snapshot.paramMap.get('id')).subscribe(
      data => {
        this.visita = data
        this.controlService.obtenerControlesVisita(this.idVisita).subscribe(
          dataControles => {
            this.controles = dataControles
            for(let control of this.controles){

              //Convierto tipo de datos firestore en date
              if(control.fecha.seconds) control.fecha = new Date(control.fecha.seconds * 1000)

              this.ubicacionService.obtenerUbicacion(control.ubicacionId).subscribe(
                dataUbicaciones => {
                  control.ubicacion = dataUbicaciones.nombre
                  console.log(control)                 
                },
                (error) => console.log(error)
              )
            }
          },
          (error) => console.log(error)
        );
        if(event != null ) event.target.complete(); 
      },
      (error) => console.log(error)
    )
  }

  async onEditarFechaClick(){
    const modal = await this.modalController.create({
      component: CambiarFechaModalComponent,
      componentProps: {
        idEmpleado: this.currentUser.empleadoId,
        idVisita: this.idVisita
      }
    });

    modal.onWillDismiss().then(dataReturned => {
      // trigger when about to close the modal
      //ver el param que paso
      this.doRefresh(null);
    });  
    
    return await modal.present().then(_ => {
      console.log('Sending: ',  this.currentUser.empleadoId);
    });
  }

  onAgregarControl(){

    switch (this.visita.tipoVisita.descripcion) {
      case 'Sonido':
          this.router.navigate(['/visita',this.idVisita, 'controles', this.visita.establecimiento.id, 'medicionSonora', 'alta'])
          break;
      case 'Luz':
          this.router.navigate(['/visita',this.idVisita, 'controles', this.visita.establecimiento.id, 'medicionLuz', 'alta'])
          break;
      case 'Incendio':
          this.router.navigate(['/visita',this.idVisita, 'controles', this.visita.establecimiento.id, 'medicionIncendio', 'alta'])
          break;
      case 'Emision Gases':
          this.router.navigate(['/visita',this.idVisita, 'controles', this.visita.establecimiento.id, 'medicionEmisionGases', 'alta'])
          break;
      case 'Electrica':
          this.router.navigate(['/visita',this.idVisita, 'controles', this.visita.establecimiento.id, 'medicionElectrica', 'alta'])
          break;
    }
  }

  completarVisita(){

    if(this.visita.empleado == null || this.visita.fecha == null ){

      this.alertaFaltaInformacion();

    }else{
      
      if(this.controles.length == 0) throw Error('Visita.DebecargarControlesantesdecompletarVisita')

      this.completarVisitaConfirm();

    }
  }

  async onEditarAuditorClick(){

      const modal = await this.modalController.create({
        component: CambiarAuditorModalComponent,
        componentProps: {
          auditorActual: this.visita.empleado,
          idVisita: this.visita.id
        }
      });

      modal.onWillDismiss().then(dataReturned => {
        // trigger when about to close the modal
        //ver el param que paso
        if (dataReturned['data']) this.userYEmpleadoAsignadoSonIguales = this.currentUser.id == dataReturned['data'].usuarioId
        console.log(dataReturned)
        this.doRefresh(null);
      });  
      
      return await modal.present().then(_ => {
        // triggered when opening the modal
        console.log(this.visita)

        console.log('Sending: ',  this.visita.empleado);
      });
  }

  async completarVisitaConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: this.translate.instant('Visita.CompletarVisita'),
      message: this.translate.instant('Mensaje.Confirmacion',{accion: this.translate.instant('Accion.Completar'),
                                                              entidad: this.translate.instant('Visita.Visita')}),
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
            this.visitaService.completarVisita(this.idVisita).subscribe(
                result => {
                  this.MostrarMensajeOperacion(this.translate.instant('Mensaje.Exito'))
                  this.router.navigate(['/visita','Pendientes'])
                },
                (err: any) => this.MostrarMensajeOperacion(this.translate.instant('Mensaje.Falla'))
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

  async alertaFaltaInformacion() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: this.translate.instant('General.Error.DatosFaltantes'),
      message: this.translate.instant('General.Error.DatosSinAsignar'),
      buttons: [
        {
          text: 'Ok',
          role: 'OK',
          cssClass: 'primary',
          handler: () => {
          }
        }
      ]
    });

    await alert.present();
  }

  cancelarVisita(){

    if(this.visita.estado.descripcion === 'Completa') throw Error('Visita.VisitaCompletaError')
    this.cancelarVisitaConfirm();
  }

  async cancelarVisitaConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: this.translate.instant('Visita.CancelarVisita'),
      message: this.translate.instant('Mensaje.Confirmacion',{accion: this.translate.instant('Accion.Cancelar'),
      entidad: this.translate.instant('Visita.Visita')}),
      buttons: [
        {
          text: this.translate.instant('Mensaje.Cancelar'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          handler: () => {
            this.visitaService.cancelarVisita(this.visita.id).subscribe(
                result => this.MostrarMensajeOperacion(this.translate.instant('Mensaje.Exito')),
                (err: any) => this.MostrarMensajeOperacion(this.translate.instant('Mensaje.Falla'))
            );
          }     
        }
      ]
    });

    await alert.present();
  }

  onAnularControl(idcontrol: string){
    console.log(idcontrol)

    this.controlService.bajaControl(idcontrol).then(
      res => {
        this.controles.splice(this.controles.find(control => control.id === idcontrol), 1 )
        this.MostrarMensajeOperacion(this.translate.instant('Mensaje.Exito'))
      }
    )
  }

  generarPDF(){

    var tasks$ = [];

    this.controles.forEach(control => {
      
      tasks$.push(this.medicionService.obtenerMedicionesControl(control.id))
    });

    forkJoin(...tasks$).subscribe(
      results => { 
        console.log(results)
        
        var index = 0;
        results.forEach(mediciones => {
          this.controles[index].mediciones = mediciones
          index++         
        });
        this.visita.controles = this.controles;
        console.log(this.visita)
        this.establecimientoService.obtenerClienteDeEstablecimiento(this.visita.establecimiento.id).subscribe(
          data => {
            this.visita.cliente = data 
            this.reportingService.generarReporteVisita(this.visita)
          }
        )
      }
    );
  }

  async loadMap() {

    const loading = await this.loadingController.create({
      spinner: 'circular',
      translucent: true,
      
    });
    await loading.present();

    //let latLng = new google.maps.LatLng(51.9036442, 7.6673267);
    var latLng;
    try{
      if(this.currentPosition && this.currentPosition.coords) {
        latLng = new google.maps.LatLng(this.currentPosition.coords.latitude, this.currentPosition.coords.longitude);
      }else {
        latLng = new google.maps.LatLng(-34.54847,-58.5357467);
      }
    }catch(error){
      console.log(error)
    }
 
    let mapOptions = {
      center: latLng,
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      zoomControl:true
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.marcarPosicionActual(latLng)

    this.establecimientoService.obtenerTramosRecorrido(this.visita.establecimientoId).subscribe(
      data =>{ 
        this.tramos = data
        console.log(data)

        this.dibujarRecorrido()
        loading.dismiss();
      },
      (error) => {
        loading.dismiss();
      }
    )
  }
  dibujarRecorrido() {

    var coordinates: any[] = []
    //agrego el origen
    coordinates.push({lat: this.tramos[0].ubicacionOrigen.latitud, lng: this.tramos[0].ubicacionOrigen.longitud})

/*     const contentString = this.tramos[0].ubicacionOrigen.nombre;
        const infowindow = new google.maps.InfoWindow({
          content: contentString,
        });
      
        const marker = new google.maps.Marker({
          position: {lat: this.tramos[0].ubicacionOrigen.latitud, lng: this.tramos[0].ubicacionOrigen.longitud},
          map: this.map,
          title: this.tramos[0].ubicacionOrigen.nombre,
        });
        marker.addListener("click", () => {
          infowindow.open(this.map, marker);
        }); */

    this.tramos.forEach( 
      tramo =>{

        coordinates.push({lat: tramo.ubicacionDestino.latitud, lng: tramo.ubicacionDestino.longitud})

        const contentString = tramo.ubicacionDestino.nombre;
        const infowindow = new google.maps.InfoWindow({
          content: contentString,
        });
      
            var icon = {
                        url: '../../../../assets/icons/location.png', // url
                        scaledSize: new google.maps.Size(35, 35), // scaled size
                        origin: new google.maps.Point(0,0), // origin
                        anchor: new google.maps.Point(0, 0) // anchor
                      };
        const marker = new google.maps.Marker({
          position: {lat: tramo.ubicacionDestino.latitud, lng: tramo.ubicacionDestino.longitud},
          map: this.map,
          //icon: icon,
          title: tramo.ubicacionDestino.nombre,
        });
        marker.addListener("click", () => {
          infowindow.open(this.map, marker);
        });
        
    })

    const Path = new google.maps.Polyline({
      path: coordinates,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });
  
    Path.setMap(this.map);
  }

  async getCurrentPosition() {
    return await Geolocation.getCurrentPosition();
  }

  startTracking() {
    try{

      this.isTracking = true;
      this.watch = Geolocation.watchPosition({enableHighAccuracy: true}, (position, err) => {
        if (position) {
          this.currentPosition = position
          if(this.map){
            this.actualizarLocation(
              position.coords.latitude,
              position.coords.longitude,
              position.timestamp
            );
          }
        }else{
          this.currentPosition = this.getCurrentPosition();
        }
      });
    }catch(error){
      console.log(error)
    }
  }

  actualizarLocation(lat, lng, timestamp) {
    let position = new google.maps.LatLng(lat, lng);
    if(this.map){
      this.map.setCenter(position);
      this.map.setZoom(18);

      // Remove all current marker
      this.marcarPosicionActual(position);

    }
  }

  private marcarPosicionActual(position: any) {
    this.markers.map(marker => marker.setMap(null));
    this.markers = [];

    var icon = {
      url: '../../../../assets/icons/person.png', // url
      scaledSize: new google.maps.Size(35, 35), // scaled size
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
    };

    let marker = new google.maps.Marker({
      map: this.map,
      //animation: google.maps.Animation.DROP,
      
      icon: icon,
      position: position
    });
    this.markers.push(marker);
  }

  stopTracking() {
    Geolocation.clearWatch({ id: this.watch }).then(() => {
      this.isTracking = false;
    });
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    if(ev.detail.value == 'mapa'){
      setTimeout(() => {
        //this.startTracking();
        this.loadMap()      
        console.log(this.currentPosition)
      }, 100);
    } 
  }

  updateMap(locations) {
    // Remove all current marker
    this.markers.map(marker => marker.setMap(null));
    this.markers = [];
   
    for (let loc of locations) {
      let latLng = new google.maps.LatLng(loc.lat, loc.lng);
   
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: latLng
      });
      this.markers.push(marker);
    }
  }

}
