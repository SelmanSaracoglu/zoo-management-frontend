import { Component, ChangeDetectionStrategy, OnInit, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { Animal } from '../../../models/animal.model';
import { AnimalsApiService } from '../../../core/api/animals-api.service';
import { SnackbarService } from '../../../core/ui/snackbar.service';
import { FeedLog } from '../../../models/feed-log.model';
import { FeedLogApiService } from '../../../core/api/feed-log-api.service';
import { FeedLogDialog } from './feed-log.dialog';
import { HealthApiService } from '../../../core/api/health-api.service';
import { HealthCheck } from '../../../models/health-check.model';
import { HealthDialog } from './health-dialog';



@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
  NgFor, NgIf, CommonModule, DatePipe, MatCardModule, MatButtonModule, MatIconModule, MatTabsModule, MatListModule
  ],
  templateUrl: './animal-detail.page.html',
  styleUrls: ['./animal-detail.page.scss'],
})
export class AnimalDetailPage implements OnInit {
  animal = signal<Animal | null>(null);
  health = signal<HealthCheck[]>([]);
  feedLogs = signal<FeedLog [] | null>(null);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snack = inject(SnackbarService);
  private api = inject(AnimalsApiService);

  private feedLogApi = inject(FeedLogApiService);
  private healthApi = inject(HealthApiService);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.snack.error('Invalid animal id.');
      this.back();
      return;
    }

    this.loadAnimal(id);
    this.loadHealth(id);
    this.loadFeedLogs(id);
  }

  private loadAnimal(id: number): void {
    this.api.getById(id).subscribe({
      next: (a) => this.animal.set(a),
      error: () => {
        this.snack.error('Animal not found.');
        this.back();
      },
    });
  }

  private loadHealth(animalId: number) {
  this.healthApi.list(animalId).subscribe(rows => {
    this.health.set([...rows].sort((a, b) => b.checkTime.localeCompare(a.checkTime)));
  });
}

  back(): void {
    this.router.navigate(['/animals']);
  }

  openHealthDialog(): void {
    const ref = this.dialog.open(HealthDialog);
    ref.afterClosed().subscribe(formValue => {
      if (formValue && this.animal()) {
        const id = this.animal()!.id;
        this.healthApi.create(id, formValue).subscribe(() => this.loadHealth(id));
      }
    });
  }

  private loadFeedLogs(animalId: number) {
    this.feedLogApi.list(animalId).subscribe(rows => this.feedLogs.set(rows));
  }
  addFeedLog(): void {
    const ref = this.dialog.open(FeedLogDialog);
    ref.afterClosed().subscribe(formValue => {
      if (formValue && this.animal()) {
        const id = this.animal()!.id;
        this.feedLogApi.create(id, formValue).subscribe(() => this.loadFeedLogs(id));
      }
    });
  }
}