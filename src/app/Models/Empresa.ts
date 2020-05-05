import { Direccion } from './Direccion';
import { Responsable } from './Responsable';

export interface Empresa {
    nombre: string;
    responsable: Responsable;
    direccion: Direccion;
}
