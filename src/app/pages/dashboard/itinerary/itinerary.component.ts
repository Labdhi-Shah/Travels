import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { LucideIconComponent } from '../../../shared/icon/lucide-icon.component';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { EmptyStateComponent } from '../../../shared/empty-state/empty-state.component';
import { ItineraryService } from '../../../core/services/itinerary.service';
import { TripService } from '../../../core/services/trip.service';
import { ToastService } from '../../../core/services/toast.service';
import { ItineraryItem, ActivityCategory } from '../../../models/itinerary.model';
import { Trip } from '../../../models/trip.model';

@Component({
  selector: 'app-itinerary',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    DragDropModule,
    LucideIconComponent,
    ModalComponent,
    EmptyStateComponent
  ],
  template: `
    <div class="space-y-8 animate-fade-in pb-16 text-[#17202A]">
      
      <!-- Top Title Bar with Trip Selector & Add Activity -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl sm:text-4xl font-bold font-display text-[#071328]">
              Visual Timeline Itinerary
            </h1>
            <span class="px-3 py-1 rounded-full bg-[#D4A359]/20 text-[#071F22] text-xs font-bold">
              {{ activeTrip?.destination?.split(',')?.at(0) || 'Journey' }}
            </span>
          </div>
          <p class="text-xs sm:text-sm text-[#6B7280] mt-1 font-light">
            Drag and reorder your daily sequence. Connect airport arrivals, hotel check-ins, beach visits and dinners.
          </p>
        </div>

        <div class="flex items-center flex-wrap gap-3">
          <!-- Back to Trip Details Button -->
          <a
            [routerLink]="selectedTripId ? ['/my-trips', selectedTripId] : ['/my-trips']"
            class="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs sm:text-sm font-semibold text-[#071F22] flex items-center gap-1.5 transition-all shadow-sm cursor-pointer shrink-0"
          >
            <app-icon name="arrow-left" [size]="15"></app-icon>
            <span>Trip Details</span>
          </a>

          <!-- Trip Selector Dropdown -->
          <select
            [(ngModel)]="selectedTripId"
            (ngModelChange)="onTripChange()"
            class="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-semibold text-[#17202A] focus:outline-none focus:border-[#D4A359] shadow-sm cursor-pointer"
          >
            @for (t of trips; track t.id) {
              <option [value]="t.id">{{ t.name }}</option>
            }
          </select>

          <!-- Add Activity Button -->
          <button
            type="button"
            (click)="openAddModal()"
            class="px-5 py-2.5 rounded-xl bg-[#0A2D30] hover:bg-[#D4A359] hover:text-[#0A2D30] text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer shrink-0"
          >
            <app-icon name="plus" [size]="16"></app-icon>
            <span>Add Activity</span>
          </button>
        </div>
      </div>

      <!-- Main Itinerary Layout: Left Days Selector, Right Timeline -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- Left (4 Cols): Day Selector & Quick Summary -->
        <div class="lg:col-span-4 space-y-4">
          <div class="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-2">
            <span class="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] px-2 block">
              Trip Itinerary Days
            </span>

            @for (day of availableDays; track day) {
              <button
                type="button"
                (click)="selectedDay = day"
                class="w-full text-left px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-between cursor-pointer"
                [ngClass]="selectedDay === day
                  ? 'bg-[#0A2D30] text-white shadow-md ring-1 ring-[#D4A359]/30'
                  : 'text-[#17202A] hover:bg-slate-100'"
              >
                <div class="flex items-center gap-2.5">
                  <span
                    class="w-7 h-7 rounded-xl text-xs flex items-center justify-center font-bold"
                    [ngClass]="selectedDay === day ? 'bg-[#D4A359] text-[#071F22]' : 'bg-slate-100 text-[#071328]'"
                  >
                    {{ day < 10 ? '0' + day : day }}
                  </span>
                  <span>Day {{ day < 10 ? '0' + day : day }}</span>
                </div>

                <span
                  class="text-[11px] px-2.5 py-0.5 rounded-full font-medium"
                  [ngClass]="selectedDay === day ? 'bg-white/20 text-white' : 'bg-slate-100 text-[#6B7280]'"
                >
                  {{ getEventCountForDay(day) }} activities
                </span>
              </button>
            }
          </div>

          <!-- Day Theme Card -->
          <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <span class="text-[10px] font-bold uppercase tracking-wider text-[#D4A359]">
              Day Theme
            </span>
            <h3 class="text-xl font-bold font-display text-[#071328]">
              {{ getDayTheme(selectedDay) }}
            </h3>
            <p class="text-xs text-[#6B7280] leading-relaxed">
              Drag-and-drop to reorder timeslots smoothly. Your updates persist instantly.
            </p>
          </div>
        </div>

        <!-- Right (8 Cols): Vertical Timeline Itinerary -->
        <div class="lg:col-span-8 space-y-6">
          
          <!-- Day Header -->
          <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span class="text-xs font-bold uppercase tracking-widest text-[#D4A359]">
                DAY {{ selectedDay < 10 ? '0' + selectedDay : selectedDay }}
              </span>
              <h2 class="text-2xl font-bold font-display text-[#071328] mt-0.5">
                {{ getDayTheme(selectedDay) }}
              </h2>
            </div>

            <div class="flex items-center gap-2">
              <span class="px-3 py-1 rounded-full bg-slate-100 text-[#071328] text-xs font-semibold">
                {{ currentDayItems.length }} Activities
              </span>
            </div>
          </div>

          <!-- VERTICAL TIMELINE CONTAINER (CDK Drop List with Animation) -->
          @if (currentDayItems.length > 0) {
            <div
              cdkDropList
              (cdkDropListDropped)="onDrop($event)"
              class="relative pl-6 sm:pl-8 space-y-6 before:content-[''] before:absolute before:left-3 sm:before:left-4 before:top-4 before:bottom-4 before:w-[2px] before:bg-slate-200"
            >
              @for (item of currentDayItems; track item.id) {
                <div
                  cdkDrag
                  class="cdk-drag-animating group relative bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <!-- Timeline Node on the vertical line -->
                  <div
                    class="absolute -left-6 sm:-left-8 top-6 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-4 border-[#D4A359] shadow-md z-10 flex items-center justify-center"
                  ></div>

                  <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    
                    <!-- Left: Time + Content -->
                    <div class="flex items-start gap-4">
                      
                      <!-- Drag Handle -->
                      <div
                        cdkDragHandle
                        class="cursor-grab active:cursor-grabbing p-1 text-[#6B7280] hover:text-[#071328] transition-colors shrink-0 mt-1"
                        title="Drag to reorder"
                      >
                        <app-icon name="sliders" [size]="16"></app-icon>
                      </div>

                      <!-- Thumbnail Image -->
                      <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                        <img
                          [src]="item.image || getDefaultImage(item.category)"
                          [alt]="item.title"
                          class="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>

                      <!-- Activity Info -->
                      <div class="space-y-1">
                        <div class="flex items-center gap-2">
                          <span class="text-sm sm:text-base font-extrabold text-[#071328] font-display">
                            {{ item.time }}
                          </span>
                          <span class="px-2.5 py-0.5 rounded-md bg-slate-100 text-[#071328] text-[10px] font-bold uppercase">
                            {{ item.category }}
                          </span>
                        </div>

                        <h3 class="text-base sm:text-lg font-bold text-[#071328] group-hover:text-[#0084FF] transition-colors">
                          {{ item.title }}
                        </h3>

                        <p class="text-xs text-[#6B7280] line-clamp-2 leading-relaxed">
                          {{ item.description }}
                        </p>

                        <p class="text-xs text-[#6B7280] flex items-center gap-1.5 pt-1">
                          <app-icon name="map-pin" [size]="12" extraClass="text-[#0084FF]"></app-icon>
                          <span>{{ item.location }}</span>
                        </p>
                      </div>

                    </div>

                    <!-- Right: Edit / Delete Actions -->
                    <div class="flex items-center gap-2 self-end sm:self-start shrink-0 pt-2 sm:pt-0">
                      <button
                        type="button"
                        (click)="openEditModal(item)"
                        class="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#17202A] transition-colors cursor-pointer"
                        title="Edit Activity"
                        aria-label="Edit Activity"
                      >
                        <app-icon name="edit" [size]="15"></app-icon>
                      </button>

                      <button
                        type="button"
                        (click)="removeItem(item.id)"
                        class="p-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-[#17202A] hover:text-rose-600 transition-colors cursor-pointer"
                        title="Delete Activity"
                        aria-label="Delete Activity"
                      >
                        <app-icon name="trash-2" [size]="15"></app-icon>
                      </button>
                    </div>

                  </div>
                </div>
              }
            </div>
          } @else {
            <app-empty-state
              iconName="calendar"
              title="No activities for Day {{ selectedDay }}"
              description="Click 'Add Activity' above to start planning this day's moments."
              actionLabel="Add First Activity"
              (action)="openAddModal()"
            ></app-empty-state>
          }

        </div>

      </div>

      <!-- ADD / EDIT ACTIVITY MODAL -->
      <app-modal
        [isOpen]="isModalOpen"
        [title]="editingItem ? 'Edit Activity' : 'Add Activity to Day ' + selectedDay"
        subtitle="Specify timeline hour, location, and description"
        iconName="calendar"
        (close)="isModalOpen = false"
      >
        <div class="space-y-4 text-xs sm:text-sm">
          <div>
            <label class="block text-xs font-bold uppercase text-[#6B7280] mb-1">Activity Title</label>
            <input
              type="text"
              [(ngModel)]="formData.title"
              placeholder="e.g. Airport Arrival, Beach Visit, Dinner"
              class="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#0084FF]"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold uppercase text-[#6B7280] mb-1">Time (24h or 12h)</label>
              <input
                type="text"
                [(ngModel)]="formData.time"
                placeholder="09:00 or 14:00"
                class="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#0084FF]"
              />
            </div>
            <div>
              <label class="block text-xs font-bold uppercase text-[#6B7280] mb-1">Category</label>
              <select
                [(ngModel)]="formData.category"
                class="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#0084FF]"
              >
                <option value="Sightseeing">Sightseeing</option>
                <option value="Food & Dining">Food & Dining</option>
                <option value="Adventure">Adventure</option>
                <option value="Relaxation">Relaxation</option>
                <option value="Transportation">Transportation</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase text-[#6B7280] mb-1">Location</label>
            <input
              type="text"
              [(ngModel)]="formData.location"
              placeholder="e.g. Dabolim Airport or Palolem Beach"
              class="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#0084FF]"
            />
          </div>

          <div>
            <label class="block text-xs font-bold uppercase text-[#6B7280] mb-1">Description</label>
            <textarea
              [(ngModel)]="formData.description"
              rows="3"
              placeholder="Details or notes about this milestone..."
              class="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#0084FF]"
            ></textarea>
          </div>

          <div class="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              (click)="isModalOpen = false"
              class="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-[#17202A] hover:bg-slate-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              (click)="saveActivity()"
              class="px-6 py-2.5 rounded-xl bg-[#0084FF] hover:bg-[#0070D8] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
            >
              {{ editingItem ? 'Save Changes' : 'Add Activity' }}
            </button>
          </div>
        </div>
      </app-modal>

    </div>
  `
})
export class ItineraryComponent implements OnInit {
  private itineraryService = inject(ItineraryService);
  private tripService = inject(TripService);
  private toastService = inject(ToastService);
  private route = inject(ActivatedRoute);

  trips: Trip[] = [];
  selectedTripId = '';
  activeTrip?: Trip;

  availableDays = [1, 2, 3, 4, 5];
  selectedDay = 1;

  isModalOpen = false;
  editingItem: ItineraryItem | null = null;

  formData = {
    title: '',
    time: '10:00',
    category: 'Sightseeing' as ActivityCategory,
    location: '',
    description: ''
  };

  ngOnInit() {
    this.trips = this.tripService.getTrips();

    const paramId = this.route.snapshot.paramMap.get('id');
    const queryTripId = this.route.snapshot.queryParamMap.get('tripId');
    const targetId = paramId || queryTripId;

    if (targetId && this.trips.some(t => t.id === targetId)) {
      this.selectedTripId = targetId;
    } else if (this.trips.length > 0) {
      this.selectedTripId = this.trips[0].id;
    }
    this.onTripChange();

    this.route.paramMap.subscribe(params => {
      const routeId = params.get('id');
      if (routeId && routeId !== this.selectedTripId) {
        this.selectedTripId = routeId;
        this.onTripChange();
      }
    });

    this.route.queryParamMap.subscribe(queryParams => {
      const qId = queryParams.get('tripId');
      if (qId && qId !== this.selectedTripId) {
        this.selectedTripId = qId;
        this.onTripChange();
      }
    });
  }

  onTripChange() {
    this.activeTrip = this.trips.find(t => t.id === this.selectedTripId) || this.trips[0];
    this.itineraryService.loadForTrip(this.selectedTripId);
    
    // Seed sample timeline if empty (e.g. Arrival & Beach as in prompt)
    const items = this.itineraryService.getItemsForTrip(this.selectedTripId);
    if (items.length === 0) {
      this.seedSampleTimeline();
    }
  }

  get currentDayItems(): ItineraryItem[] {
    return this.itineraryService.getItemsForDay(this.selectedTripId, this.selectedDay);
  }

  getEventCountForDay(day: number): number {
    return this.itineraryService.getItemsForDay(this.selectedTripId, day).length;
  }

  getDayTheme(day: number): string {
    switch (day) {
      case 1: return 'Arrival & Beach';
      case 2: return 'Cultural Heritage & Old Town';
      case 3: return 'Waterfalls & Spice Plantations';
      case 4: return 'Coastal Sunset & Catamaran';
      case 5: return 'Farewell Stroll & Departure';
      default: return `Exploration & Discovery Day ${day}`;
    }
  }

  getDefaultImage(category: string): string {
    switch (category) {
      case 'Food & Dining': return 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80';
      case 'Adventure': return 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&w=400&q=80';
      case 'Transportation': return 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=400&q=80';
      default: return 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=400&q=80';
    }
  }

  onDrop(event: CdkDragDrop<ItineraryItem[]>) {
    const dayItems = [...this.currentDayItems];
    moveItemInArray(dayItems, event.previousIndex, event.currentIndex);
    this.itineraryService.updateDayOrder(this.selectedTripId, this.selectedDay, dayItems);
    this.toastService.show('Activity sequence updated', 'info');
  }

  openAddModal() {
    this.editingItem = null;
    this.formData = {
      title: '',
      time: '12:00',
      category: 'Sightseeing',
      location: this.activeTrip?.destination || '',
      description: ''
    };
    this.isModalOpen = true;
  }

  openEditModal(item: ItineraryItem) {
    this.editingItem = item;
    this.formData = {
      title: item.title,
      time: item.time,
      category: item.category,
      location: item.location,
      description: item.description || ''
    };
    this.isModalOpen = true;
  }

  removeItem(id: string) {
    this.itineraryService.deleteItem(id);
    this.toastService.show('Activity removed', 'info');
  }

  saveActivity() {
    if (!this.formData.title.trim()) return;

    if (this.editingItem) {
      this.itineraryService.updateItem(this.editingItem.id, {
        title: this.formData.title,
        time: this.formData.time,
        category: this.formData.category,
        location: this.formData.location,
        description: this.formData.description,
        notes: this.formData.description
      });
      this.toastService.show('Activity updated', 'success');
    } else {
      this.itineraryService.addItem({
        tripId: this.selectedTripId,
        dayNumber: this.selectedDay,
        date: '2026-10-05',
        time: this.formData.time,
        title: this.formData.title,
        description: this.formData.description,
        notes: this.formData.description,
        location: this.formData.location,
        category: this.formData.category,
        estimatedCost: 45,
        isCompleted: false,
        image: this.getDefaultImage(this.formData.category)
      });
      this.toastService.show('Activity added to Day ' + this.selectedDay, 'success');
    }

    this.isModalOpen = false;
  }

  private seedSampleTimeline() {
    const sampleItems = [
      {
        tripId: this.selectedTripId,
        dayNumber: 1,
        date: '2026-10-05',
        time: '09:00',
        title: 'Airport Arrival',
        description: 'Chauffeured pickup from airport terminal and VIP lounge reception.',
        notes: 'Chauffeured pickup from airport terminal and VIP lounge reception.',
        location: 'Dabolim Airport Terminal 1',
        category: 'Transport' as ActivityCategory,
        estimatedCost: 0,
        isCompleted: true,
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=400&q=80'
      },
      {
        tripId: this.selectedTripId,
        dayNumber: 1,
        date: '2026-10-05',
        time: '11:00',
        title: 'Hotel Check-in',
        description: 'Check-in to oceanfront suite with welcome cocktail and room orientation.',
        notes: 'Check-in to oceanfront suite with welcome cocktail and room orientation.',
        location: 'Taj Exotica Resort & Spa',
        category: 'Relaxation' as ActivityCategory,
        estimatedCost: 0,
        isCompleted: true,
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80'
      },
      {
        tripId: this.selectedTripId,
        dayNumber: 1,
        date: '2026-10-05',
        time: '14:00',
        title: 'Beach Visit',
        description: 'Golden sand stroll along Benaulim shore, private cabana lounging and coconut drinks.',
        notes: 'Golden sand stroll along Benaulim shore, private cabana lounging and coconut drinks.',
        location: 'Benaulim Beach Shore',
        category: 'Sightseeing' as ActivityCategory,
        estimatedCost: 20,
        isCompleted: false,
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=400&q=80'
      },
      {
        tripId: this.selectedTripId,
        dayNumber: 1,
        date: '2026-10-05',
        time: '19:00',
        title: 'Dinner',
        description: 'Candlelight coastal seafood dinner with live acoustic Portuguese melodies.',
        notes: 'Candlelight coastal seafood dinner with live acoustic Portuguese melodies.',
        location: 'Fisherman’s Wharf Terrace',
        category: 'Dining' as ActivityCategory,
        estimatedCost: 80,
        isCompleted: false,
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80'
      }
    ];

    sampleItems.forEach(item => this.itineraryService.addItem(item));
  }
}
