import { Component, OnInit } from '@angular/core';
import { UserLogueado } from 'src/app/Models/UserLogueado';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { VisitaService } from 'src/app/Core/Services/Visita/visita.service';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';

@Component({
  selector: 'app-visita-pendiente-empleado',
  templateUrl: './visita-pendiente-empleado.component.html',
  styleUrls: ['./visita-pendiente-empleado.component.scss'],
})
export class VisitaPendienteEmpleadoComponent implements OnInit {
  visitas: any[];
  currentUser: UserLogueado;
  
  textoBuscar: string = '';

  constructor(private translate: TranslateService, private route: ActivatedRoute,
    private appDataService: AppDataService,
    private visitaService: VisitaService, private authService: AuthService) { }

  ngOnInit() {
    this.visitas = this.route.snapshot.data['visitas'];

    this.appDataService.changePageName('Visita.VisitasPendientes');
    this.authService.getUserSubject().subscribe(
      data => this.currentUser = data,
      error => console.log(error)
    );
    console.log(this.visitas)
  }

  doRefresh(event) {
    
    this.visitaService.obtenerVisitasPendientesEmpleado(this.currentUser.empleadoId).subscribe(
      data => this.visitas = data,
      (error) => console.log(error)
    );
    event.target.complete();
  }

  onBuscarClienteChange(event){

    this.textoBuscar = event.detail.value
  }

}
