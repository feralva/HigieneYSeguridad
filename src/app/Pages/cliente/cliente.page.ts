import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/Models/Cliente';
import { UserLogueado } from 'src/app/Models/UserLogueado';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { EmpresaService } from 'src/app/Core/Services/Empresa/empresa.service';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { TranslateService } from '@ngx-translate/core';
import { ClienteService } from 'src/app/Core/Services/Cliente/cliente.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {

  clientes: any[] = [];
  nombrePagina: string;
  currentUser: UserLogueado;

  constructor(private translate: TranslateService, private route: ActivatedRoute,
    private appDataService: AppDataService, private empresaService: EmpresaService,
    private clienteService: ClienteService, private authService: AuthService) {}

  ngOnInit() {
    this.nombrePagina = 'Cliente.title';
    this.appDataService.changePageName(this.nombrePagina);

    this.clientes = this.route.snapshot.data['clientes'];
    console.log(this.clientes)
  }

}
