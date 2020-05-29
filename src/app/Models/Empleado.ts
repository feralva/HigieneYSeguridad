import { Usuario } from './Usuario';

export interface Empleado {
    nombre: string;
    apellido: string;
    usuarioCorreoElectronico: string;
    empresa: number;
    usuario: Usuario;
}
