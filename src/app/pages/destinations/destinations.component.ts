import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LucideIconComponent } from '../../shared/icon/lucide-icon.component';
import { DestinationCardComponent } from '../../shared/destination-card/destination-card.component';
import { EmptyStateComponent } from '../../shared/empty-state/empty-state.component';
import { DESTINATIONS } from '../../data/destinations';
import { Destination } from '../../models/destination.model';

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideIconComponent, DestinationCardComponent, EmptyStateComponent],
  template: `
    <div class="pt-24 pb-28 min-h-screen bg-[#F8FAFC] text-[#0B192C]">
      
      <!-- Editorial Page Header Banner -->
      <section class="relative bg-[#071F22] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden mb-12 border-b border-[#D4A359]/20">
        <div class="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1800&q=80"
            alt="World Map"
            class="w-full h-full object-cover opacity-20"
          />
          <div class="absolute inset-0 bg-gradient-to-r from-[#071F22] via-[#071F22]/90 to-[#0A2D30]/80"></div>
        </div>

        <div class="max-w-4xl mx-auto text-center space-y-4">
          <span class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/40 text-[#D4A359] text-xs font-bold uppercase tracking-widest backdrop-blur-sm border border-[#D4A359]/30">
            <app-icon name="compass" [size]="13"></app-icon>
            GLOBAL DESTINATION PORTFOLIO
          </span>
          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-white">
            Discover Your Next Destination
          </h1>
          <p class="text-xs sm:text-base text-slate-300 max-w-xl mx-auto font-light leading-relaxed">
            Filter through breathtaking destinations worldwide by region, travel style, budget, and verified guest ratings.
          </p>
        </div>
      </section>

      <!-- Main Container with Filters & Grid -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Controls & Search Bar Row -->
        <div class="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200/90 mb-10 space-y-4">
          
          <div class="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            <!-- Search -->
            <div class="relative flex-1">
              <app-icon name="search" [size]="16" extraClass="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"></app-icon>
              <input
                type="text"
                [(ngModel)]="searchQuery"
                (ngModelChange)="applyFilters()"
                placeholder="Search destination, country, or keyword..."
                class="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#D4A359] focus:ring-1 focus:ring-[#D4A359]"
              />
            </div>

            <!-- Region dropdown -->
            <div class="w-full md:w-52">
              <select
                [(ngModel)]="selectedRegion"
                (ngModelChange)="applyFilters()"
                class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#D4A359] cursor-pointer"
              >
                <option value="All">All Regions</option>
                <option value="Europe">Europe</option>
                <option value="Asia">Asia</option>
                <option value="Americas">Americas</option>
                <option value="Middle East">Middle East</option>
                <option value="Oceania">Oceania</option>
              </select>
            </div>

            <!-- Sort By -->
            <div class="w-full md:w-52">
              <select
                [(ngModel)]="sortBy"
                (ngModelChange)="applyFilters()"
                class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#D4A359] cursor-pointer"
              >
                <option value="popular">Recommended</option>
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Destination A-Z</option>
              </select>
            </div>

            <!-- Reset Button -->
            <button
              type="button"
              (click)="resetFilters()"
              class="px-4 py-3 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold shrink-0 transition-colors cursor-pointer"
            >
              Reset
            </button>
          </div>

          <!-- Travel Style Pills -->
          <div class="pt-3 border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1 shrink-0">Style:</span>
            <button
              type="button"
              (click)="selectStyle('All')"
              class="px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer"
              [ngClass]="selectedStyle === 'All' ? 'bg-[#0A2D30] text-white shadow-sm ring-1 ring-[#D4A359]/30' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'"
            >
              All Styles
            </button>
            @for (style of availableStyles; track style) {
              <button
                type="button"
                (click)="selectStyle(style)"
                class="px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer"
                [ngClass]="selectedStyle === style ? 'bg-[#0A2D30] text-white shadow-sm ring-1 ring-[#D4A359]/30' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'"
              >
                {{ style }}
              </button>
            }
          </div>

        </div>

        <!-- Destination Cards Grid -->
        @if (filteredDestinations.length > 0) {
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            @for (dest of filteredDestinations; track dest.id) {
              <app-destination-card [destination]="dest"></app-destination-card>
            }
          </div>
        } @else {
          <app-empty-state
            iconName="map"
            title="No destinations match your criteria"
            description="Try loosening your search terms or clearing region and style filters."
            actionLabel="Reset All Filters"
            (action)="resetFilters()"
          ></app-empty-state>
        }

      </div>
    </div>
  `
})
export class DestinationsComponent implements OnInit {
  private route = inject(ActivatedRoute);

  allDestinations: Destination[] = DESTINATIONS;
  filteredDestinations: Destination[] = [...DESTINATIONS];

  searchQuery = '';
  selectedRegion = 'All';
  selectedStyle = 'All';
  sortBy = 'popular';

  availableStyles = ['Beach', 'Culture', 'Romantic', 'Adventure', 'Nature', 'City', 'Relaxation'];

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['q']) this.searchQuery = params['q'];
      if (params['region']) this.selectedRegion = params['region'];
      if (params['style']) this.selectedStyle = params['style'];
      this.applyFilters();
    });
  }

  selectStyle(style: string) {
    this.selectedStyle = style;
    this.applyFilters();
  }

  applyFilters() {
    let list = [...this.allDestinations];

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().trim();
      list = list.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q)
      );
    }

    if (this.selectedRegion !== 'All') {
      list = list.filter(d => d.region.toLowerCase() === this.selectedRegion.toLowerCase());
    }

    if (this.selectedStyle !== 'All') {
      list = list.filter(d => d.travelTypes.some(t => t.toLowerCase() === this.selectedStyle.toLowerCase()));
    }

    if (this.sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (this.sortBy === 'price-asc') {
      list.sort((a, b) => a.startingPrice - b.startingPrice);
    } else if (this.sortBy === 'price-desc') {
      list.sort((a, b) => b.startingPrice - a.startingPrice);
    } else if (this.sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    this.filteredDestinations = list;
  }

  resetFilters() {
    this.searchQuery = '';
    this.selectedRegion = 'All';
    this.selectedStyle = 'All';
    this.sortBy = 'popular';
    this.filteredDestinations = [...this.allDestinations];
  }
}
