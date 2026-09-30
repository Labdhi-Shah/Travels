import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LucideIconComponent } from '../../../shared/icon/lucide-icon.component';
import { TripService } from '../../../core/services/trip.service';
import { AuthService } from '../../../core/services/auth.service';
import { DestinationService } from '../../../core/services/destination.service';
import { HotelService } from '../../../core/services/hotel.service';
import { Destination } from '../../../models/destination.model';
import { Hotel } from '../../../models/hotel.model';

interface StepInfo {
  num: number;
  labelNum: string;
  name: string;
}

@Component({
  selector: 'app-create-trip',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LucideIconComponent],
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
                  03 Nights &bull; 04 Days
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

              <!-- Summary pill -->
              <div class="text-center pt-2">
                <span class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#0A2D30] text-[#D4A359] text-xs font-bold">
                  <span>Party: {{ adultsCount + kidsCount }} Travelers ({{ adultsCount }} Adults, {{ kidsCount }} Kids)</span>
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
        <!-- STEP 8: REVIEW & SAVE                          -->
        <!-- ============================================== -->
        @if (currentStep === 8) {
          <div class="space-y-8 max-w-2xl mx-auto py-4 w-full">
            <div class="text-center space-y-1">
              <span class="text-[10px] font-bold uppercase tracking-widest text-[#D4A359]">Step 08 &bull; FINAL BLUEPRINT</span>
              <h2 class="text-3xl sm:text-4xl font-bold font-display text-[#071F22]">Review Your Journey</h2>
              <p class="text-xs sm:text-sm text-[#6B7280]">Review your specifications before saving to your workspace.</p>
            </div>

            <!-- DOSSIER CARD -->
            <div class="bg-[#F8F7F3] rounded-3xl p-6 sm:p-8 border border-[#EFEDE7] space-y-6 shadow-sm">
              <div class="flex items-center gap-4">
                <img [src]="selectedDestination?.image" [alt]="selectedDestination?.name" class="w-24 h-24 rounded-2xl object-cover shrink-0 shadow-md ring-2 ring-[#D4A359]/30" />
                <div>
                  <span class="text-[10px] font-bold uppercase tracking-widest text-[#D4A359]">{{ selectedDestination?.country }}</span>
                  <h3 class="text-2xl font-bold font-display text-[#071F22]">{{ selectedDestination?.name }} Escape</h3>
                  <p class="text-xs text-[#6B7280] mt-0.5">{{ startDate }} &ndash; {{ endDate }} &bull; 04 Days</p>
                </div>
              </div>

              <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#EFEDE7] text-xs">
                <div>
                  <span class="text-[#6B7280] block uppercase tracking-wider text-[10px]">Travelers</span>
                  <span class="font-bold text-[#071F22] text-sm">{{ adultsCount }} Adults, {{ kidsCount }} Kids</span>
                </div>
                <div>
                  <span class="text-[#6B7280] block uppercase tracking-wider text-[10px]">Budget Tier</span>
                  <span class="font-bold text-[#071F22] text-sm">{{ selectedBudget }}</span>
                </div>
                <div>
                  <span class="text-[#6B7280] block uppercase tracking-wider text-[10px]">Travel Style</span>
                  <span class="font-bold text-[#071F22] text-sm">{{ selectedStyle }}</span>
                </div>
                <div>
                  <span class="text-[#6B7280] block uppercase tracking-wider text-[10px]">Sanctuary Stay</span>
                  <span class="font-bold text-[#071F22] text-sm truncate block">{{ selectedHotel?.name }}</span>
                </div>
              </div>

              <div class="pt-4 border-t border-[#EFEDE7]">
                <span class="text-[#6B7280] block uppercase tracking-wider text-[10px] mb-2 font-bold">Planned Experiences:</span>
                <div class="flex flex-wrap gap-2">
                  @for (act of selectedActivities; track act) {
                    <span class="px-3 py-1 rounded-full bg-white border border-[#EFEDE7] text-xs font-semibold text-[#071F22]">
                      {{ act }}
                    </span>
                  }
                </div>
              </div>
            </div>

            <!-- Create My Trip CTA -->
            <div class="flex justify-center pt-2">
              <button
                type="button"
                (click)="createMyTrip()"
                class="px-10 py-4 rounded-full bg-[#0A2D30] hover:bg-[#D4A359] hover:text-[#071F22] text-white font-bold text-base flex items-center gap-3 shadow-xl hover:shadow-2xl transition-all active:scale-95 cursor-pointer"
              >
                <span>Create My Trip</span>
                <app-icon name="arrow-right" [size]="18"></app-icon>
              </button>
            </div>
          </div>
        }

        <!-- BOTTOM NAVIGATION CONTROLS -->
        <div class="flex items-center justify-between pt-6 border-t border-[#EFEDE7] mt-8">
          <button
            type="button"
            (click)="prevStep()"
            [disabled]="currentStep === 1"
            class="px-5 py-2.5 rounded-full border border-[#EFEDE7] text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
            [ngClass]="currentStep === 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-[#EFEDE7] text-[#071F22]'"
          >
            <app-icon name="arrow-left" [size]="14"></app-icon>
            <span>Previous</span>
          </button>

          <span class="text-xs font-bold text-[#6B7280]">
            Step {{ currentStep }} of 8
          </span>

          @if (currentStep < 8) {
            <button
              type="button"
              (click)="nextStep()"
              class="px-7 py-2.5 rounded-full bg-[#0A2D30] hover:bg-[#D4A359] hover:text-[#071F22] text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <span>Next Step</span>
              <app-icon name="arrow-right" [size]="14"></app-icon>
            </button>
          }
        </div>

      </div>

    </div>
  `
})
export class CreateTripComponent implements OnInit {
  private tripService = inject(TripService);
  private authService = inject(AuthService);
  private destService = inject(DestinationService);
  private hotelService = inject(HotelService);
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
    { num: 6, labelNum: '06', name: 'Hotel' },
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

  createMyTrip() {
    const dest = this.selectedDestination?.name || 'Goa';
    const country = this.selectedDestination?.country || 'India';
    const user = this.authService.currentUser();
    const budgetObj = this.budgetTiers.find(b => b.name === this.selectedBudget);
    const estBudget = budgetObj ? budgetObj.estAmount : 850;

    const newTrip = this.tripService.createTrip({
      name: `${dest} Escape`,
      destination: dest,
      country,
      startDate: this.startDate,
      endDate: this.endDate,
      travelers: {
        adults: this.adultsCount,
        children: this.kidsCount
      },
      status: 'Planned',
      budget: estBudget,
      spent: 0,
      coverImage: this.selectedDestination?.image || 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
      preferences: [this.selectedStyle],
      destinationsList: [dest],
      notes: `Planned via TripSphere 8-Step Architect. ${this.selectedBudget} tier with ${this.selectedHotel?.name || 'Luxury Stay'}.`,
      userId: user?.id || 'usr-1',
      userName: user?.fullName || 'Labdhi',
      travelStyle: this.selectedStyle,
      hotelName: this.selectedHotel?.name,
      activities: this.selectedActivities,
      progress: 65,
      duration: '03 Days'
    });

    // Navigate to user panel My Trips
    this.router.navigate(['/my-trips']);
  }
}
