import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideIconComponent } from '../icon/lucide-icon.component';
import { TourPackage } from '../../models/package.model';
import { FavoriteService } from '../../core/services/favorite.service';

@Component({
  selector: 'app-package-card',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideIconComponent],
  template: `
    <div
      class="group relative bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1"
    >
      <!-- Image with Duration & Travelers Badges & Wishlist -->
      <div class="relative p-3 pb-0">
        <div class="relative h-56 rounded-2xl overflow-hidden bg-slate-100">
          <a [routerLink]="['/packages', pkg.id]" class="block w-full h-full cursor-pointer">
            <img
              [src]="pkg.image"
              [alt]="pkg.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
          </a>

          <!-- Duration Badge (Top Left) -->
          <span class="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold pointer-events-none">
            {{ pkg.durationDays }} Days
          </span>

          <!-- Travelers Badge (Top Right) -->
          <span class="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold flex items-center gap-1 pointer-events-none">
            <app-icon name="users" [size]="12"></app-icon>
            <span>{{ pkg.maxTravelers }} Travelers</span>
          </span>

          <!-- Wishlist Button (Bottom Right) -->
          <button
            type="button"
            (click)="toggleFav($event)"
            class="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-red-500 backdrop-blur-md flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer z-10"
            [attr.aria-label]="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
          >
            <app-icon
              name="heart"
              [size]="14"
              [isFilled]="isFavorite"
              [extraClass]="isFavorite ? 'text-red-500 scale-110 transition-transform duration-300 drop-shadow-sm' : 'text-slate-600 scale-100 transition-transform duration-300'"
            ></app-icon>
          </button>
        </div>
      </div>

      <!-- Card Body Content -->
      <div class="p-5 sm:p-6 flex flex-col flex-grow justify-between space-y-4">
        <div class="space-y-2.5">
          <!-- Rating -->
          <div class="flex items-center gap-1 text-xs font-bold text-[#E5A93C]">
            <app-icon name="star" [size]="13" [isFilled]="true"></app-icon>
            <span>{{ pkg.rating }} Rating</span>
          </div>

          <!-- Title -->
          <a [routerLink]="['/packages', pkg.id]" class="block group-hover:text-[#0C3B3E] transition-colors cursor-pointer">
            <h3 class="text-lg font-bold font-display text-[#0F1E26] leading-tight line-clamp-1">
              {{ pkg.name }}
            </h3>
          </a>

          <!-- Description -->
          <p class="text-xs text-slate-500 font-normal leading-relaxed line-clamp-2">
            {{ pkg.overview }}
          </p>

          <!-- Highlight Tags (Horizontal chips) -->
          <div class="flex flex-wrap gap-1.5 pt-1">
            @for (tag of (pkg.activitiesIncluded || []).slice(0, 4); track tag) {
              <span class="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-medium border border-slate-200">
                {{ tag }}
              </span>
            }
          </div>
        </div>

        <!-- Price & View Package Button Row -->
        <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span class="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">STARTS AT</span>
            <span class="text-base sm:text-lg font-bold text-[#0F1E26]">
              \${{ pkg.price | number }} <span class="text-xs font-normal text-slate-400">/ person</span>
            </span>
          </div>

          <a
            [routerLink]="['/packages', pkg.id]"
            class="px-4 py-2 rounded-xl bg-[#0C3B3E] hover:bg-[#072527] text-white font-semibold text-xs sm:text-sm transition-all duration-200 shadow-sm cursor-pointer"
          >
            View Package
          </a>
        </div>
      </div>
    </div>
  `
})
export class PackageCardComponent {
  @Input({ required: true }) pkg!: TourPackage;
  private favoriteService = inject(FavoriteService);

  get isFavorite(): boolean {
    return this.favoriteService.isFavorite(this.pkg.id);
  }

  toggleFav(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.favoriteService.toggleFavorite(this.pkg.id);
  }
}
