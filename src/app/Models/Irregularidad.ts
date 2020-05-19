import { TipoIrregularidad } from './TipoIrregularidad';
import { Ubicacion } from './Ubicacion';

export interface Irregularidad {
    descripcion: string;
    urlsEvidencia: string[];
    tipo: TipoIrregularidad;
    ubicacion: Ubicacion;
}