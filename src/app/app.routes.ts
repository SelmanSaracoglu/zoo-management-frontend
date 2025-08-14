import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';


export const routes: Routes = [
  { path: '',             loadComponent: ()       =>  import('./pages/home/home.page').then(m => m.HomePage) },
  { path: 'about',        loadComponent: ()       =>  import('./pages/about/about').then(m => m.About) },
  { path: 'events',       loadComponent: ()       =>  import('./pages/events/events').then(m => m.Events) },
  { path: 'programs',     loadComponent: ()       =>  import('./pages/programs/programs').then(m => m.Programs) },
  { path: 'map',          loadComponent: ()       => import('./pages/map/map').then(m => m.Map),},
  { path: 'animals',      loadComponent: ()       =>  import('./pages/animals/animals.page').then(m => m.AnimalsPage) },
  { path: 'animals/:id',  loadComponent: ()       =>  import('./pages/animals/animal-detail.page/animal-detail.page').then(m => m.AnimalDetailPage), data: { title: 'Animal' } },
  { path: 'staff',        loadComponent: ()       =>  import('./pages/staff/staff.page').then(m => m.StaffPage) },
  { path: '**', redirectTo: '' },

];
