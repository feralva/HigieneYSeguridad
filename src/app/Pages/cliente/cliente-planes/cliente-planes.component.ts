import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { ClienteService } from 'src/app/Core/Services/Cliente/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { UserLogueado } from 'src/app/Models/UserLogueado';

@Component({
  selector: 'app-cliente-planes',
  templateUrl: './cliente-planes.component.html',
  styleUrls: ['./cliente-planes.component.scss'],
})
export class ClientePlanesComponent implements OnInit {

  planes: any[] = []
  nombrePagina: string;
  currentUser: UserLogueado;
  
  constructor(private translate: TranslateService, private route: ActivatedRoute,
    private appDataService: AppDataService,
    private clienteService: ClienteService, private authService: AuthService) { }

  ngOnInit() {

    this.planes = this.route.snapshot.data['planes'];
    this.nombrePagina = 'Cliente.Planes';
    this.appDataService.changePageName(this.nombrePagina);
  
    console.log(this.planes)
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
