import { Routes } from '@angular/router';
import {ListPageComponent} from './core/pages/list-page/list-page.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../app/core/pages/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    children: [
      { path: '', redirectTo: 'tasks', pathMatch: 'full' },
      { path: 'tasks', component: ListPageComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];
