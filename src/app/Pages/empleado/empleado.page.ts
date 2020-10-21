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
import { first } from 'rxjs/operators';

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
  textoBuscar: string = '';

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

    this.authService.getUserSubject().pipe(first()).subscribe(
      data => this.currentUser = data,
      error => console.log(error)
    );

    this.obtenerEmpleadosEmpresa();
  }

  onBuscarEmpleadoChange(event){

    this.textoBuscar = event.detail.value
  }

  onBorrarEmpleado(empleado: Empleado){

    empleado.activo = false;
    this.empleadoService.actualizarEmpleado(empleado).subscribe(
      data => {
        this.empleados.splice(this.empleados.findIndex(e => e.id === empleado.id), 1 )
        this.MostrarMensajeOperacion('Baja Exitosa')
      },
      (err: any) => this.MostrarMensajeOperacion('Falla')
    )

  }

  async MostrarMensajeOperacion(mensaje:string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }
}
