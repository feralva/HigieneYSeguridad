import { Direccion } from './Direccion';
import { Responsable } from './Responsable';

export interface Empresa {
    id: number;
    nombre: string;
    responsable: Responsable;
    direccion: Direccion;
    urlFoto: string;
    activo: boolean;
}
