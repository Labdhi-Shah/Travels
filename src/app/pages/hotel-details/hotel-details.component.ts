import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HOTELS } from '../../data/hotels';
import { Hotel, HotelRoom } from '../../models/hotel.model';
import { FavoriteService } from '../../core/services/favorite.service';
import { BookingService } from '../../core/services/booking.service';
import { ToastService } from '../../core/services/toast.service';
import { LucideIconComponent } from '../../shared/icon/lucide-icon.component';
import { MapComponent, MapMarker } from '../../shared/map/map.component';
import { ImageGalleryComponent } from '../../shared/image-gallery/image-gallery.component';

@Component({
  selector: 'app-hotel-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    LucideIconComponent,
    MapComponent,
    ImageGalleryComponent
  ],
  template: `
    @if (hotel) {
      <div class="min-h-screen bg-[#F8F7F3] pt-28 pb-24">
        <!-- Top Breadcrumb Bar -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div class="flex items-center gap-2 text-xs sm:text-sm text-[#6B7280]">
            <a routerLink="/" class="hover:text-[#0B1320] transition">Home</a>
            <span>/</span>
            <a routerLink="/hotels" class="hover:text-[#0B1320] transition">Hotels</a>
            <span>/</span>
            <span class="text-[#0B1320] font-semibold truncate">{{ hotel.name }}</span>
          </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Hotel Header -->
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div class="flex items-center gap-2.5 mb-2">
                <span class="px-3.5 py-1 rounded-full bg-[#EFEDE7] text-[#0B1320] text-xs font-semibold tracking-wide uppercase">
                  5-Star Luxury Sanctuary
                </span>
                <div class="flex items-center gap-1 text-[#F4A261] font-bold text-sm">
                  <app-icon name="star" [size]="15" class="fill-[#F4A261]"></app-icon>
                  <span>{{ hotel.rating }}</span>
                  <span class="text-[#6B7280] font-normal text-xs">({{ hotel.reviewsCount }} verified reviews)</span>
                </div>
              </div>
              <h1 class="text-3xl sm:text-5xl font-serif font-bold text-[#0B1320] tracking-tight">{{ hotel.name }}</h1>
              <p class="text-sm text-[#6B7280] flex items-center gap-1.5 mt-2">
                <app-icon name="map-pin" [size]="15" class="text-[#D4A359]"></app-icon>
                <span>{{ hotel.location }}, {{ hotel.city }}, {{ hotel.country }}</span>
              </p>
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center gap-3">
              <button
                (click)="toggleFavorite()"
                type="button"
                class="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#EFEDE7] bg-white hover:bg-[#EFEDE7] text-xs font-semibold uppercase tracking-wider transition shadow-sm cursor-pointer"
                [ngClass]="isFavorite() ? 'text-[#D4A359] border-[#D4A359]/30 bg-[#D4A359]/5' : 'text-[#0B1320]'"
              >
                <app-icon name="heart" [size]="16" [class]="isFavorite() ? 'fill-[#D4A359] text-[#D4A359]' : ''"></app-icon>
                <span>{{ isFavorite() ? 'Saved to Wishlist' : 'Save Hotel' }}</span>
              </button>
              <button
                (click)="shareHotel()"
                type="button"
                class="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#EFEDE7] bg-white hover:bg-[#EFEDE7] text-xs font-semibold uppercase tracking-wider text-[#0B1320] transition shadow-sm cursor-pointer"
              >
                <app-icon name="share" [size]="15"></app-icon>
                <span>Share</span>
              </button>
            </div>
          </div>

          <!-- Image Grid (Collage with Lightbox trigger) -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-3 mb-12 h-[380px] sm:h-[460px] rounded-3xl overflow-hidden shadow-xl border border-[#EFEDE7]">
            <!-- Large Main Hero Image -->
            <div
              (click)="openLightbox(0)"
              class="md:col-span-2 h-full relative group cursor-pointer overflow-hidden"
            >
              <img
                [src]="hotel.image"
                [alt]="hotel.name"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <span class="text-white text-xs font-semibold px-4 py-2 rounded-full bg-black/60 backdrop-blur-md flex items-center gap-2">
                  <app-icon name="camera" [size]="14"></app-icon> View Fullscreen Gallery
                </span>
              </div>
            </div>

            <!-- Right Gallery Thumbnails -->
            <div class="hidden md:grid md:col-span-2 grid-cols-2 gap-3 h-full">
              @for (img of (hotel.gallery || []).slice(0, 4); track $index) {
                <div
                  (click)="openLightbox($index)"
                  class="relative group cursor-pointer overflow-hidden rounded-2xl h-[220px]"
                >
                  <img
                    [src]="img"
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    alt="Hotel gallery detail"
                  />
                  <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              }
            </div>
          </div>

          <!-- Main Content Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <!-- Left 2 Cols: Details, Amenities, Rooms, Map -->
            <div class="lg:col-span-2 space-y-10">
              <!-- Overview -->
              <div class="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFEDE7] shadow-sm">
                <h2 class="text-2xl font-serif font-bold text-[#0B1320] mb-4">About this Property</h2>
                <p class="text-[#17202A] leading-relaxed mb-4 text-base font-light">
                  {{ hotel.overview || hotel.description }}
                </p>
                <p class="text-[#6B7280] leading-relaxed text-sm">
                  {{ hotel.description }}
                </p>

                <div class="mt-8 pt-6 border-t border-[#EFEDE7] grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div class="p-4 rounded-2xl bg-[#F8F7F3] border border-[#EFEDE7]">
                    <span class="text-[11px] text-[#6B7280] font-semibold uppercase tracking-wider block mb-1">Check-in</span>
                    <span class="text-sm font-bold text-[#0B1320]">{{ hotel.checkIn || '2:00 PM' }}</span>
                  </div>
                  <div class="p-4 rounded-2xl bg-[#F8F7F3] border border-[#EFEDE7]">
                    <span class="text-[11px] text-[#6B7280] font-semibold uppercase tracking-wider block mb-1">Check-out</span>
                    <span class="text-sm font-bold text-[#0B1320]">{{ hotel.checkOut || '11:00 AM' }}</span>
                  </div>
                  <div class="p-4 rounded-2xl bg-[#F8F7F3] border border-[#EFEDE7]">
                    <span class="text-[11px] text-[#6B7280] font-semibold uppercase tracking-wider block mb-1">Concierge</span>
                    <span class="text-sm font-bold text-[#0B1320]">24/7 Dedicated</span>
                  </div>
                  <div class="p-4 rounded-2xl bg-[#F8F7F3] border border-[#EFEDE7]">
                    <span class="text-[11px] text-[#6B7280] font-semibold uppercase tracking-wider block mb-1">Cancellation</span>
                    <span class="text-sm font-bold text-emerald-600">Free until 48h</span>
                  </div>
                </div>
              </div>

              <!-- Amenities Grid -->
              <div class="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFEDE7] shadow-sm">
                <h2 class="text-2xl font-serif font-bold text-[#0B1320] mb-6">Curated Amenities</h2>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  @for (amenity of hotel.amenities; track amenity) {
                    <div class="flex items-center gap-3 p-3.5 rounded-2xl bg-[#F8F7F3] border border-[#EFEDE7] text-[#0B1320]">
                      <div class="w-9 h-9 rounded-xl bg-[#EFEDE7] text-[#0B1320] flex items-center justify-center shrink-0">
                        <app-icon [name]="getAmenityIcon(amenity)" [size]="17"></app-icon>
                      </div>
                      <span class="text-xs font-semibold uppercase tracking-wider">{{ amenity }}</span>
                    </div>
                  }
                </div>
              </div>

              <!-- Available Room Types -->
              @if (hotel.roomTypes && hotel.roomTypes.length > 0) {
                <div class="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFEDE7] shadow-sm">
                  <div class="flex items-center justify-between mb-6">
                    <div>
                      <h2 class="text-2xl font-serif font-bold text-[#0B1320]">Select Your Suite</h2>
                      <p class="text-xs sm:text-sm text-[#6B7280]">All room reservations include complimentary artisan breakfast & private concierge access</p>
                    </div>
                  </div>

                  <div class="space-y-4">
                    @for (room of hotel.roomTypes; track room.id) {
                      <div
                        class="flex flex-col sm:flex-row gap-4 p-5 rounded-2xl border transition-all duration-200"
                        [ngClass]="selectedRoom?.id === room.id ? 'border-[#0B1320] bg-[#EFEDE7]/40 ring-2 ring-[#0B1320]/20' : 'border-[#EFEDE7] hover:border-[#0B1320]/40'"
                      >
                        <div class="w-full sm:w-44 h-32 rounded-xl overflow-hidden shrink-0">
                          <img [src]="room.image" [alt]="room.name" class="w-full h-full object-cover" />
                        </div>
                        <div class="flex-1 flex flex-col justify-between">
                          <div>
                            <div class="flex items-start justify-between gap-2">
                              <h3 class="font-serif font-bold text-[#0B1320] text-lg">{{ room.name }}</h3>
                              <span class="text-lg font-serif font-bold text-[#0B1320]">\${{ room.price }}<span class="text-xs font-normal text-[#6B7280]">/night</span></span>
                            </div>
                            <div class="flex items-center gap-3 text-xs text-[#6B7280] mt-1 mb-2">
                              <span class="flex items-center gap-1">
                                <app-icon name="user" [size]="14"></app-icon> {{ room.capacity }}
                              </span>
                              <span>•</span>
                              <span>{{ room.bed }}</span>
                            </div>
                            <div class="flex flex-wrap gap-1.5 mt-2">
                              @for (feat of room.features; track feat) {
                                <span class="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#EFEDE7] text-[#17202A]">
                                  {{ feat }}
                                </span>
                              }
                            </div>
                          </div>
                          <div class="mt-4 flex justify-end">
                            <button
                              (click)="selectRoom(room)"
                              type="button"
                              class="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition cursor-pointer"
                              [ngClass]="selectedRoom?.id === room.id ? 'bg-[#0B1320] text-white' : 'bg-[#EFEDE7] hover:bg-[#0B1320] hover:text-white text-[#0B1320]'"
                            >
                              {{ selectedRoom?.id === room.id ? '✓ Selected' : 'Select Room' }}
                            </button>
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              }

              <!-- Interactive Location Map -->
              <div class="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFEDE7] shadow-sm">
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <h2 class="text-2xl font-serif font-bold text-[#0B1320]">Location & Surroundings</h2>
                    <p class="text-xs sm:text-sm text-[#6B7280]">{{ hotel.location }}, {{ hotel.city }}</p>
                  </div>
                  <span class="text-xs font-semibold px-3 py-1 bg-[#D4A359]/20 text-[#071F22] rounded-full uppercase tracking-wider">
                    Prime District
                  </span>
                </div>

                <app-map
                  [lat]="hotel.coordinates.lat"
                  [lng]="hotel.coordinates.lng"
                  [zoom]="14"
                  [title]="hotel.name"
                  height="360px"
                  [markers]="hotelMarkers"
                ></app-map>
              </div>
            </div>

            <!-- Right 1 Col: Floating Reservation Card -->
            <div class="lg:col-span-1">
              <div class="sticky top-28 bg-white rounded-3xl p-6 sm:p-8 border border-[#EFEDE7] shadow-xl space-y-6">
                <div class="flex items-baseline justify-between">
                  <div>
                    <span class="text-3xl font-serif font-bold text-[#0B1320]">
                      \${{ selectedRoom ? selectedRoom.price : hotel.pricePerNight }}
                    </span>
                    <span class="text-xs text-[#6B7280] font-medium"> / night</span>
                  </div>
                  <div class="text-right">
                    <span class="text-xs text-emerald-700 font-semibold bg-emerald-50 px-3 py-1 rounded-full">
                      Instant Confirmation
                    </span>
                  </div>
                </div>

                <!-- Date Selection -->
                <div class="grid grid-cols-2 gap-2 p-2 rounded-2xl bg-[#F8F7F3] border border-[#EFEDE7]">
                  <div>
                    <label class="block text-[11px] font-bold text-[#6B7280] uppercase tracking-wider mb-1 px-1">Check-in</label>
                    <input
                      type="date"
                      [(ngModel)]="checkInDate"
                      (change)="calculateTotals()"
                      class="w-full bg-white text-xs font-semibold text-[#0B1320] p-2 rounded-xl border border-[#EFEDE7] focus:outline-none focus:border-[#0B1320]"
                    />
                  </div>
                  <div>
                    <label class="block text-[11px] font-bold text-[#6B7280] uppercase tracking-wider mb-1 px-1">Check-out</label>
                    <input
                      type="date"
                      [(ngModel)]="checkOutDate"
                      (change)="calculateTotals()"
                      class="w-full bg-white text-xs font-semibold text-[#0B1320] p-2 rounded-xl border border-[#EFEDE7] focus:outline-none focus:border-[#0B1320]"
                    />
                  </div>
                </div>

                <!-- Guests -->
                <div>
                  <label class="block text-xs font-bold text-[#0B1320] mb-1.5 uppercase tracking-wider">Guests</label>
                  <select
                    [(ngModel)]="guestCount"
                    class="w-full bg-[#F8F7F3] text-sm font-medium text-[#0B1320] p-3 rounded-xl border border-[#EFEDE7] focus:outline-none focus:border-[#0B1320]"
                  >
                    <option [value]="1">1 Adult</option>
                    <option [value]="2">2 Adults</option>
                    <option [value]="3">3 Adults (Suite required)</option>
                    <option [value]="4">4 Adults / Family</option>
                  </select>
                </div>

                <!-- Price Breakdown -->
                <div class="space-y-2.5 pt-4 border-t border-[#EFEDE7] text-sm">
                  <div class="flex justify-between text-[#6B7280]">
                    <span>\${{ currentPricePerNight }} &times; {{ nights }} nights</span>
                    <span class="font-medium text-[#0B1320]">\${{ subtotal }}</span>
                  </div>
                  <div class="flex justify-between text-[#6B7280]">
                    <span>Taxes & Service Fees (10%)</span>
                    <span class="font-medium text-[#0B1320]">\${{ taxes }}</span>
                  </div>
                  <div class="flex justify-between font-bold text-base text-[#0B1320] pt-2 border-t border-[#EFEDE7]">
                    <span>Total Cost</span>
                    <span class="text-[#0A2D30] font-serif text-2xl">\${{ totalAmount }}</span>
                  </div>
                </div>

                <!-- Booking CTA -->
                <button
                  (click)="reserveHotel()"
                  type="button"
                  class="w-full py-4 rounded-full bg-[#0A2D30] hover:bg-[#D4A359] hover:text-[#0A2D30] text-white font-semibold text-xs uppercase tracking-wider shadow-lg transition hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <app-icon name="check" [size]="18"></app-icon>
                  <span>Reserve Room Now</span>
                </button>

                <p class="text-[11px] text-[#6B7280] text-center leading-relaxed">
                  No immediate charge. You will pay during check-in. Free cancellation applies.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Lightbox Gallery Modal -->
        <app-image-gallery
          [images]="allGalleryImages"
          [activeIndex]="lightboxIndex"
          [isOpen]="lightboxOpen"
          (close)="lightboxOpen = false"
        ></app-image-gallery>
      </div>
    } @else {
      <div class="min-h-screen bg-[#F8F7F3] pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
        <h2 class="text-3xl font-serif font-bold text-[#0B1320] mb-3">Hotel Not Found</h2>
        <p class="text-[#6B7280] mb-6 max-w-md">We could not locate the luxury property you are looking for.</p>
        <a routerLink="/hotels" class="px-6 py-3 rounded-full bg-[#071F22] text-white font-semibold text-xs uppercase tracking-wider shadow hover:bg-[#D4A359] hover:text-[#071F22] transition">
          Browse All Hotels
        </a>
      </div>
    }
  `
})
export class HotelDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private favoriteService = inject(FavoriteService);
  private bookingService = inject(BookingService);
  private toastService = inject(ToastService);

  hotel?: Hotel;
  selectedRoom?: HotelRoom;
  hotelMarkers: MapMarker[] = [];

  // Dates & Calculation
  checkInDate: string = '2026-06-15';
  checkOutDate: string = '2026-06-18';
  guestCount: number = 2;
  nights: number = 3;
  subtotal: number = 0;
  taxes: number = 0;
  totalAmount: number = 0;

  // Lightbox
  lightboxOpen = false;
  lightboxIndex = 0;

  get allGalleryImages(): string[] {
    if (!this.hotel) return [];
    return [this.hotel.image, ...(this.hotel.gallery || [])];
  }

  get currentPricePerNight(): number {
    return this.selectedRoom ? this.selectedRoom.price : (this.hotel?.pricePerNight || 0);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.hotel = HOTELS.find(h => h.id === id);
        if (this.hotel) {
          if (this.hotel.roomTypes && this.hotel.roomTypes.length > 0) {
            this.selectedRoom = this.hotel.roomTypes[0];
          }
          this.setupMarkers();
          this.calculateTotals();
        }
      }
    });
  }

  private setupMarkers(): void {
    if (!this.hotel) return;
    this.hotelMarkers = [
      {
        lat: this.hotel.coordinates.lat,
        lng: this.hotel.coordinates.lng,
        title: this.hotel.name,
        description: this.hotel.description,
        image: this.hotel.image,
        type: 'hotel'
      },
      {
        lat: this.hotel.coordinates.lat + 0.008,
        lng: this.hotel.coordinates.lng + 0.006,
        title: 'Local Artisan Dining & Bistro',
        description: 'Authentic local delicacies and organic wine bar.',
        type: 'food'
      },
      {
        lat: this.hotel.coordinates.lat - 0.006,
        lng: this.hotel.coordinates.lng - 0.007,
        title: 'Scenic Panorama Viewpoint',
        description: 'Spectacular vistas and photography overlook.',
        type: 'attraction'
      }
    ];
  }

  calculateTotals(): void {
    const start = new Date(this.checkInDate).getTime();
    const end = new Date(this.checkOutDate).getTime();
    const diff = Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)));
    this.nights = isNaN(diff) ? 3 : diff;

    this.subtotal = this.currentPricePerNight * this.nights;
    this.taxes = Math.round(this.subtotal * 0.1);
    this.totalAmount = this.subtotal + this.taxes;
  }

  selectRoom(room: HotelRoom): void {
    this.selectedRoom = room;
    this.calculateTotals();
    this.toastService.info(`Selected ${room.name} ($${room.price}/night)`);
  }

  isFavorite(): boolean {
    return this.hotel ? this.favoriteService.isFavorite(this.hotel.id) : false;
  }

  toggleFavorite(): void {
    if (!this.hotel) return;
    const added = this.favoriteService.toggleFavorite(this.hotel.id);
    if (added) {
      this.toastService.success(`Added ${this.hotel.name} to your Wishlist!`);
    } else {
      this.toastService.info(`Removed ${this.hotel.name} from Wishlist`);
    }
  }

  shareHotel(): void {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      this.toastService.success('Hotel link copied to clipboard!');
    } else {
      this.toastService.info('Share URL: ' + window.location.href);
    }
  }

  openLightbox(index: number): void {
    this.lightboxIndex = index;
    this.lightboxOpen = true;
  }

  getAmenityIcon(amenity: string): string {
    switch (amenity) {
      case 'Wi-Fi': return 'wifi';
      case 'Breakfast': return 'coffee';
      case 'Pool': return 'waves';
      case 'Parking': return 'car';
      case 'Air Conditioning': return 'wind';
      case 'Spa': return 'sparkles';
      case 'Ocean View': return 'sun';
      case 'Fitness Center': return 'dumbbell';
      default: return 'check';
    }
  }

  reserveHotel(): void {
    if (!this.hotel) return;

    this.bookingService.addBooking({
      title: `${this.hotel.name} (${this.selectedRoom?.name || 'Standard Luxury'})`,
      category: 'Hotel',
      date: this.checkInDate,
      time: '3:00 PM Check-in',
      location: `${this.hotel.location}, ${this.hotel.city}`,
      confirmationCode: 'HTL-' + Math.floor(100000 + Math.random() * 900000),
      amount: this.totalAmount,
      currency: 'USD',
      details: `${this.nights} Nights • ${this.guestCount} Guests • Free Cancellation`
    });

    this.toastService.success(`Reservation confirmed for ${this.hotel.name}! Added to your Bookings.`);
    this.router.navigate(['/bookings']);
  }
}
