import { Component, OnInit } from '@angular/core';
import { UserLogueado } from 'src/app/Models/UserLogueado';
import { TranslateService } from '@ngx-translate/core';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { EmpleadoService } from 'src/app/Core/Services/Empleado/empleado.service';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { AlertController, ToastController, Platform, ActionSheetController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Empleado } from 'src/app/Models/Empleado';

@Component({
  selector: 'app-empleado-detalle',
  templateUrl: './empleado-detalle.component.html',
  styleUrls: ['./empleado-detalle.component.scss'],
})
export class EmpleadoDetalleComponent implements OnInit {

  currentUser: UserLogueado = null;
  imageBase64: string;

  constructor(private translate: TranslateService, 
                private appDataService: AppDataService,
                private empleadoService: EmpleadoService, private authService: AuthService,
                public alertController: AlertController, private router: Router,
                public toastController: ToastController,private route: ActivatedRoute,
                private plt: Platform, private actionSheetCtrl: ActionSheetController) { }

  empleadoModel: Empleado = {
    id: 0,
    apellido: '',
    nombre: '',
    empresaId: null,
    correoElectronico: '',
    contrasenia: '',
    urlFoto: '',
    activo: true,
    usuarioId:'',
    roles: [],
    usuario: {
      IdUsuario: '',
      UsuarioRoles: [],
      contraseña: null
    }
  };

  ngOnInit() {

    this.empleadoModel = this.route.snapshot.data['empleado'];
    console.log(this.empleadoModel)
    this.empleadoModel.usuario = {
      IdUsuario: '',
      UsuarioRoles: [],
      contraseña: null
    }
    this.empleadoModel.usuario.IdUsuario = this.empleadoModel.correoElectronico;

    this.authService.getUserSubject().subscribe(
        data => this.currentUser = data,
        error => console.log(error)
    );
  }

  ionViewWillEnter(){
    this.appDataService.changePageName('Empleado.Detalle.title');

  }
}
