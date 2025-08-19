import { Component, Input, OnChanges, SimpleChanges, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DietPlanApiService } from '../../data-access/diet-plan-api.service';
import { DietPlan } from '../../data-access/models/diet-plan.model';
import { DietPlanDialog } from './diet-plan.dialog';

@Component({
  standalone: true,
  selector: 'app-diet-plans-tab',
  imports: [CommonModule, MatListModule, MatButtonModule, MatDialogModule],
  templateUrl: './diet-plans.tab.html',
  styleUrls: ['./diet-plans.tab.scss']
})

export class DietPlansTab implements OnChanges {
    @Input({ required: true}) animalId!: number;

    private api = inject(DietPlanApiService);
    private dialog = inject(MatDialog);

    items:  DietPlan[] = [];


  ngOnChanges(changes: SimpleChanges) {
    if (changes['animalId'] && this.animalId) this.load();    
  }

  load() {
    this.api.listByAnimal(this.animalId)
      .subscribe(d => this.items = [...d].sort((a,b) => (b.startDate ?? '').localeCompare(a.startDate ?? '')));
  }

  add() {
    const ref = this.dialog.open(DietPlanDialog);
    ref.afterClosed().subscribe(val => {
      if (!val) return;
      this.api.createForAnimal(this.animalId, val).subscribe(() => this.load());
    });
  }

  remove(id: number) {
    this.api.delete(id).subscribe(() => this.load());
  }


}