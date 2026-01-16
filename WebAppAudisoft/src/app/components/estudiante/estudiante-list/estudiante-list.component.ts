import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EstudianteService } from '../../../services/estudiante.service';
import { Estudiante } from '../../../models/models';
import { EstudianteFormComponent } from '../estudiante-form/estudiante-form.component';

@Component({
    selector: 'app-estudiante-list',
    standalone: true,
    imports: [CommonModule, TableModule, ButtonModule, ToolbarModule, ConfirmDialogModule, ToastModule, EstudianteFormComponent],
    providers: [ConfirmationService, MessageService],
    template: `
    <div class="card">
        <p-toast></p-toast>
        <div class="card">
        <p-toolbar styleClass="mb-4">
            <ng-template pTemplate="left">
                <p-button label="Nuevo" icon="pi pi-plus" (click)="openNew()" class="mr-2"></p-button>
            </ng-template>
        </p-toolbar>

        <p-table [value]="estudiantes()" [rows]="10" [paginator]="true" [tableStyle]="{'min-width': '50rem'}">
            <ng-template pTemplate="header">
                <tr>
                    <th pSortableColumn="nombre">Nombre <p-sortIcon field="nombre"></p-sortIcon></th>
                    <th>Acciones</th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-estudiante>
                <tr>
                    <td>{{estudiante.nombre}}</td>
                    <td class="flex gap-2">
                        <p-button icon="pi pi-pencil" [rounded]="true" class="mr-2" (click)="editEstudiante(estudiante)"></p-button>
                        <p-button icon="pi pi-trash" [rounded]="true" severity="danger" (click)="deleteEstudiante(estudiante)"></p-button>
                    </td>
                </tr>
            </ng-template>
        </p-table>
    </div>
        <app-estudiante-form [(visible)]="estudianteDialog" [estudiante]="estudiante" (onSave)="saveEstudiante($event)"></app-estudiante-form>
        <p-confirmDialog [style]="{width: '450px'}"></p-confirmDialog>
    </div>
  `
})
export class EstudianteListComponent {
    estudianteService = inject(EstudianteService);
    confirmationService = inject(ConfirmationService);
    messageService = inject(MessageService);

    estudiantes = this.estudianteService.estudiantes;
    estudianteDialog = false;
    estudiante: Estudiante = { nombre: '' };

    ngOnInit() {
        this.estudianteService.cargarTodos();
    }

    openNew() {
        this.estudiante = { nombre: '' };
        this.estudianteDialog = true;
    }

    editEstudiante(estudiante: Estudiante) {
        this.estudiante = { ...estudiante };
        this.estudianteDialog = true;
    }

    deleteEstudiante(estudiante: Estudiante) {
        this.confirmationService.confirm({
            message: '¿Estás seguro de que quieres borrar a ' + estudiante.nombre + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                if (estudiante.id) {
                    this.estudianteService.eliminar(estudiante.id).subscribe(() => {
                        this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Estudiante Borrado', life: 3000 });
                    });
                }
            }
        });
    }

    saveEstudiante(estudiante: Estudiante) {
        if (estudiante.id) {
            this.estudianteService.actualizar(estudiante.id, estudiante).subscribe(() => {
                this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Estudiante Actualizado', life: 3000 });
            });
        } else {
            this.estudianteService.crear(estudiante).subscribe(() => {
                this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Estudiante Creado', life: 3000 });
            });
        }
    }
}
