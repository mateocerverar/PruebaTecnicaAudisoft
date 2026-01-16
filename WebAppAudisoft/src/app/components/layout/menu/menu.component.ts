import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MenuItem } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule, DrawerModule, ButtonModule, SelectButtonModule, ToolbarModule],
    template: `
    <p-toolbar styleClass="mb-4">
        <ng-template pTemplate="center">
            <p-selectButton [options]="items" [(ngModel)]="activeItem" (onOptionClick)="navigate($event)" [multiple]="false" styleClass="vertical-buttons shadow-none"></p-selectButton>
        </ng-template>
    </p-toolbar>
  `,
})
export class MenuComponent implements OnInit {
    private router = inject(Router);
    items: any[] | undefined;
    activeItem: any;
    visible: boolean = false;

    ngOnInit() {
        this.items = [
            { label: 'Estudiantes', value: '/estudiantes', icon: 'pi pi-users' },
            { label: 'Profesores', value: '/profesores', icon: 'pi pi-user' },
            { label: 'Notas', value: '/notas', icon: 'pi pi-book' }
        ];

        // Set active item based on current URL
        const currentRoute = this.router.url;
        this.activeItem = this.items.find(item => currentRoute.includes(item.value))?.value;
    }

    navigate(event: any) {
        if (event.option.value) {
            this.router.navigateByUrl(event.option.value);
            this.visible = false;
        }
    }
}
