import { Component, inject, HostListener, ElementRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideIconComponent } from '../icon/lucide-icon.component';

export interface SuggestionItem {
  city: string;
  country: string;
}

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideIconComponent],
  template: `
    <div class="relative w-full max-w-4xl mx-auto z-30">
      <!-- White Floating Search Card matching Screenshot 1 -->
      <div
        class="bg-white rounded-3xl sm:rounded-[32px] p-5 sm:p-6 shadow-2xl shadow-black/30 border border-slate-100 text-slate-800 transition-all duration-300 space-y-4"
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-0 lg:divide-x lg:divide-slate-200">
          
          <!-- 1. WHERE TO? -> e.g. Bali, Paris... -->
          <div
            class="relative px-3 sm:px-4 py-2 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer"
            (click)="openSuggestions($event)"
          >
            <div class="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              <app-icon name="map-pin" [size]="13" extraClass="text-slate-400"></app-icon>
              <span>WHERE TO?</span>
            </div>
            <input
              type="text"
              [(ngModel)]="destination"
              name="destination"
              (focus)="onInputFocus()"
              (input)="filterSuggestions()"
              placeholder="e.g. Bali, Paris..."
              autocomplete="off"
              class="w-full text-sm sm:text-base font-medium text-slate-800 placeholder:text-slate-400 bg-transparent focus:outline-none cursor-pointer truncate"
            />

            <!-- Focus Dropdown for Popular Destinations -->
            @if (showDropdown) {
              <div
                class="animate-dropdown absolute top-full left-0 right-0 sm:w-80 mt-2 bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 overflow-hidden"
                (click)="$event.stopPropagation()"
              >
                <div class="mb-3">
                  <div class="flex items-center justify-between pb-1.5 border-b border-slate-100 mb-2">
                    <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Popular Destinations
                    </span>
                    <span class="text-[10px] text-[#D4A359] font-bold">Featured</span>
                  </div>
                  <div class="space-y-1">
                    @for (sugg of filteredPopular; track sugg.city) {
                      <button
                        type="button"
                        (click)="selectSuggestion(sugg, $event)"
                        class="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-amber-50/50 text-left transition-colors cursor-pointer group"
                      >
                        <div class="flex items-center gap-2.5 min-w-0">
                          <app-icon name="map-pin" [size]="14" extraClass="text-slate-400 group-hover:text-[#D4A359] shrink-0"></app-icon>
                          <div>
                            <span class="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-[#D4A359]">
                              {{ sugg.city }}
                            </span>
                            <span class="text-[11px] text-slate-400 ml-1.5">
                              {{ sugg.country }}
                            </span>
                          </div>
                        </div>
                        <app-icon name="chevron-right" [size]="13" extraClass="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity"></app-icon>
                      </button>
                    }
                  </div>
                </div>
              </div>
            }
          </div>

          <!-- 2. START DATE -> dd-mm-yyyy -->
          <div
            class="px-3 sm:px-4 py-2 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer flex flex-col justify-center"
            (click)="triggerDatePicker(startDateInput)"
          >
            <div class="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              <app-icon name="calendar" [size]="13" extraClass="text-slate-400"></app-icon>
              <span>START DATE</span>
            </div>
            <div class="flex items-center justify-between">
              <span
                class="text-sm sm:text-base font-medium select-none"
                [ngClass]="startDate ? 'text-slate-800 font-semibold' : 'text-slate-400'"
              >
                {{ formatDisplayDate(startDate) || 'dd-mm-yyyy' }}
              </span>
              <app-icon name="calendar" [size]="16" extraClass="text-slate-400"></app-icon>
            </div>
            <input
              #startDateInput
              type="date"
              [(ngModel)]="startDate"
              name="startDate"
              class="sr-only"
            />
          </div>

          <!-- 3. END DATE -> dd-mm-yyyy -->
          <div
            class="px-3 sm:px-4 py-2 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer flex flex-col justify-center"
            (click)="triggerDatePicker(endDateInput)"
          >
            <div class="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              <app-icon name="calendar" [size]="13" extraClass="text-slate-400"></app-icon>
              <span>END DATE</span>
            </div>
            <div class="flex items-center justify-between">
              <span
                class="text-sm sm:text-base font-medium select-none"
                [ngClass]="endDate ? 'text-slate-800 font-semibold' : 'text-slate-400'"
              >
                {{ formatDisplayDate(endDate) || 'dd-mm-yyyy' }}
              </span>
              <app-icon name="calendar" [size]="16" extraClass="text-slate-400"></app-icon>
            </div>
            <input
              #endDateInput
              type="date"
              [(ngModel)]="endDate"
              name="endDate"
              class="sr-only"
            />
          </div>

          <!-- 4. GUESTS -> 2 Travelers -->
          <div
            class="px-3 sm:px-4 py-2 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer flex flex-col justify-center"
            (click)="guestsSelect.focus()"
          >
            <div class="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              <app-icon name="users" [size]="13" extraClass="text-slate-400"></app-icon>
              <span>GUESTS</span>
            </div>
            <div class="flex items-center justify-between">
              <select
                #guestsSelect
                [(ngModel)]="travelers"
                name="travelers"
                class="w-full text-sm sm:text-base font-medium text-slate-800 bg-transparent focus:outline-none cursor-pointer truncate"
              >
                <option value="1 Traveler">1 Traveler</option>
                <option value="2 Travelers">2 Travelers</option>
                <option value="3 Travelers">3 Travelers</option>
                <option value="4+ Travelers">4+ Travelers</option>
              </select>
              <app-icon name="users" [size]="16" extraClass="text-slate-400 pointer-events-none"></app-icon>
            </div>
          </div>

        </div>

        <!-- 5. CTA BUTTON: + Create Trip (Full width, Dark Emerald/Teal matching Screenshot 1) -->
        <button
          type="button"
          (click)="onCreateTrip()"
          class="w-full py-3.5 sm:py-4 rounded-full bg-[#0C3B3E] hover:bg-[#072527] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-[#0C3B3E]/30 hover:shadow-xl transition-all duration-300 cursor-pointer active:scale-[0.99]"
        >
          <div class="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center font-bold text-xs">
            +
          </div>
          <span>Create Trip</span>
        </button>

      </div>
    </div>
  `
})
export class SearchBarComponent {
  private router = inject(Router);
  private elementRef = inject(ElementRef);

  @Input() variant: 'white' | 'glass' = 'white';

  destination = '';
  startDate = '';
  endDate = '';
  selectedDate = '';
  displayDate = 'Select date';
  travelers = '2 Travelers';
  budget = 'Select budget';

  showDropdown = false;
  isFocused = false;

  readonly popularDestinations: SuggestionItem[] = [
    { city: 'Bali', country: 'Indonesia' },
    { city: 'Dubai', country: 'UAE' },
    { city: 'Paris', country: 'France' },
    { city: 'Switzerland', country: 'Switzerland' },
    { city: 'Maldives', country: 'Maldives' },
    { city: 'London', country: 'UK' },
    { city: 'Kyoto', country: 'Japan' },
    { city: 'Goa', country: 'India' }
  ];

  recentSearches: string[] = ['Bali', 'Dubai', 'Paris', 'Switzerland'];
  filteredPopular: SuggestionItem[] = [...this.popularDestinations];

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showDropdown = false;
      this.isFocused = false;
    }
  }

  openSuggestions(event?: Event) {
    if (event) event.stopPropagation();
    this.showDropdown = true;
    this.isFocused = true;
  }

  onInputFocus() {
    this.showDropdown = true;
    this.isFocused = true;
  }

  filterSuggestions() {
    const q = this.destination.trim().toLowerCase();
    if (!q) {
      this.filteredPopular = [...this.popularDestinations];
    } else {
      this.filteredPopular = this.popularDestinations.filter(
        item =>
          item.city.toLowerCase().includes(q) ||
          item.country.toLowerCase().includes(q)
      );
    }
  }

  selectSuggestion(item: SuggestionItem, event?: Event) {
    if (event) event.stopPropagation();
    this.destination = item.city;
    this.showDropdown = false;
    this.isFocused = false;
  }

  quickPick(city: string, event?: Event) {
    if (event) event.stopPropagation();
    this.destination = city;
    this.showDropdown = false;
    this.isFocused = false;
  }

  triggerDatePicker(input: HTMLInputElement) {
    try {
      if ('showPicker' in HTMLInputElement.prototype) {
        input.showPicker();
      } else {
        input.focus();
      }
    } catch {
      input.focus();
    }
  }

  formatDisplayDate(val: string): string {
    if (!val) return '';
    const parts = val.split('-');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return val;
  }

  onDateChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.value) {
      const d = new Date(target.value);
      this.displayDate = d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    } else {
      this.displayDate = 'Select date';
    }
  }

  onCreateTrip() {
    this.showDropdown = false;
    this.isFocused = false;
    this.router.navigate(['/plan-trip'], {
      queryParams: {
        destination: this.destination.trim() || 'Bali',
        startDate: this.startDate,
        endDate: this.endDate,
        travelers: this.travelers
      }
    });
  }

  onSearch() {
    this.onCreateTrip();
  }
}
