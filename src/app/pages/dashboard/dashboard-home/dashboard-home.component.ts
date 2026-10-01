import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LucideIconComponent } from '../../../shared/icon/lucide-icon.component';
import { TripCardComponent } from '../../../shared/trip-card/trip-card.component';
import { TripService } from '../../../core/services/trip.service';
import { AuthService } from '../../../core/services/auth.service';
import { BookingService } from '../../../core/services/booking.service';
import { FavoriteService } from '../../../core/services/favorite.service';
import { BudgetService } from '../../../core/services/budget.service';
import { ToastService } from '../../../core/services/toast.service';
import { Trip } from '../../../models/trip.model';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideIconComponent, TripCardComponent],
  template: `
    <div class="space-y-8 animate-fade-in pb-16 pt-2 sm:pt-4 text-[#17202A]">
      
      <!-- TOP BANNER: WELCOME & QUICK ACTIONS -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="text-[11px] font-bold uppercase tracking-widest text-[#D4A359]">
              TRAVELER DASHBOARD
            </span>
            <span class="text-xs text-[#6B7280]">&bull;</span>
            <span class="text-xs font-semibold text-[#6B7280]">
              Active Session
            </span>
          </div>
          <h2 class="text-2xl sm:text-4xl font-bold font-display text-[#071F22] tracking-tight">
            Welcome back, {{ authService.currentUser()?.fullName || 'Labdhi' }}
          </h2>
          <p class="text-xs sm:text-sm text-[#6B7280] font-light mt-0.5">
            Here is your live journey overview, itinerary progress, and active flight departures.
          </p>
        </div>

        <div class="flex items-center gap-3 shrink-0">
          <a
            routerLink="/plan-trip"
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0A2D30] hover:bg-[#D4A359] hover:text-[#071F22] text-white text-xs sm:text-sm font-bold transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <app-icon name="plus" [size]="15"></app-icon>
            <span>Plan My Trip</span>
          </a>
        </div>
      </div>

      <!-- UPCOMING TRIP CINEMATIC HERO CARD -->
      <div class="relative bg-gradient-to-br from-[#071F22] via-[#0A2D30] to-[#082226] text-white rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden border border-white/10 group">
        <!-- Background Ambient Glow & Texture -->
        <div class="absolute -right-16 -bottom-16 w-80 h-80 bg-[#D4A359]/15 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
        <div class="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80"
            alt="Goa Cover"
            class="w-full h-full object-cover mix-blend-overlay"
          />
        </div>

        <div class="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div class="space-y-4 max-w-xl">
            <div class="flex items-center gap-2 flex-wrap">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D4A359] text-xs font-bold uppercase tracking-widest backdrop-blur-md border border-white/10">
                <span class="w-1.5 h-1.5 rounded-full bg-[#D4A359] animate-pulse"></span>
                {{ upcomingTrip?.status || 'Confirmed' }} DEPARTURE
              </div>
              <span class="px-2.5 py-0.5 rounded-full bg-white/10 text-white font-mono text-xs font-semibold border border-white/10">
                ID: {{ upcomingTrip?.id || 'TS-2026-GOA01' }}
              </span>
            </div>

            <div>
              <a
                [routerLink]="upcomingTrip ? ['/my-trips', upcomingTrip.id] : ['/my-trips']"
                class="hover:text-[#D4A359] transition-colors block cursor-pointer"
              >
                <h1 class="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight">
                  {{ upcomingTrip?.name || 'Goa Escape' }}
                </h1>
              </a>
              <p class="text-xs sm:text-sm text-[#D4A359] font-medium mt-1">
                {{ upcomingTrip?.country || 'India' }} &bull; {{ upcomingTrip?.duration || '03 Days Beach & Heritage Retreat' }}
              </p>
            </div>

            <div class="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-200">
              <span class="flex items-center gap-1.5">
                <app-icon name="calendar" [size]="15" extraClass="text-[#D4A359]"></app-icon>
                <span>{{ upcomingTrip?.startDate || '05 Oct' }} – {{ upcomingTrip?.endDate || '08 Oct 2026' }}</span>
              </span>
              <span>&bull;</span>
              <span class="flex items-center gap-1.5">
                <app-icon name="user" [size]="15" extraClass="text-[#D4A359]"></app-icon>
                <span>{{ (upcomingTrip?.travelers?.adults || 2) + (upcomingTrip?.travelers?.children || 0) }} Travelers</span>
              </span>
              <span>&bull;</span>
              <span class="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <app-icon name="check-circle" [size]="15"></app-icon>
                <span>{{ upcomingTrip?.hotelName || 'Taj Exotica Resort & Spa' }}</span>
              </span>
              <span>&bull;</span>
              <span class="flex items-center gap-1.5 text-[#38BDF8] font-medium">
                <app-icon name="plane" [size]="15"></app-icon>
                <span>{{ upcomingTrip?.flight || 'IndiGo 6E-204' }}</span>
              </span>
            </div>

            <!-- Progress bar -->
            <div class="max-w-md space-y-1.5 pt-1">
              <div class="flex justify-between text-xs text-white/80 font-medium">
                <span>Trip Readiness</span>
                <span class="font-bold text-[#D4A359]">{{ upcomingTrip?.progress || 65 }}% Planned</span>
              </div>
              <div class="w-full h-2 bg-white/15 rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-[#D4A359] to-[#E5A93C] rounded-full transition-all duration-700" [style.width.%]="upcomingTrip?.progress || 65"></div>
              </div>
            </div>
          </div>

          <!-- Quick Action Buttons -->
          <div class="flex flex-wrap items-center gap-3 shrink-0">
            <a
              routerLink="/plan-trip"
              class="px-6 py-3 rounded-full bg-[#D4A359] hover:bg-[#c2924a] text-[#071F22] font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-lg shadow-[#D4A359]/20 active:scale-95 cursor-pointer"
            >
              <app-icon name="compass" [size]="16"></app-icon>
              <span>Continue Planning</span>
            </a>

            <a
              routerLink="/my-trips"
              class="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors border border-white/20 cursor-pointer"
            >
              <app-icon name="map" [size]="16"></app-icon>
              <span>View All Trips</span>
            </a>
          </div>

        </div>
      </div>

      <!-- 4 KEY METRIC CARDS -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        <!-- 1. Itinerary Progress -->
        <a
          routerLink="/itinerary"
          class="bg-white p-5 sm:p-6 rounded-3xl border border-[#EFEDE7] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 flex flex-col justify-between cursor-pointer group block"
        >
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-wider text-[#6B7280] group-hover:text-[#0A2D30] transition-colors">Itinerary Progress</span>
            <div class="w-9 h-9 rounded-2xl bg-[#D4A359]/15 text-[#B88738] flex items-center justify-center">
              <app-icon name="activity" [size]="17"></app-icon>
            </div>
          </div>
          <div class="mt-4">
            <p class="text-2xl sm:text-3xl font-extrabold font-display text-[#071F22]">65%</p>
            <div class="w-full h-1.5 bg-[#EFEDE7] rounded-full overflow-hidden mt-2.5">
              <div class="h-full bg-gradient-to-r from-[#0A2D30] to-[#D4A359] rounded-full" style="width: 65%"></div>
            </div>
            <span class="text-[11px] text-[#6B7280] mt-1.5 block font-medium">4 Activities Scheduled &rarr;</span>
          </div>
        </a>

        <!-- 2. Bookings -->
        <a
          routerLink="/bookings"
          class="bg-white p-5 sm:p-6 rounded-3xl border border-[#EFEDE7] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 flex flex-col justify-between cursor-pointer group block"
        >
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-wider text-[#6B7280] group-hover:text-[#0A2D30] transition-colors">Confirmed Bookings</span>
            <div class="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <app-icon name="check-circle" [size]="17"></app-icon>
            </div>
          </div>
          <div class="mt-4">
            <p class="text-2xl sm:text-3xl font-extrabold font-display text-[#071F22]">3</p>
            <span class="text-[11px] text-[#6B7280] mt-1.5 block font-medium">Resort, Flight & Cruise &rarr;</span>
          </div>
        </a>

        <!-- 3. Budget -->
        <a
          routerLink="/budget"
          class="bg-white p-5 sm:p-6 rounded-3xl border border-[#EFEDE7] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 flex flex-col justify-between cursor-pointer group block"
        >
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-wider text-[#6B7280] group-hover:text-[#0A2D30] transition-colors">Committed Budget</span>
            <div class="w-9 h-9 rounded-2xl bg-[#0A2D30]/10 text-[#0A2D30] flex items-center justify-center">
              <app-icon name="dollar-sign" [size]="17"></app-icon>
            </div>
          </div>
          <div class="mt-4">
            <p class="text-2xl sm:text-3xl font-extrabold font-display text-[#071F22]">$3,450</p>
            <span class="text-[11px] text-[#6B7280] mt-1.5 block font-medium">of $5,000 total allocated &rarr;</span>
          </div>
        </a>

        <!-- 4. Saved Places -->
        <a
          routerLink="/favorites"
          class="bg-white p-5 sm:p-6 rounded-3xl border border-[#EFEDE7] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 flex flex-col justify-between cursor-pointer group block"
        >
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-wider text-[#6B7280] group-hover:text-[#0A2D30] transition-colors">Saved Bucket List</span>
            <div class="w-9 h-9 rounded-2xl bg-[#D4A359]/15 text-[#B88738] flex items-center justify-center">
              <app-icon name="heart" [size]="17"></app-icon>
            </div>
          </div>
          <div class="mt-4">
            <p class="text-2xl sm:text-3xl font-extrabold font-display text-[#071F22]">
              {{ favoriteService.favoriteCount() || 5 }}
            </p>
            <span class="text-[11px] text-[#6B7280] mt-1.5 block font-medium">Curated Destinations &rarr;</span>
          </div>
        </a>

      </div>

      <!-- QUICK ACTION SHORTCUTS BAR -->
      <div class="bg-white p-4 sm:p-5 rounded-3xl border border-[#EFEDE7] shadow-sm">
        <div class="flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
          <span class="text-xs font-bold uppercase tracking-wider text-[#6B7280] shrink-0 hidden sm:inline">
            Quick Actions:
          </span>
          <div class="flex items-center gap-2.5 sm:gap-3 flex-1 justify-start sm:justify-end">
            <a
              routerLink="/plan-trip"
              class="px-4 py-2 rounded-xl bg-[#EFEDE7]/50 hover:bg-[#0A2D30] hover:text-white text-[#071F22] text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
            >
              <app-icon name="plus" [size]="14"></app-icon>
              <span>New Journey</span>
            </a>
            <a
              routerLink="/itinerary"
              class="px-4 py-2 rounded-xl bg-[#EFEDE7]/50 hover:bg-[#0A2D30] hover:text-white text-[#071F22] text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
            >
              <app-icon name="calendar" [size]="14"></app-icon>
              <span>Manage Itinerary</span>
            </a>
            <a
              routerLink="/destinations"
              class="px-4 py-2 rounded-xl bg-[#EFEDE7]/50 hover:bg-[#0A2D30] hover:text-white text-[#071F22] text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
            >
              <app-icon name="compass" [size]="14"></app-icon>
              <span>Explore Destinations</span>
            </a>
            <a
              routerLink="/budget"
              class="px-4 py-2 rounded-xl bg-[#EFEDE7]/50 hover:bg-[#0A2D30] hover:text-white text-[#071F22] text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
            >
              <app-icon name="dollar-sign" [size]="14"></app-icon>
              <span>Budget Tracker</span>
            </a>
          </div>
        </div>
      </div>

      <!-- EXPEDITIONS & CONFIRMED TRIPS SHOWCASE (Requirements 5, 6, 7) -->
      <div class="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFEDE7] shadow-sm space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EFEDE7]">
          <div>
            <span class="text-[10px] font-bold uppercase tracking-widest text-[#D4A359]">
              WORKSPACE DISPATCHES
            </span>
            <h3 class="text-xl sm:text-2xl font-bold font-display text-[#071F22] mt-0.5">
              Trip Hub & Itineraries
            </h3>
            <p class="text-xs text-[#6B7280] font-light">
              Live synchronized journeys across User & Admin panels with status tracking and full details.
            </p>
          </div>

          <!-- Tabs: Confirmed Trips | Upcoming Trips | Recent Trips -->
          <div class="flex items-center gap-2 bg-[#F8F7F3] p-1.5 rounded-2xl border border-[#EFEDE7] overflow-x-auto no-scrollbar shrink-0">
            <button
              type="button"
              (click)="activeTripsTab = 'confirmed'"
              class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
              [ngClass]="activeTripsTab === 'confirmed'
                ? 'bg-[#0A2D30] text-[#D4A359] shadow-sm'
                : 'text-[#071F22] hover:bg-[#EFEDE7]'"
            >
              <app-icon name="check-circle" [size]="13"></app-icon>
              <span>Confirmed Trips</span>
              <span class="px-1.5 py-0.5 rounded-full bg-white/20 text-[10px] font-mono">{{ confirmedTrips.length }}</span>
            </button>

            <button
              type="button"
              (click)="activeTripsTab = 'upcoming'"
              class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
              [ngClass]="activeTripsTab === 'upcoming'
                ? 'bg-[#0A2D30] text-[#D4A359] shadow-sm'
                : 'text-[#071F22] hover:bg-[#EFEDE7]'"
            >
              <app-icon name="calendar" [size]="13"></app-icon>
              <span>Upcoming Trips</span>
              <span class="px-1.5 py-0.5 rounded-full bg-white/20 text-[10px] font-mono">{{ upcomingTrips.length }}</span>
            </button>

            <button
              type="button"
              (click)="activeTripsTab = 'recent'"
              class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
              [ngClass]="activeTripsTab === 'recent'
                ? 'bg-[#0A2D30] text-[#D4A359] shadow-sm'
                : 'text-[#071F22] hover:bg-[#EFEDE7]'"
            >
              <app-icon name="clock" [size]="13"></app-icon>
              <span>Recent Trips</span>
              <span class="px-1.5 py-0.5 rounded-full bg-white/20 text-[10px] font-mono">{{ recentTrips.length }}</span>
            </button>
          </div>
        </div>

        <!-- Render List of Trip Cards with all 13 fields -->
        @if (displayedTrips.length > 0) {
          <div class="space-y-5">
            @for (trip of displayedTrips; track trip.id) {
              <app-trip-card
                [trip]="trip"
                (onEdit)="onEditTrip(trip)"
                (onDelete)="onDeleteTrip(trip)"
              ></app-trip-card>
            }
          </div>
        } @else {
          <div class="py-12 px-4 text-center rounded-2xl bg-[#F8F7F3]/60 border border-dashed border-[#EFEDE7] space-y-3">
            <div class="w-12 h-12 rounded-full bg-[#D4A359]/20 text-[#D4A359] flex items-center justify-center mx-auto">
              <app-icon name="map" [size]="22"></app-icon>
            </div>
            <h4 class="text-base font-bold text-[#071F22]">No journeys found in this section</h4>
            <p class="text-xs text-[#6B7280] max-w-sm mx-auto">
              Plan and confirm an expedition to see your personalized itinerary, flight, and hotel vouchers appear here.
            </p>
            <a
              routerLink="/plan-trip"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0A2D30] hover:bg-[#D4A359] hover:text-[#071F22] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <app-icon name="plus" [size]="14"></app-icon>
              <span>Plan My Trip</span>
            </a>
          </div>
        }
      </div>

      <!-- DASHBOARD MAIN WORKSPACE GRID -->
      <!-- Left 7 Cols: Activities & Hotel | Right 5 Cols: Flight, Budget, Weather, Saved Places -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- LEFT 7 COLS: Activities & Stays -->
        <div class="lg:col-span-7 space-y-8">
          
          <!-- 1. UPCOMING ACTIVITIES -->
          <div class="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFEDE7] shadow-sm space-y-5">
            <div class="flex items-center justify-between pb-3 border-b border-[#EFEDE7]">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-xl bg-[#D4A359]/15 text-[#B88738] flex items-center justify-center">
                  <app-icon name="calendar" [size]="16"></app-icon>
                </div>
                <div>
                  <h3 class="text-lg font-bold font-display text-[#071F22]">Upcoming Activities</h3>
                  <p class="text-xs text-[#6B7280]">Daily schedule for Goa Escape</p>
                </div>
              </div>
              <a routerLink="/itinerary" class="text-xs font-bold text-[#D4A359] hover:underline flex items-center gap-1">
                <span>Full Timeline</span>
                <app-icon name="arrow-right" [size]="12"></app-icon>
              </a>
            </div>

            <div class="space-y-3">
              <div class="p-4 rounded-2xl bg-[#F8F7F3]/60 border border-[#EFEDE7] flex items-center justify-between gap-4 hover:border-[#D4A359]/40 transition-colors">
                <div class="flex items-center gap-3">
                  <span class="w-14 text-center text-xs font-extrabold text-[#071F22] font-display bg-white px-2 py-1.5 rounded-lg border border-[#EFEDE7]">09:00</span>
                  <div>
                    <h4 class="text-sm font-bold text-[#071F22]">Airport Arrival & Pickup</h4>
                    <p class="text-xs text-[#6B7280]">Dabolim Terminal 1 &bull; Private Chauffeur</p>
                  </div>
                </div>
                <span class="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold shrink-0">
                  Confirmed
                </span>
              </div>

              <div class="p-4 rounded-2xl bg-[#F8F7F3]/60 border border-[#EFEDE7] flex items-center justify-between gap-4 hover:border-[#D4A359]/40 transition-colors">
                <div class="flex items-center gap-3">
                  <span class="w-14 text-center text-xs font-extrabold text-[#071F22] font-display bg-white px-2 py-1.5 rounded-lg border border-[#EFEDE7]">11:00</span>
                  <div>
                    <h4 class="text-sm font-bold text-[#071F22]">Hotel Check-in & Orientation</h4>
                    <p class="text-xs text-[#6B7280]">Taj Exotica Resort & Spa &bull; Sea View Suite</p>
                  </div>
                </div>
                <span class="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold shrink-0">
                  Confirmed
                </span>
              </div>

              <div class="p-4 rounded-2xl bg-[#F8F7F3]/60 border border-[#EFEDE7] flex items-center justify-between gap-4 hover:border-[#D4A359]/40 transition-colors">
                <div class="flex items-center gap-3">
                  <span class="w-14 text-center text-xs font-extrabold text-[#071F22] font-display bg-white px-2 py-1.5 rounded-lg border border-[#EFEDE7]">14:00</span>
                  <div>
                    <h4 class="text-sm font-bold text-[#071F22]">Benaulim Beach Cabana</h4>
                    <p class="text-xs text-[#6B7280]">Private shore cabana & fresh young coconuts</p>
                  </div>
                </div>
                <span class="px-2.5 py-1 rounded-full bg-[#EFEDE7] text-[#071F22] text-[10px] font-bold shrink-0">
                  Scheduled
                </span>
              </div>

              <div class="p-4 rounded-2xl bg-[#F8F7F3]/60 border border-[#EFEDE7] flex items-center justify-between gap-4 hover:border-[#D4A359]/40 transition-colors">
                <div class="flex items-center gap-3">
                  <span class="w-14 text-center text-xs font-extrabold text-[#071F22] font-display bg-white px-2 py-1.5 rounded-lg border border-[#EFEDE7]">19:00</span>
                  <div>
                    <h4 class="text-sm font-bold text-[#071F22]">Coastal Seafood Dinner</h4>
                    <p class="text-xs text-[#6B7280]">Fisherman’s Wharf &bull; Live Acoustic Music</p>
                  </div>
                </div>
                <span class="px-2.5 py-1 rounded-full bg-[#EFEDE7] text-[#071F22] text-[10px] font-bold shrink-0">
                  Table Booked
                </span>
              </div>
            </div>
          </div>

          <!-- 2. HOTEL BOOKING -->
          <div class="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFEDE7] shadow-sm space-y-4">
            <div class="flex items-center justify-between pb-3 border-b border-[#EFEDE7]">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-xl bg-[#0A2D30]/10 text-[#0A2D30] flex items-center justify-center">
                  <app-icon name="hotel" [size]="16"></app-icon>
                </div>
                <div>
                  <h3 class="text-lg font-bold font-display text-[#071F22]">Confirmed Sanctuary Stay</h3>
                  <p class="text-xs text-[#6B7280]">Accommodation reservation voucher</p>
                </div>
              </div>
              <span class="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                Check-in Oct 05
              </span>
            </div>

            <div class="flex flex-col sm:flex-row gap-5 items-center bg-[#F8F7F3]/50 p-4 rounded-2xl border border-[#EFEDE7]">
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80"
                alt="Taj Exotica Resort"
                class="w-full sm:w-40 h-32 rounded-xl object-cover shadow-xs"
              />
              <div class="space-y-1.5 w-full">
                <div class="flex items-center gap-1 text-[#D4A359] text-xs">
                  <app-icon name="star" [size]="13" [isFilled]="true"></app-icon>
                  <span class="font-bold">5.0 Star Luxury Resort</span>
                </div>
                <h4 class="text-lg font-bold text-[#071F22] font-display">Taj Exotica Resort & Spa</h4>
                <p class="text-xs text-[#6B7280]">Calwaddo, Benaulim, South Goa &bull; Ocean View</p>
                <p class="text-xs font-semibold text-[#071F22] pt-0.5">
                  1 Premium Balcony Villa &bull; 3 Nights &bull; Daily Gourmet Breakfast
                </p>
                <div class="pt-1 flex items-center justify-between">
                  <span class="text-[11px] font-mono text-[#6B7280]">Ref: #HTL-GOA-94821</span>
                  <a routerLink="/bookings" class="text-xs font-bold text-[#D4A359] hover:underline">View Voucher &rarr;</a>
                </div>
              </div>
            </div>
          </div>

          <!-- 3. TRAVELER MILESTONES -->
          <div class="bg-gradient-to-r from-[#071F22] to-[#0A2D30] text-white rounded-3xl p-6 sm:p-7 shadow-sm flex flex-wrap items-center justify-between gap-6">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-2xl bg-[#D4A359] text-[#071F22] font-bold flex items-center justify-center text-xl font-serif shrink-0">
                ★
              </div>
              <div>
                <span class="text-[10px] font-bold uppercase tracking-widest text-[#D4A359]">LOYALTY REPUTATION</span>
                <h4 class="text-lg font-bold font-display text-white">Platinum Journeyer</h4>
                <p class="text-xs text-white/70">Verified TripSphere Member since Jan 2026</p>
              </div>
            </div>

            <div class="flex items-center gap-6 text-center border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-6">
              <div>
                <span class="text-xl font-bold font-display text-[#D4A359]">14</span>
                <span class="text-[10px] uppercase tracking-wider block text-white/70">Destinations</span>
              </div>
              <div>
                <span class="text-xl font-bold font-display text-[#D4A359]">08</span>
                <span class="text-[10px] uppercase tracking-wider block text-white/70">Countries</span>
              </div>
              <div>
                <span class="text-xl font-bold font-display text-[#D4A359]">12</span>
                <span class="text-[10px] uppercase tracking-wider block text-white/70">Stories</span>
              </div>
            </div>
          </div>

        </div>

        <!-- RIGHT 5 COLS: Flight Details, Trip Budget, Weather, Saved Places -->
        <div class="lg:col-span-5 space-y-8">
          
          <!-- 3. FLIGHT DETAILS -->
          <div class="bg-white rounded-3xl p-6 border border-[#EFEDE7] shadow-sm space-y-4">
            <div class="flex items-center justify-between pb-3 border-b border-[#EFEDE7]">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-xl bg-[#D4A359]/15 text-[#B88738] flex items-center justify-center">
                  <app-icon name="plane" [size]="16"></app-icon>
                </div>
                <h3 class="text-base font-bold font-display text-[#071F22]">Flight Departure</h3>
              </div>
              <span class="text-xs font-bold text-[#D4A359]">IndiGo 6E-204</span>
            </div>

            <div class="p-4 rounded-2xl bg-[#F8F7F3]/70 border border-[#EFEDE7] space-y-3">
              <div class="flex items-center justify-between text-xs">
                <div>
                  <span class="text-[10px] uppercase font-bold text-[#6B7280]">Departure</span>
                  <p class="text-base font-bold text-[#071F22] font-display">06:45 AM &bull; BOM</p>
                  <p class="text-[11px] text-[#6B7280]">Mumbai Int'l</p>
                </div>
                <div class="flex flex-col items-center px-2">
                  <app-icon name="arrow-right" [size]="16" extraClass="text-[#D4A359]"></app-icon>
                  <span class="text-[10px] text-[#6B7280] font-mono mt-0.5">1h 15m</span>
                </div>
                <div class="text-right">
                  <span class="text-[10px] uppercase font-bold text-[#6B7280]">Arrival</span>
                  <p class="text-base font-bold text-[#071F22] font-display">08:00 AM &bull; GOI</p>
                  <p class="text-[11px] text-[#6B7280]">Goa Dabolim</p>
                </div>
              </div>
              <div class="pt-2.5 border-t border-[#EFEDE7] flex justify-between text-xs text-[#6B7280]">
                <span>Gate: <strong class="text-[#071F22]">14B</strong></span>
                <span>Seat: <strong class="text-[#071F22]">4A, 4B</strong></span>
                <span class="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">On Time</span>
              </div>
            </div>
          </div>

          <!-- 4. TRIP BUDGET -->
          <div class="bg-white rounded-3xl p-6 border border-[#EFEDE7] shadow-sm space-y-4">
            <div class="flex items-center justify-between pb-3 border-b border-[#EFEDE7]">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <app-icon name="dollar-sign" [size]="16"></app-icon>
                </div>
                <h3 class="text-base font-bold font-display text-[#071F22]">Budget Tracker</h3>
              </div>
              <a routerLink="/budget" class="text-xs font-bold text-[#D4A359] hover:underline flex items-center gap-1">
                <span>Manage</span>
                <app-icon name="arrow-right" [size]="12"></app-icon>
              </a>
            </div>

            <div class="space-y-2.5 text-xs">
              <div class="flex justify-between py-1">
                <span class="text-[#6B7280]">Allocated Budget</span>
                <span class="font-bold text-[#071F22] font-display text-sm">$5,000</span>
              </div>
              <div class="flex justify-between py-1">
                <span class="text-[#6B7280]">Committed Expenses</span>
                <span class="font-bold text-[#D4A359] font-display text-sm">$3,450</span>
              </div>
              <div class="w-full h-2 bg-[#EFEDE7] rounded-full overflow-hidden">
                <div class="h-full bg-[#0A2D30] rounded-full" style="width: 69%"></div>
              </div>
              <div class="flex justify-between py-1 border-t border-[#EFEDE7] pt-2">
                <span class="font-bold text-[#071F22]">Remaining Balance</span>
                <span class="font-bold text-emerald-700 font-display text-sm">$1,550</span>
              </div>
            </div>
          </div>

          <!-- 5. WEATHER IN GOA -->
          <div class="bg-white rounded-3xl p-6 border border-[#EFEDE7] shadow-sm space-y-3">
            <div class="flex items-center justify-between pb-3 border-b border-[#EFEDE7]">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-xl bg-[#D4A359]/15 text-[#B88738] flex items-center justify-center">
                  <app-icon name="sun" [size]="16"></app-icon>
                </div>
                <h3 class="text-base font-bold font-display text-[#071F22]">Live Climate in Goa</h3>
              </div>
              <span class="text-xs text-[#6B7280]">Tropical Coastal</span>
            </div>

            <div class="flex items-center justify-between p-3 rounded-2xl bg-[#F8F7F3]/70 border border-[#EFEDE7]">
              <div class="flex items-center gap-3">
                <span class="text-3xl font-extrabold font-display text-[#071F22]">31°C</span>
                <div class="text-xs text-[#6B7280]">
                  <p class="font-bold text-[#071F22]">Sunny & Warm</p>
                  <p>Humidity 74% &bull; Sea 28°C</p>
                </div>
              </div>
              <div class="w-10 h-10 rounded-full bg-[#D4A359]/20 text-[#D4A359] flex items-center justify-center">
                <app-icon name="sun" [size]="22"></app-icon>
              </div>
            </div>
          </div>

          <!-- 6. SAVED PLACES -->
          <div class="bg-white rounded-3xl p-6 border border-[#EFEDE7] shadow-sm space-y-4">
            <div class="flex items-center justify-between pb-3 border-b border-[#EFEDE7]">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-xl bg-[#D4A359]/15 text-[#B88738] flex items-center justify-center">
                  <app-icon name="heart" [size]="16"></app-icon>
                </div>
                <h3 class="text-base font-bold font-display text-[#071F22]">Saved Wishlist</h3>
              </div>
              <a routerLink="/favorites" class="text-xs font-bold text-[#D4A359] hover:underline flex items-center gap-1">
                <span>View All</span>
                <app-icon name="arrow-right" [size]="12"></app-icon>
              </a>
            </div>

            <div class="space-y-2.5">
              <div class="flex items-center justify-between p-2.5 rounded-2xl hover:bg-[#F8F7F3] border border-transparent hover:border-[#EFEDE7] transition-all">
                <div class="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=150&q=80" alt="Fontainhas" class="w-10 h-10 rounded-xl object-cover shrink-0" />
                  <div>
                    <h5 class="text-xs font-bold text-[#071F22]">Fontainhas Latin Quarter</h5>
                    <p class="text-[11px] text-[#6B7280]">Old Goa &bull; Heritage Walk</p>
                  </div>
                </div>
                <span class="text-xs text-[#D4A359] font-bold">4.9★</span>
              </div>

              <div class="flex items-center justify-between p-2.5 rounded-2xl hover:bg-[#F8F7F3] border border-transparent hover:border-[#EFEDE7] transition-all">
                <div class="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=150&q=80" alt="Bali" class="w-10 h-10 rounded-xl object-cover shrink-0" />
                  <div>
                    <h5 class="text-xs font-bold text-[#071F22]">Ubud Rice Terraces</h5>
                    <p class="text-[11px] text-[#6B7280]">Bali &bull; Cultural Walk</p>
                  </div>
                </div>
                <span class="text-xs text-[#D4A359] font-bold">4.9★</span>
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
  toastService = inject(ToastService);
  router = inject(Router);

  activeTripsTab: 'confirmed' | 'upcoming' | 'recent' = 'confirmed';

  get upcomingTrip(): Trip | undefined {
    const confirmed = this.tripService.getConfirmedTrips();
    if (confirmed.length > 0) return confirmed[0];
    const all = this.tripService.trips();
    return all.find(t => t.status === 'Confirmed' || t.status === 'Upcoming') || all[0];
  }

  get confirmedTrips(): Trip[] {
    return this.tripService.getConfirmedTrips();
  }

  get upcomingTrips(): Trip[] {
    return this.tripService.getUpcomingTrips();
  }

  get recentTrips(): Trip[] {
    return this.tripService.getRecentTrips(6);
  }

  get displayedTrips(): Trip[] {
    if (this.activeTripsTab === 'confirmed') return this.confirmedTrips;
    if (this.activeTripsTab === 'upcoming') return this.upcomingTrips;
    return this.recentTrips;
  }

  onEditTrip(trip: Trip): void {
    this.router.navigate(['/my-trips']);
  }

  onDeleteTrip(trip: Trip): void {
    if (confirm(`Are you sure you want to delete "${trip.name}"?`)) {
      this.tripService.deleteTrip(trip.id);
      this.toastService.success('Trip removed from your dashboard');
    }
  }
}
