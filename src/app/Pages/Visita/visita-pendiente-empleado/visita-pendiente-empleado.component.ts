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
  nombrePagina: string;
  currentUser: UserLogueado;

  constructor(private translate: TranslateService, private route: ActivatedRoute,
    private appDataService: AppDataService,
    private visitaService: VisitaService, private authService: AuthService) { }

  ngOnInit() {
    this.visitas = this.route.snapshot.data['visitas'];
    this.nombrePagina = 'Visitas.Pendientes.title';
    this.appDataService.changePageName(this.nombrePagina);
  
    console.log(this.visitas)
  }

}
