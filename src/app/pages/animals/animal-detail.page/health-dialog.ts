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
import { HealthCheck, HealthCheckCreate } from '../../../features/animals/data-access/models/health-check.model';

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
  checkTime: ['', Validators.required],  // datetime-local -> 'YYYY-MM-DDTHH:mm'
  heartRateBpm: [null, [Validators.min(0)]],
  temperatureC: [null],
  respirationRpm: [null],
  condition: [''],
  notes: [''],
});


save(): void {
  if (this.form.invalid) return;
  const v = this.form.value as any;
  
  const payload = {
    ...v,
    heartRateBpm: v.heartRateBpm != null ? Number(v.heartRateBpm) : null,
    temperatureC: v.temperatureC != null ? Number(v.temperatureC) : null,
    respirationRpm: v.respirationRpm != null ? Number(v.respirationRpm) : null,
    checkTime: v.checkTime?.length === 16 ? v.checkTime + ':00' : v.checkTime, // saniye ekle
  };
  this.dialogRef.close(payload);
}

cancel(): void {
        this.dialogRef.close();
    }
}