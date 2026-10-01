import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LucideIconComponent } from '../../../shared/icon/lucide-icon.component';
import { TripService } from '../../../core/services/trip.service';
import { AuthService } from '../../../core/services/auth.service';
import { DestinationService } from '../../../core/services/destination.service';
import { HotelService } from '../../../core/services/hotel.service';
import { ToastService } from '../../../core/services/toast.service';
import { Destination } from '../../../models/destination.model';
import { Hotel } from '../../../models/hotel.model';
import { Trip } from '../../../models/trip.model';

interface StepInfo {
  num: number;
  labelNum: string;
  name: string;
}

@Component({
  selector: 'app-create-trip',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink, LucideIconComponent],
  template: `
    <div class="max-w-5xl mx-auto py-6 sm:py-10 px-4 space-y-8 animate-fade-in text-[#17202A]">
      
      <!-- TOP BANNER -->
      <div class="bg-gradient-to-r from-[#071F22] via-[#0A2D30] to-[#071F22] text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-white/10 relative overflow-hidden">
        <div class="absolute -right-12 -bottom-12 w-64 h-64 bg-[#D4A359]/15 rounded-full blur-3xl pointer-events-none"></div>

        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="space-y-2">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D4A359] text-xs font-bold uppercase tracking-widest backdrop-blur-md border border-white/10">
              <span>✈ &mdash;&mdash;</span>
              <span>JOURNEY ARCHITECT</span>
            </div>
            <h1 class="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight">
              Plan My <span class="text-[#D4A359]">Trip</span>
            </h1>
            <p class="text-xs sm:text-sm text-slate-200 max-w-lg font-light">
              Craft your bespoke travel itinerary step-by-step with real-time budget, luxury stays, and curated activities.
            </p>
          </div>

          <div class="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center shrink-0">
            <span class="text-[10px] uppercase font-bold text-[#D4A359] tracking-wider block">Planning Progress</span>
            <span class="text-2xl font-extrabold font-display text-white">Step {{ currentStep }} / 8</span>
            <div class="w-32 h-1.5 bg-white/20 rounded-full overflow-hidden mt-2 mx-auto">
              <div class="h-full bg-[#D4A359] rounded-full transition-all duration-500" [style.width.%]="(currentStep / 8) * 100"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 8-STEP HORIZONTAL PROGRESS SYSTEM -->
      <div class="bg-white p-3 sm:p-4 rounded-3xl border border-[#EFEDE7] shadow-sm overflow-hidden">
        <div class="flex items-center justify-between overflow-x-auto no-scrollbar pb-1 gap-1">
          @for (s of steps; track s.num) {
            <div class="flex items-center gap-1 sm:gap-2 shrink-0">
              <button
                type="button"
                (click)="goToStep(s.num)"
                [disabled]="s.num > maxVisitedStep"
                class="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl transition-all cursor-pointer text-xs font-bold"
                [ngClass]="{
                  'bg-[#0A2D30] text-[#D4A359] shadow-md ring-2 ring-[#D4A359]/40': currentStep === s.num,
                  'bg-[#F8F7F3] text-[#071F22] hover:bg-[#EFEDE7] border border-[#EFEDE7]': currentStep !== s.num && s.num <= maxVisitedStep,
                  'opacity-40 cursor-not-allowed text-[#6B7280]': s.num > maxVisitedStep
                }"
              >
                <span class="w-5 h-5 rounded-full inline-flex items-center justify-center text-[10px]"
                  [ngClass]="currentStep === s.num ? 'bg-[#D4A359] text-[#071F22]' : 'bg-[#EFEDE7] text-[#071F22]'">
                  {{ s.labelNum }}
                </span>
                <span class="hidden md:inline">{{ s.name }}</span>
              </button>

              @if (s.num < 8) {
                <div class="w-1.5 sm:w-3 h-[2px] bg-[#EFEDE7]"></div>
              }
            </div>
          }
        </div>
      </div>

      <!-- STEP CONTENT CONTAINER -->
      <div class="bg-white rounded-3xl border border-[#EFEDE7] shadow-sm p-6 sm:p-10 min-h-[480px] flex flex-col justify-between">
        
        <!-- ============================================== -->
        <!-- STEP 1: DESTINATION                            -->
        <!-- ============================================== -->
        @if (currentStep === 1) {
          <div class="space-y-6">
            <div class="flex items-center justify-between border-b border-[#EFEDE7] pb-4">
              <div>
                <span class="text-[10px] font-bold uppercase tracking-widest text-[#D4A359]">Step 01 of 08</span>
                <h2 class="text-2xl sm:text-3xl font-bold font-display text-[#071F22]">Choose Your Destination</h2>
                <p class="text-xs sm:text-sm text-[#6B7280]">Select a featured wonder or search custom destination.</p>
              </div>
              <span class="text-xs text-[#6B7280] hidden sm:block">Showing {{ destinations().length }} Curated Escapes</span>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              @for (d of destinations(); track d.id) {
                <div
                  (click)="pickDestination(d)"
                  class="group relative h-48 sm:h-56 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all p-4 flex flex-col justify-between text-white"
                  [ngClass]="selectedDestination?.id === d.id ? 'border-[#D4A359] shadow-xl ring-4 ring-[#D4A359]/20' : 'border-transparent hover:border-[#EFEDE7]'"
                >
                  <img [src]="d.image" [alt]="d.name" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div class="absolute inset-0 bg-gradient-to-t from-[#071F22] via-[#071F22]/40 to-transparent"></div>
                  
                  <!-- Top Selected Badge -->
                  <div class="relative z-10 flex justify-between items-start">
                    <span class="px-2 py-0.5 rounded-full bg-[#071F22]/80 backdrop-blur-sm text-[#D4A359] text-[10px] font-bold uppercase tracking-wider">
                      {{ d.country }}
                    </span>
                    @if (selectedDestination?.id === d.id) {
                      <span class="w-6 h-6 rounded-full bg-[#D4A359] text-[#071F22] flex items-center justify-center font-bold text-xs shadow-md">
                        ✓
                      </span>
                    }
                  </div>

                  <!-- Bottom Info -->
                  <div class="relative z-10 space-y-0.5">
                    <div class="flex items-center gap-1 text-[#D4A359] text-[11px] font-bold">
                      <app-icon name="star" [size]="12" [isFilled]="true"></app-icon>
                      <span>{{ d.rating }}</span>
                    </div>
                    <h3 class="text-lg font-bold font-display leading-tight">{{ d.name }}</h3>
                    <p class="text-[11px] text-white/80">From \${{ d.startingPrice }}</p>
                  </div>
                </div>
              }
            </div>
          </div>
        }

        <!-- ============================================== -->
        <!-- STEP 2: DATES                                  -->
        <!-- ============================================== -->
        @if (currentStep === 2) {
          <div class="space-y-6 max-w-xl mx-auto py-8 w-full">
            <div class="text-center space-y-1">
              <span class="text-[10px] font-bold uppercase tracking-widest text-[#D4A359]">Step 02 of 08</span>
              <h2 class="text-2xl sm:text-3xl font-bold font-display text-[#071F22]">Select Travel Dates</h2>
              <p class="text-xs sm:text-sm text-[#6B7280]">When do you plan to embark on this journey?</p>
            </div>

            <div class="bg-[#F8F7F3] p-6 sm:p-8 rounded-3xl border border-[#EFEDE7] space-y-5">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-[#071F22] mb-2 flex items-center gap-1.5">
                    <app-icon name="calendar" [size]="14" extraClass="text-[#D4A359]"></app-icon>
                    <span>Start / Departure Date</span>
                  </label>
                  <input
                    type="date"
                    [(ngModel)]="startDate"
                    class="w-full px-4 py-3 rounded-xl border border-[#EFEDE7] bg-white text-sm font-semibold text-[#071F22] focus:outline-none focus:border-[#D4A359] focus:ring-2 focus:ring-[#D4A359]/20"
                  />
                </div>

                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-[#071F22] mb-2 flex items-center gap-1.5">
                    <app-icon name="calendar" [size]="14" extraClass="text-[#D4A359]"></app-icon>
                    <span>End / Return Date</span>
                  </label>
                  <input
                    type="date"
                    [(ngModel)]="endDate"
                    class="w-full px-4 py-3 rounded-xl border border-[#EFEDE7] bg-white text-sm font-semibold text-[#071F22] focus:outline-none focus:border-[#D4A359] focus:ring-2 focus:ring-[#D4A359]/20"
                  />
                </div>
              </div>

              <!-- Duration Indicator Banner -->
              <div class="p-4 rounded-2xl bg-white border border-[#EFEDE7] flex items-center justify-between text-xs">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-xl bg-[#D4A359]/15 text-[#B88738] flex items-center justify-center">
                    <app-icon name="clock" [size]="16"></app-icon>
                  </div>
                  <div>
                    <span class="font-bold text-[#071F22]">Estimated Duration</span>
                    <p class="text-[#6B7280]">{{ startDate }} to {{ endDate }}</p>
                  </div>
                </div>
                <span class="px-3 py-1 rounded-full bg-[#0A2D30] text-[#D4A359] font-bold text-xs">
                  {{ getDurationText() }}
                </span>
              </div>
            </div>
          </div>
        }

        <!-- ============================================== -->
        <!-- STEP 3: TRAVELERS                              -->
        <!-- ============================================== -->
        @if (currentStep === 3) {
          <div class="space-y-6 max-w-xl mx-auto py-8 w-full">
            <div class="text-center space-y-1">
              <span class="text-[10px] font-bold uppercase tracking-widest text-[#D4A359]">Step 03 of 08</span>
              <h2 class="text-2xl sm:text-3xl font-bold font-display text-[#071F22]">Number of Travelers</h2>
              <p class="text-xs sm:text-sm text-[#6B7280]">Who will accompany you on this voyage?</p>
            </div>

            <div class="bg-[#F8F7F3] p-6 sm:p-8 rounded-3xl border border-[#EFEDE7] space-y-5">
              <!-- Adults -->
              <div class="flex items-center justify-between p-4 rounded-2xl bg-white border border-[#EFEDE7]">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-[#0A2D30]/10 text-[#0A2D30] flex items-center justify-center">
                    <app-icon name="user" [size]="18"></app-icon>
                  </div>
                  <div>
                    <h4 class="font-bold text-base text-[#071F22]">Adult Travelers</h4>
                    <p class="text-xs text-[#6B7280]">Age 13 and above</p>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <button
                    type="button"
                    (click)="decrementAdults()"
                    class="w-10 h-10 rounded-full bg-[#F8F7F3] border border-[#EFEDE7] flex items-center justify-center font-bold text-[#071F22] hover:bg-[#D4A359] hover:text-[#071F22] transition-colors cursor-pointer"
                  >-</button>
                  <span class="w-8 text-center font-bold text-lg text-[#071F22] font-display">{{ adultsCount }}</span>
                  <button
                    type="button"
                    (click)="incrementAdults()"
                    class="w-10 h-10 rounded-full bg-[#F8F7F3] border border-[#EFEDE7] flex items-center justify-center font-bold text-[#071F22] hover:bg-[#D4A359] hover:text-[#071F22] transition-colors cursor-pointer"
                  >+</button>
                </div>
              </div>

              <!-- Children -->
              <div class="flex items-center justify-between p-4 rounded-2xl bg-white border border-[#EFEDE7]">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-[#0A2D30]/10 text-[#0A2D30] flex items-center justify-center">
                    <app-icon name="users" [size]="18"></app-icon>
                  </div>
                  <div>
                    <h4 class="font-bold text-base text-[#071F22]">Children</h4>
                    <p class="text-xs text-[#6B7280]">Age 2 &ndash; 12 years</p>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <button
                    type="button"
                    (click)="decrementKids()"
                    class="w-10 h-10 rounded-full bg-[#F8F7F3] border border-[#EFEDE7] flex items-center justify-center font-bold text-[#071F22] hover:bg-[#D4A359] hover:text-[#071F22] transition-colors cursor-pointer"
                  >-</button>
                  <span class="w-8 text-center font-bold text-lg text-[#071F22] font-display">{{ kidsCount }}</span>
                  <button
                    type="button"
                    (click)="incrementKids()"
                    class="w-10 h-10 rounded-full bg-[#F8F7F3] border border-[#EFEDE7] flex items-center justify-center font-bold text-[#071F22] hover:bg-[#D4A359] hover:text-[#071F22] transition-colors cursor-pointer"
                  >+</button>
                </div>
              </div>

              <!-- Rooms Required -->
              <div class="flex items-center justify-between p-4 rounded-2xl bg-white border border-[#EFEDE7]">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-[#0A2D30]/10 text-[#0A2D30] flex items-center justify-center">
                    <app-icon name="hotel" [size]="18"></app-icon>
                  </div>
                  <div>
                    <h4 class="font-bold text-base text-[#071F22]">Rooms Required</h4>
                    <p class="text-xs text-[#6B7280]">Private suites or hotel rooms</p>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <button
                    type="button"
                    (click)="decrementRooms()"
                    class="w-10 h-10 rounded-full bg-[#F8F7F3] border border-[#EFEDE7] flex items-center justify-center font-bold text-[#071F22] hover:bg-[#D4A359] hover:text-[#071F22] transition-colors cursor-pointer"
                  >-</button>
                  <span class="w-8 text-center font-bold text-lg text-[#071F22] font-display">{{ roomsCount }}</span>
                  <button
                    type="button"
                    (click)="incrementRooms()"
                    class="w-10 h-10 rounded-full bg-[#F8F7F3] border border-[#EFEDE7] flex items-center justify-center font-bold text-[#071F22] hover:bg-[#D4A359] hover:text-[#071F22] transition-colors cursor-pointer"
                  >+</button>
                </div>
              </div>

              <!-- Summary pill -->
              <div class="text-center pt-2">
                <span class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#0A2D30] text-[#D4A359] text-xs font-bold">
                  <span>Party: {{ adultsCount + kidsCount }} Travelers ({{ adultsCount }} Adults, {{ kidsCount }} Kids) &bull; {{ roomsCount }} {{ roomsCount === 1 ? 'Room' : 'Rooms' }}</span>
                </span>
              </div>
            </div>
          </div>
        }

        <!-- ============================================== -->
        <!-- STEP 4: BUDGET TIERS                           -->
        <!-- ============================================== -->
        @if (currentStep === 4) {
          <div class="space-y-6">
            <div class="text-center space-y-1">
              <span class="text-[10px] font-bold uppercase tracking-widest text-[#D4A359]">Step 04 of 08</span>
              <h2 class="text-2xl sm:text-3xl font-bold font-display text-[#071F22]">Select Budget Scale</h2>
              <p class="text-xs sm:text-sm text-[#6B7280]">Select the comfort and expenditure tier that matches your preference.</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              @for (b of budgetTiers; track b.name) {
                <div
                  (click)="selectedBudget = b.name"
                  class="p-6 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-4 hover:-translate-y-1 duration-300"
                  [ngClass]="selectedBudget === b.name
                    ? 'border-[#D4A359] bg-[#F8F7F3] shadow-xl ring-4 ring-[#D4A359]/20'
                    : 'border-[#EFEDE7] hover:border-[#D4A359]/40 bg-white'"
                >
                  <div class="space-y-2.5">
                    <div class="flex items-center justify-between">
                      <span class="text-xs font-bold uppercase tracking-wider text-[#D4A359]">{{ b.tag }}</span>
                      @if (selectedBudget === b.name) {
                        <span class="w-5 h-5 rounded-full bg-[#D4A359] text-[#071F22] flex items-center justify-center text-xs font-bold">✓</span>
                      }
                    </div>
                    <h3 class="text-2xl font-bold font-display text-[#071F22]">{{ b.name }}</h3>
                    <p class="text-xs text-[#6B7280] leading-relaxed">{{ b.description }}</p>
                  </div>

                  <div class="pt-3 border-t border-[#EFEDE7]">
                    <span class="text-2xl font-bold font-display text-[#071F22]">\${{ b.estAmount | number }}</span>
                    <span class="text-[11px] text-[#6B7280] block mt-0.5">Estimated per traveler</span>
                  </div>
                </div>
              }
            </div>
          </div>
        }

        <!-- ============================================== -->
        <!-- STEP 5: TRAVEL STYLE                           -->
        <!-- ============================================== -->
        @if (currentStep === 5) {
          <div class="space-y-6">
            <div class="text-center space-y-1">
              <span class="text-[10px] font-bold uppercase tracking-widest text-[#D4A359]">Step 05 of 08</span>
              <h2 class="text-2xl sm:text-3xl font-bold font-display text-[#071F22]">Travel Style & Atmosphere</h2>
              <p class="text-xs sm:text-sm text-[#6B7280]">What mood and pacing are you seeking for this journey?</p>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 gap-5">
              @for (style of travelStyles; track style.name) {
                <div
                  (click)="selectedStyle = style.name"
                  class="p-6 rounded-3xl border-2 transition-all cursor-pointer flex items-center gap-4 hover:-translate-y-1 duration-300"
                  [ngClass]="selectedStyle === style.name
                    ? 'border-[#D4A359] bg-[#F8F7F3] shadow-xl ring-4 ring-[#D4A359]/20'
                    : 'border-[#EFEDE7] hover:border-[#D4A359]/40 bg-white'"
                >
                  <div class="w-12 h-12 rounded-2xl bg-[#0A2D30] text-[#D4A359] flex items-center justify-center shrink-0 shadow-sm">
                    <app-icon [name]="style.icon" [size]="22"></app-icon>
                  </div>
                  <div>
                    <h4 class="font-bold text-base text-[#071F22] font-display">{{ style.name }}</h4>
                    <p class="text-xs text-[#6B7280]">{{ style.desc }}</p>
                  </div>
                </div>
              }
            </div>
          </div>
        }

        <!-- ============================================== -->
        <!-- STEP 6: HOTEL                                  -->
        <!-- ============================================== -->
        @if (currentStep === 6) {
          <div class="space-y-6">
            <div class="text-center space-y-1">
              <span class="text-[10px] font-bold uppercase tracking-widest text-[#D4A359]">Step 06 of 08</span>
              <h2 class="text-2xl sm:text-3xl font-bold font-display text-[#071F22]">Select Preferred Stay</h2>
              <p class="text-xs sm:text-sm text-[#6B7280]">Choose accommodations that match your standards of comfort and location.</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
              @for (hotel of hotels(); track hotel.id) {
                <div
                  (click)="selectedHotel = hotel"
                  class="rounded-3xl border-2 overflow-hidden transition-all cursor-pointer flex flex-col justify-between group hover:-translate-y-1 duration-300"
                  [ngClass]="selectedHotel?.id === hotel.id
                    ? 'border-[#D4A359] shadow-xl ring-4 ring-[#D4A359]/20'
                    : 'border-[#EFEDE7] hover:border-[#D4A359]/40 bg-white'"
                >
                  <div class="relative h-44 overflow-hidden">
                    <img [src]="hotel.image" [alt]="hotel.name" class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div class="absolute top-3 right-3 flex items-center gap-1 bg-[#071F22]/80 backdrop-blur-sm px-2.5 py-1 rounded-full text-white text-xs font-bold">
                      <app-icon name="star" [size]="12" extraClass="text-[#D4A359]" [isFilled]="true"></app-icon>
                      <span>{{ hotel.rating }}</span>
                    </div>
                  </div>

                  <div class="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <span class="text-[11px] font-bold text-[#D4A359] uppercase tracking-wider block">
                        {{ hotel.city }}
                      </span>
                      <h4 class="font-bold text-lg text-[#071F22] font-display mt-0.5">{{ hotel.name }}</h4>
                      <p class="text-xs text-[#6B7280] line-clamp-2 mt-1">{{ hotel.description }}</p>
                    </div>

                    <div class="pt-3 border-t border-[#EFEDE7] flex justify-between items-center">
                      <div>
                        <span class="text-base font-bold text-[#071F22] font-display">\${{ hotel.pricePerNight | number }}</span>
                        <span class="text-[11px] text-[#6B7280]"> / night</span>
                      </div>
                      <span class="px-3 py-1.5 rounded-full text-xs font-bold transition-colors"
                        [ngClass]="selectedHotel?.id === hotel.id
                          ? 'bg-[#0A2D30] text-[#D4A359]'
                          : 'bg-[#F8F7F3] text-[#071F22] border border-[#EFEDE7]'">
                        {{ selectedHotel?.id === hotel.id ? 'Selected ✓' : 'Select' }}
                      </span>
                    </div>
                  </div>
                </div>
              }
            </div>

            <!-- Flight Selection Options -->
            <div class="pt-6 border-t border-[#EFEDE7] space-y-3">
              <div>
                <h4 class="text-base font-bold text-[#071F22] font-display flex items-center gap-2">
                  <app-icon name="plane" [size]="18" extraClass="text-[#D4A359]"></app-icon>
                  <span>Flight Booking Preference</span>
                </h4>
                <p class="text-xs text-[#6B7280]">Select your preferred air travel cabin class to incorporate into your itinerary.</p>
              </div>

              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                @for (flight of flightOptions; track flight.name) {
                  <div
                    (click)="selectedFlight = flight.name"
                    class="p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between"
                    [ngClass]="selectedFlight === flight.name
                      ? 'border-[#D4A359] bg-[#F8F7F3] shadow-md ring-2 ring-[#D4A359]/30'
                      : 'border-[#EFEDE7] hover:border-[#D4A359]/40 bg-white'"
                  >
                    <div class="flex items-center justify-between">
                      <span class="text-xs font-bold text-[#071F22]">{{ flight.name }}</span>
                      @if (selectedFlight === flight.name) {
                        <span class="w-4 h-4 rounded-full bg-[#D4A359] text-[#071F22] flex items-center justify-center text-[10px] font-bold">✓</span>
                      }
                    </div>
                    <span class="text-[11px] text-[#6B7280] mt-1">{{ flight.desc }}</span>
                    <span class="text-xs font-bold text-[#D4A359] mt-2 block">{{ flight.price }}</span>
                  </div>
                }
              </div>
            </div>
          </div>
        }

        <!-- ============================================== -->
        <!-- STEP 7: ACTIVITIES                             -->
        <!-- ============================================== -->
        @if (currentStep === 7) {
          <div class="space-y-6">
            <div class="text-center space-y-1">
              <span class="text-[10px] font-bold uppercase tracking-widest text-[#D4A359]">Step 07 of 08</span>
              <h2 class="text-2xl sm:text-3xl font-bold font-display text-[#071F22]">Choose Activities & Experiences</h2>
              <p class="text-xs sm:text-sm text-[#6B7280]">Select the experiences to auto-populate your daily itinerary timeline.</p>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
              @for (act of activityTypes; track act.name) {
                <div
                  (click)="toggleActivity(act.name)"
                  class="p-5 rounded-3xl border-2 transition-all cursor-pointer flex flex-col items-center text-center space-y-2.5 hover:-translate-y-1 duration-300"
                  [ngClass]="selectedActivities.includes(act.name)
                    ? 'border-[#D4A359] bg-[#F8F7F3] shadow-md ring-2 ring-[#D4A359]/30'
                    : 'border-[#EFEDE7] hover:border-[#D4A359]/40 bg-white'"
                >
                  <div class="w-12 h-12 rounded-2xl flex items-center justify-center transition-colors"
                    [ngClass]="selectedActivities.includes(act.name) ? 'bg-[#0A2D30] text-[#D4A359]' : 'bg-[#EFEDE7] text-[#071F22]'">
                    <app-icon [name]="act.icon" [size]="22"></app-icon>
                  </div>
                  <div>
                    <h4 class="font-bold text-sm text-[#071F22] font-display">{{ act.name }}</h4>
                    <span class="text-[11px] font-bold mt-1 block"
                      [ngClass]="selectedActivities.includes(act.name) ? 'text-[#D4A359]' : 'text-[#6B7280]'">
                      {{ selectedActivities.includes(act.name) ? 'Included ✓' : '+ Add' }}
                    </span>
                  </div>
                </div>
              }
            </div>
          </div>
        }

        <!-- ============================================== -->
        <!-- STEP 8: REVIEW & CONFIRM                       -->
        <!-- ============================================== -->
        @if (currentStep === 8) {
          <div class="space-y-8 max-w-3xl mx-auto py-2 w-full animate-step-transition">
            <div class="text-center space-y-1">
              <span class="text-[10px] font-bold uppercase tracking-widest text-[#D4A359]">Step 08 &bull; FINAL BLUEPRINT & VERIFICATION</span>
              <h2 class="text-3xl sm:text-4xl font-bold font-display text-[#071F22]">Review Your Journey</h2>
              <p class="text-xs sm:text-sm text-[#6B7280]">Fine-tune additional preferences, inspect your travel dossier, and confirm your booking.</p>
            </div>

            <!-- 11. ADDITIONAL PREFERENCES (Requirement 4) -->
            <div class="bg-[#F8F7F3] rounded-3xl p-6 sm:p-7 border border-[#EFEDE7] space-y-4 shadow-sm">
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-[10px] font-bold uppercase tracking-widest text-[#D4A359]">Bespoke Touches</span>
                  <h3 class="text-lg sm:text-xl font-bold font-display text-[#071F22]">Additional Preferences</h3>
                  <p class="text-xs text-[#6B7280]">Select special arrangements to customize your travel package.</p>
                </div>
                <span class="text-xs font-bold text-[#D4A359] hidden sm:block">{{ selectedPreferences.length }} Selected</span>
              </div>

              <!-- Interactive Preference Choice Chips -->
              <div class="flex flex-wrap gap-2">
                @for (pref of additionalPreferencesOptions; track pref) {
                  <button
                    type="button"
                    (click)="togglePreference(pref)"
                    class="px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 btn-interaction"
                    [ngClass]="selectedPreferences.includes(pref)
                      ? 'bg-[#0A2D30] text-[#D4A359] border border-[#D4A359]/40 shadow-sm'
                      : 'bg-white text-[#071F22] border border-[#EFEDE7] hover:border-[#D4A359]/40'"
                  >
                    <span>{{ pref }}</span>
                    @if (selectedPreferences.includes(pref)) {
                      <span class="text-[#D4A359] font-bold">✓</span>
                    } @else {
                      <span class="text-[#6B7280] font-bold">+</span>
                    }
                  </button>
                }
              </div>

              <!-- Special Requests Notes -->
              <div class="pt-2">
                <label class="block text-xs font-bold uppercase text-[#6B7280] mb-1.5">Special Requests or Dietary Requirements (Optional)</label>
                <textarea
                  [(ngModel)]="specialRequests"
                  rows="2"
                  placeholder="e.g., Vegetarian or Halal dining, high-floor ocean view, quiet room, late check-in..."
                  class="w-full px-4 py-2.5 rounded-xl bg-white border border-[#EFEDE7] text-xs font-medium focus:outline-none focus:border-[#D4A359] form-field-animated"
                ></textarea>
              </div>
            </div>

            <!-- PROPER TRIP SUMMARY DOSSIER (Requirement 4) -->
            <div class="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#D4A359]/35 space-y-6 shadow-xl relative overflow-hidden">
              <!-- Top Destination Banner -->
              <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-[#EFEDE7]">
                <div class="flex items-center gap-4">
                  <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 shadow-md ring-2 ring-[#D4A359]/40 img-zoom-wrapper">
                    <img [src]="selectedDestination?.image" [alt]="selectedDestination?.name" class="w-full h-full object-cover img-zoom" />
                  </div>
                  <div>
                    <span class="px-2.5 py-0.5 rounded-full bg-[#0A2D30] text-[#D4A359] text-[10px] font-bold uppercase tracking-wider">
                      {{ selectedDestination?.country || 'Global Destination' }}
                    </span>
                    <h3 class="text-2xl sm:text-3xl font-bold font-display text-[#071F22] mt-1">
                      {{ selectedDestination?.name || 'Selected' }} Journey
                    </h3>
                    <p class="text-xs text-[#6B7280] mt-0.5 flex items-center gap-1.5">
                      <app-icon name="calendar" [size]="13" extraClass="text-[#D4A359]"></app-icon>
                      <span>{{ startDate }} &ndash; {{ endDate }}</span>
                      <span>&bull;</span>
                      <strong class="text-[#071F22]">{{ getDurationText() }}</strong>
                    </p>
                  </div>
                </div>

                <div class="text-right sm:self-center shrink-0">
                  <span class="text-[10px] uppercase font-bold text-[#6B7280] tracking-wider block">Estimated Budget</span>
                  <span class="text-2xl sm:text-3xl font-bold font-display text-emerald-700">\${{ getEstimatedTotalBudget() | number }}</span>
                  <span class="text-[11px] text-[#D4A359] font-bold block">{{ selectedBudget }} Tier Scale</span>
                </div>
              </div>

              <!-- 4-Col Grid of All 11 Parameters -->
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3.5 text-xs">
                <div class="p-3.5 rounded-2xl bg-[#F8F7F3] border border-[#EFEDE7]">
                  <span class="text-[#6B7280] block uppercase tracking-wider text-[10px] font-bold">Party & Rooms</span>
                  <span class="font-bold text-[#071F22] text-sm mt-0.5 block">{{ adultsCount }} Adults, {{ kidsCount }} Kids</span>
                  <span class="text-[11px] text-[#6B7280]">{{ roomsCount }} {{ roomsCount === 1 ? 'Private Room' : 'Private Rooms' }}</span>
                </div>

                <div class="p-3.5 rounded-2xl bg-[#F8F7F3] border border-[#EFEDE7]">
                  <span class="text-[#6B7280] block uppercase tracking-wider text-[10px] font-bold">Sanctuary Stay</span>
                  <span class="font-bold text-[#071F22] text-sm mt-0.5 block truncate" [title]="selectedHotel?.name">{{ selectedHotel?.name }}</span>
                  <span class="text-[11px] text-[#D4A359] font-bold">{{ selectedHotel?.rating }}★ Hotel Rating</span>
                </div>

                <div class="p-3.5 rounded-2xl bg-[#F8F7F3] border border-[#EFEDE7]">
                  <span class="text-[#6B7280] block uppercase tracking-wider text-[10px] font-bold">Air Transit</span>
                  <span class="font-bold text-[#071F22] text-sm mt-0.5 block">{{ selectedFlight }}</span>
                  <span class="text-[11px] text-[#6B7280]">Flight Included</span>
                </div>

                <div class="p-3.5 rounded-2xl bg-[#F8F7F3] border border-[#EFEDE7]">
                  <span class="text-[#6B7280] block uppercase tracking-wider text-[10px] font-bold">Travel Style</span>
                  <span class="font-bold text-[#071F22] text-sm mt-0.5 block">{{ selectedStyle }}</span>
                  <span class="text-[11px] text-[#6B7280]">Curated Atmosphere</span>
                </div>
              </div>

              <!-- Included Activities & Additional Preferences -->
              <div class="space-y-3 pt-3 border-t border-[#EFEDE7]">
                <div>
                  <span class="text-[#6B7280] block uppercase tracking-wider text-[10px] mb-1.5 font-bold">Included Activities ({{ selectedActivities.length }}):</span>
                  <div class="flex flex-wrap gap-1.5">
                    @for (act of selectedActivities; track act) {
                      <span class="px-3 py-1 rounded-full bg-[#F8F7F3] border border-[#EFEDE7] text-xs font-semibold text-[#071F22]">
                        {{ act }}
                      </span>
                    }
                  </div>
                </div>

                @if (selectedPreferences.length > 0) {
                  <div>
                    <span class="text-[#6B7280] block uppercase tracking-wider text-[10px] mb-1.5 font-bold">Additional Preferences:</span>
                    <div class="flex flex-wrap gap-1.5">
                      @for (p of selectedPreferences; track p) {
                        <span class="px-3 py-1 rounded-full bg-[#D4A359]/15 text-[#8C6320] text-xs font-bold border border-[#D4A359]/25">
                          ✓ {{ p }}
                        </span>
                      }
                    </div>
                  </div>
                }

                @if (specialRequests) {
                  <p class="text-xs text-[#6B7280] italic bg-[#F8F7F3] p-2.5 rounded-xl border border-[#EFEDE7]">
                    Special Note: "{{ specialRequests }}"
                  </p>
                }
              </div>

              <!-- Status Preview Banner -->
              <div class="p-3.5 rounded-2xl bg-[#ECFDF5] border border-emerald-300 flex items-center justify-between text-xs">
                <div class="flex items-center gap-2 text-emerald-800 font-bold">
                  <app-icon name="check-circle" [size]="16" extraClass="text-emerald-600 shrink-0"></app-icon>
                  <span>Ready for instant confirmation. Click below to confirm and finalize your trip!</span>
                </div>
                <span class="badge-status-pending shrink-0">Pending Confirmation</span>
              </div>
            </div>

            <!-- ACTION BUTTONS: CLEAR "CONFIRM TRIP" BUTTON (Requirement 4) -->
            <div class="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                type="button"
                id="btn-confirm-trip-main"
                (click)="onConfirmTripClick()"
                class="px-10 py-4 rounded-full bg-[#0A2D30] hover:bg-[#D4A359] hover:text-[#071F22] text-white font-bold text-base flex items-center gap-3 shadow-2xl transition-all active:scale-95 cursor-pointer btn-interaction ring-4 ring-[#D4A359]/40 animate-pulse-glow"
              >
                <app-icon name="check-circle" [size]="20" extraClass="text-[#D4A359]"></app-icon>
                <span>Confirm Trip</span>
                <app-icon name="arrow-right" [size]="18"></app-icon>
              </button>

              <button
                type="button"
                (click)="saveTripDraft()"
                class="px-6 py-4 rounded-full border-2 border-[#D4A359] hover:bg-[#D4A359]/20 text-[#071F22] font-bold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95 btn-interaction"
              >
                <app-icon name="bookmark" [size]="16" extraClass="text-[#B88738]"></app-icon>
                <span>Save as Draft</span>
              </button>

              <button
                type="button"
                (click)="resetForm()"
                class="px-5 py-4 rounded-full border border-slate-200 hover:bg-slate-100 text-[#6B7280] hover:text-rose-600 font-bold text-sm transition-all cursor-pointer"
              >
                Clear Form
              </button>
            </div>
          </div>
        }

        <!-- BOTTOM NAVIGATION CONTROLS -->
        <div class="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-[#EFEDE7] mt-8">
          <div class="flex items-center gap-2">
            <button
              type="button"
              (click)="prevStep()"
              [disabled]="currentStep === 1"
              class="px-5 py-2.5 rounded-full border border-[#EFEDE7] text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 btn-interaction"
              [ngClass]="currentStep === 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-[#EFEDE7] text-[#071F22]'"
            >
              <app-icon name="arrow-left" [size]="14"></app-icon>
              <span>Previous</span>
            </button>

            <button
              type="button"
              (click)="resetForm()"
              class="px-4 py-2.5 rounded-full border border-rose-200 bg-rose-50/50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-all cursor-pointer"
            >
              Reset
            </button>
          </div>

          <span class="text-xs font-bold text-[#6B7280]">
            Step {{ currentStep }} of 8
          </span>

          <div class="flex items-center gap-2">
            <button
              type="button"
              (click)="saveTripDraft()"
              class="px-5 py-2.5 rounded-full border border-[#D4A359] text-[#071F22] hover:bg-[#D4A359]/20 text-xs font-bold transition-all cursor-pointer shadow-sm btn-interaction"
            >
              Save as Draft
            </button>

            @if (currentStep < 8) {
              <button
                type="button"
                (click)="nextStep()"
                class="px-7 py-2.5 rounded-full bg-[#0A2D30] hover:bg-[#D4A359] hover:text-[#071F22] text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm active:scale-95 btn-interaction"
              >
                <span>Next Step</span>
                <app-icon name="arrow-right" [size]="14"></app-icon>
              </button>
            } @else {
              <!-- Step 8: CLEAR CONFIRM TRIP BUTTON -->
              <button
                type="button"
                id="btn-confirm-trip-bottom"
                (click)="onConfirmTripClick()"
                class="px-8 py-2.5 rounded-full bg-[#0A2D30] hover:bg-[#D4A359] hover:text-[#071F22] text-white text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 shadow-lg active:scale-95 btn-interaction ring-2 ring-[#D4A359]/40"
              >
                <app-icon name="check-circle" [size]="16" extraClass="text-[#D4A359]"></app-icon>
                <span>Confirm Trip</span>
                <app-icon name="arrow-right" [size]="14"></app-icon>
              </button>
            }
          </div>
        </div>

      </div>

    </div>

    <!-- TRIP CONFIRMATION SUCCESS MODAL (Requirement 4 & 9) -->
    @if (isConfirmationModalOpen && confirmedTrip) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0B1320]/75 backdrop-blur-md animate-modal-backdrop">
        <div class="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#EFEDE7] overflow-hidden animate-confirm-pop p-6 sm:p-8 space-y-6 text-[#17202A]">
          
          <!-- Top Celebration Icon Badge with Smooth Animated Stroke -->
          <div class="flex flex-col items-center text-center space-y-3">
            <div class="relative">
              <div class="w-20 h-20 rounded-full bg-emerald-500/15 border-2 border-emerald-500 flex items-center justify-center text-emerald-600 animate-pulse-glow">
                <svg class="w-10 h-10 animate-checkmark-draw" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </div>

            <div class="space-y-1">
              <span class="badge-status-confirmed">Trip Confirmed Successfully</span>
              <h2 class="text-2xl sm:text-3xl font-bold font-display text-[#071F22]">
                Your Journey is Officially Confirmed!
              </h2>
              <p class="text-xs sm:text-sm text-[#6B7280]">
                All reservations and customized itinerary blueprints have been saved to your workspace.
              </p>
            </div>

            <!-- Unique Trip ID Badge with Copy Option (Requirement 4) -->
            <div class="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#F8F7F3] border border-[#EFEDE7] mt-1">
              <span class="text-xs text-[#6B7280] font-bold uppercase tracking-wider">Trip ID:</span>
              <span class="text-sm font-mono font-extrabold text-[#071F22] tracking-wider">{{ confirmedTrip.id }}</span>
              <button
                type="button"
                (click)="copyTripId(confirmedTrip.id)"
                class="ml-1 text-[#D4A359] hover:text-[#0A2D30] text-xs font-bold transition-colors cursor-pointer"
                title="Copy Trip ID"
              >
                {{ copiedTripId ? 'Copied ✓' : 'Copy' }}
              </button>
            </div>
          </div>

          <!-- Trip Overview Card -->
          <div class="bg-[#F8F7F3] rounded-2xl p-4 sm:p-5 border border-[#EFEDE7] space-y-3 text-xs">
            <div class="flex items-center justify-between">
              <span class="font-bold text-[#071F22] text-sm font-display">{{ confirmedTrip.name }}</span>
              <span class="px-2.5 py-0.5 rounded-full bg-[#0A2D30] text-[#D4A359] text-[10px] font-bold uppercase">
                {{ confirmedTrip.duration }}
              </span>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-[#6B7280] pt-2 border-t border-[#EFEDE7]">
              <div>
                <span class="block text-[10px] uppercase font-bold text-[#6B7280]">Destination</span>
                <span class="font-bold text-[#071F22]">{{ confirmedTrip.destination }}, {{ confirmedTrip.country }}</span>
              </div>
              <div>
                <span class="block text-[10px] uppercase font-bold text-[#6B7280]">Dates</span>
                <span class="font-bold text-[#071F22]">{{ confirmedTrip.startDate }}</span>
              </div>
              <div>
                <span class="block text-[10px] uppercase font-bold text-[#6B7280]">Party</span>
                <span class="font-bold text-[#071F22]">{{ confirmedTrip.travelers.adults }} Adults • {{ confirmedTrip.rooms }} {{ confirmedTrip.rooms === 1 ? 'Room' : 'Rooms' }}</span>
              </div>
              <div>
                <span class="block text-[10px] uppercase font-bold text-[#6B7280]">Hotel Stay</span>
                <span class="font-bold text-[#071F22] truncate block">{{ confirmedTrip.hotelName }}</span>
              </div>
              <div>
                <span class="block text-[10px] uppercase font-bold text-[#6B7280]">Air Transit</span>
                <span class="font-bold text-[#071F22]">{{ confirmedTrip.flight }}</span>
              </div>
              <div>
                <span class="block text-[10px] uppercase font-bold text-[#6B7280]">Committed Budget</span>
                <span class="font-bold text-emerald-700">\${{ confirmedTrip.budget | number }}</span>
              </div>
            </div>
          </div>

          <!-- 4 WORKING NAVIGATION OPTIONS (Requirement 9) -->
          <div class="space-y-2 pt-2">
            <span class="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] block text-center">Where would you like to go next?</span>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <!-- 1. View My Trip -->
              <a
                [routerLink]="['/my-trips', confirmedTrip.id]"
                (click)="isConfirmationModalOpen = false"
                class="px-4 py-3 rounded-2xl bg-[#0A2D30] hover:bg-[#D4A359] hover:text-[#071F22] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer btn-interaction"
              >
                <app-icon name="map" [size]="15"></app-icon>
                <span>View My Trip</span>
              </a>

              <!-- 2. View Itinerary -->
              <a
                routerLink="/itinerary"
                [queryParams]="{ tripId: confirmedTrip.id }"
                (click)="isConfirmationModalOpen = false"
                class="px-4 py-3 rounded-2xl bg-[#D4A359] hover:bg-[#c2924a] text-[#071F22] text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer btn-interaction"
              >
                <app-icon name="calendar" [size]="15"></app-icon>
                <span>View Itinerary</span>
              </a>

              <!-- 3. Go to Dashboard -->
              <a
                routerLink="/dashboard"
                (click)="isConfirmationModalOpen = false"
                class="px-4 py-3 rounded-2xl bg-[#F8F7F3] hover:bg-[#EFEDE7] text-[#071F22] border border-[#EFEDE7] text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
              >
                <app-icon name="activity" [size]="15"></app-icon>
                <span>Go to Dashboard</span>
              </a>

              <!-- 4. Continue Exploring -->
              <a
                routerLink="/packages"
                (click)="isConfirmationModalOpen = false"
                class="px-4 py-3 rounded-2xl bg-[#F8F7F3] hover:bg-[#EFEDE7] text-[#071F22] border border-[#EFEDE7] text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
              >
                <app-icon name="compass" [size]="15"></app-icon>
                <span>Continue Exploring</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    }
  `
})
export class CreateTripComponent implements OnInit {
  private tripService = inject(TripService);
  private authService = inject(AuthService);
  private destService = inject(DestinationService);
  private hotelService = inject(HotelService);
  private toastService = inject(ToastService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  currentStep = 1;
  maxVisitedStep = 1;

  steps: StepInfo[] = [
    { num: 1, labelNum: '01', name: 'Destination' },
    { num: 2, labelNum: '02', name: 'Dates' },
    { num: 3, labelNum: '03', name: 'Travelers' },
    { num: 4, labelNum: '04', name: 'Budget' },
    { num: 5, labelNum: '05', name: 'Travel Style' },
    { num: 6, labelNum: '06', name: 'Hotel & Flight' },
    { num: 7, labelNum: '07', name: 'Activities' },
    { num: 8, labelNum: '08', name: 'Review' }
  ];

  destinations = this.destService.destinations;
  hotels = this.hotelService.hotels;

  selectedDestination: Destination | null = null;
  startDate = '2026-10-05';
  endDate = '2026-10-08';
  adultsCount = 2;
  kidsCount = 0;
  roomsCount = 1;

  budgetTiers = [
    { name: 'Budget', tag: 'Essential', description: 'Smart economical hostels, trains, and authentic street eats.', estAmount: 450 },
    { name: 'Comfort', tag: 'Balanced', description: 'Boutique 3-star retreats, private transfers, and signature tours.', estAmount: 850 },
    { name: 'Premium', tag: 'Elevated', description: '4-star beachfront sanctuaries, fine dining, and guided activities.', estAmount: 1600 },
    { name: 'Luxury', tag: 'First-Class', description: '5-star ultra-luxury villas, private yachts, and butler service.', estAmount: 3200 }
  ];
  selectedBudget = 'Comfort';

  travelStyles = [
    { name: 'Relaxing', icon: 'coffee', desc: 'Slow beach mornings & spas' },
    { name: 'Adventure', icon: 'compass', desc: 'Treks, rapids & off-road' },
    { name: 'Culture', icon: 'map', desc: 'Temples, palaces & heritage' },
    { name: 'Nature', icon: 'sun', desc: 'Rainforests & wildlife safari' },
    { name: 'Luxury', icon: 'sparkles', desc: 'Private charters & fine dining' },
    { name: 'Food', icon: 'heart', desc: 'Street food & vineyard tours' }
  ];
  selectedStyle = 'Relaxing';

  selectedHotel: Hotel | null = null;

  flightOptions = [
    { name: 'Self-Arranged', desc: 'No flights needed', price: '$0' },
    { name: 'Economy', desc: 'Standard seating', price: '+$350/pp' },
    { name: 'Premium Economy', desc: 'Extra legroom & priority', price: '+$680/pp' },
    { name: 'Business Class', desc: 'Lie-flat & lounge', price: '+$1,450/pp' }
  ];
  selectedFlight = 'Economy';

  activityTypes = [
    { name: 'Beach', icon: 'sun' },
    { name: 'Sightseeing', icon: 'map-pin' },
    { name: 'Shopping', icon: 'shopping-bag' },
    { name: 'Adventure', icon: 'compass' },
    { name: 'Food', icon: 'coffee' },
    { name: 'Nightlife', icon: 'sparkles' },
    { name: 'Culture', icon: 'map' }
  ];
  selectedActivities: string[] = ['Beach', 'Sightseeing', 'Food'];

  ngOnInit() {
    if (this.destinations().length > 0) {
      this.selectedDestination = this.destinations()[0]; // Default Bali or Goa
    }
    if (this.hotels().length > 0) {
      this.selectedHotel = this.hotels()[0];
    }

    this.route.queryParams.subscribe(params => {
      if (params['destination']) {
        const found = this.destinations().find(
          d => d.name.toLowerCase() === params['destination'].toLowerCase()
        );
        if (found) this.selectedDestination = found;
      }
      if (params['startDate']) {
        this.startDate = params['startDate'];
      }
      if (params['endDate']) {
        this.endDate = params['endDate'];
      }
      if (params['adults']) {
        const val = parseInt(params['adults'], 10);
        if (!isNaN(val) && val > 0) this.adultsCount = val;
      }
      if (params['step']) {
        const stepNum = parseInt(params['step'], 10);
        if (!isNaN(stepNum) && stepNum >= 1 && stepNum <= 8) {
          this.currentStep = stepNum;
          this.maxVisitedStep = Math.max(this.maxVisitedStep, stepNum);
        }
      }
    });
  }

  pickDestination(d: Destination) {
    this.selectedDestination = d;
  }

  toggleActivity(name: string) {
    if (this.selectedActivities.includes(name)) {
      this.selectedActivities = this.selectedActivities.filter(a => a !== name);
    } else {
      this.selectedActivities.push(name);
    }
  }

  incrementAdults() { this.adultsCount++; }
  decrementAdults() { if (this.adultsCount > 1) this.adultsCount--; }
  incrementKids() { this.kidsCount++; }
  decrementKids() { if (this.kidsCount > 0) this.kidsCount--; }
  incrementRooms() { this.roomsCount++; }
  decrementRooms() { if (this.roomsCount > 1) this.roomsCount--; }

  getDurationText(): string {
    if (!this.startDate || !this.endDate) return '03 Nights • 04 Days';
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)));
    const nights = Math.max(0, diffDays);
    const days = nights + 1;
    return `${nights < 10 ? '0' + nights : nights} Nights • ${days < 10 ? '0' + days : days} Days`;
  }

  resetForm() {
    this.currentStep = 1;
    this.maxVisitedStep = 1;
    if (this.destinations().length > 0) {
      this.selectedDestination = this.destinations()[0];
    }
    this.startDate = '2026-10-05';
    this.endDate = '2026-10-08';
    this.adultsCount = 2;
    this.kidsCount = 0;
    this.roomsCount = 1;
    this.selectedBudget = 'Comfort';
    this.selectedStyle = 'Relaxing';
    this.selectedFlight = 'Economy';
    if (this.hotels().length > 0) {
      this.selectedHotel = this.hotels()[0];
    }
    this.selectedActivities = ['Beach', 'Sightseeing', 'Food'];
    this.toastService.show('Form reset to default settings', 'info');
  }

  nextStep() {
    if (this.currentStep < 8) {
      this.currentStep++;
      if (this.currentStep > this.maxVisitedStep) {
        this.maxVisitedStep = this.currentStep;
      }
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  goToStep(step: number) {
    if (step <= this.maxVisitedStep) {
      this.currentStep = step;
    }
  }

  additionalPreferencesOptions: string[] = [
    'Airport VIP Chauffeur',
    'Vegetarian / Halal Cuisine',
    'Honeymoon / Anniversary Setup',
    'Ocean View Suite',
    'Private English Guide',
    'Child-Friendly Amenities',
    'Late Checkout Guaranteed',
    'Spa & Wellness Credits'
  ];
  selectedPreferences: string[] = ['Airport VIP Chauffeur', 'Ocean View Suite'];
  specialRequests = '';

  isConfirmationModalOpen = false;
  confirmedTrip: Trip | null = null;
  copiedTripId = false;

  togglePreference(pref: string): void {
    if (this.selectedPreferences.includes(pref)) {
      this.selectedPreferences = this.selectedPreferences.filter(p => p !== pref);
    } else {
      this.selectedPreferences.push(pref);
    }
  }

  copyTripId(id: string): void {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(id);
      this.copiedTripId = true;
      this.toastService.show('Trip ID copied to clipboard: ' + id, 'info');
      setTimeout(() => { this.copiedTripId = false; }, 2500);
    }
  }

  getEstimatedTotalBudget(): number {
    const budgetObj = this.budgetTiers.find(b => b.name === this.selectedBudget);
    const basePerPerson = budgetObj ? budgetObj.estAmount : 850;
    let flightAddition = 0;
    if (this.selectedFlight === 'Economy') flightAddition = 350;
    if (this.selectedFlight === 'Premium Economy') flightAddition = 680;
    if (this.selectedFlight === 'Business Class') flightAddition = 1450;

    return (basePerPerson + flightAddition) * (this.adultsCount + (this.kidsCount * 0.6));
  }

  onConfirmTripClick(): void {
    // 1. Validation of all required fields (Requirement 4)
    if (!this.selectedDestination) {
      this.toastService.show('Please select a destination in Step 1', 'error');
      this.goToStep(1);
      return;
    }

    if (!this.startDate || !this.endDate) {
      this.toastService.show('Please choose valid travel dates in Step 2', 'error');
      this.goToStep(2);
      return;
    }

    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end < start) {
      this.toastService.show('Return date cannot be before departure date', 'error');
      this.goToStep(2);
      return;
    }

    if (this.adultsCount < 1) {
      this.toastService.show('At least 1 adult traveler is required', 'error');
      this.goToStep(3);
      return;
    }

    if (this.roomsCount < 1) {
      this.toastService.show('At least 1 room is required', 'error');
      this.goToStep(3);
      return;
    }

    if (!this.selectedHotel) {
      this.toastService.show('Please select an accommodation in Step 6', 'error');
      this.goToStep(6);
      return;
    }

    // 2. Generate unique Trip ID and confirm trip into LocalStorage
    const dest = this.selectedDestination.name;
    const country = this.selectedDestination.country;
    const user = this.authService.currentUser();
    const estBudget = Math.round(this.getEstimatedTotalBudget());

    const confirmed = this.tripService.confirmTrip({
      name: `${dest} Expedition`,
      destination: dest,
      country,
      startDate: this.startDate,
      endDate: this.endDate,
      duration: this.getDurationText(),
      travelers: {
        adults: this.adultsCount,
        children: this.kidsCount,
        total: this.adultsCount + this.kidsCount
      },
      rooms: this.roomsCount,
      budget: estBudget,
      spent: 0,
      coverImage: this.selectedDestination.image || 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
      preferences: [this.selectedStyle, ...this.selectedPreferences],
      destinationsList: [dest],
      notes: `Confirmed via TripSphere Plan My Trip Architect. Hotel: ${this.selectedHotel?.name || 'Sanctuary Resort'}, Flight: ${this.selectedFlight}, Rooms: ${this.roomsCount}.${this.specialRequests ? ' Special requests: ' + this.specialRequests : ''}`,
      userId: user?.id || 'usr-1',
      userName: user?.fullName || 'Traveler',
      travelStyle: this.selectedStyle,
      hotelName: this.selectedHotel?.name,
      flight: this.selectedFlight,
      activities: this.selectedActivities,
      additionalPreferences: this.selectedPreferences.join(', ') + (this.specialRequests ? ` (${this.specialRequests})` : ''),
      status: 'Confirmed'
    });

    this.confirmedTrip = confirmed;
    this.isConfirmationModalOpen = true;
    this.toastService.show('Trip Confirmed Successfully! Reference: ' + confirmed.id, 'success');
  }

  saveTripDraft() {
    const dest = this.selectedDestination?.name || 'Destination';
    const country = this.selectedDestination?.country || 'Wonderland';
    const user = this.authService.currentUser();
    const estBudget = Math.round(this.getEstimatedTotalBudget());

    this.tripService.createTrip({
      name: `${dest} Draft Plan`,
      destination: dest,
      country,
      startDate: this.startDate,
      endDate: this.endDate,
      duration: this.getDurationText(),
      travelers: {
        adults: this.adultsCount,
        children: this.kidsCount,
        total: this.adultsCount + this.kidsCount
      },
      rooms: this.roomsCount,
      status: 'Draft',
      budget: estBudget,
      spent: 0,
      coverImage: this.selectedDestination?.image || 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
      preferences: [this.selectedStyle, ...this.selectedPreferences],
      destinationsList: [dest],
      notes: `Draft saved from Step ${this.currentStep}. Flight: ${this.selectedFlight}, Rooms: ${this.roomsCount}.`,
      userId: user?.id || 'usr-1',
      userName: user?.fullName || 'Traveler',
      travelStyle: this.selectedStyle,
      hotelName: this.selectedHotel?.name,
      flight: this.selectedFlight,
      activities: this.selectedActivities,
      additionalPreferences: this.selectedPreferences.join(', '),
      progress: 35
    });

    this.toastService.show('Trip saved as draft to My Trips!', 'success');
    this.router.navigate(['/my-trips']);
  }

  createMyTrip() {
    this.onConfirmTripClick();
  }
}
