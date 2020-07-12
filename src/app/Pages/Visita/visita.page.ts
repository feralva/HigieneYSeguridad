import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { VisitaService } from 'src/app/Core/Services/Visita/visita.service';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UserLogueado } from 'src/app/Models/UserLogueado';

@Component({
  selector: 'app-visita',
  templateUrl: './visita.page.html',
  styleUrls: ['./visita.page.scss'],
})
export class VisitaPage implements OnInit {
  nombrePagina;
  visitas: any[];
  currentUser: UserLogueado;
  
  constructor(private translate: TranslateService, private route: ActivatedRoute,
    private appDataService: AppDataService,private router: Router, public navCtrl: NavController,
    private visitaService: VisitaService, private authService: AuthService) { }

  ngOnInit() {
    this.nombrePagina = 'Visita.title';
    this.appDataService.changePageName(this.nombrePagina);

    this.visitas = this.route.snapshot.data['visitas'];
 
    this.authService.getUserSubject().subscribe(
      data => this.currentUser = data,
      error => console.log(error)
    );
    console.log(this.visitas)
  }

  navegarADetalle(id){
    console.log("navegando")
    //this.navCtrl.navigateForward(['/visita',id, 'detalle']);
    this.router.navigate(['/home'])
  }
  doRefresh(event) {
    
    this.visitaService.obtenerVisitasEmpresa(this.currentUser.empresaId).subscribe(
      data => this.visitas = data,
      (error) => console.log(error)
    );
    event.target.complete();
  }
}
