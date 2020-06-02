import { Component, OnInit } from '@angular/core';
import { UserLogueado } from 'src/app/Models/UserLogueado';
import { TranslateService } from '@ngx-translate/core';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { ClienteService } from 'src/app/Core/Services/Cliente/cliente.service';
import { EmpresaService } from 'src/app/Core/Services/Empresa/empresa.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';

@Component({
  selector: 'app-cliente-detalle',
  templateUrl: './cliente-detalle.component.html',
  styleUrls: ['./cliente-detalle.component.scss'],
})
export class ClienteDetalleComponent implements OnInit {

  cliente: any = {
    responsable: {},
    direccion: {}
  };
  nombrePagina: string;
  currentUser: UserLogueado;
  
  constructor(private translate: TranslateService, private route: ActivatedRoute,
    private appDataService: AppDataService, private empresaService: EmpresaService,
    private clienteService: ClienteService, private authService: AuthService) {}

  ngOnInit() {
    this.cliente = this.route.snapshot.data['cliente'];
    this.nombrePagina = this.cliente.cliente.nombre;
    this.appDataService.changePageName(this.nombrePagina);

  
    console.log(this.cliente)
  }

}
