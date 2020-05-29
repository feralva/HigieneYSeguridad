import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/Models/Empleado';
import { Familia } from 'src/app/Models/Familia';
import { Usuario } from 'src/app/Models/Usuario';
import { UsuarioRol } from 'src/app/Models/UsuarioRol';
import { TranslateService } from '@ngx-translate/core';
import { RolService } from 'src/app/Core/Services/Rol/rol.service';
import { NgForm } from '@angular/forms';
import { EmpleadoService } from 'src/app/Core/Services/Empleado/empleado.service';
import { UserLogueado } from 'src/app/Models/UserLogueado';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';

@Component({
  selector: 'app-alta-empleado',
  templateUrl: './alta-empleado.component.html',
  styleUrls: ['./alta-empleado.component.scss'],
})
export class AltaEmpleadoComponent implements OnInit {

  constructor(private rolService: RolService, private translate: TranslateService,
              private empleadoService: EmpleadoService, private authService: AuthService) { }

  rolesDisponibles: Familia[];
  rolesSeleccionados: string[];
  currentUser: UserLogueado = null;

  empleadoModel: Empleado = {
    apellido: '',
    nombre: '',
    empresaId: null,
    CorreoElectronico: '',
    contrasenia: '',
    usuario: {
      IdUsuario: null,
      UsuarioRoles: null,
      contraseña: null
    }
  };

  ngOnInit() {

    this.rolService.obtenerRolesDisponibles().subscribe(
      result => this.rolesDisponibles = result,
      (err: any) => console.log(err)
    );

    this.authService.getUserSubject().subscribe(
        data => this.currentUser = data,
        error => console.log(error)
    );
  }

  onSubmit(form: NgForm) {

    this.empleadoModel.empresaId = this.currentUser.empresaId
    this.empleadoModel.usuario = { IdUsuario: this.empleadoModel.CorreoElectronico
      , contraseña: this.authService.encriptarContrasenia(this.empleadoModel.contrasenia), UsuarioRoles: []};

    for (let rol of this.rolesSeleccionados) {
        this.empleadoModel.usuario.UsuarioRoles.push
          ({IdUsuario: this.empleadoModel.CorreoElectronico, IdFamilia: rol});
    }

    this.empleadoService.addEmpleado(this.empleadoModel).subscribe(
      result => console.log(result),
      (err: any) => console.log(err)
    );

    console.log(this.empleadoModel);
    console.log(this.rolesDisponibles);
    console.log(this.rolesSeleccionados);
  }

}
