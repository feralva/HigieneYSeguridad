import { UsuarioRol } from './UsuarioRol';

export interface Usuario {
    IdUsuario: string;
    contraseña: string;
    UsuarioFamilia: UsuarioRol[];

}
