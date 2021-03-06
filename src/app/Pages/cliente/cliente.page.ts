import { Component, OnInit } from '@angular/core';
import { UserLogueado } from 'src/app/Models/UserLogueado';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { EmpresaService } from 'src/app/Core/Services/Empresa/empresa.service';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { TranslateService } from '@ngx-translate/core';
import { ClienteService } from 'src/app/Core/Services/Cliente/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {

  clientes: any[] = [];
  nombrePagina: string;
  currentUser: UserLogueado;
  textoBuscar: string = ''

  constructor(private translate: TranslateService, private route: ActivatedRoute,
    private appDataService: AppDataService, private empresaService: EmpresaService,
    private clienteService: ClienteService, private authService: AuthService) {}

  ngOnInit() {}

  ionViewWillEnter(){
    this.appDataService.changePageName('Cliente.title');

    this.clientes = this.route.snapshot.data['clientes'];

    this.authService.getUserSubject().pipe(first()).subscribe(
      data => this.currentUser = data,
      error => console.log(error)
    );
    console.log(this.clientes)
  }

  doRefresh(event) {

      this.clienteService.obtenerClientesEmpresa(this.currentUser.empresaId).subscribe(
        data => this.clientes = data,
        (error) => console.log(error)
      );

    event.target.complete();
  }

  onBuscarClienteChange(event){

    this.textoBuscar = event.detail.value
  }
}
