import { Component, ChangeDetectionStrategy, OnInit, inject, signal } from '@angular/core';
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
import { FeedingSchedule } from '../../../models/feeding.model';
import { FeedingApiService } from '../../../core/api/feeding-api.service';
import { FeedingFormDialog } from './feeding-form.dialog';
import { HealthApiService } from '../../../core/api/health-api.service';
import { HealthRecord } from '../../../models/health.model';
import { HealthDialog } from './health-dialog';


@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf, NgFor, MatCardModule, MatButtonModule, MatIconModule, MatTabsModule, MatListModule
  ],
  templateUrl: './animal-detail.page.html',
  styleUrls: ['./animal-detail.page.scss'],
})
export class AnimalDetailPage implements OnInit {
  animal = signal<Animal | null>(null);
  feedings = signal<FeedingSchedule[]>([]);
  healthRecords = signal<HealthRecord[]>([]);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snack = inject(SnackbarService);
  private api = inject(AnimalsApiService);
  private feedingApi = inject(FeedingApiService);
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
    this.loadFeedings(id);
    this.loadHealth(id);
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

  private loadFeedings(animalId: number): void {
    this.feedingApi.getByAnimal(animalId).subscribe({
      next: (list: FeedingSchedule[]) => this.feedings.set(list),
      error: () => this.snack.error('Failed to load feedings.'),
    });
  }

  private loadHealth(animalId: number): void {
    this.healthApi.list(animalId).subscribe({
      next: (records) => this.healthRecords.set(records),
      error: () => this.snack.error('Failed to load health records.'),
    });
  }

  back(): void {
    this.router.navigate(['/animals']);
  }

  addFeeding(): void {
    const ref = this.dialog.open(FeedingFormDialog);

    ref.afterClosed().subscribe((formValue) => {
      if (formValue && this.animal()) {
        const id = this.animal()!.id;
        this.feedingApi.create(id, formValue).subscribe(() => this.loadFeedings(id));
      }
    });
  }

  addHealth(): void {
    const ref = this.dialog.open(HealthDialog);

    ref.afterClosed().subscribe((formValue) => {
      if (formValue && this.animal()) {
        const id = this.animal()!.id;
        this.healthApi.create(id, formValue).subscribe(() => this.loadHealth(id));
      }
    });
  }
}