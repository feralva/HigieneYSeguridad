import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanService } from 'src/app/Core/Services/Plan/plan.service';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { ClienteService } from 'src/app/Core/Services/Cliente/cliente.service';
import { NgForm } from '@angular/forms';
import { UserLogueado } from 'src/app/Models/UserLogueado';
import { AltaVisitaPlanModalComponent } from '../alta-visita-plan-modal/alta-visita-plan-modal.component';

@Component({
  selector: 'app-alta-plan',
  templateUrl: './alta-plan.component.html',
  styleUrls: ['./alta-plan.component.scss'],
})
export class AltaPlanComponent implements OnInit {

  clientes: any[];
  tiposPlan: any[];
  clienteSeleccionado: any;
  tipoPlanSeleccionado: any;
  cliente: any;

  visitas: any[] =[];

  currentUser: UserLogueado = null;
  
  constructor(private translate: TranslateService, private route: ActivatedRoute,
    private appDataService: AppDataService, private planService: PlanService,
    private authService: AuthService, private modalctrl: ModalController,
    private clienteService: ClienteService,public alertController: AlertController,
    public toastController: ToastController, private router: Router) { }

  ngOnInit() {}

  ionViewWillEnter(){
    //clientes cuando se accede a alta planes directamente
    this.clientes = this.route.snapshot.data['clientes'];
    this.tiposPlan = this.route.snapshot.data['tiposPlan'];

    //Cuando se accede alta plan desde cliente
    this.cliente = this.route.snapshot.data['cliente'];
    this.clienteSeleccionado = this.route.snapshot.data['cliente'];

    this.appDataService.changePageName('Plan.Alta.title')

    console.log(this.cliente)
    this.authService.getUserSubject().subscribe(
      data => this.currentUser = data,
      error => console.log(error)
    );
  }

  async abrirModalVisita(){

    const modal = await this.modalctrl.create({
      component: AltaVisitaPlanModalComponent,
      componentProps: {
        idCliente: this.clienteSeleccionado? this.clienteSeleccionado : this.cliente.id
      }
    })

    await modal.present();

    const { data } = await modal.onDidDismiss();
    console.log(data)

    if(data) this.visitas.push(data); 
  }

  public borrarVisitaLista(index:number){

    this.visitas.splice(index,1)
  }

  async AltaPlanConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: this.translate.instant('Plan.Alta.title'),
      message: this.translate.instant('Mensaje.Confirmacion',{accion: this.translate.instant('Accion.Crear'),
                                              entidad: this.translate.instant('Plan.Plan')}),
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
            
                this.planService.alta(this.generarPlan()).subscribe(
                  result => {
                    this.MostrarMensajeOperacion(this.translate.instant('Mensaje.Exito'))
                    this.router.navigate(['/plan'])
                  },
                  (err: any) => this.MostrarMensajeOperacion(this.translate.instant('Mensaje.Falla'))
                );              
          }
        }
      ]
    });

    await alert.present();
  }

  generarPlan(){

    var plan = {
      TipoPlanId: this.tipoPlanSeleccionado,
      PlanesEstablecimientos:[],
      ClienteId: this.clienteSeleccionado? this.clienteSeleccionado: this.cliente.id,
      Visitas:[],
      FechaCreacion: new Date(),
      EmpleadoId: this.currentUser.empleadoId,
      EstadoId: 1,
      EmpresaId: this.currentUser.empresaId,
      Activo:true
    }

    this.visitas.forEach(visita => {

      plan.PlanesEstablecimientos.push({EstablecimientoId: visita.establecimiento.id, PlanId: 0});

      plan.Visitas.push({
        EstablecimientoId: visita.establecimiento.id,
        TipoVisitaId: visita.tipoVisita.id,
        MesPactado: visita.mesPactado,
        AnioPactado: visita.anioPactado,
        EstadoId: 1,
        Activo: true,
        EmpleadoId: null
      });
    });

    console.log(plan);
    return plan;

  }

  onClienteSelected($event){
    console.log('Cliente Seleccionado')
    this.visitas = []
  }

  async MostrarMensajeOperacion(mensaje:string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }
  onSubmit(form: NgForm) {

    this.AltaPlanConfirm()

  }

}
