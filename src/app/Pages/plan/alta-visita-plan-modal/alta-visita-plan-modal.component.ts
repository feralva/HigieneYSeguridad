import { Component, OnInit, Input } from '@angular/core';
import { PlanService } from 'src/app/Core/Services/Plan/plan.service';
import { ModalController } from '@ionic/angular';
import { ClienteService } from 'src/app/Core/Services/Cliente/cliente.service';
import { VisitaService } from 'src/app/Core/Services/Visita/visita.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-alta-visita-plan-modal',
  templateUrl: './alta-visita-plan-modal.component.html',
  styleUrls: ['./alta-visita-plan-modal.component.scss'],
})
export class AltaVisitaPlanModalComponent implements OnInit {
  tiposVisitas: any[];
  establecimientos: any[];
  tipoVisitaSeleccionada: number;
  establecimientoSeleccionado: number;
  anioPactado;
  mesPactado;
  anioInicial = (new Date()).getFullYear();
  @Input() idCliente: number;

  model: any;
  
  constructor(private planService: PlanService, private modalctrl: ModalController,
              private clienteService: ClienteService, private visitaService: VisitaService) { }

  ngOnInit() {
  
    this.visitaService.obtenerTiposVisita().subscribe(
      data => {
        this.tiposVisitas = data
        console.log(data)
      },
      (error) => console.log(error)
    );

    this.clienteService.obtenerEstablecimientosCliente(this.idCliente).subscribe(
      data => {
        this.establecimientos = data
        console.log(data)
      },
      (error) => console.log(error)
    )

  }
  onAgregarVisita(form: NgForm){

    this.modalctrl.dismiss(
      {
        establecimiento: this.establecimientoSeleccionado,
        tipoVisita: this.tipoVisitaSeleccionada,
        mesPactado: new Date(this.mesPactado).getMonth(),
        anioPactado: new Date(this.anioPactado).getFullYear()
      }
    );
  }

  async closeModal() {
    await this.modalctrl.dismiss();
  }

}
