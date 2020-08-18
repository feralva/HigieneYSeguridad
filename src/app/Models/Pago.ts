export interface Pago {
    id: number;
    empresaId: number;
    medioPagoId: number;
    monto: number;
    tokenPago: string;
    tipoLicenciaId: number;
    precioLicencia: number;
    cantidadMeses: number
}
