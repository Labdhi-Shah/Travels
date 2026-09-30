import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideIconComponent } from '../icon/lucide-icon.component';
import { Activity } from '../../models/activity.model';
import { FavoriteService } from '../../core/services/favorite.service';

@Component({
  selector: 'app-activity-card',
  standalone: true,
  imports: [CommonModule, LucideIconComponent],
  template: `
    <div
      class="group relative bg-white rounded-2xl overflow-hidden border border-[#EFEDE7] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1"
    >
      <!-- Image Container -->
      <div
        class="relative h-48 overflow-hidden bg-[#EFEDE7] cursor-pointer"
        (click)="onBook.emit(activity)"
      >
        <img
          [src]="activity.image"
          [alt]="activity.title"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#0B1320]/75 via-transparent to-black/20 pointer-events-none"></div>

        <!-- Category Badge -->
        <span class="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-[#0B1320]/80 text-white text-[11px] font-semibold backdrop-blur-md pointer-events-none">
          {{ activity.category }}
        </span>

        <!-- Favorite Button -->
        <button
          type="button"
          (click)="toggleFav($event)"
          class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-[#0084FF] backdrop-blur-md flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer z-10"
          [attr.aria-label]="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
        >
          <app-icon
            name="heart"
            [size]="15"
            [isFilled]="isFavorite"
            [extraClass]="isFavorite ? 'text-[#0084FF]' : 'text-slate-600'"
          ></app-icon>
        </button>

        <!-- Rating -->
        <div class="absolute bottom-2.5 left-3 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-slate-800 text-[11px] font-semibold pointer-events-none">
          <app-icon name="star" [size]="11" [isFilled]="true" extraClass="text-amber-400"></app-icon>
          <span>{{ activity.rating }}</span>
          <span class="text-slate-400">({{ activity.reviewsCount }})</span>
        </div>
      </div>

      <!-- Content -->
      <div class="p-4 flex flex-col flex-grow justify-between">
        <div>
          <p class="flex items-center gap-1 text-[11px] font-bold text-[#0084FF] uppercase tracking-wide">
            <app-icon name="map-pin" [size]="11"></app-icon>
            {{ activity.location }}
          </p>

          <h3
            (click)="onBook.emit(activity)"
            class="text-base font-bold text-[#0B192C] font-display mt-1 group-hover:text-[#0084FF] transition-colors line-clamp-2 cursor-pointer"
          >
            {{ activity.title }}
          </h3>

          <p class="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
            {{ activity.description }}
          </p>
        </div>

        <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div class="flex items-center gap-1.5 text-xs text-slate-500">
            <app-icon name="clock" [size]="13" extraClass="text-[#D4A359]"></app-icon>
            <span>{{ activity.duration }}</span>
          </div>

          <div class="flex items-center gap-2">
            <div class="text-right">
              <span class="text-base font-bold text-[#0A2D30] font-display">\${{ activity.price | number }}</span>
              <span class="text-[10px] text-slate-400 block -mt-1">/ person</span>
            </div>
            <button
              type="button"
              (click)="onBook.emit(activity)"
              class="w-8 h-8 rounded-lg bg-[#0A2D30] hover:bg-[#D4A359] hover:text-[#0A2D30] text-white flex items-center justify-center transition-colors cursor-pointer shadow-sm active:scale-95"
              title="Book Experience"
              aria-label="Book Experience"
            >
              <app-icon name="arrow-right" [size]="14"></app-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ActivityCardComponent {
  @Input({ required: true }) activity!: Activity;
  @Output() onBook = new EventEmitter<Activity>();
  private favoriteService = inject(FavoriteService);

  get isFavorite(): boolean {
    return this.favoriteService.isFavorite(this.activity.id);
  }

  toggleFav(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.favoriteService.toggleFavorite(this.activity.id);
  }
}
