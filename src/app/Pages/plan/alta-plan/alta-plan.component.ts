import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { PlanService } from 'src/app/Core/Services/Plan/plan.service';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { AltaVisitaModalComponent } from '../../Visita/alta-visita-modal/alta-visita-modal.component';
import { ClienteService } from 'src/app/Core/Services/Cliente/cliente.service';
import { NgForm } from '@angular/forms';
import { UserLogueado } from 'src/app/Models/UserLogueado';

@Component({
  selector: 'app-alta-plan',
  templateUrl: './alta-plan.component.html',
  styleUrls: ['./alta-plan.component.scss'],
})
export class AltaPlanComponent implements OnInit {

  public nombrePagina: string;

  clientes: any[];
  tiposPlan: any[];
  clienteSeleccionado: any;
  tipoPlanSeleccionado: any;

  visitas: any[] =[];

  currentUser: UserLogueado = null;
  
  constructor(private translate: TranslateService, private route: ActivatedRoute,
    private appDataService: AppDataService, private planService: PlanService,
    private authService: AuthService, private modalctrl: ModalController,
    private clienteService: ClienteService,public alertController: AlertController,
    public toastController: ToastController) { }

  ngOnInit() {

    this.clientes = this.route.snapshot.data['clientes'];
    this.tiposPlan = this.route.snapshot.data['tiposPlan'];

    this.authService.getUserSubject().subscribe(
      data => this.currentUser = data,
      error => console.log(error)
  );
  }

  ionViewWillEnter(){
    this.nombrePagina = 'Plan.Alta.title';
    this.appDataService.changePageName(this.nombrePagina)
  }

  async abrirModalVisita(){

    const modal = await this.modalctrl.create({
      component: AltaVisitaModalComponent,
      componentProps: {
        idCliente: this.clienteSeleccionado
      }
    })

    await modal.present();

    const { data } = await modal.onDidDismiss();
    console.log(data)

    this.visitas.push(data); 
  }

  public borrarVisitaLista(index:number){

    this.visitas.splice(index,1)
  }

  async AltaPlanConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alta Plan',
      message: 'Message ¿Esta seguro que desea crear Plan?',
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
            
                this.planService.alta(this.generarPlan()).subscribe(
                  result => this.MostrarMensajeOperacion('Alta Exitosa'),
                  (err: any) => this.MostrarMensajeOperacion('Falla')
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
      ClienteId: this.clienteSeleccionado,
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
