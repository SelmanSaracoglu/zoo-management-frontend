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
  templateUrl: './medication.dialog.html',
  styleUrls: ['./medication.dialog.scss'],
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule,
    MatFormFieldModule, MatInputModule, MatButtonModule
  ],
})

export class MedicationDialog {
    private fb = inject(FormBuilder);
    private ref = inject(MatDialogRef<MedicationDialog, any>);

    form = this.fb.group({
        medName: ['', Validators.required],
        dose: [''],
        route: [''],
        givenAt: ['', Validators.required], // <input type="datetime-local">
        reason: [''],
    });

    save() { if (this.form.valid) this.ref.close(this.form.value); }
    cancel() { this.ref.close(null); }
}