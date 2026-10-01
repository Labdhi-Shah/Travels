import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LucideIconComponent } from '../../../shared/icon/lucide-icon.component';
import { TripCardComponent } from '../../../shared/trip-card/trip-card.component';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { TripService } from '../../../core/services/trip.service';
import { ToastService } from '../../../core/services/toast.service';
import { Trip, TripStatus } from '../../../models/trip.model';

interface StatusTabItem {
  id: string;
  label: string;
}

@Component({
  selector: 'app-my-trips',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    LucideIconComponent,
    TripCardComponent,
    ModalComponent
  ],
  template: `
    <div class="pt-24 sm:pt-28 pb-28 min-h-screen bg-[#F8FAFC] text-[#071F22] animate-page-enter">
      
      <!-- EDITORIAL PAGE HEADER BANNER -->
      <section class="bg-[#071F22] text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 relative overflow-hidden border-b border-[#D4A359]/20">
        <!-- Subtle Ambient Background Layer -->
        <div class="absolute inset-0 -z-10 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1800&q=80"
            alt="Journeys Cover"
            class="w-full h-full object-cover opacity-15"
          />
          <div class="absolute inset-0 bg-gradient-to-r from-[#071F22] via-[#071F22]/90 to-[#0A2D30]/85"></div>
          <div class="absolute -right-24 -bottom-24 w-96 h-96 bg-[#D4A359]/15 rounded-full blur-3xl pointer-events-none"></div>
        </div>

        <div class="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
          <div class="space-y-3 max-w-2xl">
            <span class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/40 text-[#D4A359] text-xs font-bold uppercase tracking-widest backdrop-blur-md border border-[#D4A359]/30">
              <app-icon name="map" [size]="13"></app-icon>
              <span>PERSONAL EXPEDITION DISPATCHES</span>
            </span>
            <h1 class="text-3xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-white">
              My Journeys
            </h1>
            <p class="text-xs sm:text-base text-slate-300 font-light leading-relaxed">
              Manage your personal travel itineraries, confirmed bookings, and active departures with real-time sync across your workspace.
            </p>

            <!-- Metric summary counter pills -->
            <div class="flex items-center gap-4 sm:gap-6 pt-2 flex-wrap text-xs text-slate-200">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-[#D4A359]"></span>
                <span><strong>{{ trips.length }}</strong> Total Journeys</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span><strong>{{ confirmedCount }}</strong> Confirmed</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-sky-400"></span>
                <span><strong>{{ upcomingCount }}</strong> Upcoming</span>
              </div>
            </div>
          </div>

          <!-- Quick Header CTA -->
          <a
            routerLink="/plan-trip"
            class="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#D4A359] hover:bg-[#c2924a] text-[#071F22] font-bold text-xs sm:text-sm transition-all shadow-lg shadow-[#D4A359]/20 active:scale-95 shrink-0 self-start md:self-auto cursor-pointer"
          >
            <app-icon name="plus" [size]="16"></app-icon>
            <span>Plan New Journey</span>
          </a>
        </div>
      </section>

      <!-- MAIN CONTENT CONTAINER -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <!-- FILTERS, SEARCH & SORT BAR -->
        <div class="bg-white p-4 sm:p-6 rounded-3xl border border-[#EFEDE7] shadow-sm space-y-4">
          <!-- Top Row: Search + Sort Dropdown -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            <!-- Search Bar -->
            <div class="relative flex-1 max-w-md">
              <app-icon name="search" [size]="16" extraClass="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7280]"></app-icon>
              <input
                type="text"
                [(ngModel)]="searchQuery"
                (ngModelChange)="onFilterChange()"
                placeholder="Search by destination, trip name, or Trip ID..."
                class="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-[#F8F7F3] border border-[#EFEDE7] text-xs sm:text-sm font-medium focus:outline-none focus:border-[#D4A359] focus:bg-white transition-all text-[#071F22]"
              />
              @if (searchQuery) {
                <button
                  type="button"
                  (click)="searchQuery = ''; onFilterChange()"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#071F22] cursor-pointer"
                  title="Clear Search"
                  aria-label="Clear Search"
                >
                  <app-icon name="x" [size]="14"></app-icon>
                </button>
              }
            </div>

            <!-- Sort Dropdown & Matches Count -->
            <div class="flex items-center gap-3 self-end sm:self-auto">
              <div class="relative">
                <select
                  [(ngModel)]="sortBy"
                  (ngModelChange)="onFilterChange()"
                  class="px-4 py-2.5 rounded-2xl bg-[#F8F7F3] border border-[#EFEDE7] text-xs font-semibold text-[#071F22] focus:outline-none focus:border-[#D4A359] cursor-pointer"
                >
                  <option value="date-asc">Departure: Earliest First</option>
                  <option value="date-desc">Departure: Latest First</option>
                  <option value="budget-desc">Budget: High to Low</option>
                  <option value="budget-asc">Budget: Low to High</option>
                  <option value="newest">Recently Created</option>
                </select>
              </div>

              <span class="text-xs text-[#6B7280] hidden lg:inline font-medium">
                Showing <strong>{{ filteredTrips.length }}</strong> of {{ trips.length }} journeys
              </span>
            </div>
          </div>

          <!-- Status Filter Tabs with Live Counters -->
          <div class="pt-3 border-t border-[#EFEDE7] flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
            @for (tab of statusTabs; track tab.id) {
              <button
                type="button"
                (click)="selectTab(tab.id)"
                class="px-4 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5"
                [ngClass]="activeTab === tab.id
                  ? 'bg-[#0A2D30] text-[#D4A359] shadow-sm'
                  : 'bg-[#F8F7F3] text-[#071F22] hover:bg-[#EFEDE7] border border-[#EFEDE7]'"
              >
                <span>{{ tab.label }}</span>
                <span
                  class="px-1.5 py-0.5 rounded-full text-[10px] font-mono"
                  [ngClass]="activeTab === tab.id ? 'bg-white/20 text-[#D4A359]' : 'bg-[#EFEDE7] text-[#6B7280]'"
                >
                  {{ getTabCount(tab.id) }}
                </span>
              </button>
            }
          </div>
        </div>

        <!-- LOADING STATE SHIMMER -->
        @if (isLoading) {
          <div class="space-y-6">
            @for (i of [1, 2]; track i) {
              <div class="bg-white rounded-3xl p-6 sm:p-7 border border-[#EFEDE7] shadow-sm flex flex-col md:flex-row gap-6 animate-pulse">
                <div class="w-full md:w-80 h-52 bg-slate-200 rounded-2xl shrink-0"></div>
                <div class="flex-1 space-y-4 py-2">
                  <div class="h-4 bg-slate-200 rounded w-1/4"></div>
                  <div class="h-7 bg-slate-200 rounded w-1/2"></div>
                  <div class="h-4 bg-slate-200 rounded w-1/3"></div>
                  <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    <div class="h-14 bg-slate-100 rounded-xl"></div>
                    <div class="h-14 bg-slate-100 rounded-xl"></div>
                    <div class="h-14 bg-slate-100 rounded-xl"></div>
                    <div class="h-14 bg-slate-100 rounded-xl"></div>
                  </div>
                </div>
              </div>
            }
          </div>
        }

        <!-- LARGE HORIZONTAL EDITORIAL TRIP CARDS -->
        @else if (filteredTrips.length > 0) {
          <div class="space-y-6">
            @for (trip of filteredTrips; track trip.id; let idx = $index) {
              <div [ngClass]="'animate-card-slide stagger-' + ((idx % 6) + 1)">
                <app-trip-card
                  [trip]="trip"
                  (onEdit)="editTrip(trip)"
                  (onDelete)="deleteTrip(trip)"
                ></app-trip-card>
              </div>
            }
          </div>
        }

        <!-- EMPTY STATE 1: ZERO TRIPS IN APPLICATION -->
        @else if (trips.length === 0) {
          <div class="bg-white rounded-3xl p-10 sm:p-16 border border-dashed border-[#D4A359]/30 text-center shadow-sm flex flex-col items-center justify-center max-w-2xl mx-auto space-y-4 animate-page-enter">
            <div class="w-20 h-20 rounded-3xl bg-[#D4A359]/15 text-[#B88738] flex items-center justify-center shadow-inner">
              <app-icon name="compass" [size]="36"></app-icon>
            </div>
            <div class="space-y-1">
              <h3 class="text-2xl sm:text-3xl font-bold font-display text-[#071F22]">
                No Trips Yet
              </h3>
              <p class="text-xs sm:text-sm text-[#6B7280] max-w-md mx-auto font-light leading-relaxed">
                Your travel passport is waiting for its first stamp. Craft an extraordinary personalized journey with handpicked hotels, flights, and curated activities in minutes.
              </p>
            </div>
            <a
              routerLink="/plan-trip"
              class="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0A2D30] hover:bg-[#D4A359] hover:text-[#071F22] text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 cursor-pointer mt-2"
            >
              <app-icon name="plus" [size]="16"></app-icon>
              <span>Plan My Trip</span>
            </a>
          </div>
        }

        <!-- EMPTY STATE 2: NO FILTER MATCHES -->
        @else {
          <div class="bg-white rounded-3xl p-10 sm:p-16 border border-dashed border-[#EFEDE7] text-center shadow-sm flex flex-col items-center justify-center max-w-2xl mx-auto space-y-4 animate-page-enter">
            <div class="w-20 h-20 rounded-3xl bg-[#F8F7F3] text-[#6B7280] flex items-center justify-center">
              <app-icon name="search" [size]="32"></app-icon>
            </div>
            <div class="space-y-1">
              <h3 class="text-xl sm:text-2xl font-bold font-display text-[#071F22]">
                No Matching Journeys Found
              </h3>
              <p class="text-xs sm:text-sm text-[#6B7280] max-w-md mx-auto font-light leading-relaxed">
                We couldn’t find any trips matching your current filter criteria. Try selecting another status category or clearing your search query.
              </p>
            </div>
            <div class="flex items-center gap-3 pt-2">
              <button
                type="button"
                (click)="clearFilters()"
                class="px-5 py-2.5 rounded-full border border-[#EFEDE7] text-xs font-bold text-[#071F22] hover:bg-[#F8F7F3] cursor-pointer"
              >
                Reset Filters
              </button>
              <a
                routerLink="/plan-trip"
                class="px-6 py-2.5 rounded-full bg-[#0A2D30] hover:bg-[#D4A359] hover:text-[#071F22] text-white font-bold text-xs transition-all shadow-sm cursor-pointer"
              >
                Plan New Journey
              </a>
            </div>
          </div>
        }

      </div>

      <!-- EDIT TRIP MODAL -->
      <app-modal
        [isOpen]="editingTrip !== null"
        title="Edit Journey Details"
        subtitle="Update name, destination, and budget parameters"
        iconName="edit"
        (close)="editingTrip = null"
      >
        @if (editingTrip) {
          <div class="space-y-4 text-xs sm:text-sm">
            <div>
              <label class="block text-xs font-bold uppercase text-[#6B7280] mb-1">Trip Name</label>
              <input
                type="text"
                [(ngModel)]="editingTrip.name"
                class="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F7F3] border border-[#EFEDE7] text-sm focus:outline-none focus:border-[#D4A359]"
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold uppercase text-[#6B7280] mb-1">Budget (\${{ editingTrip.budget }})</label>
                <input
                  type="number"
                  [(ngModel)]="editingTrip.budget"
                  class="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F7F3] border border-[#EFEDE7] text-sm focus:outline-none focus:border-[#D4A359]"
                />
              </div>

              <div>
                <label class="block text-xs font-bold uppercase text-[#6B7280] mb-1">Status</label>
                <select
                  [(ngModel)]="editingTrip.status"
                  class="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F7F3] border border-[#EFEDE7] text-sm focus:outline-none focus:border-[#D4A359]"
                >
                  <option value="Confirmed">Confirmed</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Pending">Pending</option>
                  <option value="Draft">Draft</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold uppercase text-[#6B7280] mb-1">Accommodation / Hotel</label>
                <input
                  type="text"
                  [(ngModel)]="editingTrip.hotelName"
                  class="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F7F3] border border-[#EFEDE7] text-sm focus:outline-none focus:border-[#D4A359]"
                />
              </div>

              <div>
                <label class="block text-xs font-bold uppercase text-[#6B7280] mb-1">Flight Departure</label>
                <input
                  type="text"
                  [(ngModel)]="editingTrip.flight"
                  class="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F7F3] border border-[#EFEDE7] text-sm focus:outline-none focus:border-[#D4A359]"
                />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase text-[#6B7280] mb-1">Notes / Highlights</label>
              <textarea
                [(ngModel)]="editingTrip.notes"
                rows="3"
                class="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F7F3] border border-[#EFEDE7] text-sm focus:outline-none focus:border-[#D4A359]"
              ></textarea>
            </div>

            <div class="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                (click)="editingTrip = null"
                class="px-4 py-2 rounded-xl border border-[#EFEDE7] text-xs font-semibold text-[#17202A] hover:bg-[#EFEDE7] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                (click)="saveTripEdit()"
                class="px-6 py-2.5 rounded-full bg-[#0A2D30] hover:bg-[#D4A359] hover:text-[#071F22] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        }
      </app-modal>

    </div>
  `
})
export class MyTripsComponent {
  private tripService = inject(TripService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  statusTabs: StatusTabItem[] = [
    { id: 'all', label: 'All Journeys' },
    { id: 'confirmed', label: 'Confirmed' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'pending', label: 'Pending' },
    { id: 'draft', label: 'Draft' },
    { id: 'completed', label: 'Completed' },
    { id: 'cancelled', label: 'Cancelled' }
  ];

  activeTab = 'all';
  searchQuery = '';
  sortBy: 'date-asc' | 'date-desc' | 'budget-desc' | 'budget-asc' | 'newest' = 'date-asc';
  isLoading = false;

  editingTrip: Trip | null = null;

  get trips(): Trip[] {
    return this.tripService.getTrips();
  }

  get confirmedCount(): number {
    return this.trips.filter(t => t.status === 'Confirmed').length;
  }

  get upcomingCount(): number {
    return this.trips.filter(t => t.status === 'Upcoming' || t.status === 'Ongoing' || t.status === 'Confirmed').length;
  }

  get pendingCount(): number {
    return this.trips.filter(t => t.status === 'Pending').length;
  }

  get draftCount(): number {
    return this.trips.filter(t => t.status === 'Draft' || t.status === 'Planned').length;
  }

  get completedCount(): number {
    return this.trips.filter(t => t.status === 'Completed').length;
  }

  get cancelledCount(): number {
    return this.trips.filter(t => t.status === 'Cancelled').length;
  }

  getTabCount(tabId: string): number {
    switch (tabId) {
      case 'all': return this.trips.length;
      case 'confirmed': return this.confirmedCount;
      case 'upcoming': return this.upcomingCount;
      case 'pending': return this.pendingCount;
      case 'draft': return this.draftCount;
      case 'completed': return this.completedCount;
      case 'cancelled': return this.cancelledCount;
      default: return 0;
    }
  }

  get filteredTrips(): Trip[] {
    const list = this.trips.filter(t => {
      const matchesTab =
        this.activeTab === 'all' ||
        (this.activeTab === 'confirmed' && t.status === 'Confirmed') ||
        (this.activeTab === 'upcoming' && (t.status === 'Upcoming' || t.status === 'Ongoing' || t.status === 'Confirmed')) ||
        (this.activeTab === 'pending' && t.status === 'Pending') ||
        (this.activeTab === 'draft' && (t.status === 'Draft' || t.status === 'Planned')) ||
        (this.activeTab === 'completed' && t.status === 'Completed') ||
        (this.activeTab === 'cancelled' && t.status === 'Cancelled');

      const matchesSearch =
        !this.searchQuery.trim() ||
        t.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        t.destination.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        t.country.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        t.id.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        (t.tripId ? t.tripId.toLowerCase().includes(this.searchQuery.toLowerCase()) : false);

      return matchesTab && matchesSearch;
    });

    return this.sortTrips(list);
  }

  private sortTrips(list: Trip[]): Trip[] {
    return [...list].sort((a, b) => {
      if (this.sortBy === 'date-asc') {
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
      }
      if (this.sortBy === 'date-desc') {
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      }
      if (this.sortBy === 'budget-desc') {
        return (b.budget || 0) - (a.budget || 0);
      }
      if (this.sortBy === 'budget-asc') {
        return (a.budget || 0) - (b.budget || 0);
      }
      if (this.sortBy === 'newest') {
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      }
      return 0;
    });
  }

  selectTab(tabId: string): void {
    if (this.activeTab === tabId) return;
    this.activeTab = tabId;
    this.triggerQuickLoading();
  }

  onFilterChange(): void {
    // Quick reactive feedback
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.activeTab = 'all';
    this.sortBy = 'date-asc';
    this.triggerQuickLoading();
  }

  private triggerQuickLoading(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 120);
  }

  editTrip(trip: Trip): void {
    this.editingTrip = { ...trip };
  }

  saveTripEdit(): void {
    if (this.editingTrip) {
      this.tripService.updateTrip(this.editingTrip.id, {
        name: this.editingTrip.name,
        budget: this.editingTrip.budget,
        status: this.editingTrip.status,
        hotelName: this.editingTrip.hotelName,
        flight: this.editingTrip.flight,
        notes: this.editingTrip.notes
      });
      this.toastService.success('Trip updated successfully');
      this.editingTrip = null;
    }
  }

  deleteTrip(trip: Trip): void {
    if (confirm(`Are you sure you want to delete "${trip.name}"?`)) {
      this.tripService.deleteTrip(trip.id);
      this.toastService.success('Trip removed from your workspace');
    }
  }

  createFirstTrip(): void {
    this.router.navigate(['/plan-trip']);
  }
}
