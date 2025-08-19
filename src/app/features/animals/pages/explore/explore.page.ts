import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { VisitorAnimal } from '../../data-access/models/animals-visitor.model';
import { ActivatedRoute } from '@angular/router';
import { RouterLink, RouterModule } from '@angular/router';
import { SnackbarService } from '../../../../core/ui/snackbar.service';
import { AnimalVisitorService } from '../../data-access';


@Component({
  selector: 'app-explore-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterModule],
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss']
})
export class ExplorePage {
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