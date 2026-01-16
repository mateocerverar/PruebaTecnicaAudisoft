import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Estudiante } from '../../../models/models';

@Component({
    selector: 'app-estudiante-form',
    standalone: true,
    imports: [CommonModule, FormsModule, DialogModule, ButtonModule, InputTextModule],
    template: `
    <p-dialog [(visible)]="visible" [header]="estudiante.id ? 'Editar Estudiante' : 'Nuevo Estudiante'" [modal]="true" [style]="{width: '450px'}">
        <div class="field">
            <label for="nombre">Nombre</label>
            <input type="text" pInputText id="nombre" [(ngModel)]="estudiante.nombre" required autofocus />
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
export class EstudianteFormComponent {
    @Input() visible = false;
    @Input() estudiante: Estudiante = { nombre: '' };
    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() onSave = new EventEmitter<Estudiante>();

    cancel() {
        this.visible = false;
        this.visibleChange.emit(false);
    }

    save() {
        this.onSave.emit(this.estudiante);
        this.visible = false;
        this.visibleChange.emit(false);
    }
}
