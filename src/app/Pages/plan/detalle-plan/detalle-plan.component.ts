import { Component, OnInit } from '@angular/core';
import { UserLogueado } from 'src/app/Models/UserLogueado';
import { TranslateService } from '@ngx-translate/core';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { PlanService } from 'src/app/Core/Services/Plan/plan.service';
import { PlanDetalle } from 'src/app/Models/PlanDetalle';
import { AlertController, ToastController } from '@ionic/angular';
import { ControlService } from 'src/app/Core/Services/Control/control.service';
import { MedicionService } from 'src/app/Core/Services/Mediciones/medicion.service';
import { VisitaService } from 'src/app/Core/Services/Visita/visita.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-detalle-plan',
  templateUrl: './detalle-plan.component.html',
  styleUrls: ['./detalle-plan.component.scss'],
})
export class DetallePlanComponent implements OnInit {

  plan: PlanDetalle;
  currentUser: UserLogueado;
  
  textoBuscar: string = '';

  constructor(private translate: TranslateService, private route: ActivatedRoute,
    private appDataService: AppDataService, private alertController: AlertController,
    private planService: PlanService, private authService: AuthService,
    private toastController: ToastController, private visitaService: VisitaService,
    private controlService: ControlService, private medicionService: MedicionService
    ) { }

  ngOnInit() {
    this.plan = this.route.snapshot.data['plan'];
  
    console.log(this.plan)
  }

  ionViewWillEnter(){

    this.appDataService.changePageName('Plan.Plan');
    this.plan = this.route.snapshot.data['plan'];
  
    console.log(this.plan)
  }
  
  doRefresh(event) {
    console.log('Begin async operation');

    var id = +this.route.snapshot.paramMap.get('id')

    this.planService.obtenerDetallePlan(id).subscribe(
      data => {
        this.plan = data
        event.target.complete(); 
      },
      (error) => event.target.complete()
    );
  }

  onBuscarPlanChange(event){

    this.textoBuscar = event.detail.value
  }

  async completarPlanConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: this.translate.instant('Plan.Completar_Plan'),
      message: this.translate.instant('Mensaje.Confirmacion',{accion: this.translate.instant('Accion.Completar'),
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
            this.planService.completarPlan(this.plan.id).subscribe(
                result => this.MostrarMensajeOperacion(this.translate.instant('Mensaje.Exito')),
                (err: any) => this.MostrarMensajeOperacion(this.translate.instant('Mensaje.Falla'))
            );
          }     
        }
      ]
    });

    await alert.present();
  }

  async cancelarPlanConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: this.translate.instant('Plan.Cancelar_Plan'),
      message: this.translate.instant('Mensaje.Confirmacion',{accion: this.translate.instant('Accion.Cancelar'),
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
            this.planService.cancelarPlan(this.plan.id).subscribe(
                result => this.MostrarMensajeOperacion(this.translate.instant('Mensaje.Exito')),
                (err: any) => this.MostrarMensajeOperacion(this.translate.instant('Mensaje.Falla'))
            );
          }     
        }
      ]
    });

    await alert.present();
  }

  async completarPlan(){

      const response1 = await this.validarPlan();
      
      this.completarPlanConfirm();
  }

  validarPlan(): Promise<any> {

    return new Promise((resolve, reject) => {
      this.planService.estanTodasLasVisitasCerradas(this.plan.id).subscribe((data: any) => {
        console.log(data.resultado)
          if (!data.resultado) {
              throw new Error(this.translate.instant('Plan.Error.Visitas_No_Cerradas'))
          }
          resolve(data);
      }, (error: any) => {
        throw new Error(error.message);
      }, () => { });
    });    
  }

  cancelarPlan(){

    this.cancelarPlanConfirm();
  }

  async MostrarMensajeOperacion(mensaje:string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

}
