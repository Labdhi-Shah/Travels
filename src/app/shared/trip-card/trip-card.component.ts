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
    <!-- Large Horizontal Editorial Trip Card -->
    <div
      class="group relative bg-white rounded-3xl overflow-hidden border border-[#EFEDE7] hover:border-[#D4A359]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row items-stretch"
    >
      <!-- Left/Top Large Travel Photography Container -->
      <div class="relative w-full md:w-80 lg:w-[350px] min-h-[220px] md:min-h-full overflow-hidden shrink-0 bg-[#071F22]">
        <a [routerLink]="['/my-trips', trip.id]" class="block w-full h-full cursor-pointer">
          <img
            [src]="trip.coverImage"
            [alt]="trip.name"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
        </a>
        <div class="absolute inset-0 bg-gradient-to-t from-[#071F22]/90 via-[#071F22]/30 to-transparent pointer-events-none"></div>

        <!-- Destination Tag Overlay -->
        <div class="absolute top-4 left-4 pointer-events-none">
          <span class="px-3 py-1 rounded-full bg-[#071F22]/85 text-[#D4A359] text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-white/10 shadow-sm flex items-center gap-1.5">
            <app-icon name="map-pin" [size]="12"></app-icon>
            <span>{{ trip.destination.split(',')[0] }}</span>
          </span>
        </div>

        <!-- Trip Status Badge on Image -->
        <div class="absolute top-4 right-4 pointer-events-none">
          @if (trip.status === 'Confirmed') {
            <span class="badge-status-confirmed shadow-md">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Confirmed
            </span>
          } @else if (trip.status === 'Pending') {
            <span class="badge-status-pending shadow-md">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              Pending
            </span>
          } @else if (trip.status === 'Draft' || trip.status === 'Planned') {
            <span class="badge-status-draft shadow-md">
              Draft
            </span>
          } @else if (trip.status === 'Completed') {
            <span class="badge-status-completed shadow-md">
              Completed
            </span>
          } @else if (trip.status === 'Cancelled') {
            <span class="badge-status-cancelled shadow-md">
              Cancelled
            </span>
          } @else {
            <span class="badge-status-upcoming shadow-md">
              {{ trip.status }}
            </span>
          }
        </div>

        <!-- Duration badge -->
        <div class="absolute bottom-4 left-4 right-4 pointer-events-none">
          <p class="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
            {{ trip.destination.split(',')[0] }}
          </p>
          <span class="text-xs font-semibold text-white/90 flex items-center gap-1.5 mt-0.5">
            <app-icon name="calendar" [size]="13" extraClass="text-[#D4A359]"></app-icon>
            <span>{{ trip.duration || (calculateDurationDays() + ' Days Expedition') }}</span>
          </span>
        </div>
      </div>

      <!-- Right/Body Content Container -->
      <div class="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-4">
        <div>
          <!-- Header Row -->
          <div class="flex items-start justify-between gap-4">
            <div class="space-y-1">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-xs font-bold text-[#D4A359] uppercase tracking-wider">
                  {{ trip.country }}
                </span>
                <span class="text-[#6B7280]">•</span>
                
                <!-- Unique Trip ID Tag -->
                <span class="px-2.5 py-0.5 rounded-md bg-[#F8F7F3] text-[#071F22] font-mono text-[11px] font-bold border border-[#EFEDE7] flex items-center gap-1">
                  <span>ID: {{ trip.id }}</span>
                </span>
              </div>

              <a [routerLink]="['/my-trips', trip.id]" class="block group-hover:text-[#D4A359] transition-colors cursor-pointer">
                <h3 class="text-xl sm:text-2xl font-bold text-[#071F22] font-display mt-0.5 leading-snug">
                  {{ trip.name }}
                </h3>
              </a>
              <div class="text-xs text-[#6B7280] flex items-center gap-2 flex-wrap mt-1">
                <span class="flex items-center gap-1 font-semibold text-[#071F22]">
                  <app-icon name="map-pin" [size]="13" extraClass="text-[#D4A359]"></app-icon>
                  <strong>{{ trip.destination }}</strong>
                </span>
                <span>•</span>
                <span class="flex items-center gap-1">
                  <app-icon name="calendar" [size]="13"></app-icon>
                  <span>{{ trip.startDate | date: 'mediumDate' }} – {{ trip.endDate | date: 'mediumDate' }}</span>
                </span>
                <span>•</span>
                <span class="text-[#071F22] font-semibold">{{ trip.duration || (calculateDurationDays() + ' Days') }}</span>
              </div>
            </div>

            <!-- Quick Action Icons -->
            <div class="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                (click)="onEdit.emit(trip)"
                class="w-8 h-8 rounded-full bg-[#F8F7F3] hover:bg-[#EFEDE7] text-[#17202A] flex items-center justify-center transition-colors cursor-pointer btn-interaction"
                title="Edit Trip Details"
                aria-label="Edit Trip Details"
              >
                <app-icon name="edit" [size]="14"></app-icon>
              </button>
              <button
                type="button"
                (click)="onDelete.emit(trip)"
                class="w-8 h-8 rounded-full bg-[#F8F7F3] hover:bg-rose-50 text-[#17202A] hover:text-rose-600 flex items-center justify-center transition-colors cursor-pointer btn-interaction"
                title="Delete Trip"
                aria-label="Delete Trip"
              >
                <app-icon name="trash-2" [size]="14"></app-icon>
              </button>
            </div>
          </div>

          <!-- Trip Specifications Grid: Hotel, Flight, Travelers, Rooms, Budget -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4 text-xs">
            <div class="p-3 rounded-2xl bg-[#F8F7F3] border border-[#EFEDE7] flex flex-col justify-between">
              <span class="text-[10px] uppercase font-bold text-[#6B7280] flex items-center gap-1.5">
                <app-icon name="hotel" [size]="13" extraClass="text-[#D4A359]"></app-icon>
                <span>Hotel Stay</span>
              </span>
              <span class="font-bold text-[#071F22] truncate block mt-1" [title]="trip.hotelName || 'Curated Resort'">
                {{ trip.hotelName || 'Curated Luxury Resort' }}
              </span>
            </div>

            <div class="p-3 rounded-2xl bg-[#F8F7F3] border border-[#EFEDE7] flex flex-col justify-between">
              <span class="text-[10px] uppercase font-bold text-[#6B7280] flex items-center gap-1.5">
                <app-icon name="plane" [size]="13" extraClass="text-[#38BDF8]"></app-icon>
                <span>Flight</span>
              </span>
              <span class="font-bold text-[#071F22] truncate block mt-1" [title]="trip.flight || 'Economy Flight'">
                {{ trip.flight || 'Economy Flight' }}
              </span>
            </div>

            <div class="p-3 rounded-2xl bg-[#F8F7F3] border border-[#EFEDE7] flex flex-col justify-between">
              <span class="text-[10px] uppercase font-bold text-[#6B7280] flex items-center gap-1.5">
                <app-icon name="user" [size]="13" extraClass="text-[#0A2D30]"></app-icon>
                <span>Travelers & Rooms</span>
              </span>
              <span class="font-bold text-[#071F22] block mt-1">
                {{ trip.travelers.adults }} Adults{{ trip.travelers.children ? ', ' + trip.travelers.children + ' Kids' : '' }} • {{ trip.rooms || 1 }} {{ (trip.rooms || 1) === 1 ? 'Room' : 'Rooms' }}
              </span>
            </div>

            <div class="p-3 rounded-2xl bg-[#F8F7F3] border border-[#EFEDE7] flex flex-col justify-between">
              <span class="text-[10px] uppercase font-bold text-[#6B7280] flex items-center gap-1.5">
                <app-icon name="dollar-sign" [size]="13" extraClass="text-emerald-600"></app-icon>
                <span>Total Budget</span>
              </span>
              <span class="font-bold text-emerald-700 block text-sm font-display mt-0.5">
                \${{ trip.budget | number }}
              </span>
            </div>
          </div>

          <!-- Activities Badges -->
          @if (trip.activities && trip.activities.length > 0) {
            <div class="mt-3.5 flex items-center gap-1.5 flex-wrap">
              <span class="text-[10px] uppercase font-bold text-[#6B7280] mr-1">Activities:</span>
              @for (act of trip.activities; track act) {
                <span class="px-2.5 py-0.5 rounded-lg bg-[#F8F7F3] border border-[#EFEDE7] text-[11px] font-semibold text-[#071F22]">
                  {{ act }}
                </span>
              }
            </div>
          }

          <!-- Planned Progress Bar -->
          <div class="mt-4 p-3 rounded-xl bg-[#F8F7F3] border border-[#EFEDE7]">
            <div class="flex items-center justify-between text-xs mb-1.5">
              <span class="font-bold text-[#071F22]">Itinerary Readiness</span>
              <span class="font-bold text-[#D4A359]">{{ plannedProgress }}% planned</span>
            </div>
            <div class="w-full h-1.5 bg-[#EFEDE7] rounded-full overflow-hidden">
              <div
                class="h-full bg-gradient-to-r from-[#0A2D30] to-[#D4A359] rounded-full transition-all duration-700"
                [style.width.%]="plannedProgress"
              ></div>
            </div>
          </div>
        </div>

        <!-- Action Buttons (View Trip, View Itinerary, Edit, Delete) -->
        <div class="pt-4 border-t border-[#EFEDE7] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div class="flex items-center gap-2 text-xs text-[#6B7280]">
            <span class="font-mono text-[11px] bg-slate-100 px-2 py-0.5 rounded">
              Ref: {{ trip.id }}
            </span>
          </div>

          <div class="grid grid-cols-2 sm:flex sm:items-center gap-2">
            <a
              [routerLink]="['/my-trips', trip.id]"
              class="px-4 py-2.5 rounded-xl bg-[#0A2D30] hover:bg-[#D4A359] hover:text-[#071F22] text-xs font-bold text-white transition-all shadow-sm active:scale-95 btn-interaction inline-flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <app-icon name="compass" [size]="14"></app-icon>
              <span>View Trip</span>
            </a>
            <a
              [routerLink]="['/itinerary']"
              [queryParams]="{ tripId: trip.id }"
              class="px-4 py-2.5 rounded-xl bg-[#F8F7F3] hover:bg-[#0A2D30] hover:text-white border border-[#EFEDE7] text-xs font-bold text-[#071F22] transition-all active:scale-95 btn-interaction inline-flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <app-icon name="calendar" [size]="14"></app-icon>
              <span>View Itinerary</span>
            </a>
            <button
              type="button"
              (click)="onEdit.emit(trip)"
              class="px-3.5 py-2.5 rounded-xl border border-[#EFEDE7] hover:bg-[#F8F7F3] text-xs font-bold text-[#071F22] transition-all active:scale-95 btn-interaction inline-flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <app-icon name="edit" [size]="14"></app-icon>
              <span>Edit</span>
            </button>
            <button
              type="button"
              (click)="onDelete.emit(trip)"
              class="px-3.5 py-2.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-all active:scale-95 btn-interaction inline-flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <app-icon name="trash-2" [size]="14"></app-icon>
              <span>Delete</span>
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
    if (this.trip.status === 'Confirmed') return 90;
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
