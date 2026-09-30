import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideIconComponent } from '../../../shared/icon/lucide-icon.component';
import { EmptyStateComponent } from '../../../shared/empty-state/empty-state.component';
import { FavoriteService, SavedPlaceItem } from '../../../core/services/favorite.service';

@Component({
  selector: 'app-saved-places',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideIconComponent, EmptyStateComponent],
  template: `
    <div class="space-y-6 animate-fade-in">
      
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold text-slate-900 font-display">Saved Places & Bookmarks</h1>
          <p class="text-xs sm:text-sm text-slate-500 mt-1">Quick access to bookmarked destinations, boutique hotels, and experiences.</p>
        </div>
        <span class="text-xs font-semibold uppercase tracking-wider text-[#0B1320] bg-[#EFEDE7] px-4 py-2 rounded-full self-start sm:self-auto">
          {{ savedItems.length }} Places Bookmarked
        </span>
      </div>

      <!-- Filter tabs -->
      <div class="flex items-center gap-2 border-b border-[#EFEDE7] pb-3 overflow-x-auto no-scrollbar">
        <button
          *ngFor="let tab of ['All', 'Destination', 'Hotel', 'Package', 'Activity']"
          type="button"
          (click)="activeTab = tab"
          class="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shrink-0 cursor-pointer"
          [ngClass]="activeTab === tab
            ? 'bg-[#0B1320] text-white shadow-sm'
            : 'text-[#6B7280] hover:text-[#0B1320] hover:bg-[#EFEDE7]'"
        >
          {{ tab === 'All' ? 'All Bookmarks' : tab + 's' }}
        </button>
      </div>

      <!-- Cards Grid -->
      <div *ngIf="filteredItems.length > 0; else noSavedTpl" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          *ngFor="let item of filteredItems"
          class="group bg-white rounded-3xl overflow-hidden border border-[#EFEDE7] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div>
            <div class="relative h-44 overflow-hidden bg-slate-100">
              <img [src]="item.image" [alt]="item.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>

              <span class="absolute top-2.5 left-2.5 px-3 py-1 rounded-full bg-slate-900/80 text-white text-[10px] font-semibold uppercase tracking-wider">
                {{ item.category }}
              </span>

              <button
                type="button"
                (click)="removeItem(item.id)"
                class="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-rose-500 flex items-center justify-center shadow-sm cursor-pointer"
                title="Remove from saved places"
              >
                <app-icon name="trash-2" [size]="14"></app-icon>
              </button>

              <div class="absolute bottom-2.5 left-3 flex items-center gap-1 text-xs font-semibold text-[#F4A261]">
                <app-icon name="star" [size]="12" [isFilled]="true"></app-icon>
                <span>{{ item.rating }}</span>
              </div>
            </div>

            <div class="p-5">
              <h3 class="text-base font-serif font-bold text-[#071F22] line-clamp-1 group-hover:text-[#D4A359] transition-colors">
                {{ item.name }}
              </h3>
              <p class="text-xs text-[#6B7280] mt-1 flex items-center gap-1 line-clamp-1">
                <app-icon name="map-pin" [size]="12" class="text-[#D4A359]"></app-icon>
                {{ item.location }}
              </p>
            </div>
          </div>

          <div class="px-5 pb-5 pt-3 border-t border-[#EFEDE7] flex items-center justify-between text-xs">
            <span *ngIf="item.price" class="font-serif font-bold text-[#071F22] text-sm">
              From \${{ item.price }}
            </span>
            <span *ngIf="!item.price" class="text-[#6B7280]">Curated</span>

            <a
              [routerLink]="getItemRoute(item)"
              class="font-semibold text-xs uppercase tracking-wider text-[#071F22] hover:text-[#D4A359] flex items-center gap-1 cursor-pointer"
            >
              <span>Explore</span>
              <app-icon name="arrow-right" [size]="12"></app-icon>
            </a>
          </div>
        </div>
      </div>

      <ng-template #noSavedTpl>
        <app-empty-state
          iconName="bookmark"
          title="No saved places yet"
          description="Explore destinations, tour packages, and hotels to save your dream vacation stops."
          actionLabel="Explore Destinations"
          (action)="exploreDestinations()"
        ></app-empty-state>
      </ng-template>

    </div>
  `
})
export class SavedPlacesComponent {
  private favoriteService = inject(FavoriteService);
  activeTab = 'All';

  get savedItems(): SavedPlaceItem[] {
    return this.favoriteService.getFavoriteItems();
  }

  get filteredItems(): SavedPlaceItem[] {
    if (this.activeTab === 'All') return this.savedItems;
    return this.savedItems.filter(i => i.category === this.activeTab);
  }

  removeItem(id: string): void {
    this.favoriteService.removeFavorite(id);
  }

  getItemRoute(item: SavedPlaceItem): string[] {
    if (item.category === 'Destination') return ['/destinations', item.id];
    if (item.category === 'Package') return ['/packages', item.id];
    if (item.category === 'Hotel') return ['/hotels'];
    return ['/experiences'];
  }

  exploreDestinations(): void {
    window.location.href = '/destinations';
  }
}
