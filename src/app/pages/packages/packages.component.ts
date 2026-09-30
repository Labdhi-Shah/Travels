import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideIconComponent } from '../../shared/icon/lucide-icon.component';
import { PackageCardComponent } from '../../shared/package-card/package-card.component';
import { EmptyStateComponent } from '../../shared/empty-state/empty-state.component';
import { PACKAGES } from '../../data/packages';
import { TourPackage } from '../../models/package.model';

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideIconComponent, PackageCardComponent, EmptyStateComponent],
  template: `
    <div class="pt-24 pb-28 min-h-screen bg-[#F8FAFC] text-[#0B192C]">
      
      <!-- Editorial Page Header -->
      <section class="bg-[#071F22] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 mb-12 relative overflow-hidden border-b border-[#D4A359]/20">
        <div class="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1800&q=80"
            alt="Travel Adventure"
            class="w-full h-full object-cover opacity-20"
          />
          <div class="absolute inset-0 bg-gradient-to-r from-[#071F22] via-[#071F22]/90 to-[#0A2D30]/80"></div>
        </div>

        <div class="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <span class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/40 text-[#D4A359] text-xs font-bold uppercase tracking-widest backdrop-blur-md border border-[#D4A359]/30">
            <app-icon name="award" [size]="13"></app-icon>
            TURNKEY EXPEDITIONS
          </span>
          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-white">
            Curated Tour Packages
          </h1>
          <p class="text-xs sm:text-base text-slate-300 max-w-xl mx-auto font-light leading-relaxed">
            All-inclusive multi-day expeditions featuring handpicked 5-star accommodations, local private hosts, and seamless luxury transfers.
          </p>
        </div>
      </section>

      <!-- Filter Controls Container -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200/90 mb-10 space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <!-- Search -->
            <div class="relative">
              <app-icon name="search" [size]="16" extraClass="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"></app-icon>
              <input
                type="text"
                [(ngModel)]="searchQuery"
                (ngModelChange)="applyFilters()"
                placeholder="Search packages by destination..."
                class="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#D4A359] focus:ring-1 focus:ring-[#D4A359]"
              />
            </div>

            <!-- Category -->
            <div>
              <select
                [(ngModel)]="selectedCategory"
                (ngModelChange)="applyFilters()"
                class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#D4A359] cursor-pointer"
              >
                <option value="All">All Categories</option>
                <option value="Luxury">Luxury Expeditions</option>
                <option value="Cultural">Cultural Immersions</option>
                <option value="Adventure">Active Adventures</option>
                <option value="Beaches">Coastal & Beaches</option>
              </select>
            </div>

            <!-- Duration -->
            <div>
              <select
                [(ngModel)]="selectedDuration"
                (ngModelChange)="applyFilters()"
                class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#D4A359] cursor-pointer"
              >
                <option value="All">Any Duration</option>
                <option value="short">Short Getaway (1–4 Days)</option>
                <option value="medium">Classic Tour (5–7 Days)</option>
                <option value="long">Extended Journey (8+ Days)</option>
              </select>
            </div>

            <!-- Reset Button -->
            <button
              type="button"
              (click)="resetFilters()"
              class="w-full py-3 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              Reset Filters
            </button>

          </div>
        </div>

        <!-- Grid of Packages -->
        @if (filteredPackages.length > 0) {
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            @for (pkg of filteredPackages; track pkg.id) {
              <app-package-card [pkg]="pkg"></app-package-card>
            }
          </div>
        } @else {
          <app-empty-state
            iconName="award"
            title="No packages match your search"
            description="Try changing category or duration filters to find available journeys."
            actionLabel="View All Packages"
            (action)="resetFilters()"
          ></app-empty-state>
        }

      </div>
    </div>
  `
})
export class PackagesComponent implements OnInit {
  allPackages: TourPackage[] = PACKAGES;
  filteredPackages: TourPackage[] = [...PACKAGES];

  searchQuery = '';
  selectedCategory = 'All';
  selectedDuration = 'All';

  ngOnInit() {
    this.applyFilters();
  }

  applyFilters() {
    let list = [...this.allPackages];

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().trim();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.destination.toLowerCase().includes(q) ||
        p.country.toLowerCase().includes(q)
      );
    }

    if (this.selectedCategory !== 'All') {
      list = list.filter(p => p.category.toLowerCase().includes(this.selectedCategory.toLowerCase()));
    }

    if (this.selectedDuration === 'short') {
      list = list.filter(p => p.durationDays <= 4);
    } else if (this.selectedDuration === 'medium') {
      list = list.filter(p => p.durationDays >= 5 && p.durationDays <= 7);
    } else if (this.selectedDuration === 'long') {
      list = list.filter(p => p.durationDays >= 8);
    }

    this.filteredPackages = list;
  }

  resetFilters() {
    this.searchQuery = '';
    this.selectedCategory = 'All';
    this.selectedDuration = 'All';
    this.filteredPackages = [...this.allPackages];
  }
}
