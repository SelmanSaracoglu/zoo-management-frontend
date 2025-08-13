import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgIf, AsyncPipe } from '@angular/common';

import { StaffApiService } from '../../core/api/staff-api.service';
import { Staff } from '../../models/staff.model';
import { SnackbarService } from '../../core/ui/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { StaffDialog } from './staff-dialog';

@Component({
  standalone: true,
  selector: 'app-staff',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCardModule, MatTableModule, MatButtonModule, MatIconModule
  ],
  templateUrl: './staff.page.html',
  styleUrls: ['./staff.page.scss']
})
export class StaffPage implements OnInit {
  private api = inject(StaffApiService);
  private snack = inject(SnackbarService);
  private dialog = inject(MatDialog);

  staffList = signal<Staff[]>([]);

  displayedColumns = ['name', 'role', 'email', 'phone', 'actions'];

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.api.list().subscribe({
      next: list => this.staffList.set(list),
      error: () => this.snack.error('Failed to load staff list')
    });
  }

  openAddDialog(): void {
    const ref = this.dialog.open(StaffDialog);
    ref.afterClosed().subscribe(result => {
      if (result) {
        this.api.create(result).subscribe({
          next: () => {
            this.snack.success('Staff created');
            this.load();
          },
          error: () => this.snack.error('Failed to create staff')
        });
      }
    });
  }
}
