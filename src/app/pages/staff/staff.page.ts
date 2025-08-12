import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  imports: [MatCardModule],
  template: `
    <div style="padding:16px">
      <mat-card>
        <mat-card-title>Staff</mat-card-title>
        <mat-card-content>Personel ve atamalar burada olacak.</mat-card-content>
      </mat-card>
    </div>
  `,
})
export class StaffPage {}
