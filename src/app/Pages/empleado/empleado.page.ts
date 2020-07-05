import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Empleado } from 'src/app/Models/Empleado';
import { TranslateService } from '@ngx-translate/core';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { EmpleadoService } from 'src/app/Core/Services/Empleado/empleado.service';
import { AlertController, ToastController, Platform, ActionSheetController } from '@ionic/angular';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { UserLogueado } from 'src/app/Models/UserLogueado';
import { EmpresaService } from 'src/app/Core/Services/Empresa/empresa.service';
import { RolService } from 'src/app/Core/Services/Rol/rol.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.page.html',
  styleUrls: ['./empleado.page.scss'],
})
export class EmpleadoPage implements OnInit {

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  empleados: Empleado[] = [];
  nombrePagina: string;
  currentUser: UserLogueado;

  constructor(private translate: TranslateService, 
    private appDataService: AppDataService, private empresaService: EmpresaService,
    private empleadoService: EmpleadoService, private authService: AuthService,
    public alertController: AlertController, private rolService: RolService,
    public toastController: ToastController) {}


  ngOnInit() {}
  
  doRefresh(event) {
    
    this.obtenerEmpleadosEmpresa();
    event.target.complete();
  }

  private obtenerEmpleadosEmpresa() {
    this.empresaService.ObtenerEmpleadosEmpresa(this.currentUser.empresaId).subscribe(
      data => {

        this.empleados = data;
        console.log(data);
        this.empleados.forEach(empleado => {
          let roles: string[] = [];
          this.rolService.obtenerRolesUsuario(empleado.usuarioId).subscribe(
            data => {
              data.forEach(familia => {
                roles.push(familia.idFamilia);
              });
            },
            error => console.log(error)
          );
          empleado.roles = roles;
        });

      },
      error => console.log(error)
    );
  }

  ionViewWillEnter(){
    this.nombrePagina = 'Empleado.title';
    this.appDataService.changePageName(this.nombrePagina);

    this.authService.getUserSubject().subscribe(
      data => this.currentUser = data,
      error => console.log(error)
    );

    this.obtenerEmpleadosEmpresa();
  }
}
