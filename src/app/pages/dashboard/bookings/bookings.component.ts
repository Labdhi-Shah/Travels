import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideIconComponent } from '../../../shared/icon/lucide-icon.component';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { EmptyStateComponent } from '../../../shared/empty-state/empty-state.component';
import { BookingService } from '../../../core/services/booking.service';
import { Booking, BookingCategory } from '../../../models/booking.model';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule, LucideIconComponent, ModalComponent, EmptyStateComponent],
  template: `
    <div class="space-y-6 animate-fade-in">
      
      <!-- Top Title -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-serif font-bold text-[#0B1320]">Bookings & Reservations</h1>
          <p class="text-xs sm:text-sm text-[#6B7280] mt-1">Manage flight passes, hotel check-ins, transit passes, and dining vouchers.</p>
        </div>
        <span class="text-xs font-semibold uppercase tracking-wider text-[#0B1320] bg-[#EFEDE7] px-4 py-2 rounded-full self-start sm:self-auto">
          {{ allBookings.length }} Total Bookings
        </span>
      </div>

      <!-- Category Filter Tabs -->
      <div class="flex items-center gap-2 border-b border-[#EFEDE7] pb-3 overflow-x-auto no-scrollbar">
        <button
          *ngFor="let cat of categoryTabs"
          type="button"
          (click)="selectedCategory = cat"
          class="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shrink-0 cursor-pointer"
          [ngClass]="selectedCategory === cat
            ? 'bg-[#0A2D30] text-white shadow-sm ring-1 ring-[#D4A359]/30'
            : 'text-[#6B7280] hover:text-[#071F22] hover:bg-[#EFEDE7]'"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Bookings Grid -->
      <div *ngIf="filteredBookings.length > 0; else emptyTpl" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          *ngFor="let b of filteredBookings"
          class="bg-white rounded-3xl p-6 sm:p-7 border border-[#EFEDE7] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
        >
          <div>
            <div class="flex items-start justify-between gap-3 mb-3">
              <div>
                <span class="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider"
                  [ngClass]="{
                    'bg-sky-50 text-sky-800': b.category === 'Flights',
                    'bg-[#EFEDE7] text-[#071F22]': b.category === 'Hotels',
                    'bg-amber-50 text-amber-800': b.category === 'Activities',
                    'bg-purple-50 text-purple-800': b.category === 'Transportation',
                    'bg-rose-50 text-rose-800': b.category === 'Restaurants'
                  }"
                >
                  {{ b.category }}
                </span>
                <h3 class="text-base font-serif font-bold text-[#071F22] mt-2">{{ b.title }}</h3>
              </div>

              <div class="text-right">
                <span class="font-mono text-xs font-bold text-[#071F22]">{{ b.reference }}</span>
                <span
                  class="block text-[10px] font-bold uppercase mt-0.5"
                  [ngClass]="b.status === 'Confirmed' ? 'text-emerald-600' : 'text-[#6B7280]'"
                >
                  ● {{ b.status }}
                </span>
              </div>
            </div>

            <div class="space-y-1.5 text-xs text-[#6B7280] mb-4">
              <p class="flex items-center gap-1.5">
                <app-icon name="map-pin" [size]="13" extraClass="text-[#D4A359]"></app-icon>
                <span>{{ b.location }}</span>
              </p>
              <p class="flex items-center gap-1.5">
                <app-icon name="calendar" [size]="13" extraClass="text-[#071F22]"></app-icon>
                <span>{{ b.date }} • {{ b.time }}</span>
              </p>
              <p class="flex items-center gap-1.5">
                <app-icon name="user" [size]="13" extraClass="text-[#071F22]"></app-icon>
                <span>{{ b.guestName }} ({{ b.passengersOrGuests }} Guests)</span>
              </p>
            </div>

            <p class="text-xs text-[#6B7280] bg-[#F8F7F3] p-4 rounded-2xl border border-[#EFEDE7] font-light">
              {{ b.details }}
            </p>
          </div>

          <div class="pt-4 mt-4 border-t border-[#EFEDE7] flex items-center justify-between">
            <div>
              <span class="text-[10px] text-[#6B7280] uppercase tracking-wider font-semibold">Total Amount</span>
              <p class="text-base font-serif font-bold text-[#071F22]">\${{ b.price }}</p>
            </div>

            <div class="flex items-center gap-2">
              <button
                type="button"
                (click)="viewVoucher(b)"
                class="px-4 py-2 rounded-full bg-[#EFEDE7] hover:bg-[#0A2D30] text-[#071F22] hover:text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <app-icon name="file-text" [size]="13"></app-icon>
                <span>Voucher</span>
              </button>

              <button
                *ngIf="b.status === 'Confirmed'"
                type="button"
                (click)="cancelBooking(b)"
                class="px-4 py-2 rounded-full border border-[#EFEDE7] hover:border-rose-300 text-[#6B7280] hover:text-rose-600 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <ng-template #emptyTpl>
        <app-empty-state
          iconName="credit-card"
          title="No bookings in this category"
          description="Explore our flights, boutique hotels, and activities to reserve confirmed tickets."
          actionLabel="Browse Hotels"
          (action)="browseHotels()"
        ></app-empty-state>
      </ng-template>

      <!-- Voucher / Receipt Modal -->
      <app-modal
        [isOpen]="selectedVoucher !== null"
        title="Official Travel Voucher"
        [subtitle]="selectedVoucher?.reference"
        iconName="file-text"
        (close)="selectedVoucher = null"
      >
        <div *ngIf="selectedVoucher" class="space-y-4 text-xs sm:text-sm">
          <div class="p-5 bg-[#F8F7F3] rounded-3xl border border-[#EFEDE7] space-y-3">
            <div class="flex justify-between pb-2 border-b border-[#EFEDE7]">
              <span class="text-[#6B7280] font-medium">Provider:</span>
              <span class="font-bold text-[#0B1320]">{{ selectedVoucher.provider }}</span>
            </div>
            <div class="flex justify-between pb-2 border-b border-[#EFEDE7]">
              <span class="text-[#6B7280] font-medium">Booking Code:</span>
              <span class="font-mono font-bold text-[#0B1320]">{{ selectedVoucher.reference }}</span>
            </div>
            <div class="flex justify-between pb-2 border-b border-[#EFEDE7]">
              <span class="text-[#6B7280] font-medium">Lead Guest:</span>
              <span class="font-bold text-[#0B1320]">{{ selectedVoucher.guestName }}</span>
            </div>
            <div class="flex justify-between pb-2 border-b border-[#EFEDE7]">
              <span class="text-[#6B7280] font-medium">Date & Time:</span>
              <span class="font-bold text-[#0B1320]">{{ selectedVoucher.date }} ({{ selectedVoucher.time }})</span>
            </div>
            <div class="flex justify-between">
              <span class="text-[#6B7280] font-medium">Total Paid:</span>
              <span class="font-serif font-bold text-[#0B1320] text-base">\${{ selectedVoucher.price }} (Confirmed)</span>
            </div>
          </div>

          <div class="flex items-center gap-2 p-3.5 bg-emerald-50 text-emerald-800 rounded-2xl text-xs font-medium">
            <app-icon name="check-circle" [size]="16"></app-icon>
            <span>This e-ticket is verified and valid for immediate boarding or check-in.</span>
          </div>

          <button
            type="button"
            (click)="selectedVoucher = null"
            class="w-full py-3 rounded-full bg-[#0A2D30] hover:bg-[#D4A359] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </app-modal>

    </div>
  `
})
export class BookingsComponent {
  private bookingService = inject(BookingService);

  readonly categoryTabs = ['All', 'Flights', 'Hotels', 'Activities', 'Restaurants', 'Transportation'];
  selectedCategory = 'All';
  selectedVoucher: Booking | null = null;

  get allBookings(): Booking[] {
    return this.bookingService.getBookings();
  }

  get filteredBookings(): Booking[] {
    if (this.selectedCategory === 'All') return this.allBookings;
    return this.allBookings.filter(b => b.category === this.selectedCategory);
  }

  viewVoucher(booking: Booking): void {
    this.selectedVoucher = booking;
  }

  cancelBooking(booking: Booking): void {
    if (confirm(`Are you sure you want to cancel reservation ${booking.reference}?`)) {
      this.bookingService.cancelBooking(booking.id);
    }
  }

  browseHotels(): void {
    window.location.href = '/hotels';
  }
}
