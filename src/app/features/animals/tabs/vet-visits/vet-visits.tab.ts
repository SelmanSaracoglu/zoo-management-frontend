import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { VetVisitApiService } from '../../data-access/vet-visit-api.service';
import { VetVisit } from '../../data-access/models/vet-visit.model';
import { VetVisitDialog } from './vet-visit.dialog';

@Component({
  standalone: true,
  selector: 'app-vet-visits-tab',
  imports: [CommonModule, MatListModule, MatButtonModule, MatDialogModule],
  templateUrl: './vet-visits.tab.html',
  styleUrls: ['./vet-visits.tab.scss']
})

export class VetVisitsTab implements OnChanges {
    @Input({ required: true}) animalId!: number;

  private api = inject(VetVisitApiService);
  private dialog = inject(MatDialog);

  items: VetVisit[] = [];


  ngOnChanges(changes: SimpleChanges) {
    if (changes['animalId'] && this.animalId) this.load();
  }

  load() {
    this.api.list(this.animalId)
      .subscribe(d => this.items = [...d].sort((a,b) => b.visitTime.localeCompare(a.visitTime)));
  }

  add() {
    const ref = this.dialog.open(VetVisitDialog);
    ref.afterClosed().subscribe(val => {
      if (!val) return;
      this.api.create(this.animalId, val).subscribe(() => this.load());
    });
  }

  remove(id: number) {
    this.api.delete(id).subscribe(() => this.load());
  }
}