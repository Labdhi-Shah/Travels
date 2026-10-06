import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LucideIconComponent } from '../../../shared/icon/lucide-icon.component';
import { EmptyStateComponent } from '../../../shared/empty-state/empty-state.component';
import { FavoriteService, SavedPlaceItem } from '../../../core/services/favorite.service';

type FavTab = 'All' | 'Destinations' | 'Hotels' | 'Packages' | 'Experiences';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideIconComponent, EmptyStateComponent],
  template: `
    <div class="space-y-8 animate-fade-in pb-16 text-[#17202A]">
      
      <!-- Top Title Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span class="text-xs font-bold uppercase tracking-widest text-[#D4A359]">
            WISHLIST & COLLECTIONS
          </span>
          <h1 class="text-2xl sm:text-4xl font-bold font-display text-[#071F22] mt-0.5">
            Saved Items
          </h1>
          <p class="text-xs sm:text-sm text-[#6B7280] font-light">
            Your personal curation of dream destinations, boutique stays, curated packages, and adventures.
          </p>
        </div>

        <span class="px-4 py-2 rounded-xl bg-[#EFEDE7] text-[#071F22] text-xs font-bold self-start sm:self-auto">
          {{ favorites.length }} Saved
        </span>
      </div>

      <!-- TABS: Destinations | Hotels | Packages | Experiences -->
      <div class="flex items-center gap-2 border-b border-[#EFEDE7] pb-3 overflow-x-auto no-scrollbar">
        @for (tab of tabs; track tab) {
          <button
            type="button"
            (click)="activeTab = tab"
            class="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer"
            [ngClass]="activeTab === tab
              ? 'bg-[#0A2D30] text-white shadow-sm ring-1 ring-[#D4A359]/30'
              : 'bg-white text-[#6B7280] hover:bg-[#EFEDE7] border border-[#EFEDE7]'"
          >
            {{ tab }}
          </button>
        }
      </div>

      <!-- IMAGE-HEAVY CARDS GRID -->
      @if (filteredFavorites.length > 0) {
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          @for (item of filteredFavorites; track item.id) {
            <div
              class="group bg-white rounded-3xl overflow-hidden border border-[#EFEDE7] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                <!-- Large Image Container -->
                <div class="relative h-52 overflow-hidden bg-[#EFEDE7]">
                  <a [routerLink]="getRoute(item)" class="block w-full h-full cursor-pointer">
                    <img
                      [src]="item.image"
                      [alt]="item.name"
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                  </a>
                  <div class="absolute inset-0 bg-gradient-to-t from-[#071F22]/75 via-transparent to-transparent pointer-events-none"></div>

                  <!-- Category Tag -->
                  <span class="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-black/70 text-[#D4A359] text-[10px] font-bold backdrop-blur-md pointer-events-none">
                    {{ item.category }}
                  </span>

                  <!-- Remove Favorite Button -->
                  <button
                    type="button"
                    (click)="removeFavorite(item.id)"
                    class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-rose-500 flex items-center justify-center shadow-md active:scale-90 transition-transform cursor-pointer z-10"
                    title="Remove from favorites"
                    aria-label="Remove from favorites"
                  >
                    <app-icon name="heart" [size]="15" [isFilled]="true"></app-icon>
                  </button>

                  <!-- Rating on Image -->
                  <div class="absolute bottom-3 left-3 flex items-center gap-1 text-xs font-bold text-white pointer-events-none">
                    <app-icon name="star" [size]="12" [isFilled]="true" extraClass="text-[#D4A359]"></app-icon>
                    <span>{{ item.rating }}</span>
                  </div>
                </div>

                <!-- Info: Name & Location -->
                <div class="p-5">
                  <a [routerLink]="getRoute(item)" class="block group-hover:text-[#D4A359] transition-colors cursor-pointer">
                    <h3 class="text-base font-bold text-[#071F22] font-display line-clamp-1">
                      {{ item.name }}
                    </h3>
                  </a>
                  <p class="text-xs text-[#6B7280] mt-1 flex items-center gap-1 line-clamp-1">
                    <app-icon name="map-pin" [size]="12" extraClass="text-[#D4A359]"></app-icon>
                    <span>{{ item.location }}</span>
                  </p>
                </div>
              </div>

              <!-- Footer CTA -->
              <div class="px-5 pb-5 pt-0 flex items-center justify-between border-t border-[#EFEDE7]/50 mt-2">
                @if (item.price) {
                  <span class="text-xs font-bold text-[#071F22]">
                    From \${{ item.price }}
                  </span>
                } @else {
                  <span class="text-xs text-[#6B7280]">Featured</span>
                }

                <a
                  [routerLink]="getRoute(item)"
                  class="inline-flex items-center gap-1 text-xs font-bold text-[#071F22] group-hover:text-[#D4A359] transition-colors"
                >
                  <span>Explore</span>
                  <app-icon name="arrow-right" [size]="13"></app-icon>
                </a>
              </div>
            </div>
          }
        </div>
      } @else {
        <app-empty-state
          iconName="heart"
          title="No Favorites Yet"
          description="Start exploring and save your favorite places, hotels, packages, or experiences."
          actionLabel="Explore Now"
          (action)="explorePopular()"
        ></app-empty-state>
      }

    </div>
  `
})
export class FavoritesComponent {
  private favoriteService = inject(FavoriteService);
  private router = inject(Router);

  tabs: FavTab[] = ['All', 'Destinations', 'Hotels', 'Packages', 'Experiences'];
  activeTab: FavTab = 'All';

  get favorites(): SavedPlaceItem[] {
    return this.favoriteService.getFavoriteItems();
  }

  get filteredFavorites(): SavedPlaceItem[] {
    if (this.activeTab === 'All') return this.favorites;
    return this.favorites.filter(f => f.category.toLowerCase() === this.activeTab.toLowerCase());
  }

  removeFavorite(id: string) {
    this.favoriteService.toggleFavorite(id);
  }

  getRoute(item: SavedPlaceItem): string[] {
    switch (item.category.toLowerCase()) {
      case 'destinations':
      case 'destination':
        return ['/destinations', item.id];
      case 'hotels':
      case 'hotel':
        return ['/hotels', item.id];
      case 'packages':
      case 'package':
        return ['/packages', item.id];
      default:
        return ['/destinations'];
    }
  }

  explorePopular() {
    this.router.navigate(['/destinations']);
  }
}
