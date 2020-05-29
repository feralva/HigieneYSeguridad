import { Usuario } from './Usuario';

export interface Empleado {
    nombre: string;
    apellido: string;
    contrasenia: string;
    CorreoElectronico: string;
    empresaId: number;
    usuario: Usuario;
}
