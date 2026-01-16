export interface Estudiante {
    id?: string;
    nombre: string;
}

export interface Profesor {
    id?: string;
    nombre: string;
}

export interface Nota {
    id?: string;
    nombre: string;
    valor: number;
    estudianteId: string;
    estudianteNombre?: string; // Read-only from DTO
    profesorId: string;
    profesorNombre?: string; // Read-only from DTO
}
