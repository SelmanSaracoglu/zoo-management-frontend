import { Component, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  templateUrl: './feeding-form.dialog.html',
  styleUrls: ['./feeding-form.dialog.scss'],
  imports: [
    ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule
  ],
})

export class FeedingFormDialog {
    private fb = inject(FormBuilder);
    dialogRef = inject(MatDialogRef<FeedingFormDialog>);

    form = this.fb.group({
        timeOfDay: ['', Validators.required],
        food: ['', Validators.required],
        portion: ['', Validators.required],
        notes: [''],
    });

    submit(): void {
        if (this.form.invalid) return;
        this.dialogRef.close(this.form.value);
    }

    cancel(): void{
        this.dialogRef.close();
    }
}