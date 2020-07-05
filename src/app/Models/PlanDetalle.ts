import { Visita } from './Visita';

export interface PlanDetalle {
    id: number;
    tipoPlan: string;
    cliente: string;
    idCliente: number;
    usuarioCreador: string;
    estado: string;
    visitas: Visita[];
}