import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LucideIconComponent } from '../../shared/icon/lucide-icon.component';
import { PACKAGES } from '../../data/packages';
import { TourPackage } from '../../models/package.model';
import { BookingService } from '../../core/services/booking.service';
import { FavoriteService } from '../../core/services/favorite.service';
import { ToastService } from '../../core/services/toast.service';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-package-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    LucideIconComponent,
    ModalComponent
  ],
  template: `
    @if (pkg) {
      <div class="pt-24 pb-28 min-h-screen bg-[#F8F7F3] text-[#17202A]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <!-- Breadcrumb & Back -->
          <div class="mb-6">
            <a
              routerLink="/packages"
              class="inline-flex items-center gap-2 text-xs font-bold text-[#071F22] hover:text-[#D4A359] transition-colors"
            >
              <app-icon name="arrow-left" [size]="14"></app-icon>
              <span>Back to Tour Packages</span>
            </a>
          </div>

          <!-- ============================================================== -->
          <!-- TOP: PREMIUM BOOKING-STYLE LAYOUT (LEFT GALLERY, RIGHT BOOKING) -->
          <!-- ============================================================== -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
            
            <!-- LEFT: LARGE IMAGE GALLERY (7 Cols) -->
            <div class="lg:col-span-7 space-y-4">
              <!-- Main Large Image -->
              <div class="relative h-[360px] sm:h-[480px] rounded-3xl overflow-hidden shadow-md bg-[#071F22]">
                <img
                  [src]="activeGalleryImage"
                  [alt]="pkg.name"
                  class="w-full h-full object-cover transition-all duration-500"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-[#071F22]/60 via-transparent to-transparent pointer-events-none"></div>

                <!-- Duration Pill -->
                <span class="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-bold">
                  {{ pkg.durationDays }} Days / {{ pkg.durationNights }} Nights
                </span>
              </div>

              <!-- Thumbnails Strip -->
              <div class="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
                @for (img of (pkg.gallery || [pkg.image]); track $index) {
                  <button
                    type="button"
                    (click)="activeGalleryImage = img"
                    class="w-24 sm:w-28 h-20 rounded-2xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer"
                    [class.border-[#D4A359]]="activeGalleryImage === img"
                    [class.border-transparent]="activeGalleryImage !== img"
                    [class.opacity-60]="activeGalleryImage !== img"
                  >
                    <img [src]="img" class="w-full h-full object-cover" [alt]="pkg.name + ' thumb'" />
                  </button>
                }
              </div>
            </div>

            <!-- RIGHT: PACKAGE INFORMATION & BOOKING CARD (5 Cols) -->
            <div class="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#EFEDE7] shadow-xl space-y-6">
              
              <!-- Location & Rating -->
              <div class="flex items-center justify-between pb-3 border-b border-[#EFEDE7]">
                <p class="flex items-center gap-1.5 text-xs font-bold text-[#D4A359] uppercase tracking-wide">
                  <app-icon name="map-pin" [size]="13"></app-icon>
                  <span>{{ pkg.destination }}, {{ pkg.country }}</span>
                </p>

                <div class="flex items-center gap-1 text-xs font-bold text-[#0B1320]">
                  <app-icon name="star" [size]="14" [isFilled]="true" extraClass="text-[#D4A359]"></app-icon>
                  <span>{{ pkg.rating }}</span>
                  <span class="text-[#6B7280] font-normal">({{ pkg.reviewsCount }})</span>
                </div>
              </div>

              <!-- Package Name & Duration -->
              <div>
                <h1 class="text-2xl sm:text-3xl font-bold font-display text-[#0B1320] leading-tight">
                  {{ pkg.name }}
                </h1>
                <div class="flex items-center gap-2 mt-2 text-xs text-[#6B7280]">
                  <app-icon name="calendar" [size]="13" extraClass="text-[#D4A359]"></app-icon>
                  <span>{{ pkg.durationDays }} Days / {{ pkg.durationNights }} Nights</span>
                  <span>•</span>
                  <span>Max {{ pkg.maxTravelers }} Travelers</span>
                </div>
              </div>

              <!-- Price & Discount -->
              <div class="p-4 rounded-2xl bg-[#EFEDE7]/40 border border-[#EFEDE7]">
                <div class="flex items-baseline justify-between">
                  <div>
                    <span class="text-[10px] uppercase font-bold text-[#6B7280] tracking-wider block">
                      Total All-Inclusive Rate
                    </span>
                    <div class="flex items-baseline gap-2 mt-0.5">
                      <span class="text-3xl sm:text-4xl font-extrabold text-[#0B1320] font-display">
                        \${{ pkg.price }}
                      </span>
                      <span class="text-xs text-[#6B7280]">/ person</span>
                    </div>
                  </div>

                  @if (pkg.originalPrice) {
                    <div class="text-right">
                      <span class="text-xs text-[#6B7280] line-through block">
                        \${{ pkg.originalPrice }}
                      </span>
                      <span class="px-2 py-0.5 rounded-md bg-[#D4A359]/20 text-[#071F22] text-xs font-bold">
                        Save \${{ pkg.originalPrice - pkg.price }}
                      </span>
                    </div>
                  }
                </div>
              </div>

              <!-- Available Dates -->
              <div class="space-y-1.5">
                <label class="block text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                  Available Departure Dates
                </label>
                <select
                  [(ngModel)]="selectedDate"
                  class="w-full px-4 py-3 rounded-xl bg-[#EFEDE7]/50 border border-[#0B1320]/10 text-xs sm:text-sm font-semibold text-[#17202A] focus:outline-none focus:border-[#D4A359] cursor-pointer"
                >
                  <option value="2026-10-15">Oct 15, 2026 – Available</option>
                  <option value="2026-11-05">Nov 05, 2026 – Guaranteed</option>
                  <option value="2026-12-10">Dec 10, 2026 – Peak Season</option>
                  <option value="2027-01-18">Jan 18, 2027 – Available</option>
                </select>
              </div>

              <!-- CTA BUTTONS: "Book Package", "Customize", & "Save" -->
              <div class="pt-2 space-y-2.5">
                <button
                  type="button"
                  (click)="isBookingModalOpen = true"
                  class="w-full py-3.5 px-6 rounded-xl bg-[#0A2D30] hover:bg-[#D4A359] hover:text-[#0A2D30] text-white font-bold text-sm tracking-wide transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  <app-icon name="credit-card" [size]="16"></app-icon>
                  <span>Book Package</span>
                </button>

                <a
                  [routerLink]="['/plan-trip']"
                  [queryParams]="{ destination: pkg.destination }"
                  class="w-full py-3 px-6 rounded-xl bg-[#F8F7F3] hover:bg-[#EFEDE7] text-[#0B1320] border border-[#EFEDE7] font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <app-icon name="compass" [size]="16" extraClass="text-[#D4A359]"></app-icon>
                  <span>Customize in Plan My Trip</span>
                </a>

                <button
                  type="button"
                  (click)="toggleSave()"
                  class="w-full py-2.5 px-6 rounded-xl bg-transparent hover:bg-[#EFEDE7]/70 text-[#0B1320] border border-[#0B1320]/20 font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <app-icon
                    name="heart"
                    [size]="16"
                    [isFilled]="isSaved"
                    [extraClass]="isSaved ? 'text-[#D4A359]' : 'text-[#0B1320]'"
                  ></app-icon>
                  <span>{{ isSaved ? 'Saved to Wishlist' : 'Save Package' }}</span>
                </button>
              </div>

              <div class="pt-2 text-center">
                <p class="text-[11px] text-[#6B7280]">
                  🔒 Reserve today • Free cancellation up to 48h before departure
                </p>
              </div>

            </div>

          </div>

          <!-- ============================================================== -->
          <!-- BELOW: OVERVIEW | ITINERARY | INCLUDED | EXCLUDED | HOTELS | ACTIVITIES | CANCELLATION POLICY -->
          <!-- ============================================================== -->
          <div class="bg-white rounded-3xl p-6 sm:p-10 border border-[#EFEDE7] shadow-sm space-y-12">
            
            <!-- 1. OVERVIEW -->
            <section class="space-y-3">
              <h2 class="text-2xl font-bold font-display text-[#0B1320]">
                Overview
              </h2>
              <p class="text-sm sm:text-base text-[#17202A] leading-relaxed font-light">
                {{ pkg.overview }}
              </p>
            </section>

            <!-- 2. ITINERARY -->
            <section class="space-y-4 pt-6 border-t border-[#EFEDE7]">
              <h2 class="text-2xl font-bold font-display text-[#0B1320]">
                Day-by-Day Itinerary
              </h2>
              <div class="space-y-4">
                @for (day of pkg.itinerary; track day.day) {
                  <div class="p-5 rounded-2xl bg-[#EFEDE7]/30 border border-[#EFEDE7] space-y-2">
                    <div class="flex items-center gap-2.5">
                      <span class="w-7 h-7 rounded-lg bg-[#0B1320] text-white text-xs font-bold flex items-center justify-center">
                        D{{ day.day }}
                      </span>
                      <h3 class="text-base font-bold text-[#0B1320]">
                        {{ day.title }}
                      </h3>
                    </div>
                    <p class="text-xs sm:text-sm text-[#6B7280] leading-relaxed font-light pl-9">
                      {{ day.description }}
                    </p>
                    <div class="pl-9 flex flex-wrap gap-2 pt-1 text-[11px] text-[#17202A] font-medium">
                      @for (act of day.activities; track act) {
                        <span class="px-2.5 py-0.5 rounded-md bg-white border border-[#EFEDE7]">
                          ✓ {{ act }}
                        </span>
                      }
                    </div>
                  </div>
                }
              </div>
            </section>

            <!-- 3 & 4. INCLUDED & EXCLUDED -->
            <section class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-[#EFEDE7]">
              <!-- Included -->
              <div class="space-y-3">
                <h3 class="text-lg font-bold font-display text-emerald-800 flex items-center gap-2">
                  <app-icon name="check-circle" [size]="18" extraClass="text-emerald-600"></app-icon>
                  <span>Included in Package</span>
                </h3>
                <ul class="space-y-2 text-xs sm:text-sm text-[#17202A]">
                  @for (inc of pkg.included; track inc) {
                    <li class="flex items-start gap-2">
                      <span class="text-emerald-600 font-bold">✓</span>
                      <span>{{ inc }}</span>
                    </li>
                  }
                </ul>
              </div>

              <!-- Excluded -->
              <div class="space-y-3">
                <h3 class="text-lg font-bold font-display text-rose-600 flex items-center gap-2">
                  <app-icon name="x" [size]="18" extraClass="text-rose-500"></app-icon>
                  <span>Excluded from Package</span>
                </h3>
                <ul class="space-y-2 text-xs sm:text-sm text-[#6B7280]">
                  @for (exc of pkg.excluded; track exc) {
                    <li class="flex items-start gap-2">
                      <span class="text-rose-500 font-bold">✕</span>
                      <span>{{ exc }}</span>
                    </li>
                  }
                </ul>
              </div>
            </section>

            <!-- 5. HOTELS -->
            <section class="space-y-4 pt-6 border-t border-[#EFEDE7]">
              <h2 class="text-2xl font-bold font-display text-[#0B1320]">
                Accommodations & Lodging
              </h2>
              <div class="p-6 rounded-2xl bg-[#EFEDE7]/40 border border-[#EFEDE7] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div class="space-y-1">
                  <span class="text-xs font-bold uppercase tracking-wider text-[#D4A359]">
                    {{ pkg.hotelInfo.stars }}★ Luxury Resort
                  </span>
                  <h4 class="text-lg font-bold text-[#0B1320]">{{ pkg.hotelInfo.name }}</h4>
                  <p class="text-xs text-[#6B7280]">Premium category suite with ocean / landscape balcony and private amenities.</p>
                </div>
                <div class="flex items-center gap-2">
                  <span class="px-3 py-1 rounded-xl bg-white border border-[#EFEDE7] text-xs font-bold text-[#0B1320]">
                    Verified 5★ Stay
                  </span>
                </div>
              </div>
            </section>

            <!-- 6. ACTIVITIES -->
            <section class="space-y-4 pt-6 border-t border-[#EFEDE7]">
              <h2 class="text-2xl font-bold font-display text-[#0B1320]">
                Featured Activities
              </h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                @for (act of pkg.activitiesIncluded; track act) {
                  <div class="p-4 rounded-2xl border border-[#EFEDE7] bg-[#EFEDE7]/20 flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-[#0A2D30] text-[#D4A359] flex items-center justify-center shrink-0">
                      <app-icon name="sparkles" [size]="14"></app-icon>
                    </div>
                    <span class="text-xs sm:text-sm font-semibold text-[#17202A]">{{ act }}</span>
                  </div>
                }
              </div>
            </section>

            <!-- 7. CANCELLATION POLICY -->
            <section class="space-y-3 pt-6 border-t border-[#EFEDE7]">
              <h2 class="text-2xl font-bold font-display text-[#0B1320]">
                Cancellation Policy
              </h2>
              <div class="p-5 rounded-2xl bg-[#EFEDE7]/30 border border-[#EFEDE7] text-xs sm:text-sm text-[#6B7280] leading-relaxed space-y-2">
                <p>
                  • <strong>100% Full Refund:</strong> Cancel up to 48 hours prior to official scheduled departure time with zero penalty fees.
                </p>
                <p>
                  • <strong>Partial Credit:</strong> Cancellations made between 24 and 48 hours receive a 75% TripSphere travel wallet voucher valid for 24 months.
                </p>
                <p>
                  • <strong>Flexible Rescheduling:</strong> Change departure dates freely up to 72 hours before start without administrative rebooking costs.
                </p>
              </div>
            </section>

          </div>

        </div>

        <!-- BOOKING MODAL -->
        <app-modal
          [isOpen]="isBookingModalOpen"
          title="Confirm Tour Reservation"
          [subtitle]="pkg.name"
          iconName="credit-card"
          (close)="isBookingModalOpen = false"
        >
          <div class="space-y-4 text-xs sm:text-sm">
            <div class="p-4 rounded-xl bg-[#EFEDE7]/50 space-y-1">
              <p class="font-bold text-[#0B1320]">{{ pkg.name }} ({{ pkg.durationDays }}D / {{ pkg.durationNights }}N)</p>
              <p class="text-xs text-[#6B7280]">Departure Date: {{ selectedDate }}</p>
              <p class="text-xs text-[#6B7280]">Destination: {{ pkg.destination }}, {{ pkg.country }}</p>
            </div>

            <div class="flex items-center justify-between border-t border-b border-[#EFEDE7] py-3">
              <span class="font-semibold text-[#6B7280]">Total Price per traveler</span>
              <span class="text-xl font-bold text-[#0B1320] font-display">\${{ pkg.price }}</span>
            </div>

            <div class="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                (click)="isBookingModalOpen = false"
                class="px-4 py-2 rounded-xl border border-[#EFEDE7] hover:bg-[#EFEDE7] text-xs font-semibold text-[#17202A] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                (click)="confirmBooking()"
                class="px-6 py-2.5 rounded-xl bg-[#0A2D30] hover:bg-[#D4A359] hover:text-[#0A2D30] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                Confirm & Reserve
              </button>
            </div>
          </div>
        </app-modal>

      </div>
    }
  `
})
export class PackageDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private bookingService = inject(BookingService);
  private favoriteService = inject(FavoriteService);
  private toastService = inject(ToastService);

  pkg?: TourPackage;
  activeGalleryImage = '';
  selectedDate = '2026-10-15';
  isBookingModalOpen = false;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      const found = PACKAGES.find(p => p.id === id);
      if (found) {
        this.pkg = found;
        this.activeGalleryImage = found.image;
      } else {
        this.router.navigate(['/packages']);
      }
    });
  }

  get isSaved(): boolean {
    return this.pkg ? this.favoriteService.isFavorite(this.pkg.id) : false;
  }

  toggleSave() {
    if (this.pkg) {
      this.favoriteService.toggleFavorite(this.pkg.id);
      this.toastService.show(
        this.isSaved ? 'Package saved to favorites' : 'Package removed from favorites',
        'success'
      );
    }
  }

  confirmBooking() {
    if (!this.pkg) return;
    this.bookingService.createBooking({
      type: 'Package',
      title: this.pkg.name,
      destination: this.pkg.destination,
      date: this.selectedDate,
      endDate: this.selectedDate,
      amount: this.pkg.price,
      currency: 'USD',
      status: 'Confirmed',
      details: `${this.pkg.durationDays} Days / ${pkgDurationNights(this.pkg)} Nights • ${this.pkg.hotelInfo.name}`,
      reference: 'PKG-' + Math.random().toString(36).substring(2, 8).toUpperCase()
    });

    this.isBookingModalOpen = false;
    this.toastService.show('Tour Package successfully reserved!', 'success');
  }
}

function pkgDurationNights(pkg: TourPackage): number {
  return pkg.durationNights || (pkg.durationDays > 1 ? pkg.durationDays - 1 : 1);
}
