import { Direccion } from './Direccion';
import { Responsable } from './Responsable';

export interface Cliente{
    id: number;
    nombre: string;
    direccion: Direccion;
    responsable: Responsable;
    empresaId: number;
    urlFoto: string;
}