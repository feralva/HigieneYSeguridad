import { Provincia } from './Provincia';

export interface Partido{
    nombre: string;
    provinciaId: number;
    provincia: Provincia;
}