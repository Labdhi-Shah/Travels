import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LucideIconComponent } from '../../../shared/icon/lucide-icon.component';
import { TripCardComponent } from '../../../shared/trip-card/trip-card.component';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { EmptyStateComponent } from '../../../shared/empty-state/empty-state.component';
import { TripService } from '../../../core/services/trip.service';
import { ToastService } from '../../../core/services/toast.service';
import { Trip } from '../../../models/trip.model';

@Component({
  selector: 'app-my-trips',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    LucideIconComponent,
    TripCardComponent,
    ModalComponent,
    EmptyStateComponent
  ],
  template: `
    <div class="space-y-8 animate-fade-in pb-16 pt-2 sm:pt-4 text-[#17202A]">
      
      <!-- Top Title Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span class="text-xs font-bold uppercase tracking-widest text-[#D4A359]">
            TRAVEL DISPATCHES
          </span>
          <h1 class="text-2xl sm:text-4xl font-bold font-display text-[#071F22] mt-0.5">
            My Journeys
          </h1>
          <p class="text-xs sm:text-sm text-[#6B7280] font-light">
            Manage your personal travel itineraries, booking progress, and active departures.
          </p>
        </div>

        <a
          routerLink="/plan-trip"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0A2D30] hover:bg-[#D4A359] hover:text-[#071F22] text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 shrink-0 self-start sm:self-auto cursor-pointer"
        >
          <app-icon name="plus" [size]="16"></app-icon>
          <span>Plan New Journey</span>
        </a>
      </div>

      <!-- Filters & Search Bar -->
      <div class="bg-white p-4 sm:p-5 rounded-3xl border border-[#EFEDE7] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <!-- Status Tabs -->
        <div class="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
          @for (tab of statusTabs; track tab) {
            <button
              type="button"
              (click)="selectTab(tab)"
              class="px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer"
              [ngClass]="activeTab === tab
                ? 'bg-[#0A2D30] text-[#D4A359] shadow-sm'
                : 'bg-[#F8F7F3] text-[#071F22] hover:bg-[#EFEDE7] border border-[#EFEDE7]'"
            >
              {{ tab }}
            </button>
          }
        </div>

        <!-- Search -->
        <div class="relative w-full sm:w-72">
          <app-icon name="search" [size]="15" extraClass="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7280]"></app-icon>
          <input
            type="text"
            [(ngModel)]="searchQuery"
            placeholder="Search destination, city..."
            class="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#F8F7F3] border border-[#EFEDE7] text-xs font-medium focus:outline-none focus:border-[#D4A359]"
          />
        </div>
      </div>

      <!-- Large Horizontal Cards Stack -->
      @if (filteredTrips.length > 0) {
        <div class="space-y-6">
          @for (trip of filteredTrips; track trip.id) {
            <app-trip-card
              [trip]="trip"
              (onEdit)="editTrip(trip)"
              (onDelete)="deleteTrip(trip)"
            ></app-trip-card>
          }
        </div>
      } @else {
        <app-empty-state
          iconName="map"
          title="No journeys found in this category"
          description="Ready for your next expedition? Build an unforgettable personalized travel itinerary in minutes."
          actionLabel="Architect a Trip"
          (action)="createFirstTrip()"
        ></app-empty-state>
      }

      <!-- Edit Trip Modal -->
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
                  <option value="Upcoming">Upcoming</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                </select>
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

  statusTabs = ['All Journeys', 'Upcoming', 'Completed'];
  activeTab = 'All Journeys';
  searchQuery = '';

  editingTrip: Trip | null = null;

  get trips(): Trip[] {
    return this.tripService.getTrips();
  }

  get filteredTrips(): Trip[] {
    return this.trips.filter(t => {
      const matchesTab =
        this.activeTab === 'All Journeys' ||
        (this.activeTab === 'Upcoming' && (t.status === 'Upcoming' || t.status === 'Ongoing')) ||
        (this.activeTab === 'Completed' && t.status === 'Completed');

      const matchesSearch =
        !this.searchQuery.trim() ||
        t.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        t.destination.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        t.country.toLowerCase().includes(this.searchQuery.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }

  selectTab(tab: string): void {
    this.activeTab = tab;
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
