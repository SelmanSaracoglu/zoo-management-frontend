import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { StaffCreate, Role } from '../../models/staff.model';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule
  ],
  templateUrl: './staff-dialog.html',
  styleUrls: ['./staff-dialog.scss']
})
export class StaffDialog {
  private fb = inject(FormBuilder);
  dialogRef = inject(MatDialogRef<StaffDialog>);

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    role: ['', Validators.required],
    phone: [''],
    email: [''],
  });

  roles = Object.values(Role);

  save(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
