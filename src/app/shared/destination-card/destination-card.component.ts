import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideIconComponent } from '../icon/lucide-icon.component';
import { Destination } from '../../models/destination.model';
import { FavoriteService } from '../../core/services/favorite.service';

@Component({
  selector: 'app-destination-card',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideIconComponent],
  template: `
    <div
      class="group relative bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1"
    >
      <!-- Image with Category Badge & Wishlist Button -->
      <div class="relative p-3 pb-0">
        <div class="relative h-56 rounded-2xl overflow-hidden bg-slate-100">
          <a [routerLink]="['/destinations', destination.id]" class="block w-full h-full cursor-pointer">
            <img
              [src]="destination.image"
              [alt]="destination.name + ', ' + destination.country"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
          </a>

          <!-- Category Badge (Amber Pill on bottom-left) -->
          <span class="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-[#E5A93C] text-[#071F22] text-[11px] font-bold shadow-md tracking-wider pointer-events-none">
            {{ destination.travelTypes?.[0] || 'Explore' }}
          </span>

          <!-- Wishlist Button -->
          <button
            type="button"
            (click)="toggleFav($event)"
            class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-red-500 backdrop-blur-md flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer z-10"
            [attr.aria-label]="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
          >
            <app-icon
              name="heart"
              [size]="14"
              [isFilled]="isFavorite"
              [extraClass]="isFavorite ? 'text-red-500' : 'text-slate-600'"
            ></app-icon>
          </button>
        </div>
      </div>

      <!-- Card Body Content -->
      <div class="p-5 sm:p-6 flex flex-col flex-grow justify-between space-y-4">
        <div class="space-y-2">
          <!-- Country Tag & Rating -->
          <div class="flex items-center justify-between text-xs">
            <div class="flex items-center gap-1.5 text-slate-400 font-bold uppercase tracking-wider">
              <app-icon name="map-pin" [size]="13" extraClass="text-slate-400"></app-icon>
              <span>{{ destination.country }}</span>
            </div>
            <div class="flex items-center gap-1 text-xs font-bold text-[#E5A93C]">
              <app-icon name="star" [size]="13" [isFilled]="true"></app-icon>
              <span>{{ destination.rating }}</span>
            </div>
          </div>

          <!-- Destination Name -->
          <a [routerLink]="['/destinations', destination.id]" class="block group-hover:text-[#0C3B3E] transition-colors cursor-pointer">
            <h3 class="text-xl font-bold text-[#0F1E26] font-display leading-tight">
              {{ destination.name }}
            </h3>
          </a>

          <!-- Description -->
          <p class="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed line-clamp-2">
            {{ destination.description }}
          </p>
        </div>

        <!-- Footer: Starts From & Explore Details -->
        <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span class="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">STARTS FROM</span>
            <span class="text-base sm:text-lg font-bold text-[#0F1E26]">
              \${{ destination.startingPrice | number }} <span class="text-xs font-normal text-slate-400">/ person</span>
            </span>
          </div>

          <a
            [routerLink]="['/destinations', destination.id]"
            class="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#0C3B3E] group-hover:translate-x-1 transition-all cursor-pointer"
          >
            <span>Explore Details</span>
            <span>&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  `
})
export class DestinationCardComponent {
  @Input({ required: true }) destination!: Destination;
  private favoriteService = inject(FavoriteService);

  get isFavorite(): boolean {
    return this.favoriteService.isFavorite(this.destination.id);
  }

  toggleFav(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.favoriteService.toggleFavorite(this.destination.id);
  }
}
