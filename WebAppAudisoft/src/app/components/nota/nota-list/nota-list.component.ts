import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NotaService } from '../../../services/nota.service';
import { Nota } from '../../../models/models';
import { NotaFormComponent } from '../nota-form/nota-form.component';

@Component({
    selector: 'app-nota-list',
    standalone: true,
    imports: [CommonModule, TableModule, ButtonModule, ToolbarModule, ConfirmDialogModule, ToastModule, NotaFormComponent],
    providers: [ConfirmationService, MessageService],
    template: `
    <div class="card">
        <p-toast></p-toast>
        <p-toolbar styleClass="mb-4">
            <ng-template pTemplate="left">
                <p-button label="Nuevo" icon="pi pi-plus" (click)="openNew()" class="mr-2"></p-button>
            </ng-template>
        </p-toolbar>

        <p-table [value]="notas()" [rows]="10" [paginator]="true"  [tableStyle]="{'min-width': '50rem'}">
            <ng-template pTemplate="header">
                <tr>
                    <th pSortableColumn="nombre">Nombre <p-sortIcon field="nombre"></p-sortIcon></th>
                    <th pSortableColumn="valor">Valor <p-sortIcon field="valor"></p-sortIcon></th>
                    <th pSortableColumn="estudianteNombre">Estudiante <p-sortIcon field="estudianteNombre"></p-sortIcon></th>
                    <th pSortableColumn="profesorNombre">Profesor <p-sortIcon field="profesorNombre"></p-sortIcon></th>
                    <th>Acciones</th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-nota>
                <tr>
                    <td>{{nota.nombre}}</td>
                    <td>{{nota.valor}}</td>
                    <td>{{nota.estudianteNombre}}</td>
                    <td>{{nota.profesorNombre}}</td>
                    <td>
                        <p-button icon="pi pi-pencil" [rounded]="true" class="mr-2" (click)="editNota(nota)"></p-button>
                        <p-button icon="pi pi-trash" [rounded]="true" severity="danger" (click)="deleteNota(nota)"></p-button>
                    </td>
                </tr>
            </ng-template>
        </p-table>

        <app-nota-form [(visible)]="notaDialog" [nota]="nota" (onSave)="saveNota($event)"></app-nota-form>
        <p-confirmDialog [style]="{width: '450px'}"></p-confirmDialog>
    </div>
  `
})
export class NotaListComponent {
    notaService = inject(NotaService);
    confirmationService = inject(ConfirmationService);
    messageService = inject(MessageService);

    notas = this.notaService.notas;
    notaDialog = false;
    nota: Nota = { nombre: '', valor: 0, estudianteId: '', profesorId: '' };

    ngOnInit() {
        this.notaService.cargarTodos();
    }

    openNew() {
        this.nota = { nombre: '', valor: 0, estudianteId: '', profesorId: '' };
        this.notaDialog = true;
    }

    editNota(nota: Nota) {
        this.nota = { ...nota };
        this.notaDialog = true;
    }

    deleteNota(nota: Nota) {
        this.confirmationService.confirm({
            message: '¿Estás seguro de que quieres borrar la nota ' + nota.nombre + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                if (nota.id) {
                    this.notaService.eliminar(nota.id).subscribe(() => {
                        this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Nota Borrada', life: 3000 });
                    });
                }
            }
        });
    }

    saveNota(nota: Nota) {
        if (nota.id) {
            this.notaService.actualizar(nota.id, nota).subscribe(() => {
                this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Nota Actualizada', life: 3000 });
            });
        } else {
            this.notaService.crear(nota).subscribe(() => {
                this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Nota Creada', life: 3000 });
            });
        }
    }
}
