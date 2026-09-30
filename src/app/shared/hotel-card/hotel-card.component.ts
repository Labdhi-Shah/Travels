import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideIconComponent } from '../icon/lucide-icon.component';
import { Hotel } from '../../models/hotel.model';
import { FavoriteService } from '../../core/services/favorite.service';

@Component({
  selector: 'app-hotel-card',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideIconComponent],
  template: `
    <div
      class="group relative bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1"
    >
      <!-- Image & Rating & Wishlist -->
      <div class="relative p-3 pb-0">
        <div class="relative h-56 rounded-2xl overflow-hidden bg-slate-100">
          <a [routerLink]="['/hotels', hotel.id]" class="block w-full h-full cursor-pointer">
            <img
              [src]="hotel.image"
              [alt]="hotel.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
          </a>

          <!-- Rating Badge -->
          <span class="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#E5A93C] text-xs font-bold flex items-center gap-1 pointer-events-none">
            <app-icon name="star" [size]="12" [isFilled]="true"></app-icon>
            <span>{{ hotel.rating }}</span>
          </span>

          <!-- Wishlist Button -->
          <button
            type="button"
            (click)="toggleFav($event)"
            class="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-red-500 backdrop-blur-md flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer z-10"
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

      <!-- Hotel Details Body -->
      <div class="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div class="space-y-2">
          <a [routerLink]="['/hotels', hotel.id]" class="block group-hover:text-[#0C3B3E] transition-colors cursor-pointer">
            <h3 class="text-lg font-bold font-display text-[#0F1E26] leading-tight">
              {{ hotel.name }}
            </h3>
          </a>

          <!-- Location -->
          <div class="flex items-center gap-1.5 text-xs text-slate-400">
            <app-icon name="map-pin" [size]="13" extraClass="text-slate-400"></app-icon>
            <span>{{ hotel.location }}</span>
          </div>

          <!-- Description -->
          <p class="text-xs text-slate-500 font-normal leading-relaxed line-clamp-2">
            {{ hotel.description }}
          </p>

          <!-- Amenities Chips -->
          <div class="flex flex-wrap gap-1.5 pt-2">
            @for (amenity of hotel.amenities.slice(0, 5); track amenity) {
              <span class="px-2 py-0.5 rounded-lg bg-slate-50 text-slate-600 text-[10px] font-medium border border-slate-200">
                {{ amenity }}
              </span>
            }
          </div>
        </div>

        <!-- Price & View Details Button -->
        <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span class="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">PRICE FROM</span>
            <span class="text-base sm:text-lg font-bold text-[#0F1E26]">
              \${{ hotel.pricePerNight | number }} <span class="text-xs font-normal text-slate-400">/ night</span>
            </span>
          </div>

          <a
            [routerLink]="['/hotels', hotel.id]"
            class="px-4 py-2 rounded-xl border border-slate-300 hover:border-[#0C3B3E] text-slate-700 hover:text-[#0C3B3E] font-semibold text-xs sm:text-sm transition-all duration-200 cursor-pointer"
          >
            View Details
          </a>
        </div>
      </div>
    </div>
  `
})
export class HotelCardComponent {
  @Input({ required: true }) hotel!: Hotel;
  @Output() onSelect = new EventEmitter<Hotel>();
  private favoriteService = inject(FavoriteService);

  get isFavorite(): boolean {
    return this.favoriteService.isFavorite(this.hotel.id);
  }

  toggleFav(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.favoriteService.toggleFavorite(this.hotel.id);
  }

  getAmenityIcon(amenity: string): string {
    switch (amenity) {
      case 'Wi-Fi': return 'wifi';
      case 'Pool': return 'sun';
      case 'Breakfast': return 'utensils';
      case 'Parking': return 'car';
      case 'Air Conditioning': return 'sun';
      case 'Spa': return 'sparkles';
      default: return 'check';
    }
  }
}
