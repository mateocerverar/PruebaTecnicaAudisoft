import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Profesor } from '../models/models';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProfesorService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiBaseUrl}/profesores`;

    private _profesores = signal<Profesor[]>([]);
    public profesores = this._profesores.asReadonly();

    cargarTodos() {
        this.http.get<Profesor[]>(this.apiUrl).subscribe({
            next: (data) => this._profesores.set(data),
            error: (err) => console.error('Error cargando profesores', err)
        });
    }

    crear(profesor: Profesor) {
        return this.http.post<Profesor>(this.apiUrl, profesor).pipe(
            tap(created => this._profesores.update(list => [...list, created]))
        );
    }

    actualizar(id: string, profesor: Profesor) {
        return this.http.put(`${this.apiUrl}/${id}`, profesor).pipe(
            tap(() => {
                this._profesores.update(list => list.map(p => p.id === id ? { ...profesor, id } : p));
            })
        );
    }

    eliminar(id: string) {
        return this.http.delete(`${this.apiUrl}/${id}`).pipe(
            tap(() => this._profesores.update(list => list.filter(p => p.id !== id)))
        );
    }
}
