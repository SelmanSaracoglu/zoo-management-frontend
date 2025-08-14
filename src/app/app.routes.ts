import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';


export const routes: Routes = [
  { path: '',        loadComponent: ()      => import('./pages/home/home.page').then(m => m.HomePage) },
  { path: 'animals', loadComponent: ()      => import('./pages/animals/animals.page').then(m => m.AnimalsPage) },
  { path: 'animals/:id', loadComponent: ()  =>import('./pages/animals/animal-detail.page/animal-detail.page').then(m => m.AnimalDetailPage), data: { title: 'Animal' } },
  { path: 'staff',   loadComponent: ()      => import('./pages/staff/staff.page').then(m => m.StaffPage) },
  { path: '**', redirectTo: '' },

];
