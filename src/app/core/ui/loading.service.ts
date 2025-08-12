import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private active = signal(0);                    // kaç istek aktif?
  readonly isLoading = computed(() => this.active() > 0);

  show() { this.active.update(v => v + 1); }
  hide() { this.active.update(v => Math.max(0, v - 1)); }
  reset() { this.active.set(0); }
}
