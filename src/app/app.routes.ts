import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout';

export const routes: Routes = [
  { path: '',        loadComponent: ()      => import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage) },
  { path: 'animals', loadComponent: ()      => import('./pages/animals/animals.page').then(m => m.AnimalsPage) },
  { path: 'animals/:id', loadComponent: ()  =>import('./pages/animals/animal-detail.page/animal-detail.page').then(m => m.AnimalDetailPage), data: { title: 'Animal' } },
  { path: 'staff',   loadComponent: ()      => import('./pages/staff/staff.page').then(m => m.StaffPage) },
  { path: '**', redirectTo: '' },

  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', loadComponent: () => import('./features/auth/login.page').then(m => m.LoginPage) },
      { path: 'register', loadComponent: () => import('./features/auth/register.page').then(m => m.RegisterPage) },
    ]
  },

];
