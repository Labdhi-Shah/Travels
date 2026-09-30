import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideIconComponent } from '../../shared/icon/lucide-icon.component';
import { ActivityCardComponent } from '../../shared/activity-card/activity-card.component';
import { ModalComponent } from '../../shared/modal/modal.component';
import { EmptyStateComponent } from '../../shared/empty-state/empty-state.component';
import { ACTIVITIES } from '../../data/activities';
import { Activity } from '../../models/activity.model';
import { BookingService } from '../../core/services/booking.service';

@Component({
  selector: 'app-experiences',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideIconComponent, ActivityCardComponent, ModalComponent, EmptyStateComponent],
  template: `
    <div class="pt-28 pb-24 bg-[#F8FAFC] min-h-screen text-[#0B192C]">
      
      <!-- Editorial Hero Banner -->
      <section class="relative bg-[#071F22] text-white py-20 px-4 sm:px-6 lg:px-8 mb-12 overflow-hidden border-b border-[#D4A359]/20">
        <div class="absolute -top-32 -right-32 w-96 h-96 bg-[#D4A359]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="max-w-7xl mx-auto space-y-4 text-center relative z-10">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[#D4A359]/30 text-xs font-semibold text-[#D4A359] uppercase tracking-wider">
            <app-icon name="sparkles" [size]="13"></app-icon>
            Beyond Ordinary Adventures
          </div>
          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight">
            Travel is <span class="font-script text-[#D4A359] font-normal text-4xl sm:text-6xl">More Than a Place</span>
          </h1>
          <p class="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Immerse yourself in authentic moments: volcanic sunrises, artisan tastings, undersea safaris, and private cultural expeditions.
          </p>
        </div>
      </section>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Category Filter Tabs -->
        <div class="bg-white rounded-3xl p-5 shadow-sm border border-slate-200/90 mb-10">
          <div class="flex items-center gap-2.5 overflow-x-auto pb-1 no-scrollbar">
            <button
              type="button"
              (click)="selectCategory('All')"
              class="px-5 py-2 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer"
              [ngClass]="selectedCategory === 'All' ? 'bg-[#0A2D30] text-white shadow-sm ring-1 ring-[#D4A359]/30' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'"
            >
              All Vibes
            </button>
            <button
              *ngFor="let cat of categories"
              type="button"
              (click)="selectCategory(cat)"
              class="px-5 py-2 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer"
              [ngClass]="selectedCategory === cat ? 'bg-[#0A2D30] text-white shadow-sm ring-1 ring-[#D4A359]/30' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'"
            >
              {{ cat }}
            </button>
          </div>
        </div>

        <!-- Experiences Grid -->
        <div *ngIf="filteredActivities.length > 0; else emptyTpl" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          <app-activity-card
            *ngFor="let act of filteredActivities"
            [activity]="act"
            (onBook)="bookActivity(act)"
          ></app-activity-card>
        </div>

        <ng-template #emptyTpl>
          <app-empty-state
            iconName="sparkles"
            title="No experiences in this category"
            description="Try selecting a different travel style or browsing all vibes."
            actionLabel="View All Experiences"
            (action)="selectCategory('All')"
          ></app-empty-state>
        </ng-template>

      </div>

      <!-- Experience Booking Modal -->
      <app-modal
        [isOpen]="selectedActivity !== null"
        title="Reserve Experience"
        [subtitle]="selectedActivity?.title"
        iconName="sparkles"
        (close)="selectedActivity = null"
      >
        <div *ngIf="selectedActivity" class="space-y-4 text-xs sm:text-sm">
          <img [src]="selectedActivity.image" [alt]="selectedActivity.title" class="w-full h-44 rounded-2xl object-cover" />
          
          <div class="flex items-center justify-between border-b border-[#EFEDE7] pb-3">
            <div>
              <p class="font-serif font-bold text-base text-[#0B1320]">{{ selectedActivity.title }}</p>
              <p class="text-xs text-[#6B7280]">{{ selectedActivity.location }} • {{ selectedActivity.duration }}</p>
            </div>
            <div class="text-right">
              <span class="text-lg font-serif font-bold text-[#0B1320]">\${{ selectedActivity.price }}</span>
              <span class="text-xs text-[#6B7280] block">/ person</span>
            </div>
          </div>

          <div *ngIf="selectedActivity.included" class="p-4 bg-[#EFEDE7]/70 rounded-2xl space-y-1.5 text-[#17202A] text-xs">
            <p class="font-bold text-[#0B1320]">What's Included in This Experience:</p>
            <p *ngFor="let inc of selectedActivity.included" class="text-[#6B7280]">• {{ inc }}</p>
          </div>

          <div class="pt-3 flex gap-3">
            <button
              type="button"
              (click)="selectedActivity = null"
              class="flex-1 py-3 rounded-full border border-[#EFEDE7] text-[#17202A] text-xs font-semibold hover:bg-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              (click)="confirmExperienceBooking()"
              class="flex-1 py-3 rounded-full bg-[#0A2D30] hover:bg-[#D4A359] hover:text-[#0A2D30] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
            >
              Confirm (\${{ selectedActivity.price }})
            </button>
          </div>
        </div>
      </app-modal>

    </div>
  `
})
export class ExperiencesComponent implements OnInit {
  private bookingService = inject(BookingService);
  private router = inject(Router);

  readonly allActivities: Activity[] = ACTIVITIES;
  filteredActivities: Activity[] = [];

  readonly categories: Activity['category'][] = [
    'Adventure',
    'Beaches',
    'Mountains',
    'Cultural',
    'Food & Dining',
    'Luxury',
    'Wildlife',
    'Photography'
  ];

  selectedCategory = 'All';
  selectedActivity: Activity | null = null;

  ngOnInit(): void {
    this.filteredActivities = [...this.allActivities];
  }

  selectCategory(cat: string): void {
    this.selectedCategory = cat;
    if (cat === 'All') {
      this.filteredActivities = [...this.allActivities];
    } else {
      this.filteredActivities = this.allActivities.filter(a => a.category === cat);
    }
  }

  bookActivity(act: Activity): void {
    this.selectedActivity = act;
  }

  confirmExperienceBooking(): void {
    if (!this.selectedActivity) return;

    this.bookingService.addBooking({
      category: 'Activities',
      title: this.selectedActivity.title,
      provider: 'TripSphere Experiences',
      location: this.selectedActivity.location,
      date: new Date().toISOString().split('T')[0],
      time: '10:00 AM',
      price: this.selectedActivity.price,
      details: `${this.selectedActivity.duration} duration. Included: ${this.selectedActivity.included?.join(', ') || 'Guide service'}`,
      guestName: 'Alex Mercer',
      passengersOrGuests: 2,
      status: 'Confirmed'
    });

    this.selectedActivity = null;
    this.router.navigate(['/dashboard/bookings']);
  }
}
