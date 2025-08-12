import {
  Component, OnInit, AfterViewInit, ViewChild, inject,
  ChangeDetectionStrategy, signal,
  viewChild
} from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SnackbarService } from '../../core/ui/snackbar.service';
import { AnimalDialogComponent } from '../animals/animal-dialog.component';
import { Animal, AnimalCreate, AnimalUpdate } from '../../models/animal.model';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AnimalsApiService } from '../../core/api/animals-api.service';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../shared/ui/confirm-dialog/confirm-dialog.component';




@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    MatCardModule,
    MatTableModule, MatSortModule, MatPaginatorModule,
    MatFormFieldModule, MatInputModule,
    MatIconModule, MatButtonModule, MatDialogModule
  ],
  templateUrl: './animals.page.html',
  styleUrls: ['./animals.page.scss'],
})


export class AnimalsPage implements OnInit,AfterViewInit{
  // public API used by template
  displayedColumns: (keyof Animal | 'abilities' | 'actions') [] = 
  ['name', 'type', 'diet', 'age', 'gender', 'abilities', 'actions'];

  dataSource = new MatTableDataSource<Animal>([]);
  filter = signal('');

  @ViewChild(MatSort) private sort!: MatSort;
  @ViewChild(MatPaginator) private paginator!: MatPaginator;

   // inject services as private (encapsulation)
  private api = inject(AnimalsApiService);
  private dialog = inject(MatDialog);
  private snack = inject(SnackbarService);

    ngOnInit(): void {
    this.reload();
  }

  ngAfterViewInit(): void {
    // attach sort & paginator after view init as well (safety)
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

    public reload(): void {
    this.api.list().subscribe({
      next: (items) => {
        this.dataSource = new MatTableDataSource(items ?? []);
        // re-attach sort/paginator on new dataSource
        if (this.sort) this.dataSource.sort = this.sort;
        if (this.paginator) this.dataSource.paginator = this.paginator;

        this.dataSource.filterPredicate = (row: Animal, text: string) => {
          const q = text.trim().toLowerCase();
          if (!q) return true;
          return (
            row.name.toLowerCase().includes(q) ||
            row.type.toLowerCase().includes(q) ||
            row.diet.toLowerCase().includes(q) ||
            row.gender.toLowerCase().includes(q) ||
            row.color.toLowerCase().includes(q)
          );
        };
        this.dataSource.filter = this.filter();
      },
      error: () => {
        this.dataSource = new MatTableDataSource<Animal>([]);
        if (this.sort) this.dataSource.sort = this.sort;
        if (this.paginator) this.dataSource.paginator = this.paginator;
      }
    });
  }

    public applyFilter(ev: Event): void {
    const input = ev.target as HTMLInputElement;
    this.filter.set(input.value ?? '');
    this.dataSource.filter = this.filter();
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

    public clearFilter(): void {
    this.filter.set('');
    this.dataSource.filter = '';
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

    public openCreate(): void {
    const ref = this.dialog.open<AnimalDialogComponent, any, AnimalCreate>(AnimalDialogComponent, {
      width: '560px',
      data: { mode: 'create' },
      disableClose: true,
    });

    ref.afterClosed().subscribe(result => {
      if (!result) return;
      this.api.create(result).subscribe({
        next: () => {
          this.snack.success('Animal created successfully.');
          this.reload();
        },
        error: () => { /* ErrorInterceptor shows snackbar */ }
      });
    });
  }
  // placeholders for next steps
  edit(a: Animal): void {
    const ref = this.dialog.open<AnimalDialogComponent, any, AnimalCreate>(AnimalDialogComponent, {
      width: '560px',
      data: {mode: 'edit', animal: a },
      disableClose: true,
    });

    ref.afterClosed().subscribe(result => {
      if (!result) return; // dialog cancelled
      const payload: AnimalUpdate = result; // same shape as create/update
      this.api.update(a.id, payload).subscribe({
        next: () =>{
          this.snack.success('Animal updated successfully.');
          this.reload();
        },
        error: () => {/* ErrorInterceptor already shows a snackbar */}
      });
    });
  }
  
  // ----- Delete -----
  remove(a: Animal): void {
    const ref = this.dialog.open<ConfirmDialogComponent, ConfirmDialogData, boolean>(ConfirmDialogComponent, {
      width: '420px',
      data: {
        title: 'Delete animal',
        message: `This will permanently delete "${a.name}". Continue?`,
        confirmText: 'Delete',
        cancelText: 'Cancel',
      },
      disableClose: true,
    });

    ref.afterClosed().subscribe(ok => {
      if (!ok) return;

      this.api.delete(a.id).subscribe({
        next: () => {
          // Optimistic UI: update table without full reload
          this.dataSource.data = this.dataSource.data.filter(x => x.id !== a.id);
          this.dataSource.paginator?.firstPage();
          this.snack.success('Animal deleted.');
        },
        error: () => {}
      });
    });
  }
}

    
