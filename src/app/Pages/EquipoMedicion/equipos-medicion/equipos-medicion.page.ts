import { Component, OnInit } from '@angular/core';
import { EquipoMedicionService } from 'src/app/Core/Services/EquipoMedicion/equipo-medicion.service';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { UserLogueado } from 'src/app/Models/UserLogueado';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-equipos-medicion',
  templateUrl: './equipos-medicion.page.html',
  styleUrls: ['./equipos-medicion.page.scss'],
})
export class EquiposMedicionPage implements OnInit {

  constructor(private equipoMedicionService: EquipoMedicionService, private translate: TranslateService, 
    private appDataService: AppDataService, private authService: AuthService) { }

  equiposTotalizados: any;
  currentUser: UserLogueado = null;

  ngOnInit() {}

  ionViewWillEnter(){

    this.appDataService.changePageName('EquipoMedicion.title');

    this.authService.getUserSubject().pipe(first()).subscribe(
      data => this.currentUser = data,
      error => console.log(error)
    );

    this.equipoMedicionService.ObtenerEquiposMedicionTotalizadosEmpresa(this.currentUser.empresaId).subscribe(
      data => 
      {
        console.log(data)
        this.equiposTotalizados = data
      },
      (error) => console.log(error)
    )
  }

  doRefresh(event) {
    
    this.equipoMedicionService.ObtenerEquiposMedicionTotalizadosEmpresa(this.currentUser.empresaId).subscribe(
      data => this.equiposTotalizados = data,
      (error) => console.log(error)
    );
    event.target.complete();
  }

}
