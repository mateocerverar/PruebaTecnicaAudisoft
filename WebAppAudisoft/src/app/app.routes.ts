import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'estudiantes', pathMatch: 'full' },
    {
        path: 'estudiantes',
        loadComponent: () => import('./components/estudiante/estudiante-list/estudiante-list.component').then(m => m.EstudianteListComponent)
    },
    {
        path: 'profesores',
        loadComponent: () => import('./components/profesor/profesor-list/profesor-list.component').then(m => m.ProfesorListComponent)
    },
    {
        path: 'notas',
        loadComponent: () => import('./components/nota/nota-list/nota-list.component').then(m => m.NotaListComponent)
    }
];
