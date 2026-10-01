import { Component, HostListener, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { LucideIconComponent } from '../icon/lucide-icon.component';
import { AuthService } from '../../core/services/auth.service';
import { FavoriteService } from '../../core/services/favorite.service';

interface NavLink {
  label: string;
  path: string;
  exact?: boolean;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive, LucideIconComponent],
  template: `
    <!-- Top Fixed Navigation Bar -->
    <header
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8"
      [ngClass]="{
        'bg-transparent py-4 sm:py-5': isTransparent(),
        'bg-[#071F22]/95 backdrop-blur-md shadow-lg py-3 border-b border-white/10 text-white': !isTransparent()
      }"
    >
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        
        <!-- LEFT: TripSphere Logo with Gold Circular T badge (Matching Reference Image) -->
        <a routerLink="/" class="flex items-center gap-2.5 group cursor-pointer shrink-0">
          <div
            class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#D4A359] text-[#071F22] flex items-center justify-center font-serif font-black text-xl shadow-md transition-transform duration-300 group-hover:scale-105"
          >
            <span>T</span>
          </div>
          <div class="flex flex-col">
            <span
              class="text-xl sm:text-2xl font-bold tracking-tight font-display text-white"
            >
              TripSphere
            </span>
          </div>
        </a>

        <!-- CENTER: Main Navigation Links matching reference image -->
        <nav class="hidden lg:flex items-center gap-1 xl:gap-2">
          @for (link of navLinks; track link.label) {
            <a
              [routerLink]="link.path"
              routerLinkActive="active-nav-link text-white font-semibold"
              [routerLinkActiveOptions]="{ exact: link.exact ?? false }"
              class="relative px-3 py-1.5 rounded-full text-xs xl:text-sm font-medium transition-all duration-200 cursor-pointer group text-white/90 hover:text-white"
            >
              {{ link.label }}
              <!-- Active indicator underline pill matching reference image (warm gold) -->
              <span
                class="nav-indicator absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-6 rounded-full bg-[#D4A359] transition-all opacity-0 group-hover:opacity-100"
              ></span>
            </a>
          }
        </nav>

        <!-- RIGHT: Search, Wishlist, Login, Register -->
        <div class="hidden sm:flex items-center gap-2.5 sm:gap-3">
          
          <!-- Search Icon Button -->
          <button
            type="button"
            (click)="toggleSearchModal()"
            class="w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/15"
            title="Search destinations"
            aria-label="Search"
          >
            <app-icon name="search" [size]="16"></app-icon>
          </button>

          <!-- Favorites Link with Badge -->
          <a
            routerLink="/favorites"
            class="relative w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/15"
            title="Saved Favorites"
            aria-label="Favorites"
          >
            <app-icon name="heart" [size]="16"></app-icon>
            @if (favoriteService.favoriteCount() > 0) {
              <span class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D4A359] text-[#071F22] text-[10px] font-bold flex items-center justify-center shadow-sm">
                {{ favoriteService.favoriteCount() }}
              </span>
            }
          </a>

          <!-- Profile / Login / Register with Dropdown Menu -->
          @if (authService.isAuthenticated()) {
            <div class="relative" (click)="$event.stopPropagation()">
              <button
                type="button"
                (click)="isUserMenuOpen = !isUserMenuOpen"
                class="flex items-center gap-2 pl-1 group cursor-pointer text-white focus:outline-none"
                title="Account Menu"
              >
                <img
                  [src]="authService.currentUser()?.avatar"
                  [alt]="authService.currentUser()?.fullName"
                  class="w-8 h-8 rounded-full object-cover border-2 border-[#D4A359] group-hover:scale-105 transition-transform"
                />
                <span class="text-xs font-semibold hidden xl:inline text-white">
                  {{ authService.currentUser()?.fullName?.split(' ')?.at(0) || 'Account' }}
                </span>
                <app-icon name="chevron-down" [size]="13" extraClass="text-[#D4A359] transition-transform" [class.rotate-180]="isUserMenuOpen"></app-icon>
              </button>

              @if (isUserMenuOpen) {
                <div
                  class="absolute right-0 mt-3 w-56 bg-[#071F22] text-white rounded-2xl p-2 shadow-2xl border border-white/10 animate-dropdown-in z-50 text-xs"
                >
                  <div class="px-3 py-2 border-b border-white/10 mb-1">
                    <p class="font-bold text-white truncate">{{ authService.currentUser()?.fullName }}</p>
                    <p class="text-[10px] text-slate-300 truncate">{{ authService.currentUser()?.email }}</p>
                  </div>
                  <a
                    routerLink="/dashboard"
                    (click)="isUserMenuOpen = false"
                    class="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    <app-icon name="activity" [size]="14" extraClass="text-[#D4A359]"></app-icon>
                    <span>Dashboard</span>
                  </a>
                  <a
                    routerLink="/my-trips"
                    (click)="isUserMenuOpen = false"
                    class="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    <app-icon name="map" [size]="14" extraClass="text-[#D4A359]"></app-icon>
                    <span>My Trips</span>
                  </a>
                  <a
                    routerLink="/plan-trip"
                    (click)="isUserMenuOpen = false"
                    class="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    <app-icon name="plus" [size]="14" extraClass="text-[#D4A359]"></app-icon>
                    <span>Plan My Trip</span>
                  </a>
                  <a
                    routerLink="/favorites"
                    (click)="isUserMenuOpen = false"
                    class="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    <app-icon name="heart" [size]="14" extraClass="text-[#D4A359]"></app-icon>
                    <span>Saved Favorites</span>
                  </a>
                  <a
                    routerLink="/bookings"
                    (click)="isUserMenuOpen = false"
                    class="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    <app-icon name="credit-card" [size]="14" extraClass="text-[#D4A359]"></app-icon>
                    <span>My Bookings</span>
                  </a>
                  <a
                    routerLink="/budget"
                    (click)="isUserMenuOpen = false"
                    class="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    <app-icon name="dollar-sign" [size]="14" extraClass="text-[#D4A359]"></app-icon>
                    <span>Budget Tracker</span>
                  </a>
                  <a
                    routerLink="/profile"
                    (click)="isUserMenuOpen = false"
                    class="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    <app-icon name="user" [size]="14" extraClass="text-[#D4A359]"></app-icon>
                    <span>Profile & Settings</span>
                  </a>
                  <div class="border-t border-white/10 mt-1 pt-1">
                    <button
                      type="button"
                      (click)="authService.logout(); isUserMenuOpen = false"
                      class="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer text-left"
                    >
                      <app-icon name="log-out" [size]="14"></app-icon>
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              }
            </div>
          } @else {
            <a
              routerLink="/login"
              class="px-4 py-1.5 text-xs font-semibold text-white/90 hover:text-white transition-colors cursor-pointer"
            >
              Login
            </a>
            <a
              routerLink="/register"
              class="px-5 py-1.5 rounded-full text-xs font-semibold bg-[#D4A359] hover:bg-[#E5A93C] text-[#071F22] shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-95 font-medium"
            >
              Register
            </a>
          }

        </div>

        <!-- MOBILE: Search + Hamburger -->
        <div class="flex lg:hidden items-center gap-2">
          <button
            type="button"
            (click)="toggleSearchModal()"
            class="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
            [ngClass]="isTransparent() ? 'bg-white/15 text-white border border-white/20' : 'bg-white/10 text-white'"
            aria-label="Search"
          >
            <app-icon name="search" [size]="16"></app-icon>
          </button>

          <button
            type="button"
            (click)="isMobileMenuOpen = !isMobileMenuOpen"
            class="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-colors"
            [ngClass]="isTransparent() ? 'bg-white/15 text-white border border-white/20' : 'bg-white/10 text-white'"
            [attr.aria-expanded]="isMobileMenuOpen"
            aria-label="Toggle Navigation Menu"
          >
            <app-icon [name]="isMobileMenuOpen ? 'x' : 'menu'" [size]="18"></app-icon>
          </button>
        </div>

      </div>

      <!-- SMOOTH MOBILE NAVIGATION DRAWER -->
      @if (isMobileMenuOpen) {
        <div class="lg:hidden mt-3 p-4 rounded-3xl bg-[#071F22]/98 backdrop-blur-xl shadow-2xl border border-white/15 animate-mobile-menu space-y-3 text-white">
          <nav class="flex flex-col space-y-1">
            @for (link of navLinks; track link.label) {
              <a
                [routerLink]="link.path"
                (click)="isMobileMenuOpen = false"
                routerLinkActive="bg-[#D4A359]/20 text-[#D4A359] font-bold border-l-2 border-[#D4A359]"
                [routerLinkActiveOptions]="{ exact: link.exact ?? false }"
                class="px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/10 transition-colors"
              >
                {{ link.label }}
              </a>
            }
            <a
              routerLink="/favorites"
              (click)="isMobileMenuOpen = false"
              routerLinkActive="bg-[#D4A359]/20 text-[#D4A359] font-bold border-l-2 border-[#D4A359]"
              class="px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/10 transition-colors flex items-center justify-between"
            >
              <span>Saved Favorites</span>
              @if (favoriteService.favoriteCount() > 0) {
                <span class="px-2 py-0.5 rounded-full bg-[#D4A359] text-[#071F22] text-xs font-bold">
                  {{ favoriteService.favoriteCount() }}
                </span>
              }
            </a>
          </nav>

          <div class="pt-3 border-t border-white/10 flex items-center justify-between">
            @if (authService.isAuthenticated()) {
              <a
                routerLink="/dashboard"
                (click)="isMobileMenuOpen = false"
                class="flex items-center gap-2.5 py-1 text-sm font-semibold text-white"
              >
                <img
                  [src]="authService.currentUser()?.avatar"
                  [alt]="authService.currentUser()?.fullName"
                  class="w-8 h-8 rounded-full object-cover border border-[#D4A359]"
                />
                <span>{{ authService.currentUser()?.fullName }}</span>
              </a>
              <button
                type="button"
                (click)="authService.logout(); isMobileMenuOpen = false"
                class="text-xs text-[#D4A359] hover:underline font-semibold cursor-pointer"
              >
                Sign Out
              </button>
            } @else {
              <div class="flex gap-2 w-full">
                <a
                  routerLink="/login"
                  (click)="isMobileMenuOpen = false"
                  class="flex-1 text-center py-2.5 rounded-xl border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
                >
                  Login
                </a>
                <a
                  routerLink="/register"
                  (click)="isMobileMenuOpen = false"
                  class="flex-1 text-center py-2.5 rounded-xl bg-[#D4A359] text-[#071F22] text-sm font-bold shadow-md hover:bg-[#E5A93C] transition-colors"
                >
                  Sign Up
                </a>
              </div>
            }
          </div>
        </div>
      }
    </header>

    <!-- Quick Search Popover Modal -->
    @if (isSearchOpen) {
      <div
        class="fixed inset-0 z-50 bg-[#0B1320]/60 backdrop-blur-sm flex items-start justify-center pt-24 px-4 animate-modal-backdrop"
        (click)="isSearchOpen = false"
      >
        <div
          class="w-full max-w-xl bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border border-[#0B1320]/10 animate-modal-card"
          (click)="$event.stopPropagation()"
        >
          <div class="flex items-center justify-between mb-4">
            <span class="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Search TripSphere</span>
            <button
              (click)="isSearchOpen = false"
              class="w-8 h-8 rounded-full hover:bg-[#EFEDE7] flex items-center justify-center text-[#6B7280] hover:text-[#0B1320] transition-colors cursor-pointer"
            >
              <app-icon name="x" [size]="18"></app-icon>
            </button>
          </div>
          <div class="relative mb-4">
            <app-icon name="search" [size]="18" extraClass="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7280]"></app-icon>
            <input
              type="text"
              #quickSearchInput
              [(ngModel)]="searchQuery"
              (keyup.enter)="executeQuickSearch()"
              placeholder="Search Bali, Paris, Goa, Dubai, Manali..."
              autofocus
              class="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#EFEDE7]/50 border border-[#0B1320]/10 text-sm font-medium text-[#17202A] focus:outline-none focus:border-[#D4A359]"
            />
          </div>
          <div class="space-y-2">
            <span class="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">Popular Searches</span>
            <div class="flex flex-wrap gap-2">
              @for (city of ['Goa', 'Dubai', 'Bali', 'Rajasthan', 'Manali', 'Paris', 'Singapore', 'Maldives']; track city) {
                <button
                  type="button"
                  (click)="searchDestination(city)"
                  class="px-3 py-1.5 rounded-xl bg-[#EFEDE7]/70 hover:bg-[#0B1320] hover:text-white text-xs font-medium text-[#17202A] transition-colors cursor-pointer"
                >
                  {{ city }}
                </button>
              }
            </div>
          </div>
        </div>
      </div>
    }
  `
})
export class NavbarComponent implements OnInit {
  authService = inject(AuthService);
  favoriteService = inject(FavoriteService);
  private router = inject(Router);

  isScrolled = false;
  isMobileMenuOpen = false;
  isSearchOpen = false;
  isUserMenuOpen = false;
  searchQuery = '';
  isHomePage = signal(true);

  navLinks: NavLink[] = [
    { label: 'Home', path: '/', exact: true },
    { label: 'Plan My Trip', path: '/plan-trip' },
    { label: 'Packages', path: '/packages' },
    { label: 'Hotels', path: '/hotels' },
    { label: 'Experiences', path: '/experiences' },
    { label: 'My Trips', path: '/my-trips' }
  ];

  @HostListener('document:click')
  onDocumentClick() {
    this.isUserMenuOpen = false;
  }

  ngOnInit() {
    this.checkRoute(this.router.url);
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.checkRoute(event.urlAfterRedirects || event.url);
      });
  }

  private checkRoute(url: string) {
    const cleanUrl = url.split('?')[0].split('#')[0];
    this.isHomePage.set(cleanUrl === '' || cleanUrl === '/');
  }

  isTransparent(): boolean {
    return this.isHomePage() && !this.isScrolled;
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 25;
  }

  toggleSearchModal() {
    this.isSearchOpen = !this.isSearchOpen;
    this.searchQuery = '';
  }

  executeQuickSearch() {
    if (this.searchQuery.trim()) {
      this.searchDestination(this.searchQuery.trim());
    }
  }

  searchDestination(name: string) {
    this.isSearchOpen = false;
    this.router.navigate(['/destinations'], { queryParams: { q: name } });
  }
}
