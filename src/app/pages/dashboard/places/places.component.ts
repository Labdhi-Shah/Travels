import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PLACES } from '../../../data/places';
import { Place, PlaceCategory } from '../../../models/place.model';
import { StorageService } from '../../../core/services/storage.service';
import { ToastService } from '../../../core/services/toast.service';
import { LucideIconComponent } from '../../../shared/icon/lucide-icon.component';
import { MapComponent, MapMarker } from '../../../shared/map/map.component';
import { TripService } from '../../../core/services/trip.service';
import { Trip } from '../../../models/trip.model';

@Component({
  selector: 'app-places',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, LucideIconComponent, MapComponent],
  template: `
    <div class="space-y-8 animate-fade-in pb-12">
      <!-- Top Trip Navigation Bar -->
      @if (currentTrip) {
        <div class="bg-white rounded-3xl p-5 sm:p-6 border border-[#EFEDE7] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <a routerLink="/my-trips" class="p-2.5 rounded-2xl bg-[#EFEDE7] hover:bg-[#0B1320] hover:text-white text-[#0B1320] transition">
              <app-icon name="chevron-left" [size]="18"></app-icon>
            </a>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-[#EFEDE7] text-[#0B1320]">{{ currentTrip.country }}</span>
                <span class="text-xs text-[#6B7280]">{{ currentTrip.startDate | date:'mediumDate' }}</span>
              </div>
              <h1 class="text-xl sm:text-2xl font-serif font-bold text-[#0B1320] mt-1">{{ currentTrip.name }} – Places to Visit</h1>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button
              (click)="showAddModal = true"
              type="button"
              class="px-5 py-2.5 rounded-full bg-[#0A2D30] hover:bg-[#D4A359] text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition flex items-center gap-2 cursor-pointer"
            >
              <app-icon name="plus" [size]="15"></app-icon>
              <span>Add Custom Place</span>
            </button>
          </div>
        </div>
      }

      <!-- Interactive Map of Places -->
      <div class="bg-white rounded-3xl p-6 border border-[#EFEDE7] shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-xl font-serif font-bold text-[#0B1320]">Places on Map</h2>
            <p class="text-xs text-[#6B7280]">Interactive pins for all saved attractions, cafes, and spots in this trip</p>
          </div>
          <span class="text-xs font-semibold px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
            {{ filteredPlaces.length }} Markers Plotted
          </span>
        </div>

        <app-map
          [lat]="mapCenter.lat"
          [lng]="mapCenter.lng"
          [zoom]="11"
          [title]="currentTrip ? currentTrip.destination : 'Saved Places'"
          height="380px"
          [markers]="mapMarkers"
        ></app-map>
      </div>

      <!-- Filter Tabs & Search -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          @for (cat of categories; track cat) {
            <button
              (click)="activeCategory = cat"
              type="button"
              class="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shrink-0 cursor-pointer"
              [ngClass]="activeCategory === cat ? 'bg-[#0B1320] text-white shadow-sm' : 'bg-white border border-[#EFEDE7] text-[#17202A] hover:bg-[#EFEDE7]'"
            >
              {{ cat }}
            </button>
          }
        </div>

        <div class="relative w-full md:w-72">
          <input
            type="text"
            [(ngModel)]="searchQuery"
            placeholder="Search saved spots..."
            class="w-full bg-white text-xs font-medium text-[#0B1320] pl-10 pr-4 py-2.5 rounded-full border border-[#EFEDE7] focus:outline-none focus:border-[#0B1320]"
          />
          <span class="absolute left-3.5 top-3 text-[#6B7280]">
            <app-icon name="search" [size]="14"></app-icon>
          </span>
        </div>
      </div>

      <!-- Places Grid -->
      @if (filteredPlaces.length > 0) {
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (place of filteredPlaces; track place.id) {
            <div class="bg-white rounded-3xl overflow-hidden border border-[#EFEDE7] shadow-sm hover:shadow-md transition-all flex flex-col group">
              <div class="relative h-48 overflow-hidden bg-stone-100">
                <img [src]="place.image" [alt]="place.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                <span class="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold uppercase tracking-wider">
                  {{ place.category }}
                </span>

                <button
                  (click)="togglePlaceFavorite(place)"
                  type="button"
                  class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-rose-500 flex items-center justify-center shadow transition hover:scale-110 cursor-pointer"
                >
                  <app-icon name="heart" [size]="15" [class]="place.isFavorite ? 'fill-rose-500 text-rose-500' : 'text-stone-400'"></app-icon>
                </button>

                <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <div class="flex items-center gap-1 text-xs font-bold text-[#F4A261]">
                    <app-icon name="star" [size]="14" class="fill-[#F4A261]"></app-icon>
                    <span>{{ place.rating }}</span>
                  </div>
                </div>
              </div>

              <div class="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 class="font-serif font-bold text-lg text-[#071F22] mb-1 group-hover:text-[#D4A359] transition">
                    {{ place.name }}
                  </h3>
                  <p class="text-xs text-[#6B7280] flex items-center gap-1 mb-3">
                    <app-icon name="map-pin" [size]="13" class="text-[#D4A359]"></app-icon>
                    <span class="truncate">{{ place.location }}</span>
                  </p>
                  <p class="text-xs text-[#6B7280] line-clamp-2 leading-relaxed font-light">
                    {{ place.description }}
                  </p>
                </div>

                <div class="mt-4 pt-4 border-t border-[#EFEDE7] flex items-center justify-between">
                  <a
                    [href]="'https://www.google.com/maps/search/?api=1&query=' + place.coordinates.lat + ',' + place.coordinates.lng"
                    target="_blank"
                    rel="noopener"
                    class="text-xs font-semibold text-[#071F22] hover:text-[#D4A359] flex items-center gap-1 uppercase tracking-wider"
                  >
                    <app-icon name="compass" [size]="14"></app-icon>
                    <span>Directions</span>
                  </a>
                  <button
                    (click)="deletePlace(place.id)"
                    type="button"
                    class="text-xs text-rose-500 hover:text-rose-700 font-semibold cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          }
        </div>
      } @else {
        <div class="bg-white rounded-3xl p-12 text-center border border-[#EFEDE7]">
          <div class="w-16 h-16 rounded-full bg-[#EFEDE7] text-[#071F22] flex items-center justify-center mx-auto mb-4">
            <app-icon name="map-pin" [size]="28"></app-icon>
          </div>
          <h3 class="text-xl font-serif font-bold text-[#071F22] mb-2">No Places Found</h3>
          <p class="text-xs text-[#6B7280] max-w-sm mx-auto mb-6">
            There are no saved spots matching your current filter. Add attractions, cafes, or viewpoints to your trip!
          </p>
          <button
            (click)="showAddModal = true"
            type="button"
            class="px-6 py-3 rounded-full bg-[#071F22] text-white text-xs font-semibold uppercase tracking-wider shadow hover:bg-[#D4A359] hover:text-[#071F22] transition cursor-pointer"
          >
            + Add First Place
          </button>
        </div>
      }

      <!-- Add Custom Place Modal -->
      @if (showAddModal) {
        <div class="fixed inset-0 z-50 bg-[#0B1320]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div class="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#EFEDE7] animate-in zoom-in-95 duration-150">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-serif font-bold text-[#0B1320]">Add Place to Visit</h3>
              <button (click)="showAddModal = false" class="text-[#6B7280] hover:text-[#0B1320] p-1 cursor-pointer">
                <app-icon name="x" [size]="18"></app-icon>
              </button>
            </div>

            <form (ngSubmit)="saveCustomPlace()" class="space-y-4">
              <div>
                <label class="block text-xs font-bold text-[#0B1320] uppercase tracking-wider mb-1">Place Name</label>
                <input
                  type="text"
                  [(ngModel)]="newPlace.name"
                  name="name"
                  required
                  placeholder="e.g. Asakusa Shrine"
                  class="w-full bg-[#F8F7F3] text-sm p-3 rounded-2xl border border-[#EFEDE7] focus:outline-none focus:border-[#0B1320]"
                />
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-bold text-[#0B1320] uppercase tracking-wider mb-1">Category</label>
                  <select
                    [(ngModel)]="newPlace.category"
                    name="category"
                    class="w-full bg-[#F8F7F3] text-sm p-3 rounded-2xl border border-[#EFEDE7] focus:outline-none focus:border-[#0B1320]"
                  >
                    <option value="Attractions">Attractions</option>
                    <option value="Restaurants">Restaurants</option>
                    <option value="Cafes">Cafes</option>
                    <option value="Museums">Museums</option>
                    <option value="Parks">Parks</option>
                    <option value="Shopping">Shopping</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-bold text-[#0B1320] uppercase tracking-wider mb-1">Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    [(ngModel)]="newPlace.rating"
                    name="rating"
                    class="w-full bg-[#F8F7F3] text-sm p-3 rounded-2xl border border-[#EFEDE7] focus:outline-none focus:border-[#0B1320]"
                  />
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-[#0B1320] uppercase tracking-wider mb-1">Location / Address</label>
                <input
                  type="text"
                  [(ngModel)]="newPlace.location"
                  name="location"
                  required
                  placeholder="e.g. Asakusa, Tokyo, Japan"
                  class="w-full bg-[#F8F7F3] text-sm p-3 rounded-2xl border border-[#EFEDE7] focus:outline-none focus:border-[#0B1320]"
                />
              </div>

              <div>
                <label class="block text-xs font-bold text-[#0B1320] uppercase tracking-wider mb-1">Photo URL</label>
                <input
                  type="url"
                  [(ngModel)]="newPlace.image"
                  name="image"
                  placeholder="https://..."
                  class="w-full bg-[#F8F7F3] text-sm p-3 rounded-2xl border border-[#EFEDE7] focus:outline-none focus:border-[#0B1320]"
                />
              </div>

              <div>
                <label class="block text-xs font-bold text-[#0B1320] uppercase tracking-wider mb-1">Personal Notes</label>
                <textarea
                  [(ngModel)]="newPlace.description"
                  name="description"
                  rows="2"
                  placeholder="Notes about best time to visit or what to try..."
                  class="w-full bg-[#F8F7F3] text-sm p-3 rounded-2xl border border-[#EFEDE7] focus:outline-none focus:border-[#0B1320]"
                ></textarea>
              </div>

              <div class="flex justify-end gap-3 pt-4 border-t border-[#EFEDE7]">
                <button
                  type="button"
                  (click)="showAddModal = false"
                  class="px-5 py-2.5 rounded-full border border-[#EFEDE7] text-xs font-semibold uppercase tracking-wider text-[#6B7280] hover:bg-[#EFEDE7] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="px-6 py-2.5 rounded-full bg-[#0A2D30] hover:bg-[#D4A359] text-white text-xs font-semibold uppercase tracking-wider shadow cursor-pointer"
                >
                  Save Place
                </button>
              </div>
            </form>
          </div>
        </div>
      }
    </div>
  `
})
export class PlacesComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private tripService = inject(TripService);
  private storage = inject(StorageService);
  private toastService = inject(ToastService);

  tripId: string = '';
  currentTrip?: Trip;
  places: Place[] = [];
  categories: (PlaceCategory | 'All')[] = [
    'All',
    'Attractions',
    'Restaurants',
    'Cafes',
    'Museums',
    'Parks',
    'Shopping'
  ];
  activeCategory: PlaceCategory | 'All' = 'All';
  searchQuery = '';
  showAddModal = false;

  newPlace = {
    name: '',
    category: 'Attractions' as PlaceCategory,
    rating: 4.8,
    location: '',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
    description: ''
  };

  get filteredPlaces(): Place[] {
    return this.places.filter(p => {
      const matchCat = this.activeCategory === 'All' || p.category === this.activeCategory;
      const matchSearch =
        !this.searchQuery ||
        p.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }

  get mapCenter(): { lat: number; lng: number } {
    if (this.places.length > 0) {
      return this.places[0].coordinates;
    }
    return { lat: 35.6762, lng: 139.6503 };
  }

  get mapMarkers(): MapMarker[] {
    return this.filteredPlaces.map(p => ({
      lat: p.coordinates.lat,
      lng: p.coordinates.lng,
      title: p.name,
      description: `${p.category} • ${p.location}`,
      image: p.image,
      type: p.category === 'Restaurants' || p.category === 'Cafes' ? 'food' : 'attraction'
    }));
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.tripId = params.get('id') || '';
      if (this.tripId) {
        this.currentTrip = this.tripService.getTripById(this.tripId);
      }
      this.loadPlaces();
    });
  }

  private loadPlaces(): void {
    const saved = this.storage.getItem<Place[]>('tripSphere_places', PLACES);
    // If tripId is present, filter or show items associated or relevant
    if (this.tripId) {
      const tripPlaces = saved.filter(p => p.tripId === this.tripId);
      this.places = tripPlaces.length > 0 ? tripPlaces : saved;
    } else {
      this.places = saved;
    }
  }

  togglePlaceFavorite(place: Place): void {
    place.isFavorite = !place.isFavorite;
    this.storage.setItem('tripSphere_places', this.places);
    if (place.isFavorite) {
      this.toastService.success(`Added ${place.name} to Favorites!`);
    } else {
      this.toastService.info(`Removed ${place.name} from Favorites`);
    }
  }

  deletePlace(id: string): void {
    this.places = this.places.filter(p => p.id !== id);
    this.storage.setItem('tripSphere_places', this.places);
    this.toastService.info('Place removed from your list');
  }

  saveCustomPlace(): void {
    if (!this.newPlace.name || !this.newPlace.location) return;

    const place: Place = {
      id: 'custom-' + Date.now(),
      tripId: this.tripId || 'trip-1',
      name: this.newPlace.name,
      category: this.newPlace.category,
      rating: this.newPlace.rating || 4.5,
      location: this.newPlace.location,
      image: this.newPlace.image || 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
      description: this.newPlace.description || 'Custom spot saved by traveler.',
      coordinates: {
        lat: (this.mapCenter.lat || 35.67) + (Math.random() - 0.5) * 0.05,
        lng: (this.mapCenter.lng || 139.65) + (Math.random() - 0.5) * 0.05
      },
      isFavorite: true
    };

    this.places.unshift(place);
    this.storage.setItem('tripSphere_places', this.places);
    this.showAddModal = false;
    this.toastService.success(`Saved "${place.name}" to this trip!`);

    // Reset form
    this.newPlace = {
      name: '',
      category: 'Attractions',
      rating: 4.8,
      location: '',
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
      description: ''
    };
  }
}
