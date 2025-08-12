import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ApiClientService } from '../../core/http/api-client.service';

@Component({
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  template: `
    <div style="padding:16px">
      <mat-card>
        <mat-card-title>Dashboard</mat-card-title>
        <mat-card-content>
          The app is running. We will add the pages and features step by step.
        </mat-card-content>
        <div style="padding:8px 0">
          <button mat-raised-button color="primary" (click)="test()">Test Request</button>
        </div>
      </mat-card>
    </div>
  `,
})
export class DashboardPage {
  private api = inject(ApiClientService);
  test() {
    // Backend açık olmasa bile kısa süre loader gözükecek
    this.api.get('/animals').subscribe({
      next: () => {},
      error: () => {}  // hata yönetimini 1.6c'de ekleyeceğiz
    });
  }
}
