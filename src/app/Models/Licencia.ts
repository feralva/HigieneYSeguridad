import { Empresa } from './Empresa';
import { TipoLicencia } from './TipoLicencia';

export interface Licencia {
    id: number,
    empresa: Empresa,
    tipoLicencia: TipoLicencia,
    fechaFin: Date
}