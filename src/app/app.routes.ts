import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '',        loadComponent: () => import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage) },
  { path: 'animals', loadComponent: () => import('./pages/animals/animals.page').then(m => m.AnimalsPage) },
  { path: 'feeding', loadComponent: () => import('./pages/feeding/feeding.page').then(m => m.FeedingPage) },
  { path: 'health',  loadComponent: () => import('./pages/health/health.page').then(m => m.HealthPage) },
  { path: 'staff',   loadComponent: () => import('./pages/staff/staff.page').then(m => m.StaffPage) },
  { path: '**', redirectTo: '' },
];
