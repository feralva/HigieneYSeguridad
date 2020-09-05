export interface TipoLicencia{
    id: number;
    nombre: string; 
    descripcion: string; 
    cantidad_Maxima_Usuarios: number;
    precioActual: number;
    activo: boolean
}