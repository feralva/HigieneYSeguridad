import { Direccion } from './Direccion';
import { Ubicacion } from './Ubicacion';

export interface Establecimiento {
    id: number;
    nombre: string;
    direccion: Direccion;
    ubicaciones: Ubicacion[];
    clienteId: number;
    latitud: string;
    longitud: string;
}