import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './diet-plan.dialog.html',
  styleUrls: ['./diet-plan.dialog.scss'],
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule,
    MatFormFieldModule, MatInputModule, MatButtonModule
  ],
})
export class DietPlanDialog {
  private fb = inject(FormBuilder);
  private ref = inject(MatDialogRef<DietPlanDialog, any>);

  form = this.fb.group({
    caloriesKcal: [null as unknown as number, { validators: [Validators.required] }],
    startDate: ['', Validators.required], // <input type="date"> (LocalDate)
    endDate: [''],                        // <input type="date"> (LocalDate, optional)
    notes: ['']
  });

  save(){ if (this.form.valid) this.ref.close(this.form.value); }
  cancel(){ this.ref.close(null); }
}
