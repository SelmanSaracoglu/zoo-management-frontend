// Bu sınıf başka yerlerde kullanılabilir, bağımlılık olarak eklenebilir
import { Injectable, inject } from '@angular/core';
// Angular Material’in sunduğu bildirim (toast/alert) gösterme servisidir.
import { MatSnackBar } from '@angular/material/snack-bar';

// Centralized snack messages for success/info/error. 
@Injectable({ providedIn: 'root' })
export class SnackbarService {
  private snack = inject(MatSnackBar); //Klasik constructor üzerinden injection yapmak yerine,
  //  fonksiyon içinde bağımlılığı alma imkanı sunar.
  success(message: string, action = 'Close', duration = 3000) {
    this.snack.open(message, action, { duration, panelClass: ['snack-success'] });
  }

  error(message: string, action = 'Close', duration = 5000) {
    this.snack.open(message, action, { duration, panelClass: ['snack-error'] });
  }

  info(message: string, action = 'OK', duration = 3000) {
    this.snack.open(message, action, { duration });
  }
}