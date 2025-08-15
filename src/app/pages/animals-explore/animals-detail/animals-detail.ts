import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AnimalVisitorService } from '../../../core/api/animals-visitor.service';
import { VisitorAnimal } from '../../../models/animals-visitor.model';

@Component({
  selector: 'app-animals-detail',
  standalone: true,
  imports: [CommonModule,MatCardModule],
  templateUrl: './animals-detail.html',
  styleUrls: ['./animals-detail.scss']
})
export class AnimalsDetail {
  private route = inject(ActivatedRoute)
  private animalService = inject(AnimalVisitorService)

  animal?:VisitorAnimal;

  constructor(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(id) {
      this.animalService.getById(id).subscribe({
        next: (res) => (this.animal = res),
        error: (err) => console.error('Not loaded')
      })
    }
  }

}
