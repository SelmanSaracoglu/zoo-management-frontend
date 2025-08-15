import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-animals-explore',
  standalone: true,
  imports: [CommonModule,MatCardModule],
  templateUrl: './animals-explore.html',
  styleUrls: ['./animals-explore.scss']
})
export class AnimalsExplore {
    animals = [
    {
      name: 'African Elephant',
      image: '../assets/images/elephant.jpg',
      description: 'The largest land animal on Earth.'
    },
    {
      name: 'African Lion',
      image: '../assets/images/lion.jpg',
      description: 'Known as the king of the jungle.'
    },
    {
      name: 'Macaw',
      image: '../assets/images/macaw.jpg',
      description: 'A colorful and intelligent parrot species.'
    },
    {
      name: 'Giraffe',
      image: '../assets/images/giraffe.jpg',
      description: 'The tallest animal with a long neck.'
    }
  ];

}
