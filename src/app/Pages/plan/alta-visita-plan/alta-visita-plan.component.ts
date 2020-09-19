import { Component, OnInit } from '@angular/core';
import { PlanService } from 'src/app/Core/Services/Plan/plan.service';
import { ClienteService } from 'src/app/Core/Services/Cliente/cliente.service';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { VisitaService } from 'src/app/Core/Services/Visita/visita.service';
import { TranslateService } from '@ngx-translate/core';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-alta-visita-plan',
  templateUrl: './alta-visita-plan.component.html',
  styleUrls: ['./alta-visita-plan.component.scss'],
})
export class AltaVisitaPlanComponent implements OnInit {

  tiposVisitas: any[];
  establecimientos: any[];
  tipoVisitaSeleccionada: number;
  establecimientoSeleccionado: number;
  anioPactado;
  mesPactado;
  anioInicial = (new Date()).getFullYear();
  idCliente: number;
  currentUser: any;
  model: any;
  idPlan: number;

  constructor(private visitaService: VisitaService,
    private translate: TranslateService, private route: ActivatedRoute,
    private appDataService: AppDataService, private clienteService: ClienteService,
    private authService: AuthService, private planService: PlanService,
    public alertController: AlertController, public toastController: ToastController,
    private router: Router) { }

  ngOnInit() {}

  ionViewWillEnter(){
    //clientes cuando se accede a alta planes directamente
    this.tiposVisitas = this.route.snapshot.data['tiposVisita'];
    this.establecimientos = this.route.snapshot.data['establecimientos'];

    this.idPlan = +this.route.snapshot.paramMap.get('id');
    
    this.planService.obtenerDetallePlan(this.idPlan).subscribe(
      data => {
        this.idCliente = data.idCliente
        
        this.clienteService.obtenerEstablecimientosActivosCliente(data.idCliente).subscribe(
          data => this.establecimientos = data,
          (error) => console.log(error)
        )
      },
      (error) => console.log(error)
    )

    this.appDataService.changePageName('Visita.Alta')

    this.authService.getUserSubject().subscribe(
      data => this.currentUser = data,
      error => console.log(error)
    );
  }

  async AltaVisitaConfirm(visita: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: this.translate.instant('Visita.Alta'),
      message: this.translate.instant('Mensaje.Confirmacion',{accion: this.translate.instant('Accion.Crear'),
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
            
                this.visitaService.alta(visita).subscribe(
                  result => {
                    this.MostrarMensajeOperacion(this.translate.instant('Mensaje.Exito'))
                    this.router.navigate(['/plan', this.idPlan,'detalle'])
                  },
                  (error) => this.MostrarMensajeOperacion(this.translate.instant('Mensaje.Falla'))
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

  altaVisita(form: NgForm){

    const visitaModel = {

      EstablecimientoId: this.establecimientoSeleccionado,
      TipoVisitaId: this.tipoVisitaSeleccionada,
      EstadoId: 1,
      PlanId: this.idPlan,
      mesPactado: new Date(this.mesPactado).getMonth(),
      anioPactado: new Date(this.anioPactado).getFullYear(),
      activo: true
    }

    console.log(visitaModel)

    this.AltaVisitaConfirm(visitaModel)
    //this.visitaService.altaVisita();

  }

}
