import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/Models/Empleado';
import { Familia } from 'src/app/Models/Familia';
import { Usuario } from 'src/app/Models/Usuario';
import { UsuarioRol } from 'src/app/Models/UsuarioRol';
import { TranslateService } from '@ngx-translate/core';
import { RolService } from 'src/app/Core/Services/Rol/rol.service';
import { NgForm } from '@angular/forms';
import { EmpleadoService } from 'src/app/Core/Services/Empleado/empleado.service';


@Component({
  selector: 'app-alta-empleado',
  templateUrl: './alta-empleado.component.html',
  styleUrls: ['./alta-empleado.component.scss'],
})
export class AltaEmpleadoComponent implements OnInit {

  constructor(private rolService: RolService, private translate: TranslateService, private empleadoService: EmpleadoService) { }

  rolesDisponibles: Familia[];
  rolesSeleccionados: string[];

  empleadoModel: Empleado = {
    apellido: '',
    nombre: '',
    empresa: null,
    usuarioCorreoElectronico: '',
    usuario: {
      IdUsuario: null,
      UsuarioFamilia: null,
      contraseña: null
    }
  };

  ngOnInit() {

    //this.rolesDisponibles = [{id: 1, nombre: 'Auditor'}, {id: 2, nombre: 'Coordinador'}, {id: 3, nombre: 'Gerente'}];

    this.rolService.obtenerRolesDisponibles().subscribe(
      result => this.rolesDisponibles = result,
      (err: any) => console.log(err)
    );
  }

  onSubmit(form: NgForm) {
/*
    this.empleadoService.addEmpleado(this.empleadoModel).subscribe(
      result => console.log(result),
      (err: any) => console.log(err)
    );*/

    this.empleadoModel.usuario = { IdUsuario: this.empleadoModel.usuarioCorreoElectronico
      , contraseña: '', UsuarioFamilia: []};

    for (let rol of this.rolesSeleccionados) {
        this.empleadoModel.usuario.UsuarioFamilia.push
          ({IdUsuario: this.empleadoModel.usuarioCorreoElectronico, IdFamilia: rol});
    }

    console.log(this.empleadoModel);
    console.log(this.rolesDisponibles);
    console.log(this.rolesSeleccionados);
  }

}
