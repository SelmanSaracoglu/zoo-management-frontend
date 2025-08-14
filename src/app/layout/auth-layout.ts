// src/app/layout/auth-layout.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-auth-layout',
  template: `<router-outlet />`,
  imports: [RouterOutlet]
})
export class AuthLayoutComponent {}
