import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideIconComponent } from '../../../shared/icon/lucide-icon.component';
import { TripService } from '../../../core/services/trip.service';
import { AuthService } from '../../../core/services/auth.service';
import { BookingService } from '../../../core/services/booking.service';
import { FavoriteService } from '../../../core/services/favorite.service';
import { BudgetService } from '../../../core/services/budget.service';
import { Trip } from '../../../models/trip.model';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideIconComponent],
  template: `
    <div class="space-y-8 animate-fade-in pb-16 text-[#17202A]">
      
      <!-- TOP BANNER: WELCOME & UPCOMING TRIP (Goa Escape • 05 Oct – 08 Oct 2026) -->
      <div class="space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 class="text-2xl sm:text-3xl font-bold font-display text-[#071328]">
              Welcome back, {{ authService.currentUser()?.fullName || 'Labdhi' }}
            </h2>
            <p class="text-xs sm:text-sm text-[#6B7280]">
              Here is your active journey overview and upcoming flight departures.
            </p>
          </div>
          <a
            routerLink="/plan-trip"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0084FF] hover:bg-[#0070D8] text-white text-xs font-bold transition-all shadow-sm"
          >
            <app-icon name="plus" [size]="14"></app-icon>
            <span>Plan My Trip</span>
          </a>
        </div>

        <div class="relative bg-[#071328] text-white rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden border border-blue-900/40">
          <div class="absolute -right-10 -bottom-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>

          <div class="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div class="space-y-3">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#38BDF8] text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                UPCOMING TRIP
              </div>

              <h1 class="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight">
                Goa Escape
              </h1>

              <p class="text-sm sm:text-base text-slate-200 flex items-center gap-2 font-medium">
                <app-icon name="calendar" [size]="16" extraClass="text-[#0084FF]"></app-icon>
                <span>05 Oct – 08 Oct 2026</span>
                <span>•</span>
                <span>65% Planned</span>
              </p>

              <!-- Progress bar -->
              <div class="max-w-xs space-y-1 pt-1">
                <div class="flex justify-between text-[11px] text-white/70">
                  <span>Trip Progress</span>
                  <span class="font-bold text-[#38BDF8]">65%</span>
                </div>
                <div class="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div class="h-full bg-[#0084FF] rounded-full" style="width: 65%"></div>
                </div>
              </div>
            </div>

            <!-- Quick Action Buttons: Continue Planning & View Trip -->
            <div class="flex flex-wrap items-center gap-3 shrink-0">
              <a
                routerLink="/plan-trip"
                class="px-5 py-3 rounded-2xl bg-[#0084FF] hover:bg-[#0070D8] text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <app-icon name="compass" [size]="16"></app-icon>
                <span>Continue Planning</span>
              </a>

              <a
                routerLink="/my-trips"
                class="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors border border-white/15 cursor-pointer"
              >
                <app-icon name="map" [size]="16"></app-icon>
                <span>View Trip</span>
              </a>
            </div>

          </div>
        </div>
      </div>

      <!-- 4 KEY METRIC CARDS -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        <!-- 1. Itinerary Progress -->
        <div class="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Itinerary Progress</span>
            <div class="w-8 h-8 rounded-xl bg-blue-50 text-[#0084FF] flex items-center justify-center">
              <app-icon name="activity" [size]="16"></app-icon>
            </div>
          </div>
          <div class="mt-4">
            <p class="text-2xl sm:text-3xl font-extrabold font-display text-[#071328]">65%</p>
            <div class="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-2">
              <div class="h-full bg-[#0084FF] rounded-full" style="width: 65%"></div>
            </div>
            <span class="text-[11px] text-[#6B7280] mt-1 block">4 Activities Scheduled</span>
          </div>
        </div>

        <!-- 2. Bookings -->
        <div class="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Bookings</span>
            <div class="w-8 h-8 rounded-xl bg-blue-50 text-[#0084FF] flex items-center justify-center">
              <app-icon name="check-circle" [size]="16"></app-icon>
            </div>
          </div>
          <div class="mt-4">
            <p class="text-2xl sm:text-3xl font-extrabold font-display text-[#071328]">3</p>
            <span class="text-[11px] text-[#6B7280] mt-1 block">Resort, Flight & Cruise Confirmed</span>
          </div>
        </div>

        <!-- 3. Budget -->
        <div class="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Budget</span>
            <div class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <app-icon name="dollar-sign" [size]="16"></app-icon>
            </div>
          </div>
          <div class="mt-4">
            <p class="text-2xl sm:text-3xl font-extrabold font-display text-[#071328]">$3,450</p>
            <span class="text-[11px] text-[#6B7280] mt-1 block">of $5,000 total committed</span>
          </div>
        </div>

        <!-- 4. Saved Places -->
        <div class="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Saved Places</span>
            <div class="w-8 h-8 rounded-xl bg-blue-50 text-[#0084FF] flex items-center justify-center">
              <app-icon name="heart" [size]="16"></app-icon>
            </div>
          </div>
          <div class="mt-4">
            <p class="text-2xl sm:text-3xl font-extrabold font-display text-[#071328]">
              {{ favoriteService.favoriteCount() || 5 }}
            </p>
            <span class="text-[11px] text-[#6B7280] mt-1 block">Bucket List Landmarks</span>
          </div>
        </div>

      </div>

      <!-- DASHBOARD GRID: -->
      <!-- Upcoming Activities | Hotel Booking | Flight Details | Trip Budget | Weather | Saved Places -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- LEFT 7 COLS: Activities & Stays -->
        <div class="lg:col-span-7 space-y-8">
          
          <!-- 1. UPCOMING ACTIVITIES -->
          <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
            <div class="flex items-center justify-between pb-3 border-b border-slate-200">
              <div class="flex items-center gap-2">
                <app-icon name="calendar" [size]="18" extraClass="text-[#0084FF]"></app-icon>
                <h3 class="text-lg font-bold font-display text-[#071328]">Upcoming Activities</h3>
              </div>
              <a routerLink="/itinerary" class="text-xs font-bold text-[#0084FF] hover:underline">
                Full Schedule →
              </a>
            </div>

            <div class="space-y-3">
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                <div class="flex items-center gap-3">
                  <span class="w-12 text-center text-xs font-extrabold text-[#071328] font-display">09:00</span>
                  <div>
                    <h4 class="text-sm font-bold text-[#071328]">Airport Arrival & Pickup</h4>
                    <p class="text-xs text-[#6B7280]">Dabolim Terminal 1 • Private Chauffeur</p>
                  </div>
                </div>
                <span class="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                  Confirmed
                </span>
              </div>

              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                <div class="flex items-center gap-3">
                  <span class="w-12 text-center text-xs font-extrabold text-[#071328] font-display">11:00</span>
                  <div>
                    <h4 class="text-sm font-bold text-[#071328]">Hotel Check-in & Orientation</h4>
                    <p class="text-xs text-[#6B7280]">Taj Exotica Resort & Spa • Sea View Suite</p>
                  </div>
                </div>
                <span class="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                  Confirmed
                </span>
              </div>

              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                <div class="flex items-center gap-3">
                  <span class="w-12 text-center text-xs font-extrabold text-[#071328] font-display">14:00</span>
                  <div>
                    <h4 class="text-sm font-bold text-[#071328]">Benaulim Beach Visit</h4>
                    <p class="text-xs text-[#6B7280]">Private shore cabana & fresh young coconuts</p>
                  </div>
                </div>
                <span class="px-2.5 py-1 rounded-full bg-slate-200 text-[#071328] text-[10px] font-bold">
                  Scheduled
                </span>
              </div>

              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                <div class="flex items-center gap-3">
                  <span class="w-12 text-center text-xs font-extrabold text-[#071328] font-display">19:00</span>
                  <div>
                    <h4 class="text-sm font-bold text-[#071328]">Coastal Seafood Dinner</h4>
                    <p class="text-xs text-[#6B7280]">Fisherman’s Wharf • Live Acoustic Music</p>
                  </div>
                </div>
                <span class="px-2.5 py-1 rounded-full bg-slate-200 text-[#071328] text-[10px] font-bold">
                  Table Booked
                </span>
              </div>
            </div>
          </div>

          <!-- 2. HOTEL BOOKING -->
          <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div class="flex items-center justify-between pb-3 border-b border-slate-200">
              <div class="flex items-center gap-2">
                <app-icon name="hotel" [size]="18" extraClass="text-[#0084FF]"></app-icon>
                <h3 class="text-lg font-bold font-display text-[#071328]">Hotel Booking</h3>
              </div>
              <span class="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                Check-in Oct 05
              </span>
            </div>

            <div class="flex flex-col sm:flex-row gap-5 items-center">
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80"
                alt="Taj Exotica Resort"
                class="w-full sm:w-36 h-28 rounded-2xl object-cover"
              />
              <div class="space-y-1 w-full">
                <h4 class="text-base font-bold text-[#071328]">Taj Exotica Resort & Spa</h4>
                <p class="text-xs text-[#6B7280]">Calwaddo, Benaulim, South Goa</p>
                <p class="text-xs font-semibold text-[#17202A] pt-1">
                  1 Premium Ocean Balcony Suite • 3 Nights • Daily Breakfast Included
                </p>
                <p class="text-[11px] text-[#6B7280]">Confirmation: #HTL-GOA-94821</p>
              </div>
            </div>
          </div>

        </div>

        <!-- RIGHT 5 COLS: Flight Details, Trip Budget, Weather, Saved Places -->
        <div class="lg:col-span-5 space-y-8">
          
          <!-- 3. FLIGHT DETAILS -->
          <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div class="flex items-center justify-between pb-3 border-b border-slate-200">
              <div class="flex items-center gap-2">
                <app-icon name="plane" [size]="18" extraClass="text-[#0084FF]"></app-icon>
                <h3 class="text-base font-bold font-display text-[#071328]">Flight Details</h3>
              </div>
              <span class="text-xs font-bold text-[#6B7280]">IndiGo 6E-204</span>
            </div>

            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div class="flex items-center justify-between text-xs">
                <div>
                  <span class="text-[10px] uppercase font-bold text-[#6B7280]">Departure</span>
                  <p class="text-sm font-bold text-[#071328]">06:45 AM • BOM</p>
                </div>
                <app-icon name="arrow-right" [size]="16" extraClass="text-[#0084FF]"></app-icon>
                <div class="text-right">
                  <span class="text-[10px] uppercase font-bold text-[#6B7280]">Arrival</span>
                  <p class="text-sm font-bold text-[#071328]">08:00 AM • GOI</p>
                </div>
              </div>
              <div class="pt-2 border-t border-slate-200 flex justify-between text-xs text-[#6B7280]">
                <span>Gate: 14B</span>
                <span>Seat: 4A, 4B</span>
                <span class="text-emerald-700 font-bold">On Time</span>
              </div>
            </div>
          </div>

          <!-- 4. TRIP BUDGET -->
          <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div class="flex items-center justify-between pb-3 border-b border-slate-200">
              <div class="flex items-center gap-2">
                <app-icon name="dollar-sign" [size]="18" extraClass="text-emerald-600"></app-icon>
                <h3 class="text-base font-bold font-display text-[#071328]">Trip Budget</h3>
              </div>
              <a routerLink="/budget" class="text-xs font-bold text-[#0084FF] hover:underline">
                Budget Manager →
              </a>
            </div>

            <div class="space-y-2 text-xs">
              <div class="flex justify-between py-1">
                <span class="text-[#6B7280]">Allocated Budget</span>
                <span class="font-bold text-[#071328] font-display">$5,000</span>
              </div>
              <div class="flex justify-between py-1">
                <span class="text-[#6B7280]">Committed Expenses</span>
                <span class="font-bold text-[#D4A359] font-display">$3,450</span>
              </div>
              <div class="flex justify-between py-1 border-t border-slate-200 pt-2">
                <span class="font-bold text-[#071328]">Remaining Balance</span>
                <span class="font-bold text-emerald-700 font-display">$1,550</span>
              </div>
            </div>
          </div>

          <!-- 5. WEATHER IN GOA -->
          <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div class="flex items-center justify-between pb-3 border-b border-slate-200">
              <div class="flex items-center gap-2">
                <app-icon name="sun" [size]="18" extraClass="text-[#38BDF8]"></app-icon>
                <h3 class="text-base font-bold font-display text-[#071328]">Weather in Goa</h3>
              </div>
              <span class="text-xs text-[#6B7280]">Tropical Coastal</span>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <span class="text-3xl font-extrabold font-display text-[#071328]">31°C</span>
                <div class="text-xs text-[#6B7280]">
                  <p class="font-semibold text-[#071328]">Sunny & Warm</p>
                  <p>Humidity 74% • Sea 28°C</p>
                </div>
              </div>
              <app-icon name="sun" [size]="28" extraClass="text-[#38BDF8]"></app-icon>
            </div>
          </div>

          <!-- 6. SAVED PLACES -->
          <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div class="flex items-center justify-between pb-3 border-b border-slate-200">
              <div class="flex items-center gap-2">
                <app-icon name="heart" [size]="18" extraClass="text-[#0084FF]"></app-icon>
                <h3 class="text-base font-bold font-display text-[#071328]">Saved Places</h3>
              </div>
              <a routerLink="/favorites" class="text-xs font-bold text-[#0084FF] hover:underline">
                View All →
              </a>
            </div>

            <div class="space-y-2.5">
              <div class="flex items-center justify-between p-2 rounded-xl hover:bg-slate-100 transition-colors">
                <div class="flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[#071328]">
                    <app-icon name="map-pin" [size]="14"></app-icon>
                  </div>
                  <div>
                    <h5 class="text-xs font-bold text-[#071328]">Fontainhas Latin Quarter</h5>
                    <p class="text-[10px] text-[#6B7280]">Old Goa • Heritage Walk</p>
                  </div>
                </div>
                <span class="text-xs text-[#0084FF] font-bold">4.9★</span>
              </div>

              <div class="flex items-center justify-between p-2 rounded-xl hover:bg-slate-100 transition-colors">
                <div class="flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[#071328]">
                    <app-icon name="map-pin" [size]="14"></app-icon>
                  </div>
                  <div>
                    <h5 class="text-xs font-bold text-[#071328]">Dudhsagar Waterfalls</h5>
                    <p class="text-[10px] text-[#6B7280]">Goa Border • Jungle Trek</p>
                  </div>
                </div>
                <span class="text-xs text-[#0084FF] font-bold">4.8★</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  `
})
export class DashboardHomeComponent {
  authService = inject(AuthService);
  tripService = inject(TripService);
  bookingService = inject(BookingService);
  favoriteService = inject(FavoriteService);
  budgetService = inject(BudgetService);
}
