import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface ConfirmDialogData {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

@Component({
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})

export class ConfirmDialogComponent {
  private ref = inject(MatDialogRef<ConfirmDialogComponent, boolean>);
  data = inject<ConfirmDialogData>(MAT_DIALOG_DATA);

  close(ok: boolean) {
    this.ref.close(ok);
  }
}