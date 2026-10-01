import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LucideIconComponent } from '../../../shared/icon/lucide-icon.component';
import { TripService } from '../../../core/services/trip.service';
import { BookingService } from '../../../core/services/booking.service';
import { ItineraryService } from '../../../core/services/itinerary.service';
import { BudgetService } from '../../../core/services/budget.service';
import { FavoriteService } from '../../../core/services/favorite.service';
import { ToastService } from '../../../core/services/toast.service';
import { Trip } from '../../../models/trip.model';
import { Booking } from '../../../models/booking.model';
import { ItineraryItem } from '../../../models/itinerary.model';
import { MapComponent, MapMarker } from '../../../shared/map/map.component';
import { BudgetCategorySummary } from '../../../models/expense.model';

@Component({
  selector: 'app-trip-details',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideIconComponent, MapComponent],
  template: `
    <div *ngIf="trip" class="space-y-8 animate-fade-in">
      
      <!-- Top Trip Header Banner -->
      <div class="relative bg-[#071328] text-white rounded-3xl p-6 sm:p-10 overflow-hidden shadow-xl">
        <img
          [src]="trip.coverImage"
          [alt]="trip.name"
          class="absolute inset-0 w-full h-full object-cover opacity-25 scale-105"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-[#071328] via-[#071328]/80 to-transparent"></div>

        <div class="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div class="space-y-3">
            <div class="flex items-center gap-2 flex-wrap">
              <a
                routerLink="/my-trips"
                class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold backdrop-blur-md transition-colors cursor-pointer"
              >
                <app-icon name="arrow-left" [size]="12"></app-icon>
                <span>Back to Trips</span>
              </a>
              <span class="px-3.5 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md"
                [ngClass]="{
                  'bg-emerald-600/90': trip.status === 'Confirmed',
                  'bg-amber-600/90': trip.status === 'Pending',
                  'bg-slate-600/90': trip.status === 'Draft',
                  'bg-blue-600/90': trip.status === 'Upcoming' || trip.status === 'Ongoing',
                  'bg-purple-600/90': trip.status === 'Completed',
                  'bg-rose-600/90': trip.status === 'Cancelled'
                }"
              >
                {{ trip.status }}
              </span>
              <span class="px-3 py-1 rounded-full bg-white/10 text-white font-mono text-xs font-semibold backdrop-blur-md border border-white/10">
                ID: {{ trip.id }}
              </span>
              <button
                type="button"
                (click)="toggleFavorite()"
                class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold backdrop-blur-md transition-colors cursor-pointer"
                [ngClass]="isFavorite() ? 'text-[#D4A359]' : 'text-white'"
                title="Favorite Destination"
              >
                <app-icon name="heart" [size]="12" [isFilled]="isFavorite()"></app-icon>
                <span>{{ isFavorite() ? 'Favorited' : 'Favorite' }}</span>
              </button>
            </div>

            <h1 class="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">{{ trip.name }}</h1>
            
            <div class="flex items-center gap-3 text-xs sm:text-sm text-[#38BDF8] font-medium flex-wrap">
              <span class="flex items-center gap-1.5">
                <app-icon name="calendar" [size]="14"></app-icon>
                <span>{{ trip.startDate | date: 'mediumDate' }} – {{ trip.endDate | date: 'mediumDate' }}</span>
              </span>
              <span class="text-white/40">•</span>
              <span>{{ trip.duration || '07 Days' }}</span>
              <span class="text-white/40">•</span>
              <span>{{ trip.travelers.adults }} Adults{{ trip.travelers.children ? ', ' + trip.travelers.children + ' Kids' : '' }}</span>
              <span class="text-white/40">•</span>
              <span>{{ trip.rooms || 1 }} {{ (trip.rooms || 1) === 1 ? 'Room' : 'Rooms' }}</span>
            </div>

            @if (trip.hotelName || trip.flight) {
              <div class="flex items-center gap-3 text-xs text-white/90 flex-wrap pt-0.5">
                @if (trip.hotelName) {
                  <span class="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full">
                    <app-icon name="hotel" [size]="12" extraClass="text-[#D4A359]"></app-icon>
                    <span>{{ trip.hotelName }}</span>
                  </span>
                }
                @if (trip.flight) {
                  <span class="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full">
                    <app-icon name="plane" [size]="12" extraClass="text-[#38BDF8]"></app-icon>
                    <span>{{ trip.flight }}</span>
                  </span>
                }
              </div>
            }

            <!-- Route chips -->
            <div *ngIf="trip.destinationsList?.length" class="flex items-center gap-1.5 text-xs text-white/90 flex-wrap pt-1">
              <span class="text-gray-400">Route:</span>
              <ng-container *ngFor="let city of trip.destinationsList; let last = last">
                <span class="font-medium bg-white/10 px-2.5 py-0.5 rounded-full">{{ city }}</span>
                <span *ngIf="!last" class="text-[#38BDF8]">→</span>
              </ng-container>
            </div>
          </div>

          <div class="flex flex-wrap gap-2.5 shrink-0">
            <a
              routerLink="/plan-trip"
              [queryParams]="{ destination: trip.destination }"
              class="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors backdrop-blur-sm cursor-pointer"
            >
              <app-icon name="edit" [size]="14"></app-icon>
              <span>Edit Trip</span>
            </a>
            <a
              routerLink="/itinerary"
              [queryParams]="{ tripId: trip.id }"
              class="px-5 py-2.5 rounded-full bg-[#0084FF] hover:bg-[#0070D8] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
            >
              <app-icon name="calendar" [size]="14"></app-icon>
              <span>View Itinerary</span>
            </a>
            <a
              routerLink="/budget"
              class="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors backdrop-blur-sm cursor-pointer"
            >
              <app-icon name="dollar-sign" [size]="14"></app-icon>
              <span>Track Budget</span>
            </a>
            <button
              type="button"
              (click)="deleteTrip()"
              class="px-4 py-2.5 rounded-full bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Delete Trip"
            >
              <app-icon name="trash-2" [size]="14"></app-icon>
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Detail Navigation Tabs -->
      <div class="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto no-scrollbar">
        <button
          *ngFor="let tab of tabs"
          type="button"
          (click)="activeTab = tab.id"
          class="px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shrink-0 flex items-center gap-2 cursor-pointer"
          [ngClass]="activeTab === tab.id
            ? 'bg-[#0084FF] text-white shadow-sm'
            : 'text-[#6B7280] hover:text-[#071328] hover:bg-slate-100'"
        >
          <app-icon [name]="tab.icon" [size]="14"></app-icon>
          <span>{{ tab.label }}</span>
        </button>
      </div>

      <!-- TAB 1: OVERVIEW -->
      <div *ngIf="activeTab === 'overview'" class="space-y-6 animate-fade-in">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-5">
          <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <p class="text-[11px] text-[#6B7280] uppercase tracking-wider font-semibold">Allocated Budget</p>
            <p class="text-2xl font-serif font-bold text-[#071328] mt-1">\${{ trip.budget | number }}</p>
            <p class="text-[11px] text-[#D4A359] font-semibold mt-0.5">\${{ trip.spent | number }} committed</p>
          </div>

          <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <p class="text-[11px] text-[#6B7280] uppercase tracking-wider font-semibold">Reservations</p>
            <p class="text-2xl font-serif font-bold text-[#071328] mt-1">{{ bookings.length }}</p>
            <p class="text-[11px] text-emerald-600 font-semibold mt-0.5">All Confirmed</p>
          </div>

          <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <p class="text-[11px] text-[#6B7280] uppercase tracking-wider font-semibold">Itinerary Events</p>
            <p class="text-2xl font-serif font-bold text-[#071328] mt-1">{{ itineraryItems.length }}</p>
            <p class="text-[11px] text-[#6B7280] mt-0.5">Scheduled activities</p>
          </div>

          <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <p class="text-[11px] text-[#6B7280] uppercase tracking-wider font-semibold">Live Weather</p>
            <p class="text-2xl font-serif font-bold text-[#0084FF] mt-1">21°C</p>
            <p class="text-[11px] text-[#6B7280] mt-0.5">Sunny & Clear Sky</p>
          </div>
        </div>

        <!-- Confirmed Expedition Dossier Specifications (Requirement 5) -->
        <div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span class="text-[10px] font-bold uppercase tracking-widest text-[#D4A359]">CONFIRMED EXPEDITION DOSSIER</span>
              <h3 class="text-lg font-bold font-display text-[#071328]">Journey Specifications</h3>
            </div>
            <span class="px-3 py-1 rounded-full bg-slate-100 text-[#071328] font-mono text-xs font-bold">
              ID: {{ trip.id }}
            </span>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span class="text-[10px] font-bold uppercase text-[#6B7280]">Destination</span>
              <p class="font-bold text-[#071328] text-sm">{{ trip.destination }}, {{ trip.country }}</p>
            </div>

            <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span class="text-[10px] font-bold uppercase text-[#6B7280]">Travel Dates & Duration</span>
              <p class="font-bold text-[#071328] text-sm">{{ trip.startDate | date: 'mediumDate' }} – {{ trip.endDate | date: 'mediumDate' }} ({{ trip.duration || '07 Days' }})</p>
            </div>

            <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span class="text-[10px] font-bold uppercase text-[#6B7280]">Travelers & Rooms</span>
              <p class="font-bold text-[#071328] text-sm">{{ trip.travelers.adults }} Adults{{ trip.travelers.children ? ', ' + trip.travelers.children + ' Kids' : '' }} • {{ trip.rooms || 1 }} Room(s)</p>
            </div>

            <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span class="text-[10px] font-bold uppercase text-[#6B7280]">Budget & Status</span>
              <p class="font-bold text-emerald-700 text-sm font-display">\${{ trip.budget | number }} ({{ trip.status }})</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
            <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span class="text-[10px] font-bold uppercase text-[#6B7280]">Accommodations</span>
              <p class="font-bold text-[#071328] flex items-center gap-1.5 text-sm">
                <app-icon name="hotel" [size]="14" extraClass="text-[#D4A359]"></app-icon>
                <span>{{ trip.hotelName || 'Curated Boutique Resort' }}</span>
              </p>
            </div>

            <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span class="text-[10px] font-bold uppercase text-[#6B7280]">Flight Option</span>
              <p class="font-bold text-[#071328] flex items-center gap-1.5 text-sm">
                <app-icon name="plane" [size]="14" extraClass="text-[#0084FF]"></app-icon>
                <span>{{ trip.flight || 'Economy Flight' }}</span>
              </p>
            </div>
          </div>

          @if (trip.activities && trip.activities.length > 0) {
            <div class="pt-2">
              <span class="text-[10px] font-bold uppercase text-[#6B7280] block mb-1.5">Scheduled Activities</span>
              <div class="flex flex-wrap gap-1.5">
                @for (act of trip.activities; track act) {
                  <span class="px-3 py-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-[#071328]">
                    {{ act }}
                  </span>
                }
              </div>
            </div>
          }

          @if (trip.additionalPreferences) {
            <div class="pt-2 border-t border-slate-100">
              <span class="text-[10px] font-bold uppercase text-[#6B7280] block mb-1">Additional Preferences & Special Requests</span>
              <p class="text-xs text-[#071328] font-medium bg-amber-50/60 p-3 rounded-xl border border-amber-100">
                {{ trip.additionalPreferences }}
              </p>
            </div>
          }
        </div>

        <!-- Notes Card -->
        <div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 class="text-lg font-serif font-bold text-[#071328] mb-2">Trip Architect Notes</h3>
          <p class="text-xs sm:text-sm text-[#6B7280] leading-relaxed font-light">
            {{ trip.notes || 'No specific notes recorded. Check reservations and daily timeline below.' }}
          </p>
        </div>
      </div>

      <!-- TAB 2: RESERVATIONS -->
      <div *ngIf="activeTab === 'reservations'" class="space-y-4 animate-fade-in">
        <div class="flex items-center justify-between">
          <h3 class="text-xl font-serif font-bold text-[#071328]">Confirmed Bookings & E-Tickets</h3>
          <span class="text-xs text-[#6B7280] font-medium">{{ bookings.length }} Reservations</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div
            *ngFor="let b of bookings"
            class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <div class="flex items-center justify-between gap-2 mb-2">
                <span class="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider"
                  [ngClass]="{
                    'bg-sky-50 text-sky-800': b.category === 'Flights',
                    'bg-slate-100 text-[#071328]': b.category === 'Hotels',
                    'bg-amber-50 text-amber-800': b.category === 'Activities',
                    'bg-purple-50 text-purple-800': b.category === 'Transportation',
                    'bg-rose-50 text-rose-800': b.category === 'Restaurants'
                  }"
                >
                  {{ b.category }}
                </span>
                <span class="text-xs font-mono text-[#6B7280] font-semibold">{{ b.reference }}</span>
              </div>

              <h4 class="text-base font-serif font-bold text-[#071328]">{{ b.title }}</h4>
              <p class="text-xs text-[#6B7280] mt-1 flex items-center gap-1">
                <app-icon name="map-pin" [size]="12" class="text-[#0084FF]"></app-icon>
                {{ b.location }}
              </p>
              <p class="text-xs text-[#6B7280] mt-2 line-clamp-2">{{ b.details }}</p>
            </div>

            <div class="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between text-xs">
              <span class="font-serif font-bold text-[#071328] text-base">\${{ b.price }}</span>
              <span class="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-[11px]">
                {{ b.status }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 3: ITINERARY TIMELINE -->
      <div *ngIf="activeTab === 'itinerary'" class="space-y-6 animate-fade-in">
        <div class="flex items-center justify-between">
          <h3 class="text-xl font-serif font-bold text-[#071328]">Daily Timeline</h3>
          <a routerLink="/itinerary" class="text-xs font-semibold uppercase tracking-wider text-[#0084FF] hover:underline">
            Open Full Itinerary Builder →
          </a>
        </div>

        <div class="space-y-4">
          <div
            *ngFor="let item of itineraryItems"
            class="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4"
          >
            <div class="w-14 text-center shrink-0">
              <span class="text-xs font-bold uppercase tracking-wider text-[#071328]">Day {{ item.dayNumber }}</span>
              <span class="block text-[11px] font-mono text-[#6B7280] mt-0.5">{{ item.time }}</span>
            </div>

            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <h4 class="text-base font-serif font-bold text-[#071328]">{{ item.title }}</h4>
                <span *ngIf="item.isCompleted" class="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold uppercase">
                  Completed
                </span>
              </div>
              <p class="text-xs text-[#6B7280] mt-0.5 flex items-center gap-1">
                <app-icon name="map-pin" [size]="12" class="text-[#0084FF]"></app-icon>
                {{ item.location }}
              </p>
              <p *ngIf="item.notes" class="text-xs text-[#6B7280] mt-2 font-light italic">
                "{{ item.notes }}"
              </p>
            </div>

            <div class="text-right shrink-0 flex items-center gap-2">
              <span class="text-sm font-serif font-bold text-[#071328]">\${{ item.estimatedCost }}</span>
              <button
                type="button"
                (click)="deleteItineraryItem(item.id)"
                class="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                title="Delete Activity"
              >
                <app-icon name="trash-2" [size]="14"></app-icon>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 4: BUDGET -->
      <div *ngIf="activeTab === 'budget'" class="space-y-6 animate-fade-in">
        <div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 class="text-xl font-serif font-bold text-[#071328]">Budget Health</h3>
              <p class="text-xs text-[#6B7280]">Committed expenses vs total journey limit.</p>
            </div>
            <div class="flex items-center gap-4">
              <a
                routerLink="/budget"
                class="px-4 py-2 rounded-full bg-[#0A2D30] hover:bg-[#D4A359] hover:text-[#071F22] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <app-icon name="plus" [size]="14"></app-icon>
                <span>Add Expense</span>
              </a>
              <div class="text-right">
                <span class="text-xs text-[#6B7280] uppercase tracking-wider">Total Spent / Remaining</span>
                <p class="text-xl font-serif font-bold text-[#071328]">
                  \${{ trip.spent | number }} / \${{ (trip.budget - trip.spent) | number }}
                </p>
              </div>
            </div>
          </div>

          <!-- Progress Bar -->
          <div class="space-y-2">
            <div class="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
              <div
                class="h-full rounded-full bg-[#0084FF] transition-all duration-500"
                [style.width.%]="(trip.spent / trip.budget) * 100"
              ></div>
            </div>
            <div class="flex justify-between text-xs text-[#6B7280]">
              <span>0%</span>
              <span class="font-semibold text-[#071328]">{{ ((trip.spent / trip.budget) * 100) | number:'1.0-0' }}% Allocated</span>
              <span>100%</span>
            </div>
          </div>

          <!-- Categories List -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-200">
            <div *ngFor="let cat of budgetBreakdown" class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span class="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">{{ cat.category }}</span>
              <p class="text-base font-serif font-bold text-[#071328] mt-0.5">\${{ cat.spent | number }}</p>
              <p class="text-[10px] text-[#6B7280]">of \${{ cat.allocated | number }} limit</p>
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 5: STATIC INTERACTIVE MAP UI -->
      <div *ngIf="activeTab === 'map'" class="space-y-6 animate-fade-in">
        <div class="bg-[#071328] text-white rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
          
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
            <div>
              <span class="text-xs font-bold uppercase tracking-widest text-[#38BDF8]">Expedition Cartography</span>
              <h3 class="text-2xl font-serif font-bold mt-1">Route Map & Transit Markers</h3>
            </div>

            <!-- Map Layer Toggles -->
            <div class="flex items-center gap-2 bg-white/10 p-1.5 rounded-full border border-white/15 text-xs">
              <button
                type="button"
                (click)="activeLayer = 'all'"
                class="px-4 py-1.5 rounded-full transition-colors cursor-pointer"
                [ngClass]="activeLayer === 'all' ? 'bg-[#0084FF] text-white font-semibold' : 'text-gray-300 hover:text-white'"
              >
                All Route
              </button>
              <button
                type="button"
                (click)="activeLayer = 'hotels'"
                class="px-4 py-1.5 rounded-full transition-colors cursor-pointer"
                [ngClass]="activeLayer === 'hotels' ? 'bg-[#0084FF] text-white font-semibold' : 'text-gray-300 hover:text-white'"
              >
                Hotels
              </button>
              <button
                type="button"
                (click)="activeLayer = 'trains'"
                class="px-4 py-1.5 rounded-full transition-colors cursor-pointer"
                [ngClass]="activeLayer === 'trains' ? 'bg-[#0084FF] text-white font-semibold' : 'text-gray-300 hover:text-white'"
              >
                Transit
              </button>
            </div>
          </div>

          <!-- Interactive Leaflet Map Component -->
          <div class="rounded-2xl overflow-hidden border border-white/15 shadow-2xl">
            <app-map
              [lat]="tripCenterCoordinates.lat"
              [lng]="tripCenterCoordinates.lng"
              [zoom]="9"
              [title]="trip.name"
              height="450px"
              [markers]="tripMapMarkers"
            ></app-map>
          </div>

          <!-- Bottom Route Legend -->
          <div class="mt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-400 pt-3 border-t border-white/10">
            <div class="flex items-center gap-4 flex-wrap">
              @for (city of trip.destinationsList || []; track city) {
                <span class="flex items-center gap-1.5 font-semibold text-[#D4A359]">
                  <app-icon name="map-pin" [size]="13" class="text-[#D4A359]"></app-icon>
                  <span>{{ city }}</span>
                </span>
              }
            </div>
            <span>Click any map marker to inspect destination sights and directions.</span>
          </div>

        </div>
      </div>

    </div>
  `
})
export class TripDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private tripService = inject(TripService);
  private bookingService = inject(BookingService);
  private itineraryService = inject(ItineraryService);
  private budgetService = inject(BudgetService);
  private favoriteService = inject(FavoriteService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  Math = Math;
  trip: Trip | null = null;
  activeTab = 'overview';
  activeLayer = 'all';
  selectedMapPin = 'Kyoto';
  zoomLevel = 1;

  readonly tabs = [
    { id: 'overview', label: 'Overview', icon: 'compass' },
    { id: 'reservations', label: 'Reservations', icon: 'credit-card' },
    { id: 'itinerary', label: 'Itinerary', icon: 'calendar' },
    { id: 'budget', label: 'Budget', icon: 'dollar-sign' },
    { id: 'map', label: 'Interactive Map', icon: 'map' }
  ];

  bookings: Booking[] = [];
  itineraryItems: ItineraryItem[] = [];
  budgetBreakdown: BudgetCategorySummary[] = [];

  isFavorite(): boolean {
    return this.trip ? this.favoriteService.isFavorite(this.trip.id) : false;
  }

  toggleFavorite(): void {
    if (!this.trip) return;
    this.favoriteService.toggleFavorite(this.trip.id);
    this.toastService.success(this.isFavorite() ? 'Trip destination saved to favorites' : 'Removed from favorites');
  }

  deleteTrip(): void {
    if (!this.trip) return;
    if (confirm(`Are you sure you want to delete "${this.trip.name}"?`)) {
      this.tripService.deleteTrip(this.trip.id);
      this.toastService.success('Trip deleted successfully');
      this.router.navigate(['/my-trips']);
    }
  }

  deleteItineraryItem(itemId: string): void {
    this.itineraryService.deleteItem(itemId);
    if (this.trip) {
      this.itineraryItems = this.itineraryService.getItemsByTripId(this.trip.id);
    }
    this.toastService.success('Itinerary item removed');
  }

  get tripCenterCoordinates(): { lat: number; lng: number } {
    if (!this.trip) return { lat: 35.6762, lng: 139.6503 };
    const d = this.trip.destination.toLowerCase();
    const c = this.trip.country.toLowerCase();
    if (c.includes('japan') || d.includes('tokyo') || d.includes('kyoto')) return { lat: 35.6762, lng: 139.6503 };
    if (c.includes('indonesia') || d.includes('bali') || d.includes('ubud')) return { lat: -8.4095, lng: 115.1889 };
    if (c.includes('switzerland') || d.includes('interlaken') || d.includes('zermatt')) return { lat: 46.6863, lng: 7.8632 };
    if (c.includes('france') || d.includes('paris')) return { lat: 48.8566, lng: 2.3522 };
    if (c.includes('india') || d.includes('goa')) return { lat: 15.2993, lng: 74.1240 };
    return { lat: 35.6762, lng: 139.6503 };
  }

  get tripMapMarkers(): MapMarker[] {
    if (!this.trip) return [];
    const base = this.tripCenterCoordinates;
    const markers: MapMarker[] = [
      {
        lat: base.lat,
        lng: base.lng,
        title: `${this.trip.name} - Hub`,
        description: `${this.trip.destination}, ${this.trip.country}`,
        image: this.trip.coverImage,
        type: 'attraction'
      }
    ];

    if (this.trip.destinationsList && this.trip.destinationsList.length > 1) {
      this.trip.destinationsList.forEach((city, index) => {
        if (index > 0) {
          markers.push({
            lat: base.lat + (index * 0.08 * (index % 2 === 0 ? 1 : -1)),
            lng: base.lng + (index * 0.12 * (index % 2 === 0 ? -1 : 1)),
            title: `Stop ${index + 1}: ${city}`,
            description: `Planned waypoint in ${this.trip!.name}`,
            type: index % 2 === 0 ? 'hotel' : 'attraction'
          });
        }
      });
    }

    return markers;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      const found = this.tripService.getTripById(id || '');
      this.trip = found || this.tripService.getTrips()[0];

      if (this.trip) {
        this.bookings = this.bookingService.getBookingsByTripId(this.trip.id);
        this.itineraryItems = this.itineraryService.getItemsByTripId(this.trip.id);
        this.budgetBreakdown = this.budgetService.getCategoryBreakdown(this.trip.id);
      }
    });
  }

  getPinDescription(pin: string): string {
    switch (pin) {
      case 'Tokyo': return 'Capital metropolis. Arrival at Haneda NH007, Hotel Groove Shinjuku, Senso-ji temple, and Shibuya Sky deck.';
      case 'Hakone': return 'Scenic hot spring region overlooking Mount Fuji, cedar avenues, and Lake Ashi pirate boat cruise.';
      case 'Kyoto': return 'Cultural sanctuary. Sowaka Machiya ryokan, Fushimi Inari morning gates hike, and Michelin 3-star kaiseki.';
      case 'Osaka': return 'Culinary epicenter. Dotonbori neon river promenade, takoyaki street food, and Osaka Castle park.';
      default: return 'Scenic route waypoint.';
    }
  }

  getPinDistance(pin: string): string {
    switch (pin) {
      case 'Tokyo': return '0 km (Departure Hub)';
      case 'Hakone': return '85 km (1h 15m Romancecar)';
      case 'Kyoto': return '460 km (2h 15m Nozomi Shinkansen)';
      case 'Osaka': return '510 km (2h 30m Shinkansen)';
      default: return 'Way station';
    }
  }
}
