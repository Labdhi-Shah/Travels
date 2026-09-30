import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideIconComponent } from '../../shared/icon/lucide-icon.component';
import { HotelCardComponent } from '../../shared/hotel-card/hotel-card.component';
import { ModalComponent } from '../../shared/modal/modal.component';
import { EmptyStateComponent } from '../../shared/empty-state/empty-state.component';
import { HOTELS } from '../../data/hotels';
import { Hotel } from '../../models/hotel.model';
import { BookingService } from '../../core/services/booking.service';

@Component({
  selector: 'app-hotels',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideIconComponent, HotelCardComponent, ModalComponent, EmptyStateComponent],
  template: `
    <div class="pt-28 pb-24 bg-[#F8FAFC] min-h-screen text-[#0B192C]">
      
      <!-- Editorial Hero Banner -->
      <section class="relative bg-[#071F22] text-white py-20 px-4 sm:px-6 lg:px-8 mb-12 overflow-hidden border-b border-[#D4A359]/20">
        <div class="absolute -top-32 -right-32 w-96 h-96 bg-[#D4A359]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="max-w-7xl mx-auto space-y-4 text-center relative z-10">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[#D4A359]/30 text-xs font-semibold text-[#D4A359] uppercase tracking-wider">
            <app-icon name="hotel" [size]="13"></app-icon>
            Curated Sanctuaries & Boutique Resorts
          </div>
          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight">
            Stay Somewhere <span class="font-script text-[#D4A359] font-normal text-4xl sm:text-6xl">Unforgettable</span>
          </h1>
          <p class="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Reserve handpicked cliffside villas, heritage alpine chalets, and private island havens vetted for extraordinary design and service.
          </p>
        </div>
      </section>

      <!-- Main Container -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Filter bar -->
        <div class="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200/90 mb-10 space-y-5">
          <div class="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5">
            
            <div class="relative flex-1">
              <app-icon name="search" [size]="17" extraClass="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></app-icon>
              <input
                type="text"
                [(ngModel)]="searchQuery"
                (ngModelChange)="applyFilters()"
                placeholder="Search hotel name, city, or destination..."
                class="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder-slate-400 font-medium focus:outline-none focus:border-[#D4A359] transition-colors"
              />
            </div>

            <div class="flex items-center gap-4 text-xs bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200">
              <span class="font-medium text-slate-500">Max / Night: <strong class="text-[#0B192C] font-display text-sm">\${{ maxPrice | number }}</strong></span>
              <input
                type="range"
                min="100"
                max="800"
                step="25"
                [(ngModel)]="maxPrice"
                (ngModelChange)="applyFilters()"
                class="accent-[#D4A359] cursor-pointer"
              />
            </div>

          </div>

          <!-- Amenity Filter Chips -->
          <div class="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
            <span class="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mr-2">Curated Amenities:</span>
            <button
              *ngFor="let am of availableAmenities"
              type="button"
              (click)="toggleAmenity(am)"
              class="px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer"
              [ngClass]="selectedAmenities.includes(am)
                ? 'bg-[#0A2D30] text-white shadow-sm ring-1 ring-[#D4A359]/30'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'"
            >
              {{ am }}
            </button>
          </div>
        </div>

        <!-- Grid of Hotels -->
        <div *ngIf="filteredHotels.length > 0; else emptyTpl" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <app-hotel-card
            *ngFor="let hotel of filteredHotels"
            [hotel]="hotel"
            (onSelect)="selectHotel(hotel)"
          ></app-hotel-card>
        </div>

        <ng-template #emptyTpl>
          <app-empty-state
            iconName="hotel"
            title="No hotels match your filters"
            description="Try increasing your maximum night rate or deselecting specific amenity filters to view all accommodations."
            actionLabel="Reset Filters"
            (action)="resetFilters()"
          ></app-empty-state>
        </ng-template>

      </div>

      <!-- Hotel Booking Confirmation Modal -->
      <app-modal
        [isOpen]="bookingHotel !== null"
        title="Reserve Your Stay"
        [subtitle]="bookingHotel?.name"
        iconName="hotel"
        (close)="bookingHotel = null"
      >
        <div *ngIf="bookingHotel" class="space-y-4 text-xs sm:text-sm">
          <img [src]="bookingHotel.image" [alt]="bookingHotel.name" class="w-full h-44 rounded-2xl object-cover" />
          
          <div class="flex items-center justify-between border-b border-[#EFEDE7] pb-3">
            <div>
              <p class="font-serif font-bold text-base text-[#0B1320]">{{ bookingHotel.name }}</p>
              <p class="text-xs text-[#6B7280]">{{ bookingHotel.location }}, {{ bookingHotel.city }}</p>
            </div>
            <div class="text-right">
              <span class="text-lg font-serif font-bold text-[#0B1320]">\${{ bookingHotel.pricePerNight }}</span>
              <span class="text-xs text-[#6B7280] block">/ night</span>
            </div>
          </div>

          <div class="p-4 bg-[#EFEDE7]/70 rounded-2xl space-y-1.5 text-[#17202A] text-xs">
            <p class="font-bold text-[#0B1320]">TripSphere White-Glove Stay Guarantee:</p>
            <p class="text-[#6B7280]">• Complimentary room upgrade subject to arrival availability.</p>
            <p class="text-[#6B7280]">• Free cancellation up to 48 hours prior to check-in.</p>
          </div>

          <div class="pt-3 flex gap-3">
            <button
              type="button"
              (click)="bookingHotel = null"
              class="flex-1 py-3 rounded-full border border-[#EFEDE7] text-[#17202A] text-xs font-semibold hover:bg-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              (click)="confirmBooking()"
              class="flex-1 py-3 rounded-full bg-[#0A2D30] hover:bg-[#D4A359] hover:text-[#0A2D30] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
            >
              Confirm (\${{ bookingHotel.pricePerNight }})
            </button>
          </div>
        </div>
      </app-modal>

    </div>
  `
})
export class HotelsComponent implements OnInit {
  private bookingService = inject(BookingService);
  private router = inject(Router);

  readonly allHotels: Hotel[] = HOTELS;
  filteredHotels: Hotel[] = [];

  readonly availableAmenities = ['Wi-Fi', 'Breakfast', 'Pool', 'Parking', 'Air Conditioning', 'Spa', 'Ocean View'];

  searchQuery = '';
  maxPrice = 800;
  selectedAmenities: string[] = [];
  bookingHotel: Hotel | null = null;

  ngOnInit(): void {
    this.applyFilters();
  }

  toggleAmenity(am: string): void {
    const idx = this.selectedAmenities.indexOf(am);
    if (idx > -1) {
      this.selectedAmenities.splice(idx, 1);
    } else {
      this.selectedAmenities.push(am);
    }
    this.applyFilters();
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.maxPrice = 800;
    this.selectedAmenities = [];
    this.applyFilters();
  }

  applyFilters(): void {
    let list = [...this.allHotels];

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().trim();
      list = list.filter(
        h =>
          h.name.toLowerCase().includes(q) ||
          h.city.toLowerCase().includes(q) ||
          h.country.toLowerCase().includes(q) ||
          h.location.toLowerCase().includes(q)
      );
    }

    list = list.filter(h => h.pricePerNight <= this.maxPrice);

    if (this.selectedAmenities.length > 0) {
      list = list.filter(h =>
        this.selectedAmenities.every(am => (h.amenities as string[]).includes(am))
      );
    }

    this.filteredHotels = list;
  }

  selectHotel(hotel: Hotel): void {
    this.router.navigate(['/hotels', hotel.id]);
  }

  confirmBooking(): void {
    if (!this.bookingHotel) return;

    this.bookingService.addBooking({
      category: 'Hotels',
      title: this.bookingHotel.name,
      provider: 'TripSphere Luxury Stays',
      location: `${this.bookingHotel.city}, ${this.bookingHotel.country}`,
      date: new Date().toISOString().split('T')[0],
      time: 'Check-in: 3:00 PM',
      price: this.bookingHotel.pricePerNight,
      details: `${this.bookingHotel.amenities.join(', ')}. Free cancellation.`,
      guestName: 'Alex Mercer',
      passengersOrGuests: 2,
      status: 'Confirmed'
    });

    this.bookingHotel = null;
    this.router.navigate(['/bookings']);
  }
}
