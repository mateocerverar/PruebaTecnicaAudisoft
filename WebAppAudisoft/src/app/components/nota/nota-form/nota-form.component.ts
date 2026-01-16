import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { Nota, Estudiante, Profesor } from '../../../models/models';
import { EstudianteService } from '../../../services/estudiante.service';
import { ProfesorService } from '../../../services/profesor.service';

@Component({
    selector: 'app-nota-form',
    standalone: true,
    imports: [CommonModule, FormsModule, DialogModule, ButtonModule, InputTextModule, InputNumberModule, SelectModule],
    template: `
    <p-dialog [(visible)]="visible" [header]="nota.id ? 'Editar Nota' : 'Nueva Nota'" [modal]="true" [style]="{width: '450px'}">
        <div class="field">
            <label for="nombre">Nombre de la Nota</label>
            <input type="text" pInputText id="nombre" [(ngModel)]="nota.nombre" required autofocus />
        </div>
        <div class="field">
            <label for="valor">Valor (0.0 - 5.0)</label>
            <p-inputNumber id="valor" [(ngModel)]="nota.valor" [min]="0" [max]="5" [minFractionDigits]="1" [maxFractionDigits]="2"></p-inputNumber>
        </div>
        <div class="field">
            <label for="estudiante">Estudiante</label>
            <p-select [options]="estudiantes()" [(ngModel)]="selectedEstudianteId" optionLabel="nombre" optionValue="id" placeholder="Seleccionar Estudiante" (onChange)="onEstudianteChange($event)" appendTo="body"></p-select>
        </div>
        <div class="field">
            <label for="profesor">Profesor</label>
            <p-select [options]="profesores()" [(ngModel)]="selectedProfesorId" optionLabel="nombre" optionValue="id" placeholder="Seleccionar Profesor" (onChange)="onProfesorChange($event)" appendTo="body"></p-select>
        </div>

        <ng-template pTemplate="footer">
            <button pButton label="Cancelar" icon="pi pi-times" class="p-button-text" (click)="cancel()"></button>
            <button pButton label="Guardar" icon="pi pi-check" class="p-button-text" (click)="save()"></button>
        </ng-template>
    </p-dialog>
  `,
    styles: [`
    .field {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }
  `]
})
export class NotaFormComponent implements OnInit {
    @Input() visible = false;
    @Input() nota: Nota = this.getEmptyNota();
    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() onSave = new EventEmitter<Nota>();

    estudianteService = inject(EstudianteService);
    profesorService = inject(ProfesorService);

    estudiantes = this.estudianteService.estudiantes;
    profesores = this.profesorService.profesores;

    selectedEstudianteId: string | undefined;
    selectedProfesorId: string | undefined;

    ngOnInit() {
        this.estudianteService.cargarTodos();
        this.profesorService.cargarTodos();
    }

    ngOnChanges() {
        if (this.nota) {
            this.selectedEstudianteId = this.nota.estudianteId;
            this.selectedProfesorId = this.nota.profesorId;
        }
    }

    onEstudianteChange(event: any) {
        this.nota.estudianteId = event.value;
    }

    onProfesorChange(event: any) {
        this.nota.profesorId = event.value;
    }

    cancel() {
        this.visible = false;
        this.visibleChange.emit(false);
    }

    save() {
        this.nota.estudianteId = this.selectedEstudianteId || '';
        this.nota.profesorId = this.selectedProfesorId || '';
        this.onSave.emit(this.nota);
        this.visible = false;
        this.visibleChange.emit(false);
    }

    getEmptyNota(): Nota {
        return { nombre: '', valor: 0, estudianteId: '', profesorId: '' };
    }
}
