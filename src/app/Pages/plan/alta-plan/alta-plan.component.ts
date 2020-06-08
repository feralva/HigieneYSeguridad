import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { PlanService } from 'src/app/Core/Services/Plan/plan.service';
import { ModalController } from '@ionic/angular';
import { AltaVisitaModalComponent } from '../../Visita/alta-visita-modal/alta-visita-modal.component';
import { ClienteService } from 'src/app/Core/Services/Cliente/cliente.service';
import { NgForm } from '@angular/forms';

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

  visitas: any[] =[];

  constructor(private translate: TranslateService, private route: ActivatedRoute,
    private appDataService: AppDataService, private planService: PlanService,
    private authService: AuthService, private modalctrl: ModalController,
    private clienteService: ClienteService) { }

  ngOnInit() {

    this.clientes = this.route.snapshot.data['clientes'];
    this.tiposPlan = this.route.snapshot.data['tiposPlan'];

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

  onSubmit(form: NgForm) {



  }

}
