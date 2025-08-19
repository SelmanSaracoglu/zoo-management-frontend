import { Component, Input, OnChanges, SimpleChanges, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { WeightLogApiService } from '../../data-access/weight-log-api.service';
import { WeightLog } from '../../data-access/models/weight-log.model';
import { WeightLogDialog } from './weight-log.dialog';

@Component({
  standalone: true,
  selector: 'app-weight-logs-tab',
  imports: [CommonModule, MatListModule, MatButtonModule, MatDialogModule],
  templateUrl: './weight-logs.tab.html',
  styleUrls: ['./weight-logs.tab.scss']
})

export class WeightLogsTab implements OnChanges {
    @Input({ required: true  }) animalId!: number;

    private api = inject(WeightLogApiService);
    private dialog = inject(MatDialog);

    items: WeightLog[] = [];

    ngOnChanges(changes: SimpleChanges) {
        if (changes['animalId'] && this.animalId) this.load;
    }

    load() {
    this.api.list(this.animalId)
      .subscribe(d => this.items = [...d].sort((a,b) => b.loggedAt.localeCompare(a.loggedAt)));
    }

    add() {
    const ref = this.dialog.open(WeightLogDialog);
    ref.afterClosed().subscribe(val => {
      if (!val) return;
      this.api.create(this.animalId, val).subscribe(() => this.load());
        });
    }

    remove(id: number) {
    this.api.delete(id).subscribe(() => this.load());
    }



}