import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideIconComponent } from '../../../shared/icon/lucide-icon.component';
import { AuthService } from '../../../core/services/auth.service';

interface NavItem {
  label: string;
  path: string;
  icon: string;
  exact?: boolean;
}

@Component({
  selector: 'app-dashboard-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LucideIconComponent],
  template: `
    <!-- Mobile Backdrop -->
    @if (isMobileOpen) {
      <div
        class="fixed inset-0 z-40 bg-[#0B1320]/60 backdrop-blur-sm lg:hidden"
        (click)="closeMobile.emit()"
      ></div>
    }

    <!-- Sidebar Container -->
    <aside
      class="fixed top-0 bottom-0 left-0 z-40 flex flex-col bg-[#071328] text-white border-r border-white/10 transition-all duration-300 ease-in-out"
      [ngClass]="{
        'translate-x-0': isMobileOpen,
        '-translate-x-full lg:translate-x-0': !isMobileOpen,
        'w-64': !isCollapsed,
        'w-20': isCollapsed
      }"
    >
      <!-- Header / Logo -->
      <div class="h-18 flex items-center justify-between px-5 border-b border-white/10">
        <a routerLink="/" class="flex items-center gap-2.5 overflow-hidden">
          <div class="w-9 h-9 rounded-xl bg-[#0084FF] text-white flex items-center justify-center shrink-0 shadow-md">
            <app-icon name="paper-plane" [size]="18" [isFilled]="true"></app-icon>
          </div>
          @if (!isCollapsed) {
            <div class="flex flex-col min-w-0">
              <span class="text-base font-bold tracking-tight font-display whitespace-nowrap">
                Trip<span class="text-[#0084FF]">Sphere</span>
              </span>
              <span class="text-[9px] uppercase tracking-widest text-[#EFEDE7]/60 font-semibold -mt-0.5">
                Traveler Portal
              </span>
            </div>
          }
        </a>

        <!-- Collapse toggle on Desktop -->
        <button
          type="button"
          (click)="toggleCollapse.emit()"
          class="hidden lg:flex w-7 h-7 rounded-lg text-white/60 hover:text-white hover:bg-white/10 items-center justify-center cursor-pointer"
          [attr.aria-label]="isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
        >
          <app-icon [name]="isCollapsed ? 'chevron-right' : 'chevron-left'" [size]="16"></app-icon>
        </button>

        <!-- Close button on Mobile -->
        <button
          type="button"
          (click)="closeMobile.emit()"
          class="lg:hidden w-7 h-7 rounded-lg text-white/60 hover:text-white hover:bg-white/10 flex items-center justify-center cursor-pointer"
          aria-label="Close sidebar"
        >
          <app-icon name="x" [size]="18"></app-icon>
        </button>
      </div>

      <!-- Navigation List -->
      <div class="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 no-scrollbar">
        @if (!isCollapsed) {
          <p class="px-3 text-[10px] font-bold uppercase tracking-wider text-white/40 mb-2">
            Workspace
          </p>
        }

        @for (item of navItems; track item.path) {
          <a
            [routerLink]="item.path"
            routerLinkActive="bg-[#0084FF]/20 text-[#38BDF8] font-bold border-l-2 border-[#0084FF]"
            [routerLinkActiveOptions]="{ exact: item.exact ?? false }"
            (click)="closeMobile.emit()"
            class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors group cursor-pointer"
            [title]="isCollapsed ? item.label : ''"
          >
            <app-icon
              [name]="item.icon"
              [size]="18"
              extraClass="shrink-0 transition-transform group-hover:scale-110"
            ></app-icon>
            @if (!isCollapsed) {
              <span class="truncate">{{ item.label }}</span>
            }
          </a>
        }
      </div>

      <!-- User Card & Exit -->
      <div class="p-3 border-t border-white/10">
        <div class="flex items-center gap-3 p-2 rounded-xl bg-white/5">
          <img
            [src]="authService.currentUser()?.avatar"
            [alt]="authService.currentUser()?.fullName"
            class="w-9 h-9 rounded-full object-cover shrink-0"
          />
          @if (!isCollapsed) {
            <div class="flex-1 min-w-0">
              <p class="text-xs font-bold text-white truncate">
                {{ authService.currentUser()?.fullName }}
              </p>
              <p class="text-[10px] text-white/50 truncate">
                {{ authService.currentUser()?.email }}
              </p>
            </div>
            <button
              type="button"
              (click)="authService.logout()"
              class="text-white/60 hover:text-[#0084FF] p-1.5 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <app-icon name="log-out" [size]="16"></app-icon>
            </button>
          }
        </div>
      </div>
    </aside>
  `
})
export class DashboardSidebarComponent {
  authService = inject(AuthService);

  @Input() isCollapsed = false;
  @Input() isMobileOpen = false;
  @Output() toggleCollapse = new EventEmitter<void>();
  @Output() closeMobile = new EventEmitter<void>();

  navItems: NavItem[] = [
    { label: 'Dashboard', path: '/dashboard', icon: 'activity', exact: true },
    { label: 'Plan My Trip', path: '/plan-trip', icon: 'plus' },
    { label: 'My Trips', path: '/my-trips', icon: 'map' },
    { label: 'My Itineraries', path: '/itinerary', icon: 'calendar' },
    { label: 'Bookings', path: '/bookings', icon: 'credit-card' },
    { label: 'Favorites', path: '/favorites', icon: 'heart' },
    { label: 'Budget', path: '/budget', icon: 'dollar-sign' },
    { label: 'Profile', path: '/profile', icon: 'user' }
  ];
}
