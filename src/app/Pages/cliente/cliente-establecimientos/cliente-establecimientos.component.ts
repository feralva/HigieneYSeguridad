import { Component, OnInit } from '@angular/core';
import { UserLogueado } from 'src/app/Models/UserLogueado';
import { TranslateService } from '@ngx-translate/core';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { ClienteService } from 'src/app/Core/Services/Cliente/cliente.service';

@Component({
  selector: 'app-cliente-establecimientos',
  templateUrl: './cliente-establecimientos.component.html',
  styleUrls: ['./cliente-establecimientos.component.scss'],
})
export class ClienteEstablecimientosComponent implements OnInit {
  
  establecimientos: any[] = []
  nombrePagina: string;
  currentUser: UserLogueado;
  idCliente: number;
  
  constructor(private translate: TranslateService, private route: ActivatedRoute,
    private appDataService: AppDataService,
    private clienteService: ClienteService, private authService: AuthService) { }

  ngOnInit() {
    this.establecimientos = this.route.snapshot.data['establecimientos'];
    this.nombrePagina = 'Cliente.Establecimientos';
    this.appDataService.changePageName(this.nombrePagina);
    this.idCliente = +this.route.snapshot.paramMap.get('id');

    console.log(this.establecimientos)
  }

  doRefresh(event) {
    console.log('Begin async operation');

    var id = +this.route.snapshot.paramMap.get('id')

    this.clienteService.obtenerEstablecimientosActivosCliente(id).subscribe(
      data => {
        console.log(data)
        this.establecimientos = data;
        event.target.complete();
      },
      (error) => {
        console.log(error)
        event.target.complete()
      }
    );
  }
}
