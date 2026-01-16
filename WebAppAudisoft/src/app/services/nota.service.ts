import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Nota } from '../models/models';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NotaService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiBaseUrl}/notas`;

    private _notas = signal<Nota[]>([]);
    public notas = this._notas.asReadonly();

    cargarTodos() {
        this.http.get<Nota[]>(this.apiUrl).subscribe({
            next: (data) => this._notas.set(data),
            error: (err) => console.error('Error cargando notas', err)
        });
    }

    crear(nota: Nota) {
        return this.http.post<Nota>(this.apiUrl, nota).pipe(
            tap(created => {
                // Ideally fetch full entity to get names, or manual optimistic update if complexity allows
                // For now, simpler to reload or just append result
                this.cargarTodos();
            })
        );
    }

    actualizar(id: string, nota: Nota) {
        return this.http.put(`${this.apiUrl}/${id}`, nota).pipe(
            tap(() => this.cargarTodos())
        );
    }

    eliminar(id: string) {
        return this.http.delete(`${this.apiUrl}/${id}`).pipe(
            tap(() => this._notas.update(list => list.filter(n => n.id !== id)))
        );
    }
}
