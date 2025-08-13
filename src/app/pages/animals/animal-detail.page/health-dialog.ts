import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RecordType, HealthRecordCreate } from '../../../models/health.model';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatButtonModule, MatDatepickerModule, MatNativeDateModule
  ],
  templateUrl: './health-dialog.html',
  styleUrls: ['./health-dialog.scss'],
})

export class HealthDialog{
    private fb = inject(FormBuilder);
    dialogRef = inject(MatDialogRef<HealthDialog>);

form = this.fb.group({
  recordDate: [new Date(), Validators.required],
  type: ['' as RecordType, Validators.required],
  description: ['', Validators.required],
  veterinarianName: ['', Validators.required],
});

    recordTypes = Object.values(RecordType);

    save(): void {
        if (this.form.valid) {
        this.dialogRef.close(this.form.value);
    }
        }
    cancel(): void {
        this.dialogRef.close();
    }
}