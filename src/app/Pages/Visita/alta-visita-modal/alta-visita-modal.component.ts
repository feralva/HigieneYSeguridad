import { Component, OnInit, Input } from '@angular/core';
import { PlanService } from 'src/app/Core/Services/Plan/plan.service';
import { ModalController } from '@ionic/angular';
import { Visita } from 'src/app/Models/Visita';
import { ClienteService } from 'src/app/Core/Services/Cliente/cliente.service';
import { VisitaService } from 'src/app/Core/Services/Visita/visita.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-alta-visita-modal',
  templateUrl: './alta-visita-modal.component.html',
  styleUrls: ['./alta-visita-modal.component.scss'],
})
export class AltaVisitaModalComponent implements OnInit {

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

}
