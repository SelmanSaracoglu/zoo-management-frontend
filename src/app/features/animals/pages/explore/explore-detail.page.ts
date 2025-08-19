import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { AnimalVisitorService } from '../../data-access/animals-visitor.service';
import { VisitorAnimal } from '../../data-access/models/animals-visitor.model';


@Component({
  selector: 'app-animals-detail',
  standalone: true,
  imports: [CommonModule,MatCardModule],
  templateUrl: './explore-detail.page.html',
  styleUrls: ['./explore-detail.page.scss']
})
export class ExploreDetailPage  {
  private route = inject(ActivatedRoute)
  private animalService = inject(AnimalVisitorService)

  animal?:VisitorAnimal;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(id) {
      this.animalService.getById(id).subscribe({
        next: (res) => (this.animal = res),
        error: () => console.error('Not loaded')
      });
    }
  }


}






