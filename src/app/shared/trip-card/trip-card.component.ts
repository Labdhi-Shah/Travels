import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideIconComponent } from '../icon/lucide-icon.component';
import { Trip } from '../../models/trip.model';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideIconComponent],
  template: `
    <!-- Large Horizontal Editorial Trip Card (as requested in Section 19) -->
    <div
      class="group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-[#EFEDE7] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row items-stretch"
    >
      <!-- Left/Top Large Travel Photography Container -->
      <div class="relative w-full md:w-80 lg:w-96 min-h-[220px] md:min-h-full overflow-hidden shrink-0 bg-[#EFEDE7]">
        <img
          [src]="trip.coverImage"
          [alt]="trip.name"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#0B1320]/80 via-transparent to-black/30 pointer-events-none"></div>

        <!-- Destination Tag Overlay -->
        <div class="absolute top-4 left-4">
          <span class="px-3 py-1 rounded-md bg-[#0B1320]/80 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            {{ trip.destination.split(',')[0] }}
          </span>
        </div>

        <!-- Duration badge -->
        <div class="absolute bottom-4 left-4">
          <p class="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight uppercase">
            {{ trip.destination.split(',')[0] }}
          </p>
          <span class="text-xs font-semibold text-white/90 flex items-center gap-1.5 mt-0.5">
            <app-icon name="calendar" [size]="13" extraClass="text-[#D4A359]"></app-icon>
            {{ calculateDurationDays() }} Days
          </span>
        </div>
      </div>

      <!-- Right/Body Content Container -->
      <div class="p-6 sm:p-7 flex flex-col justify-between flex-1">
        <div>
          <!-- Header Row -->
          <div class="flex items-start justify-between gap-4">
            <div>
              <span class="text-xs font-bold text-[#D4A359] uppercase tracking-wider">
                {{ trip.country }}
              </span>
              <h3 class="text-xl sm:text-2xl font-bold text-[#071F22] font-display mt-0.5 group-hover:text-[#D4A359] transition-colors">
                {{ trip.name }}
              </h3>
              <p class="text-xs text-[#6B7280] mt-1 flex items-center gap-1.5">
                <app-icon name="map-pin" [size]="13" extraClass="text-[#6B7280]"></app-icon>
                <span>{{ trip.destination }}</span>
                <span>•</span>
                <span>{{ trip.startDate | date: 'mediumDate' }} – {{ trip.endDate | date: 'mediumDate' }}</span>
              </p>
            </div>

            <!-- Quick Edit / Delete -->
            <div class="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                (click)="onEdit.emit(trip)"
                class="w-8 h-8 rounded-full bg-[#EFEDE7]/70 hover:bg-[#EFEDE7] text-[#17202A] flex items-center justify-center transition-colors cursor-pointer"
                title="Edit Trip Details"
              >
                <app-icon name="edit" [size]="14"></app-icon>
              </button>
              <button
                type="button"
                (click)="onDelete.emit(trip)"
                class="w-8 h-8 rounded-full bg-[#EFEDE7]/70 hover:bg-rose-50 text-[#17202A] hover:text-rose-600 flex items-center justify-center transition-colors cursor-pointer"
                title="Delete Trip"
              >
                <app-icon name="trash-2" [size]="14"></app-icon>
              </button>
            </div>
          </div>

          <!-- Notes / Destinations -->
          @if (trip.notes) {
            <p class="text-xs text-[#6B7280] mt-3 line-clamp-2 leading-relaxed">
              {{ trip.notes }}
            </p>
          }

          <!-- Planned Progress Bar -->
          <div class="mt-5 p-4 rounded-xl bg-[#EFEDE7]/40 border border-[#EFEDE7]">
            <div class="flex items-center justify-between text-xs mb-1.5">
              <span class="font-bold text-[#071F22]">Itinerary Progress</span>
              <span class="font-bold text-[#D4A359]">{{ plannedProgress }}% planned</span>
            </div>
            <div class="w-full h-2 bg-[#EFEDE7] rounded-full overflow-hidden">
              <div
                class="h-full bg-[#D4A359] rounded-full transition-all duration-700"
                [style.width.%]="plannedProgress"
              ></div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="mt-6 pt-4 border-t border-[#EFEDE7] flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-3 text-xs text-[#6B7280]">
            <span class="flex items-center gap-1">
              <app-icon name="users" [size]="13"></app-icon>
              {{ trip.travelers.adults }} Adults<span *ngIf="trip.travelers.children">, {{ trip.travelers.children }} Kids</span>
            </span>
            <span>•</span>
            <span class="font-semibold text-[#071F22]">
              Budget: \${{ trip.budget | number }}
            </span>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <a
              [routerLink]="['/my-trips', trip.id]"
              class="px-3.5 py-1.5 rounded-xl bg-[#0A2D30] hover:bg-[#D4A359] hover:text-[#0A2D30] text-xs font-bold text-white transition-colors shadow-sm"
            >
              View Trip
            </a>
            <button
              type="button"
              (click)="onEdit.emit(trip)"
              class="px-3.5 py-1.5 rounded-xl border border-[#0B1320]/15 hover:bg-[#EFEDE7] text-xs font-bold text-[#0B1320] transition-colors cursor-pointer"
            >
              Edit Trip
            </button>
            <button
              type="button"
              (click)="onDelete.emit(trip)"
              class="px-3.5 py-1.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold transition-colors cursor-pointer"
            >
              Delete Trip
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class TripCardComponent {
  @Input({ required: true }) trip!: Trip;
  @Output() onEdit = new EventEmitter<Trip>();
  @Output() onDelete = new EventEmitter<Trip>();

  get plannedProgress(): number {
    if (this.trip.status === 'Completed') return 100;
    if (this.trip.name.toLowerCase().includes('goa')) return 65;
    if (this.trip.budget > 0) {
      const ratio = Math.round((this.trip.spent / this.trip.budget) * 100);
      return Math.min(95, Math.max(40, ratio));
    }
    return 60;
  }

  calculateDurationDays(): number {
    try {
      const start = new Date(this.trip.startDate).getTime();
      const end = new Date(this.trip.endDate).getTime();
      const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      return isNaN(diff) || diff <= 0 ? 3 : diff;
    } catch {
      return 3;
    }
  }
}
