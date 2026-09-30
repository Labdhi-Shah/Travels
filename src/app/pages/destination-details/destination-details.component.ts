import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LucideIconComponent } from '../../shared/icon/lucide-icon.component';
import { DESTINATIONS } from '../../data/destinations';
import { HOTELS } from '../../data/hotels';
import { Destination } from '../../models/destination.model';
import { Hotel } from '../../models/hotel.model';
import { FavoriteService } from '../../core/services/favorite.service';
import { MapComponent, MapMarker } from '../../shared/map/map.component';
import { HotelCardComponent } from '../../shared/hotel-card/hotel-card.component';

type TabType = 'about' | 'places' | 'activities' | 'hotels' | 'tips' | 'weather' | 'map';

@Component({
  selector: 'app-destination-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LucideIconComponent,
    MapComponent,
    HotelCardComponent
  ],
  template: `
    @if (destination) {
      <div class="pt-24 pb-28 min-h-screen bg-[#F8F7F3] text-[#17202A]">
        
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <!-- Back Link & Action Bar -->
          <div class="flex items-center justify-between mb-6">
            <a
              routerLink="/destinations"
              class="inline-flex items-center gap-2 text-xs font-bold text-[#071F22] hover:text-[#D4A359] transition-colors"
            >
              <app-icon name="arrow-left" [size]="14"></app-icon>
              <span>Back to Destinations</span>
            </a>

            <div class="flex items-center gap-3">
              <button
                type="button"
                (click)="toggleFavorite()"
                class="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#EFEDE7] text-xs font-semibold shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <app-icon
                  name="heart"
                  [size]="16"
                  [isFilled]="isFavorite"
                  [extraClass]="isFavorite ? 'text-[#D4A359]' : 'text-[#17202A]'"
                ></app-icon>
                <span>{{ isFavorite ? 'Saved to Favorites' : 'Save Destination' }}</span>
              </button>
            </div>
          </div>

          <!-- ============================================================== -->
          <!-- TOP: LARGE FULL-WIDTH IMAGE GALLERY (1 Large + 4 Smaller Images) -->
          <!-- ============================================================== -->
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-4 mb-10 h-auto sm:h-[480px]">
            
            <!-- ONE LARGE IMAGE (Left 2 cols or 3 cols on desktop) -->
            <div
              (click)="activeMainImage = destination.image"
              class="lg:col-span-2 h-72 sm:h-full relative rounded-3xl overflow-hidden shadow-md bg-[#0B1320] cursor-pointer group"
            >
              <img
                [src]="activeMainImage"
                [alt]="destination.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-[#0B1320]/60 via-transparent to-transparent"></div>
              <div class="absolute bottom-4 left-4 text-white text-xs font-semibold px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-md">
                Main Overview
              </div>
            </div>

            <!-- FOUR SMALLER IMAGES (2x2 grid on right) -->
            <div class="lg:col-span-2 grid grid-cols-2 gap-3 sm:gap-4 h-72 sm:h-full">
              @for (img of galleryImages.slice(0, 4); track $index) {
                <div
                  (click)="activeMainImage = img"
                  class="relative rounded-2xl overflow-hidden shadow-sm bg-[#EFEDE7] cursor-pointer group"
                  [class.ring-2]="activeMainImage === img"
                  [class.ring-[#D4A359]]="activeMainImage === img"
                >
                  <img
                    [src]="img"
                    [alt]="destination.name + ' scene ' + ($index + 1)"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                  <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span class="text-white text-xs font-bold bg-[#071F22]/70 px-2.5 py-1 rounded-lg backdrop-blur-sm">
                      View
                    </span>
                  </div>
                </div>
              }
            </div>

          </div>

          <!-- ============================================================== -->
          <!-- BELOW: DESTINATION NAME, COUNTRY, RATING, BEST TIME TO VISIT -->
          <!-- ============================================================== -->
          <div class="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFEDE7] shadow-sm mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div class="space-y-2">
              <div class="flex items-center gap-2.5">
                <span class="text-xs font-bold uppercase tracking-wider text-[#D4A359]">
                  {{ destination.region }} Haven
                </span>
                <span class="text-xs text-[#6B7280]">•</span>
                <span class="text-xs font-semibold text-[#6B7280]">
                  {{ destination.country }}
                </span>
              </div>
              <h1 class="text-3xl sm:text-5xl font-bold font-display text-[#071F22]">
                {{ destination.name }}
              </h1>
              <p class="text-xs sm:text-sm text-[#6B7280] max-w-xl font-light">
                {{ destination.description }}
              </p>
            </div>

            <div class="flex flex-wrap items-center gap-6 sm:gap-8 pt-4 md:pt-0 border-t md:border-t-0 border-[#EFEDE7]">
              <!-- Rating -->
              <div class="space-y-0.5">
                <span class="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">Rating</span>
                <div class="flex items-center gap-1.5 text-base font-bold text-[#071F22]">
                  <app-icon name="star" [size]="16" [isFilled]="true" extraClass="text-[#D4A359]"></app-icon>
                  <span>{{ destination.rating }}</span>
                  <span class="text-xs text-[#6B7280] font-normal">({{ destination.reviewsCount }})</span>
                </div>
              </div>

              <!-- Best Time to Visit -->
              <div class="space-y-0.5">
                <span class="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">Best Time to Visit</span>
                <p class="text-sm sm:text-base font-bold text-[#071F22] flex items-center gap-1.5">
                  <app-icon name="calendar" [size]="14" extraClass="text-[#D4A359]"></app-icon>
                  <span>{{ destination.bestTimeToVisit }}</span>
                </p>
              </div>

              <!-- Starting Rate -->
              <div class="space-y-0.5">
                <span class="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">Starting Price</span>
                <p class="text-lg sm:text-xl font-bold text-[#071F22] font-display">
                  \${{ destination.startingPrice }}
                </p>
              </div>
            </div>
          </div>

          <!-- ============================================================== -->
          <!-- HORIZONTAL NAVIGATION TABS -->
          <!-- About | Places to Visit | Things to Do | Hotels | Travel Tips | Weather | Map -->
          <!-- ============================================================== -->
          <div class="sticky top-20 z-40 bg-[#F8F7F3]/95 backdrop-blur-md py-3 mb-8 border-b border-[#EFEDE7]">
            <div class="flex items-center gap-2 overflow-x-auto no-scrollbar">
              @for (tab of tabs; track tab.id) {
                <button
                  type="button"
                  (click)="activeTab = tab.id"
                  class="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer flex items-center gap-1.5"
                  [ngClass]="activeTab === tab.id
                    ? 'bg-[#0B1320] text-white shadow-sm'
                    : 'bg-white text-[#17202A] hover:bg-[#EFEDE7] border border-[#EFEDE7]'"
                >
                  <app-icon [name]="tab.icon" [size]="14"></app-icon>
                  <span>{{ tab.label }}</span>
                </button>
              }
            </div>
          </div>

          <!-- ============================================================== -->
          <!-- TAB CONTENT SECTIONS -->
          <!-- ============================================================== -->

          <!-- 1. ABOUT -->
          @if (activeTab === 'about') {
            <div class="bg-white rounded-3xl p-6 sm:p-10 border border-[#EFEDE7] shadow-sm space-y-6 animate-fade-in">
              <h2 class="text-2xl font-bold font-display text-[#0B1320]">About {{ destination.name }}</h2>
              <p class="text-sm sm:text-base text-[#17202A] leading-relaxed font-light">
                {{ destination.overview }}
              </p>
              
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#EFEDE7]">
                <div class="p-4 rounded-2xl bg-[#EFEDE7]/40">
                  <span class="text-[10px] font-bold uppercase text-[#6B7280]">Recommended Stay</span>
                  <p class="text-base font-bold text-[#0B1320] mt-1">{{ destination.recommendedDuration }}</p>
                </div>
                <div class="p-4 rounded-2xl bg-[#EFEDE7]/40">
                  <span class="text-[10px] font-bold uppercase text-[#6B7280]">Avg Daily Budget</span>
                  <p class="text-base font-bold text-[#0B1320] mt-1">\${{ destination.averageBudgetPerDay }} / day</p>
                </div>
                <div class="p-4 rounded-2xl bg-[#EFEDE7]/40">
                  <span class="text-[10px] font-bold uppercase text-[#6B7280]">Hotels</span>
                  <p class="text-base font-bold text-[#0B1320] mt-1">{{ destination.hotelsCount }}+ Stays</p>
                </div>
                <div class="p-4 rounded-2xl bg-[#EFEDE7]/40">
                  <span class="text-[10px] font-bold uppercase text-[#6B7280]">Activities</span>
                  <p class="text-base font-bold text-[#0B1320] mt-1">{{ destination.activitiesCount }}+ Adventures</p>
                </div>
              </div>
            </div>
          }

          <!-- 2. PLACES TO VISIT -->
          @if (activeTab === 'places') {
            <div class="space-y-6 animate-fade-in">
              <h2 class="text-2xl font-bold font-display text-[#0B1320]">Iconic Places in {{ destination.name }}</h2>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                @for (place of destination.popularAttractions; track place.name) {
                  <div class="bg-white rounded-2xl overflow-hidden border border-[#EFEDE7] shadow-sm hover:shadow-lg transition-all">
                    <div class="h-48 overflow-hidden bg-[#EFEDE7]">
                      <img [src]="place.image" [alt]="place.name" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div class="p-5 space-y-2">
                      <h3 class="text-lg font-bold font-display text-[#0B1320]">{{ place.name }}</h3>
                      <p class="text-xs text-[#6B7280] leading-relaxed">{{ place.description }}</p>
                    </div>
                  </div>
                }
              </div>
            </div>
          }

          <!-- 3. THINGS TO DO -->
          @if (activeTab === 'activities') {
            <div class="bg-white rounded-3xl p-6 sm:p-10 border border-[#EFEDE7] shadow-sm space-y-6 animate-fade-in">
              <h2 class="text-2xl font-bold font-display text-[#071F22]">Things to Do</h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                @for (type of destination.travelTypes; track type) {
                  <div class="p-4 rounded-2xl border border-[#EFEDE7] bg-[#EFEDE7]/30 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-xl bg-[#071F22] text-white flex items-center justify-center">
                        <app-icon name="sparkles" [size]="18" extraClass="text-[#D4A359]"></app-icon>
                      </div>
                      <div>
                        <h4 class="text-sm font-bold text-[#071F22]">{{ type }} Experiences</h4>
                        <p class="text-xs text-[#6B7280]">Guided walks, private expeditions & tours</p>
                      </div>
                    </div>
                    <a routerLink="/experiences" class="text-xs font-bold text-[#D4A359] hover:underline">
                      Explore
                    </a>
                  </div>
                }
              </div>
            </div>
          }

          <!-- 4. HOTELS -->
          @if (activeTab === 'hotels') {
            <div class="space-y-6 animate-fade-in">
              <h2 class="text-2xl font-bold font-display text-[#071F22]">Sanctuaries & Resorts</h2>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                @for (hotel of localHotels; track hotel.id) {
                  <app-hotel-card [hotel]="hotel"></app-hotel-card>
                }
              </div>
            </div>
          }

          <!-- 5. TRAVEL TIPS -->
          @if (activeTab === 'tips') {
            <div class="bg-white rounded-3xl p-6 sm:p-10 border border-[#EFEDE7] shadow-sm space-y-6 animate-fade-in">
              <h2 class="text-2xl font-bold font-display text-[#071F22]">Insider Travel Tips</h2>
              <div class="space-y-3">
                @for (tip of destination.travelTips; track $index) {
                  <div class="flex items-start gap-3.5 p-4 rounded-2xl bg-[#EFEDE7]/40 border border-[#EFEDE7]">
                    <div class="w-6 h-6 rounded-full bg-[#0A2D30] text-[#D4A359] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {{ $index + 1 }}
                    </div>
                    <p class="text-xs sm:text-sm text-[#17202A] leading-relaxed font-medium">
                      {{ tip }}
                    </p>
                  </div>
                }
              </div>
            </div>
          }

          <!-- 6. WEATHER -->
          @if (activeTab === 'weather') {
            <div class="bg-white rounded-3xl p-6 sm:p-10 border border-[#EFEDE7] shadow-sm space-y-6 animate-fade-in">
              <h2 class="text-2xl font-bold font-display text-[#071F22]">Live Climate & Forecast</h2>
              
              <div class="flex items-center gap-6 p-6 rounded-2xl bg-[#071F22] text-white">
                <div class="text-4xl sm:text-5xl font-extrabold font-display text-[#D4A359]">
                  {{ destination.weather.temp }}
                </div>
                <div>
                  <span class="text-xs font-bold uppercase tracking-wider text-[#D4A359]">Current Conditions</span>
                  <p class="text-lg font-bold">{{ destination.weather.condition }}</p>
                  <p class="text-xs text-white/70">Humidity: {{ destination.weather.humidity }} • Wind: {{ destination.weather.wind }}</p>
                </div>
              </div>

              <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                @for (item of destination.weather.forecast; track item.day) {
                  <div class="p-4 rounded-2xl border border-[#EFEDE7] bg-[#EFEDE7]/30 text-center space-y-1">
                    <span class="text-xs font-bold text-[#6B7280] uppercase">{{ item.day }}</span>
                    <p class="text-lg font-bold text-[#071F22] font-display">{{ item.temp }}</p>
                    <span class="text-xs text-[#6B7280]">{{ item.condition }}</span>
                  </div>
                }
              </div>
            </div>
          }

          <!-- 7. MAP -->
          @if (activeTab === 'map') {
            <div class="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFEDE7] shadow-sm space-y-4 animate-fade-in">
              <h2 class="text-2xl font-bold font-display text-[#071F22]">Interactive Geographic Map</h2>
              <div class="h-96 rounded-2xl overflow-hidden border border-[#EFEDE7]">
                <app-map
                  [lat]="destination.coordinates.lat"
                  [lng]="destination.coordinates.lng"
                  [zoom]="11"
                  [markers]="mapMarkers"
                ></app-map>
              </div>
            </div>
          }

        </div>

        <!-- ============================================================== -->
        <!-- STICKY "PLAN THIS TRIP" BUTTON (Section 15) -->
        <!-- ============================================================== -->
        <div class="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-md pointer-events-auto animate-fade-in">
          <div class="bg-[#071F22] text-white p-3.5 sm:p-4 rounded-2xl shadow-2xl flex items-center justify-between border border-white/10 backdrop-blur-md">
            <div>
              <span class="text-[10px] uppercase font-bold text-[#D4A359] tracking-wider block">
                Inspired to visit?
              </span>
              <p class="text-sm font-bold font-display text-white">
                Trip to {{ destination.name }}
              </p>
            </div>

            <a
              routerLink="/plan-trip"
              [queryParams]="{ destination: destination.name }"
              class="px-5 py-2.5 rounded-xl bg-[#0A2D30] hover:bg-[#D4A359] hover:text-[#071F22] text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 flex items-center gap-1.5"
            >
              <span>Plan This Trip</span>
              <app-icon name="arrow-right" [size]="14"></app-icon>
            </a>
          </div>
        </div>

      </div>
    }
  `
})
export class DestinationDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private favoriteService = inject(FavoriteService);

  destination?: Destination;
  activeMainImage = '';
  galleryImages: string[] = [];
  localHotels: Hotel[] = [];

  activeTab: TabType = 'about';

  tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'about', label: 'About', icon: 'file-text' },
    { id: 'places', label: 'Places to Visit', icon: 'map-pin' },
    { id: 'activities', label: 'Things to Do', icon: 'compass' },
    { id: 'hotels', label: 'Hotels', icon: 'hotel' },
    { id: 'tips', label: 'Travel Tips', icon: 'sparkles' },
    { id: 'weather', label: 'Weather', icon: 'sun' },
    { id: 'map', label: 'Map', icon: 'map' }
  ];

  mapMarkers: MapMarker[] = [];

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      const found = DESTINATIONS.find(d => d.id === id);
      if (found) {
        this.destination = found;
        this.activeMainImage = found.image;
        this.galleryImages = found.gallery || [found.image];
        
        // Find matching hotels
        const destName = found.name.toLowerCase();
        this.localHotels = HOTELS.filter(h =>
          h.city.toLowerCase().includes(destName) ||
          h.location.toLowerCase().includes(destName)
        );
        if (this.localHotels.length === 0) {
          this.localHotels = HOTELS.slice(0, 3);
        }

        // Build Map Markers
        this.mapMarkers = [
          {
            lat: found.coordinates.lat,
            lng: found.coordinates.lng,
            title: found.name,
            description: found.country,
            type: 'attraction'
          },
          ...found.popularAttractions.map(a => ({
            lat: a.coordinates ? a.coordinates.lat : found.coordinates.lat + 0.01,
            lng: a.coordinates ? a.coordinates.lng : found.coordinates.lng + 0.01,
            title: a.name,
            description: a.description || 'Popular Attraction',
            image: a.image,
            type: 'attraction' as const
          }))
        ];
      } else {
        this.router.navigate(['/destinations']);
      }
    });
  }

  get isFavorite(): boolean {
    return this.destination ? this.favoriteService.isFavorite(this.destination.id) : false;
  }

  toggleFavorite() {
    if (this.destination) {
      this.favoriteService.toggleFavorite(this.destination.id);
    }
  }
}
