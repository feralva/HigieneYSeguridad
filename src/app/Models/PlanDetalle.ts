import { Visita } from './Visita';

export interface PlanDetalle {
    tipoPlan: string;
    cliente: string;
    usuarioCreador: string;
    estado: string;
    visitas: Visita[];
}