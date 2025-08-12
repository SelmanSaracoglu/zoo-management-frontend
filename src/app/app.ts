import { Component,inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Route, Router, ActivatedRoute, NavigationEnd, } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';
import { LoadingService } from './core/ui/loading.service';
import { filter, map } from 'rxjs';


type NavItem = { label: string; icon: string; path: string };

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, RouterLink, RouterLinkActive,
    MatToolbarModule, MatSidenavModule, MatListModule,
    MatIconModule, MatButtonModule, MatDividerModule, 
    MatProgressBarModule, NgIf
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {
  title = 'Zoo Management';
  loading = inject(LoadingService); // template'te loading.isLoading()

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(()=> {
        let r = this.route;
        while (r.firstChild) r = r.firstChild;
        return r.snapshot.data['title'] ?? 'Zoo Management';
      })
    ).subscribe(t=> this.title=t);    
  }

  sidenavOpened = signal(true);

  toggleSidenav() {
    this.sidenavOpened.set(!this.sidenavOpened());
  }

    // Basit menü yapısı (route'lar 1.5'te eklenecek)
  nav = signal<NavItem[]>([
    { label: 'Dashboard', icon: 'dashboard', path: '/' },
    { label: 'Animals',   icon: 'pets',      path: '/animals' },
    { label: 'Feeding',   icon: 'restaurant',path: '/feeding' },
    { label: 'Health',    icon: 'vaccines',  path: '/health' },
    { label: 'Staff',     icon: 'groups',    path: '/staff' },
  ]);
}
