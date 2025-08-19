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
  templateUrl: './weight-log.dialog.html',
  styleUrls: ['./weight-log.dialog.scss'],
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule,
    MatFormFieldModule, MatInputModule, MatButtonModule
  ],
})

export class WeightLogDialog {

    private fb = inject(FormBuilder);
    private ref = inject(MatDialogRef<WeightLogDialog, any>);

    form = this.fb.group({
        weightKg: [null as unknown as number, { validators: [Validators.required] }],
        // BE LocalDateTime ile uyumlu, "YYYY-MM-DDTHH:mm"
        loggedAt: ['', Validators.required],
        note: [''],
    });

    save(){ if (this.form.valid) this.ref.close(this.form.value); }
    cancel(){ this.ref.close(null); }
        
}