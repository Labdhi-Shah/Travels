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
      
      <!-- TOP HEADER -->
      <div class="text-center space-y-2">
        <span class="text-xs font-bold uppercase tracking-widest text-[#0084FF]">
          JOURNEY ARCHITECT
        </span>
        <h1 class="text-3xl sm:text-5xl font-bold font-display text-[#071328]">
          Plan My Trip
        </h1>
        <p class="text-xs sm:text-sm text-[#6B7280] max-w-lg mx-auto font-light">
          Build your perfect journey step-by-step. All data is saved directly to your workspace.
        </p>
      </div>

      <!-- 8-STEP HORIZONTAL PROGRESS SYSTEM -->
      <div class="bg-white p-3 sm:p-5 rounded-3xl border border-slate-200 shadow-sm">
        <div class="flex items-center justify-between overflow-x-auto no-scrollbar pb-1">
          @for (s of steps; track s.num) {
            <div class="flex items-center gap-1 sm:gap-2 shrink-0">
              <button
                type="button"
                (click)="goToStep(s.num)"
                [disabled]="s.num > maxVisitedStep"
                class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer text-xs font-bold"
                [ngClass]="{
                  'bg-[#0084FF] text-white shadow-sm ring-2 ring-blue-500/40': currentStep === s.num,
                  'bg-slate-100 text-[#071328] hover:bg-slate-200': currentStep !== s.num && s.num <= maxVisitedStep,
                  'opacity-40 cursor-not-allowed text-[#6B7280]': s.num > maxVisitedStep
                }"
              >
                <span>{{ s.labelNum }}</span>
                <span class="hidden md:inline">{{ s.name }}</span>
              </button>

              @if (s.num < 8) {
                <div class="w-3 sm:w-5 h-[2px] bg-slate-200"></div>
              }
            </div>
          }
        </div>
      </div>

      <!-- STEP CONTENT CONTAINER -->
      <div class="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 min-h-[480px] flex flex-col justify-between">
        
        <!-- ============================================== -->
        <!-- STEP 1: DESTINATION                            -->
        <!-- ============================================== -->
        @if (currentStep === 1) {
          <div class="space-y-6">
            <div>
              <h2 class="text-2xl font-bold font-display text-[#071328]">01 &bull; Choose Your Destination</h2>
              <p class="text-sm text-[#6B7280]">Select a featured wonder or search custom destination.</p>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
              @for (d of destinations(); track d.id) {
                <div
                  (click)="pickDestination(d)"
                  class="group relative h-40 sm:h-48 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all p-4 flex flex-col justify-end text-white"
                  [ngClass]="selectedDestination?.id === d.id ? 'border-[#0084FF] shadow-lg ring-2 ring-blue-500/30' : 'border-transparent hover:border-slate-300'"
                >
                  <img [src]="d.image" [alt]="d.name" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div class="absolute inset-0 bg-gradient-to-t from-[#071328] via-[#071328]/40 to-transparent"></div>
                  <div class="relative z-10">
                    <span class="text-[10px] uppercase font-bold text-[#38BDF8]">{{ d.country }}</span>
                    <h3 class="text-lg font-bold font-display leading-tight">{{ d.name }}</h3>
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
          <div class="space-y-6 max-w-xl mx-auto py-8">
            <div class="text-center space-y-1">
              <h2 class="text-2xl font-bold font-display text-[#071328]">02 &bull; Select Travel Dates</h2>
              <p class="text-sm text-[#6B7280]">When do you plan to take flight?</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  [(ngModel)]="startDate"
                  class="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#0084FF]"
                />
              </div>

              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  [(ngModel)]="endDate"
                  class="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#0084FF]"
                />
              </div>
            </div>
          </div>
        }

        <!-- ============================================== -->
        <!-- STEP 3: TRAVELERS                              -->
        <!-- ============================================== -->
        @if (currentStep === 3) {
          <div class="space-y-6 max-w-lg mx-auto py-8">
            <div class="text-center space-y-1">
              <h2 class="text-2xl font-bold font-display text-[#071328]">03 &bull; Number of Travelers</h2>
              <p class="text-sm text-[#6B7280]">Who will be accompanying you on this journey?</p>
            </div>

            <div class="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <!-- Adults -->
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="font-bold text-sm text-[#071328]">Adults</h4>
                  <p class="text-xs text-[#6B7280]">Age 13 or above</p>
                </div>
                <div class="flex items-center gap-3">
                  <button
                    type="button"
                    (click)="decrementAdults()"
                    class="w-9 h-9 rounded-full bg-white border border-slate-300 flex items-center justify-center font-bold text-[#071328] hover:bg-slate-100 cursor-pointer"
                  >-</button>
                  <span class="w-6 text-center font-bold text-base">{{ adultsCount }}</span>
                  <button
                    type="button"
                    (click)="incrementAdults()"
                    class="w-9 h-9 rounded-full bg-white border border-slate-300 flex items-center justify-center font-bold text-[#071328] hover:bg-slate-100 cursor-pointer"
                  >+</button>
                </div>
              </div>

              <!-- Children -->
              <div class="flex items-center justify-between pt-4 border-t border-slate-200">
                <div>
                  <h4 class="font-bold text-sm text-[#071328]">Children</h4>
                  <p class="text-xs text-[#6B7280]">Age 2 – 12</p>
                </div>
                <div class="flex items-center gap-3">
                  <button
                    type="button"
                    (click)="decrementKids()"
                    class="w-9 h-9 rounded-full bg-white border border-slate-300 flex items-center justify-center font-bold text-[#071328] hover:bg-slate-100 cursor-pointer"
                  >-</button>
                  <span class="w-6 text-center font-bold text-base">{{ kidsCount }}</span>
                  <button
                    type="button"
                    (click)="incrementKids()"
                    class="w-9 h-9 rounded-full bg-white border border-slate-300 flex items-center justify-center font-bold text-[#071328] hover:bg-slate-100 cursor-pointer"
                  >+</button>
                </div>
              </div>
            </div>
          </div>
        }

        <!-- ============================================== -->
        <!-- STEP 4: BUDGET (Budget, Comfort, Premium, Luxury) -->
        <!-- ============================================== -->
        @if (currentStep === 4) {
          <div class="space-y-6">
            <div class="text-center space-y-1">
              <h2 class="text-2xl font-bold font-display text-[#071328]">04 &bull; Trip Budget Tier</h2>
              <p class="text-sm text-[#6B7280]">Select the comfort and expenditure scale that suits you.</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              @for (b of budgetTiers; track b.name) {
                <div
                  (click)="selectedBudget = b.name"
                  class="p-6 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-4"
                  [ngClass]="selectedBudget === b.name ? 'border-[#0084FF] bg-blue-50/40 shadow-md ring-2 ring-blue-500/20' : 'border-slate-200 hover:border-slate-300 bg-white'"
                >
                  <div class="space-y-2">
                    <span class="text-xs font-bold uppercase tracking-wider text-[#0084FF]">{{ b.tag }}</span>
                    <h3 class="text-xl font-bold text-[#071328]">{{ b.name }}</h3>
                    <p class="text-xs text-[#6B7280] leading-relaxed">{{ b.description }}</p>
                  </div>
                  <div class="pt-2 border-t border-slate-200">
                    <span class="text-lg font-bold text-[#071328]">\${{ b.estAmount | number }}</span>
                    <span class="text-[10px] text-[#6B7280] block">Estimated per person</span>
                  </div>
                </div>
              }
            </div>
          </div>
        }

        <!-- ============================================== -->
        <!-- STEP 5: TRAVEL STYLE                           -->
        <!-- Relaxing, Adventure, Culture, Nature, Luxury, Food -->
        <!-- ============================================== -->
        @if (currentStep === 5) {
          <div class="space-y-6">
            <div class="text-center space-y-1">
              <h2 class="text-2xl font-bold font-display text-[#071328]">05 &bull; Travel Style</h2>
              <p class="text-sm text-[#6B7280]">What mood and ambiance are you seeking?</p>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
              @for (style of travelStyles; track style.name) {
                <div
                  (click)="selectedStyle = style.name"
                  class="p-6 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-4"
                  [ngClass]="selectedStyle === style.name ? 'border-[#0084FF] bg-blue-50/50 shadow-md ring-2 ring-blue-500/20' : 'border-slate-200 hover:border-slate-300 bg-white'"
                >
                  <div class="w-12 h-12 rounded-xl bg-[#071328] text-white flex items-center justify-center shrink-0">
                    <app-icon [name]="style.icon" [size]="20"></app-icon>
                  </div>
                  <div>
                    <h4 class="font-bold text-base text-[#071328]">{{ style.name }}</h4>
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
              <h2 class="text-2xl font-bold font-display text-[#071328]">06 &bull; Select Preferred Stay</h2>
              <p class="text-sm text-[#6B7280]">Choose accommodation that matches your destination.</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
              @for (hotel of hotels(); track hotel.id) {
                <div
                  (click)="selectedHotel = hotel"
                  class="rounded-2xl border-2 overflow-hidden transition-all cursor-pointer flex flex-col justify-between"
                  [ngClass]="selectedHotel?.id === hotel.id ? 'border-[#0084FF] shadow-lg ring-2 ring-blue-500/20' : 'border-slate-200 hover:border-slate-300'"
                >
                  <img [src]="hotel.image" [alt]="hotel.name" class="h-40 w-full object-cover" />
                  <div class="p-5 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <div class="flex items-center justify-between text-xs text-[#0084FF] font-semibold mb-1">
                        <span>{{ hotel.city }}</span>
                        <div class="flex items-center gap-1">
                          <app-icon name="star" [size]="12"></app-icon>
                          <span>{{ hotel.rating }}</span>
                        </div>
                      </div>
                      <h4 class="font-bold text-base text-[#071328]">{{ hotel.name }}</h4>
                      <p class="text-xs text-[#6B7280] line-clamp-2 mt-1">{{ hotel.description }}</p>
                    </div>
                    <div class="pt-3 border-t border-slate-200 flex justify-between items-center">
                      <span class="text-sm font-bold text-[#071328]">\${{ hotel.pricePerNight | number }} / night</span>
                      <span class="text-xs font-bold" [ngClass]="selectedHotel?.id === hotel.id ? 'text-[#0A2D30] font-extrabold' : 'text-[#6B7280]'">
                        {{ selectedHotel?.id === hotel.id ? 'Selected' : 'Select' }}
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
        <!-- Beach, Sightseeing, Shopping, Adventure, Food, Nightlife, Culture -->
        <!-- ============================================== -->
        @if (currentStep === 7) {
          <div class="space-y-6">
            <div class="text-center space-y-1">
              <h2 class="text-2xl font-bold font-display text-[#071328]">07 &bull; Choose Activities</h2>
              <p class="text-sm text-[#6B7280]">Select the experiences to populate your daily itinerary timeline.</p>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
              @for (act of activityTypes; track act.name) {
                <div
                  (click)="toggleActivity(act.name)"
                  class="p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center text-center space-y-2"
                  [ngClass]="selectedActivities.includes(act.name) ? 'border-[#0084FF] bg-blue-50/40 ring-2 ring-blue-500/20 shadow-sm' : 'border-slate-200 hover:border-slate-300 bg-white'"
                >
                  <div class="w-10 h-10 rounded-xl bg-[#071328] text-white flex items-center justify-center">
                    <app-icon [name]="act.icon" [size]="18"></app-icon>
                  </div>
                  <h4 class="font-bold text-sm text-[#071328]">{{ act.name }}</h4>
                  <span class="text-[10px] font-semibold text-[#6B7280]">{{ selectedActivities.includes(act.name) ? 'Included' : 'Click to add' }}</span>
                </div>
              }
            </div>
          </div>
        }

        <!-- ============================================== -->
        <!-- STEP 8: REVIEW & SAVE                          -->
        <!-- Button: "Create My Trip"                       -->
        <!-- ============================================== -->
        @if (currentStep === 8) {
          <div class="space-y-8 max-w-2xl mx-auto py-4">
            <div class="text-center space-y-1">
              <span class="text-xs font-bold uppercase tracking-widest text-[#0084FF]">08 &bull; FINAL BLUEPRINT</span>
              <h2 class="text-3xl font-bold font-display text-[#071328]">Review Your Journey</h2>
              <p class="text-sm text-[#6B7280]">Check your specifications before saving to your personal portal and records.</p>
            </div>

            <div class="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6">
              <div class="flex items-center gap-4">
                <img [src]="selectedDestination?.image" [alt]="selectedDestination?.name" class="w-20 h-20 rounded-2xl object-cover shrink-0" />
                <div>
                  <h3 class="text-2xl font-bold font-display text-[#071328]">{{ selectedDestination?.name }} Escape</h3>
                  <p class="text-xs text-[#6B7280]">{{ selectedDestination?.country }} &bull; {{ startDate }} to {{ endDate }}</p>
                </div>
              </div>

              <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-200 text-xs">
                <div>
                  <span class="text-[#6B7280] block uppercase tracking-wider text-[10px]">Travelers</span>
                  <span class="font-bold text-[#071328] text-sm">{{ adultsCount }} Adults, {{ kidsCount }} Kids</span>
                </div>
                <div>
                  <span class="text-[#6B7280] block uppercase tracking-wider text-[10px]">Budget</span>
                  <span class="font-bold text-[#071328] text-sm">{{ selectedBudget }}</span>
                </div>
                <div>
                  <span class="text-[#6B7280] block uppercase tracking-wider text-[10px]">Style</span>
                  <span class="font-bold text-[#071328] text-sm">{{ selectedStyle }}</span>
                </div>
                <div>
                  <span class="text-[#6B7280] block uppercase tracking-wider text-[10px]">Stay</span>
                  <span class="font-bold text-[#071328] text-sm truncate block">{{ selectedHotel?.name }}</span>
                </div>
              </div>

              <div class="pt-4 border-t border-slate-200">
                <span class="text-[#6B7280] block uppercase tracking-wider text-[10px] mb-2">Selected Experiences</span>
                <div class="flex flex-wrap gap-2">
                  @for (act of selectedActivities; track act) {
                    <span class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-[#17202A]">
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
                class="px-10 py-4 rounded-full bg-[#0084FF] hover:bg-[#0070D8] text-white font-bold text-base flex items-center gap-3 shadow-xl shadow-blue-500/25 hover:shadow-2xl transition-all active:scale-95 cursor-pointer"
              >
                <span>Create My Trip</span>
                <app-icon name="arrow-right" [size]="18"></app-icon>
              </button>
            </div>
          </div>
        }

        <!-- BOTTOM NAVIGATION CONTROLS -->
        <div class="flex items-center justify-between pt-8 border-t border-slate-200 mt-8">
          <button
            type="button"
            (click)="prevStep()"
            [disabled]="currentStep === 1"
            class="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold transition-colors cursor-pointer"
            [ngClass]="currentStep === 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-slate-100 text-[#17202A]'"
          >
            Previous
          </button>

          @if (currentStep < 8) {
            <button
              type="button"
              (click)="nextStep()"
              class="px-7 py-2.5 rounded-xl bg-[#0084FF] hover:bg-[#0070D8] text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
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
    { num: 8, labelNum: '08', name: 'Review & Save' }
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
