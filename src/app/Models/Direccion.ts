import { PartialModule } from '@angular/compiler';
import { Partido } from './Partido';

export interface Direccion{
    calle: string;
    altura: number;
    partidoId: number;
    provinciaId: number;
    partido: Partido;
}