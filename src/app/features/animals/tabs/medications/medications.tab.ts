import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MedicationApiService } from '../../data-access/medication-api.service';
import { Medication } from '../../data-access/models/medication.model';
import { MedicationDialog } from './medication.dialog';

@Component({
    
    standalone: true,
    selector: 'app-medications-tab',
    imports: [CommonModule, MatListModule, MatButtonModule, MatDialogModule],
    templateUrl: './medications.tab.html',
    styleUrls: ['./medications.tab.scss']

})

export class MedicationsTab implements OnChanges {
    @Input({ required: true }) animalId!: number;

    private api = inject(MedicationApiService);
    private dialog = inject(MatDialog);

    items: Medication[] = [];

    ngOnChanges(changes: SimpleChanges) {
        if (changes['animalId'] && this.animalId) this.load();        
    }

    load() {
        this.api.listByAnimal(this.animalId)
            .subscribe(d=> this.items = [...d].sort((a,b) => b.givenAt.localeCompare(a.givenAt)));
    }

    add() {
        const ref = this.dialog.open(MedicationDialog);
        ref.afterClosed().subscribe(val => {
            if (!val) return;
            this.api.createForAnimal(this.animalId, val).subscribe(()=> this.load)
        });
    }
    remove(id: number) {
        this.api.delete(id).subscribe(()=> this.load)
    }
}