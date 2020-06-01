import { Direccion } from './Direccion';

export interface Cliente{
    id: number;
    nombre: string;
    direccion: Direccion;
    empresaId: number;
    urlFoto: string;
}