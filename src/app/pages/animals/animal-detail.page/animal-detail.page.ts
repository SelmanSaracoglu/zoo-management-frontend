import { Component, ChangeDetectionStrategy, OnInit, inject, signal } from '@angular/core';
import { CommonModule, DatePipe,NgIf, NgFor } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { Animal } from '../../../features/animals/data-access/models/animal.model';
import { SnackbarService } from '../../../core/ui/snackbar.service';
import { FeedLog } from '../../../features/animals/data-access/models/feed-log.model';
import { FeedLogDialog } from './feed-log.dialog';
import { HealthCheck } from '../../../features/animals/data-access/models/health-check.model';
import { HealthDialog } from './health-dialog';
import { FeedLogApiService, HealthApiService, MedicationApiService, AnimalsApiService } from '../../../features/animals/data-access';
import { MedicationsTab } from '../../../features/animals/tabs/medications/medications.tab';
import { Medication } from '../../../features/animals/data-access/models/medication.model';
import { MedicationDialog } from '../../../features/animals/tabs/medications/medication.dialog';
import { WeightLogsTab } from '../../../features/animals/tabs/weight-logs/weight-logs.tab';
import { HttpErrorResponse } from '@angular/common/http';
import { WeightLog } from '../../../features/animals/data-access/models/weight-log.model';
import { WeightLogApiService } from '../../../features/animals/data-access/weight-log-api.service';
import { WeightLogDialog } from '../../../features/animals/tabs/weight-logs/weight-log.dialog'; 

import { VetVisitsTab } from '../../../features/animals/tabs/vet-visits/vet-visits.tab';
import { VetVisit } from '../../../features/animals/data-access/models/vet-visit.model';
import { VetVisitApiService } from '../../../features/animals/data-access/vet-visit-api.service';
import { VetVisitDialog } from '../../../features/animals/tabs/vet-visits/vet-visit.dialog'; // aşağıda veriyorum

import { DietPlansTab } from '../../../features/animals/tabs/diet-plans/diet-plans.tab';
import { DietPlan } from '../../../features/animals/data-access/models/diet-plan.model';
import { DietPlanApiService } from '../../../features/animals/data-access/diet-plan-api.service';
import { DietPlanDialog } from '../../../features/animals/tabs/diet-plans/diet-plan.dialog'; // dialog dosyasını eklediysen






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

  private medicationApi = inject(MedicationApiService);
  medications = signal<Medication[]>([]);

  private weightApi = inject(WeightLogApiService);
  weightLogs = signal<WeightLog[]>([]);

  private vetApi = inject(VetVisitApiService);
  vetVisits = signal<VetVisit[]>([]);

  private dietApi = inject(DietPlanApiService);
  dietPlans = signal<DietPlan[]>([])

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.snack.error('Invalid animal id.');
      this.back();
      return;
    }

    this.loadMedications(id);
    this.loadAnimal(id);
    this.loadHealth(id);
    this.loadFeedLogs(id);
    this.loadWeightLogs(id);
    this.loadDietPlans(id);
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

  private loadMedications(animalId: number) {
  this.medicationApi.listByAnimal(animalId).subscribe({
    next: (rows) =>
      this.medications.set([...rows].sort((a, b) => b.givenAt.localeCompare(a.givenAt))),
  });
}

addMedication(): void {
  const ref = this.dialog.open(MedicationDialog); // dialog’u eklediysen
  ref.afterClosed().subscribe((formValue?: Partial<Medication>) => {
    if (!formValue) return;
    const id = this.animal()?.id;
    if (!id) return;

    // datetime-local zaten "YYYY-MM-DDTHH:mm" verir → BE LocalDateTime ile uyumlu
    this.medicationApi.createForAnimal(id, {
      medName: formValue.medName ?? '',
      dose: formValue.dose ?? '',
      route: formValue.route ?? '',
      givenAt: String(formValue.givenAt ?? ''),
      reason: formValue.reason ?? ''
    }).subscribe({
      next: () => this.loadMedications(id),
    });
  });
}

deleteMedication(medId: number): void {
  const id = this.animal()?.id;
  if (!id) return;

  this.medicationApi.delete(medId).subscribe({
    next: () => this.loadMedications(id),
  });
}

private loadWeightLogs(animalId: number) {
  this.weightApi.list(animalId).subscribe({
    next: rows =>
      this.weightLogs.set([...rows].sort((a,b) => b.loggedAt.localeCompare(a.loggedAt))),
    error: err => this.handleError(err, 'Weight logs could not be loaded')
  });
}

addWeightLog() {
  const ref = this.dialog.open(WeightLogDialog);
  ref.afterClosed().subscribe(val => {
    if (!val) return;
    const id = this.animal()?.id;
    if (!id) return;
    this.weightApi.create(id, val).subscribe({
      next: () => this.loadWeightLogs(id),
      error: err => this.handleError(err, 'Weight log could not be created')
    });
  });
}

editWeightLog(w: WeightLog) {
  const ref = this.dialog.open(WeightLogDialog, { data: w });
  ref.afterClosed().subscribe(val => {
    if (!val) return;
    this.weightApi.update(w.id, val).subscribe({
      next: () => {
        const id = this.animal()?.id;
        if (id) this.loadWeightLogs(id);
      },
      error: err => this.handleError(err, 'Weight log could not be updated')
    });
  });
}

deleteWeightLog(id: number) {
  const aid = this.animal()?.id;
  if (!aid) return;
  this.weightApi.delete(id).subscribe({
    next: () => this.loadWeightLogs(aid),
    error: err => this.handleError(err, 'Weight log could not be deleted')
  });
}

private loadVetVisits(animalId: number) {
  this.vetApi.list(animalId).subscribe({
    next: rows =>
      this.vetVisits.set([...rows].sort((a,b) => b.visitTime.localeCompare(a.visitTime))),
    error: err => this.handleError(err, 'Vet visits could not be loaded')
  });
}

addVetVisit() {
  const ref = this.dialog.open(VetVisitDialog);
  ref.afterClosed().subscribe(val => {
    if (!val) return;
    const id = this.animal()?.id; if (!id) return;
    this.vetApi.create(id, val).subscribe({
      next: () => this.loadVetVisits(id),
      error: err => this.handleError(err, 'Vet visit could not be created')
    });
  });
}

deleteVetVisit(visitId: number) {
  const id = this.animal()?.id; if (!id) return;
  this.vetApi.delete(visitId).subscribe({
    next: () => this.loadVetVisits(id),
    error: err => this.handleError(err, 'Vet visit could not be deleted')
  });
}

private loadDietPlans(animalId: number) {
  this.dietApi.listByAnimal(animalId).subscribe({
    next: rows => {
      // başlangıç tarihine göre azalan sıralama
      this.dietPlans.set(
        [...rows].sort((a, b) => (b.startDate ?? '').localeCompare(a.startDate ?? ''))
      );
    },
    error: (err: unknown) => this.handleError(err, 'Diet plans could not be loaded'),
  });
}

addDietPlan() {
  const ref = this.dialog.open(DietPlanDialog);
  ref.afterClosed().subscribe(val => {
    if (!val) return;
    const id = this.animal()?.id;
    if (!id) return;

    // Dialog’tan gelen değerler: caloriesKcal, startDate, endDate?, notes?
    this.dietApi.createForAnimal(id, val).subscribe({
      next: () => this.loadDietPlans(id),
      error: (err: unknown) => this.handleError(err, 'Diet plan could not be created'),
    });
  });
}

deleteDietPlan(planId: number) {
  const id = this.animal()?.id;
  if (!id) return;

  this.dietApi.delete(planId).subscribe({
    next: () => this.loadDietPlans(id),
    error: (err: unknown) => this.handleError(err, 'Diet plan could not be deleted'),
  });
}

private handleError(err: unknown, fallback: string) {
  const msg = err instanceof HttpErrorResponse
    ? (err.error?.message ?? err.message ?? fallback)
    : fallback;
  this.snack?.error ? this.snack.error(msg) : console.error(msg);
}

}