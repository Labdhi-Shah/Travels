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
        <header class="sticky top-0 z-30 h-20 bg-white/95 backdrop-blur-md border-b border-[#EFEDE7] px-4 sm:px-6 lg:px-8 flex items-center justify-between shadow-xs">
          
          <!-- Left: Mobile Menu Toggle & Title -->
          <div class="flex items-center gap-3">
            <button
              type="button"
              (click)="openMobileSidebar()"
              class="lg:hidden p-2 rounded-xl text-[#071F22] hover:bg-[#EFEDE7] transition-colors cursor-pointer"
              aria-label="Open sidebar menu"
            >
              <app-icon name="menu" [size]="20"></app-icon>
            </button>

            <div>
              <span class="text-[10px] font-bold text-[#D4A359] uppercase tracking-widest hidden sm:block">
                Traveler Workspace
              </span>
              <h1 class="text-base sm:text-xl font-bold text-[#071F22] font-display">
                TripSphere Portal
              </h1>
            </div>
          </div>

          <!-- Right: Actions & User Menu -->
          <div class="flex items-center gap-2.5 sm:gap-3.5">
            
            <!-- Quick Link to Public Site -->
            <a
              routerLink="/"
              class="hidden md:flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#071F22] hover:bg-[#EFEDE7] rounded-xl transition-all"
              title="Return to Public Site"
            >
              <app-icon name="globe" [size]="14"></app-icon>
              <span>Explore Site</span>
            </a>

            <!-- Plan Trip CTA -->
            <a
              routerLink="/plan-trip"
              class="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full bg-[#0A2D30] hover:bg-[#D4A359] hover:text-[#071F22] text-white text-xs sm:text-sm font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <app-icon name="plus" [size]="15"></app-icon>
              <span>Plan Trip</span>
            </a>

            <!-- Notification Bell -->
            <div class="relative">
              <button
                type="button"
                (click)="toggleNotifications()"
                class="w-10 h-10 rounded-xl border border-[#EFEDE7] hover:bg-[#EFEDE7]/50 text-[#071F22] flex items-center justify-center transition-colors relative cursor-pointer"
                aria-label="View notifications"
              >
                <app-icon name="bell" [size]="17"></app-icon>
                <span class="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#D4A359] ring-2 ring-white"></span>
              </button>

              <!-- Notifications Dropdown -->
              @if (showNotifications()) {
                <div
                  class="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-[#EFEDE7] p-4 z-50 animate-fade-in"
                >
                  <div class="flex items-center justify-between pb-3 border-b border-[#EFEDE7]">
                    <span class="text-xs font-bold uppercase tracking-wider text-[#071F22]">Notifications</span>
                    <span class="text-[10px] bg-[#D4A359]/15 text-[#B88738] font-bold px-2 py-0.5 rounded-full">2 New</span>
                  </div>
                  <div class="py-2 divide-y divide-[#EFEDE7] space-y-2">
                    <div class="pt-2 text-xs">
                      <p class="font-bold text-[#071F22]">Flight 6E-204 Gate Assigned</p>
                      <p class="text-[#6B7280] mt-0.5">BOM Gate 14B. Boarding starts at 06:15 AM.</p>
                    </div>
                    <div class="pt-2 text-xs">
                      <p class="font-bold text-[#071F22]">Taj Exotica Suite Confirmed</p>
                      <p class="text-[#6B7280] mt-0.5">Goa check-in confirmed for Oct 05.</p>
                    </div>
                  </div>
                </div>
              }
            </div>

            <!-- Profile Avatar link -->
            <a
              routerLink="/profile"
              class="flex items-center gap-2 pl-2 border-l border-[#EFEDE7]"
              title="View Profile"
            >
              <img
                [src]="authService.currentUser()?.avatar"
                [alt]="authService.currentUser()?.fullName"
                class="w-9 h-9 rounded-full object-cover border-2 border-transparent hover:border-[#D4A359] transition-all shadow-xs"
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
