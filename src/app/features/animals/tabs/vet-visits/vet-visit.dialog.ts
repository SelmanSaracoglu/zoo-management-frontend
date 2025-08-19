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
  templateUrl: './vet-visit.dialog.html',
  styleUrls: ['./vet-visit.dialog.scss'],
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule,
    MatFormFieldModule, MatInputModule, MatButtonModule
  ],
})
export class VetVisitDialog {
  private fb = inject(FormBuilder);
  private ref = inject(MatDialogRef<VetVisitDialog, any>);

  form = this.fb.group({
    // BE: visitTime → LocalDateTime, followUpOn → LocalDate
    visitTime: ['', Validators.required],     // <input type="datetime-local">
    purpose: ['', Validators.required],
    diagnosis: [''],
    treatment: [''],
    followUpOn: ['']                           // <input type="date">
  });

  save(){ if (this.form.valid) this.ref.close(this.form.value); }
  cancel(){ this.ref.close(null); }
}
