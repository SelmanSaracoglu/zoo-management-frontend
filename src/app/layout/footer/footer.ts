import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-footer',
  imports: [CommonModule, MatIconModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss']
})
export class Footer {

}
