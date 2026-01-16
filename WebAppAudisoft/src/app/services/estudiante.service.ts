import { Injectable, signal, inject, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Estudiante } from '../models/models';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class EstudianteService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiBaseUrl}/estudiantes`;

    private _estudiantes = signal<Estudiante[]>([]);
    public estudiantes = this._estudiantes.asReadonly();

    cargarTodos() {
        this.http.get<Estudiante[]>(this.apiUrl).subscribe({
            next: (data) => this._estudiantes.set(data),
            error: (err) => console.error('Error cargando estudiantes', err)
        });
    }

    crear(estudiante: Estudiante) {
        return this.http.post<Estudiante>(this.apiUrl, estudiante).pipe(
            tap(created => this._estudiantes.update(list => [...list, created]))
        );
    }

    actualizar(id: string, estudiante: Estudiante) {
        return this.http.put(`${this.apiUrl}/${id}`, estudiante).pipe(
            tap(() => {
                this._estudiantes.update(list => list.map(e => e.id === id ? { ...estudiante, id } : e));
            })
        );
    }

    eliminar(id: string) {
        return this.http.delete(`${this.apiUrl}/${id}`).pipe(
            tap(() => this._estudiantes.update(list => list.filter(e => e.id !== id)))
        );
    }
}
