import { Routes } from "@angular/router";

export const ANIMALS_ROUTES: Routes = [
    // Manage (admin)
  { path: '', loadComponent: () => import('../../pages/animals/animals.page')
                                   .then(m => m.AnimalsPage) },
  { path: ':id', loadComponent: () => import('../../pages/animals/animal-detail.page/animal-detail.page')
                                     .then(m => m.AnimalDetailPage) },
  { path: 'explore', loadComponent: () => import('./pages/explore/explore.page')
                                         .then(m => m.ExplorePage) },
  { path: 'explore/:id', loadComponent: () => import('./pages/explore/explore-detail.page')
                                            .then(m => m.ExploreDetailPage) },
];