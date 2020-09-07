export interface Visita {
    id: number;
    nombreEstablecimiento: string;
    tipoVisita: string;
    empleadoAsignado: string;
    fechaPactada: Date;
    fecha: Date;
    estado: string;
    controles: any[]
}