import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProfesorService } from '../../../services/profesor.service';
import { Profesor } from '../../../models/models';
import { ProfesorFormComponent } from '../profesor-form/profesor-form.component';

@Component({
    selector: 'app-profesor-list',
    standalone: true,
    imports: [CommonModule, TableModule, ButtonModule, ToolbarModule, ConfirmDialogModule, ToastModule, ProfesorFormComponent],
    template: `
    <div class="card">
        <p-toast></p-toast>
        <div class="card">
        <p-toolbar styleClass="mb-4">
            <ng-template pTemplate="left">
                <p-button label="Nuevo" icon="pi pi-plus" (click)="openNew()" class="mr-2"></p-button>
            </ng-template>
        </p-toolbar>

        <p-table [value]="profesores()" [rows]="10" [paginator]="true"  [tableStyle]="{'min-width': '50rem'}">
            <ng-template pTemplate="header">
                <tr>
                    <th pSortableColumn="nombre">Nombre <p-sortIcon field="nombre"></p-sortIcon></th>
                    <th>Acciones</th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-profesor>
                <tr>
                    <td>{{profesor.nombre}}</td>
                    <td>
                        <p-button icon="pi pi-pencil" [rounded]="true" class="mr-2" (click)="editProfesor(profesor)"></p-button>
                        <p-button icon="pi pi-trash" [rounded]="true" severity="danger" (click)="deleteProfesor(profesor)"></p-button>
                    </td>
                </tr>
            </ng-template>
        </p-table>
    </div>
        <app-profesor-form [(visible)]="profesorDialog" [profesor]="profesor" (onSave)="saveProfesor($event)"></app-profesor-form>
    </div>
  `
})
export class ProfesorListComponent {
    profesorService = inject(ProfesorService);
    confirmationService = inject(ConfirmationService);
    messageService = inject(MessageService);

    profesores = this.profesorService.profesores;
    profesorDialog = false;
    profesor: Profesor = { nombre: '' };

    ngOnInit() {
        this.profesorService.cargarTodos();
    }

    openNew() {
        this.profesor = { nombre: '' };
        this.profesorDialog = true;
    }

    editProfesor(profesor: Profesor) {
        this.profesor = { ...profesor };
        this.profesorDialog = true;
    }

    deleteProfesor(profesor: Profesor) {
        this.confirmationService.confirm({
            message: 'El registro ' + profesor.nombre + ' no se puede eliminar porque tiene notas asociadas.',
            header: 'No se puede realizar la eliminación',
            icon: 'pi pi-exclamation-triangle',
            acceptVisible: false,
            rejectVisible: false,
            accept: () => {
                if (profesor.id) {
                    this.profesorService.eliminar(profesor.id).subscribe(() => {
                        this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Profesor Borrado', life: 3000 });
                    });
                }
            }
        });
    }

    saveProfesor(profesor: Profesor) {
        if (profesor.id) {
            this.profesorService.actualizar(profesor.id, profesor).subscribe(() => {
                this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Profesor Actualizado', life: 3000 });
            });
        } else {
            this.profesorService.crear(profesor).subscribe(() => {
                this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Profesor Creado', life: 3000 });
            });
        }
    }
}
