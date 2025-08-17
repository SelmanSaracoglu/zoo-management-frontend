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
  templateUrl: './feed-log.dialog.html',
  styleUrls: ['./feed-log.dialog.scss'],
  imports: [
    ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, CommonModule, MatDialogModule
  ],
})

export class FeedLogDialog {
    private fb = inject(FormBuilder);
    private dialogRef = inject(MatDialogRef<FeedLogDialog>);

    form = this.fb.group({
        feedTime: ['', Validators.required],
        foodItem: ['', Validators.required],
        quantityGrams: [null],
        waterMilliliters: [null],
        notes: [''],
    });

    save(): void {
      if (this.form.invalid) return;
      const v = this.form.value as any;
      const feedTime = v.feedTime?.length === 16 ? v.feedTime + ':00' : v.feedTime;
      this.dialogRef.close({ ...v, feedTime });
    }    

    cancel(): void {
      this.dialogRef.close();
    }
}