import { Routes } from '@angular/router';
export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./feature/home/home.component').then((m) => m.HomeComponent)
    }
];
