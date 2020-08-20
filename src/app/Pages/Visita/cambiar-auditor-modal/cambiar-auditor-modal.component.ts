import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { EmpleadoService } from 'src/app/Core/Services/Empleado/empleado.service';
import { EmpresaService } from 'src/app/Core/Services/Empresa/empresa.service';
import { UserLogueado } from 'src/app/Models/UserLogueado';
import { LoaderService } from 'src/app/Core/Services/loader.service';
import { VisitaService } from 'src/app/Core/Services/Visita/visita.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cambiar-auditor-modal',
  templateUrl: './cambiar-auditor-modal.component.html',
  styleUrls: ['./cambiar-auditor-modal.component.scss'],
})
export class CambiarAuditorModalComponent implements OnInit {

  auditorSeleccionado: any
  auditoresPosibles: any[] = []

  @Input() public auditorActual: any;
  @Input() public idVisita: number;

  currentUser: UserLogueado;

  constructor(private translate: TranslateService, private route: ActivatedRoute, private visitaService: VisitaService,
    private appDataService: AppDataService,private router: Router, public navCtrl: NavController, private empresaService: EmpresaService,
    private authService: AuthService, private modalController: ModalController, private loader: LoaderService) {}

  ngOnInit() {

    console.log('llega')
    console.log(this.auditorActual)
    //this.loader.present()
    this.authService.getUserSubject().subscribe(
      data => {
        this.currentUser = data
        this.empresaService.ObtenerEmpleadosEmpresa(data.empresaId).subscribe(
          data => this.auditoresPosibles = data,
          (error) => console.log(error)
        )
      },
      error => console.log(error)
    )//.add(() => this.loader.dismiss());


    //this.auditorActual = this.route.snapshot.data['auditorActual'];
  }
  
  actualizarAuditor(){

    this.visitaService.actualizarAuditorVisita(this.idVisita, this.auditorSeleccionado.id).subscribe(
      data => {
        console.log('actualizacion exitosa')
        this.closeModal()
      },
      (error) => console.log(error)
    )
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

}
