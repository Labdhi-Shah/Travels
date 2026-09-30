import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { DashboardSidebarComponent } from './dashboard-sidebar/dashboard-sidebar.component';
import { LucideIconComponent } from '../../shared/icon/lucide-icon.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, DashboardSidebarComponent, LucideIconComponent],
  template: `
    <div class="min-h-screen bg-[#F8FAFC] text-[#17202A] flex flex-col">
      <!-- Sidebar -->
      <app-dashboard-sidebar
        [isCollapsed]="isCollapsed()"
        [isMobileOpen]="isMobileOpen()"
        (toggleCollapse)="toggleSidebarCollapse()"
        (closeMobile)="closeMobileSidebar()"
      ></app-dashboard-sidebar>

      <!-- Main Content Area -->
      <div
        class="flex-1 flex flex-col transition-all duration-300"
        [ngClass]="{
          'lg:pl-64': !isCollapsed(),
          'lg:pl-20': isCollapsed()
        }"
      >
        <!-- Topbar -->
        <header class="sticky top-0 z-30 h-18 bg-white/92 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          <!-- Left: Mobile Menu Toggle & Title -->
          <div class="flex items-center gap-3">
            <button
              type="button"
              (click)="openMobileSidebar()"
              class="lg:hidden p-2 rounded-xl text-[#071328] hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Open sidebar menu"
            >
              <app-icon name="menu" [size]="20"></app-icon>
            </button>

            <div>
              <span class="text-[10px] font-bold text-[#0084FF] uppercase tracking-wider hidden sm:block">
                Traveler Workspace
              </span>
              <h1 class="text-base sm:text-lg font-bold text-[#071328] font-display">
                TripSphere Portal
              </h1>
            </div>
          </div>

          <!-- Right: Actions & User Menu -->
          <div class="flex items-center gap-2.5 sm:gap-3">
            
            <!-- Quick Link to Public Site -->
            <a
              routerLink="/"
              class="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#071328] hover:bg-slate-100 rounded-xl transition-colors"
              title="Return to Public Site"
            >
              <app-icon name="globe" [size]="14"></app-icon>
              <span>Explore Site</span>
            </a>

            <!-- Plan Trip CTA -->
            <a
              routerLink="/plan-trip"
              class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0084FF] hover:bg-[#0070D8] text-white text-xs sm:text-sm font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <app-icon name="plus" [size]="15"></app-icon>
              <span>Plan Trip</span>
            </a>

            <!-- Notification Bell -->
            <div class="relative">
              <button
                type="button"
                (click)="toggleNotifications()"
                class="w-9 h-9 rounded-xl border border-slate-200 hover:bg-slate-100 text-[#071328] flex items-center justify-center transition-colors relative cursor-pointer"
                aria-label="View notifications"
              >
                <app-icon name="bell" [size]="16"></app-icon>
                <span class="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#0084FF]"></span>
              </button>

              <!-- Notifications Dropdown -->
              @if (showNotifications()) {
                <div
                  class="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 animate-fade-in"
                >
                  <div class="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span class="text-xs font-bold uppercase text-[#071328]">Notifications</span>
                    <span class="text-[10px] bg-blue-50 text-[#0084FF] font-bold px-2 py-0.5 rounded-full">2 New</span>
                  </div>
                  <div class="py-2 divide-y divide-slate-100 space-y-2">
                    <div class="pt-2 text-xs">
                      <p class="font-bold text-[#071328]">Flight 6E-204 Gate Assigned</p>
                      <p class="text-[#6B7280] mt-0.5">BOM Gate 14B. Boarding starts at 06:15 AM.</p>
                    </div>
                    <div class="pt-2 text-xs">
                      <p class="font-bold text-[#071328]">Taj Exotica Suite Confirmed</p>
                      <p class="text-[#6B7280] mt-0.5">Goa check-in confirmed for Oct 05.</p>
                    </div>
                  </div>
                </div>
              }
            </div>

            <!-- Profile Avatar link -->
            <a
              routerLink="/profile"
              class="flex items-center gap-2 pl-2 border-l border-slate-200"
              title="View Profile"
            >
              <img
                [src]="authService.currentUser()?.avatar"
                [alt]="authService.currentUser()?.fullName"
                class="w-8 h-8 rounded-full object-cover border-2 border-transparent hover:border-[#0084FF] transition-all"
              />
            </a>

          </div>
        </header>

        <!-- Dynamic Dashboard Routed Page -->
        <main class="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `
})
export class DashboardLayoutComponent {
  authService = inject(AuthService);

  isCollapsed = signal(false);
  isMobileOpen = signal(false);
  showNotifications = signal(false);

  toggleSidebarCollapse(): void {
    this.isCollapsed.update(c => !c);
  }

  openMobileSidebar(): void {
    this.isMobileOpen.set(true);
  }

  closeMobileSidebar(): void {
    this.isMobileOpen.set(false);
  }

  toggleNotifications(): void {
    this.showNotifications.update(n => !n);
  }
}
