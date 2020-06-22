import { Usuario } from './Usuario';

export interface Empleado {
    id: number;
    nombre: string;
    apellido: string;
    contrasenia: string;
    correoElectronico: string;
    empresaId: number;
    usuario: Usuario;
    urlFoto: string;
    usuarioId: string;
    activo: boolean;
    roles: string[];
}
