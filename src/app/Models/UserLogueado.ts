export interface UserLogueado{
    id: string;
    idUsuario: string;
    name: string;
    roles: string[];
    patentes: string[];
    empresaId: number;
    empresaNombre: string;
    empleadoId: number;
    urlFotoEmpleado: string;
    urlFotoEmpresa: string;
}