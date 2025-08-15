import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AnimalVisitorService } from '../../core/api/animals-visitor.service';
import { VisitorAnimal } from '../../models/animals-visitor.model';
import { ActivatedRoute } from '@angular/router';
import { RouterLink, RouterModule } from '@angular/router';
import { SnackbarService } from '../../core/ui/snackbar.service';

@Component({
  selector: 'app-animals-explore',
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterModule],
  templateUrl: './animals-explore.html',
  styleUrls: ['./animals-explore.scss']
})
export class AnimalsExplore {
  private route = inject(ActivatedRoute)
  private animalService = inject(AnimalVisitorService);
  private snackbar = inject(SnackbarService);
  animals: VisitorAnimal[] = [];

  ngOnInit() {
  this.animalService.list().subscribe({
    next: (res: VisitorAnimal[]) => {
      this.animals = res;
    },
    error: (err: any) => {
      console.error('Not Loaded', err);
      this.snackbar.error('Hayvanlar yüklenemedi. Lütfen daha sonra tekrar deneyin.');
    }
  });
}
}