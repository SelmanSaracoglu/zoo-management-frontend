import { Injectable, inject } from '@angular/core';
import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SnackbarService } from '../ui/snackbar.service'; //Hata mesajını kullanıcıya göstermek için kullanılan servis.

/** Shows friendly error messages for any failed HTTP call. */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private snack = inject(SnackbarService);

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((err: unknown) => {
        let message = 'Unexpected error occurred.';

        if (err instanceof HttpErrorResponse) {
          if (err.status === 0) {
            message = 'Cannot reach the server. Is the backend running?';
          } else if (err.status >= 500) {
            message = 'Server error. Please try again later.';
          } else if (err.status === 404) {
            message = 'Resource not found.';
          } else if (err.status === 400 || err.status === 422) {
            message = this.extractClientMessage(err) ?? 'Invalid request.';
          } else {
            message = this.extractClientMessage(err) ?? `Request failed (${err.status}).`;
          }
        }

        this.snack.error(message);
        return throwError(() => err);
      })
    );
  }

  private extractClientMessage(err: HttpErrorResponse): string | null {
    const b = err.error;
    if (!b) return null;
    if (typeof b === 'string') return b;
    if (b.message) return b.message;
    if (b.error) return b.error;
    const first = Array.isArray(b?.errors) ? b.errors[0] : null;
    if (first && (first.defaultMessage || first.message)) {
      return first.defaultMessage || first.message;
    }
    return null;
  }
}