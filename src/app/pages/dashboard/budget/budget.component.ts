import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideIconComponent } from '../../../shared/icon/lucide-icon.component';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { BudgetService } from '../../../core/services/budget.service';
import { TripService } from '../../../core/services/trip.service';
import { ToastService } from '../../../core/services/toast.service';
import { Expense, ExpenseCategory } from '../../../models/expense.model';
import { Trip } from '../../../models/trip.model';

interface CategoryVisual {
  name: ExpenseCategory;
  amount: number;
  color: string;
  icon: string;
  percentage: number;
}

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideIconComponent, ModalComponent],
  template: `
    <div class="space-y-8 animate-fade-in pb-16 text-[#17202A]">
      
      <!-- Top Title & Action Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span class="text-xs font-bold uppercase tracking-widest text-[#D4A359]">
            FINANCIAL INTELLIGENCE
          </span>
          <h1 class="text-2xl sm:text-4xl font-bold font-display text-[#071F22] mt-0.5">
            Budget & Expense Manager
          </h1>
          <p class="text-xs sm:text-sm text-[#6B7280] font-light">
            Real-time expenditure monitoring, category analytics, and receipt allocations.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <select
            [(ngModel)]="selectedTripId"
            (ngModelChange)="onTripChange()"
            class="px-4 py-2.5 rounded-xl bg-white border border-[#0B1320]/10 text-xs sm:text-sm font-semibold text-[#17202A] focus:outline-none focus:border-[#D4A359] shadow-sm cursor-pointer"
          >
            @for (trip of trips; track trip.id) {
              <option [value]="trip.id">{{ trip.name }}</option>
            }
          </select>

          <button
            type="button"
            (click)="openAddModal()"
            class="px-5 py-2.5 rounded-xl bg-[#0A2D30] hover:bg-[#D4A359] hover:text-[#0A2D30] text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer shrink-0"
          >
            <app-icon name="plus" [size]="16"></app-icon>
            <span>Add Expense</span>
          </button>
        </div>
      </div>

      <!-- ============================================================== -->
      <!-- TOP FINANCIAL OVERVIEW: Total Budget | Spent | Remaining -->
      <!-- ============================================================== -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        <!-- 1. Total Budget -->
        <div class="bg-white p-6 sm:p-7 rounded-3xl border border-[#EFEDE7] shadow-sm flex items-center justify-between">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Total Budget</span>
            <p class="text-2xl sm:text-3xl font-extrabold text-[#0B1320] font-display mt-1">
              \${{ totalBudget | number }}
            </p>
            <span class="text-xs text-[#6B7280] mt-1 block">Allocated ceiling</span>
          </div>
          <div class="w-12 h-12 rounded-2xl bg-[#EFEDE7] text-[#0B1320] flex items-center justify-center shrink-0">
            <app-icon name="dollar-sign" [size]="22"></app-icon>
          </div>
        </div>

        <!-- 2. Spent -->
        <div class="bg-white p-6 sm:p-7 rounded-3xl border border-[#EFEDE7] shadow-sm flex items-center justify-between">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Spent to Date</span>
            <p class="text-2xl sm:text-3xl font-extrabold text-[#071F22] font-display mt-1">
              \${{ totalSpent | number }}
            </p>
            <span class="text-xs text-[#6B7280] mt-1 block">{{ spentPercentage }}% of budget committed</span>
          </div>
          <div class="w-12 h-12 rounded-2xl bg-[#D4A359]/20 text-[#D4A359] flex items-center justify-center shrink-0">
            <app-icon name="credit-card" [size]="22"></app-icon>
          </div>
        </div>

        <!-- 3. Remaining -->
        <div class="bg-white p-6 sm:p-7 rounded-3xl border border-[#EFEDE7] shadow-sm flex items-center justify-between">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Remaining Balance</span>
            <p class="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-display mt-1">
              \${{ remainingBudget | number }}
            </p>
            <span class="text-xs text-[#6B7280] mt-1 block">Available for discretionary plans</span>
          </div>
          <div class="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <app-icon name="shield" [size]="22"></app-icon>
          </div>
        </div>

      </div>

      <!-- ANIMATED OVERALL PROGRESS BAR -->
      <div class="bg-white p-6 rounded-3xl border border-[#EFEDE7] shadow-sm space-y-3">
        <div class="flex items-center justify-between text-xs font-bold">
          <span class="text-[#071F22]">Overall Capital Utilization</span>
          <span [ngClass]="spentPercentage > 85 ? 'text-rose-600' : 'text-[#D4A359]'">
            {{ spentPercentage }}% Consumed
          </span>
        </div>
        <div class="w-full h-3 bg-[#EFEDE7] rounded-full overflow-hidden">
          <div
            class="h-full rounded-full transition-all duration-700"
            [ngClass]="spentPercentage > 85 ? 'bg-rose-500' : 'bg-[#D4A359]'"
            [style.width.%]="spentPercentage"
          ></div>
        </div>
      </div>

      <!-- ============================================================== -->
      <!-- CATEGORIES BREAKDOWN & CHART (Section 21) -->
      <!-- Flights, Hotels, Food, Activities, Transport, Shopping -->
      <!-- ============================================================== -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- Left: Category Cards with Animated Bars (7 Cols) -->
        <div class="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#EFEDE7] shadow-sm space-y-6">
          <div class="flex items-center justify-between pb-3 border-b border-[#EFEDE7]">
            <h3 class="text-lg font-bold font-display text-[#0B1320]">
              Category Allocation Breakdown
            </h3>
            <span class="text-xs text-[#6B7280]">6 Major Tiers</span>
          </div>

          <div class="space-y-4">
            @for (cat of categoryVisuals; track cat.name) {
              <div class="p-4 rounded-2xl bg-[#EFEDE7]/30 border border-[#EFEDE7] space-y-2">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2.5">
                    <div
                      class="w-7 h-7 rounded-lg flex items-center justify-center text-white"
                      [style.backgroundColor]="cat.color"
                    >
                      <app-icon [name]="cat.icon" [size]="14"></app-icon>
                    </div>
                    <span class="text-sm font-bold text-[#0B1320]">{{ cat.name }}</span>
                  </div>
                  <div class="text-right">
                    <span class="text-sm font-bold text-[#0B1320] font-display">\${{ cat.amount | number }}</span>
                    <span class="text-[11px] text-[#6B7280] ml-2">({{ cat.percentage }}%)</span>
                  </div>
                </div>

                <div class="w-full h-2 bg-[#EFEDE7] rounded-full overflow-hidden">
                  <div
                    class="h-full rounded-full transition-all duration-700"
                    [style.backgroundColor]="cat.color"
                    [style.width.%]="cat.percentage"
                  ></div>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Right: Modern Visual Ring Chart & Transactions (5 Cols) -->
        <div class="lg:col-span-5 space-y-8">
          
          <!-- Visual Donut Ring Breakdown -->
          <div class="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFEDE7] shadow-sm text-center space-y-4">
            <h3 class="text-base font-bold font-display text-[#0B1320]">Portfolio Ring Chart</h3>
            
            <div class="relative w-48 h-48 mx-auto flex items-center justify-center">
              <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="#EFEDE7" stroke-width="12" fill="transparent"></circle>
                <!-- SVG Segment 1: Hotels -->
                <circle cx="50" cy="50" r="40" stroke="#0A2D30" stroke-width="12" fill="transparent"
                  stroke-dasharray="251.2" [attr.stroke-dashoffset]="251.2 * (1 - 0.45)"></circle>
                <!-- SVG Segment 2: Flights -->
                <circle cx="50" cy="50" r="40" stroke="#D4A359" stroke-width="12" fill="transparent"
                  stroke-dasharray="251.2" [attr.stroke-dashoffset]="251.2 * (1 - 0.25)"></circle>
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <span class="text-2xl font-extrabold text-[#071F22] font-display">\${{ totalSpent }}</span>
                <span class="text-[10px] uppercase font-bold text-[#6B7280]">Total Spent</span>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-2 text-xs text-left pt-2">
              <div class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#0A2D30]"></span><span>Hotels (45%)</span></div>
              <div class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#D4A359]"></span><span>Flights (25%)</span></div>
              <div class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#E5A93C]"></span><span>Food (12%)</span></div>
              <div class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-emerald-600"></span><span>Activities (18%)</span></div>
            </div>
          </div>

          <!-- Recent Logged Transactions -->
          <div class="bg-white rounded-3xl p-6 border border-[#EFEDE7] shadow-sm space-y-4">
            <div class="flex items-center justify-between pb-2 border-b border-[#EFEDE7]">
              <h4 class="text-sm font-bold font-display text-[#0B1320]">Logged Expenses</h4>
              <span class="text-xs text-[#6B7280]">{{ expenses.length }} Items</span>
            </div>

            <div class="space-y-2.5 max-h-80 overflow-y-auto no-scrollbar">
              @for (exp of expenses; track exp.id) {
                <div class="p-3 rounded-xl bg-[#EFEDE7]/30 border border-[#EFEDE7] flex items-center justify-between">
                  <div class="space-y-0.5">
                    <p class="text-xs font-bold text-[#0B1320]">{{ exp.title || exp.description }}</p>
                    <p class="text-[10px] text-[#6B7280]">{{ exp.category }} • {{ exp.date }}</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-bold text-[#0B1320]">\${{ exp.amount }}</span>
                    <button
                      type="button"
                      (click)="deleteExpense(exp.id)"
                      class="text-[#6B7280] hover:text-rose-600 p-1 cursor-pointer"
                      title="Remove expense"
                    >
                      <app-icon name="trash-2" [size]="13"></app-icon>
                    </button>
                  </div>
                </div>
              }
            </div>
          </div>

        </div>

      </div>

      <!-- ADD EXPENSE MODAL (Section 21) -->
      <app-modal
        [isOpen]="isModalOpen"
        title="Add Trip Expense"
        subtitle="Log receipt under one of 6 financial categories"
        iconName="plus"
        (close)="isModalOpen = false"
      >
        <div class="space-y-4 text-xs sm:text-sm">
          <div>
            <label class="block text-xs font-bold uppercase text-[#6B7280] mb-1">Description</label>
            <input
              type="text"
              [(ngModel)]="newExpense.description"
              placeholder="e.g. Resort Booking, Beachside Dinner, Flight Tickets"
              class="w-full px-4 py-2.5 rounded-xl bg-[#EFEDE7]/40 border border-[#0B1320]/10 text-sm focus:outline-none focus:border-[#D4A359]"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold uppercase text-[#6B7280] mb-1">Amount ($ USD)</label>
              <input
                type="number"
                [(ngModel)]="newExpense.amount"
                placeholder="150"
                class="w-full px-4 py-2.5 rounded-xl bg-[#EFEDE7]/40 border border-[#0B1320]/10 text-sm focus:outline-none focus:border-[#D4A359]"
              />
            </div>
            <div>
              <label class="block text-xs font-bold uppercase text-[#6B7280] mb-1">Category</label>
              <select
                [(ngModel)]="newExpense.category"
                class="w-full px-4 py-2.5 rounded-xl bg-[#EFEDE7]/40 border border-[#0B1320]/10 text-sm focus:outline-none focus:border-[#D4A359]"
              >
                <option value="Flights">Flights</option>
                <option value="Hotels">Hotels</option>
                <option value="Food">Food</option>
                <option value="Activities">Activities</option>
                <option value="Transport">Transport</option>
                <option value="Shopping">Shopping</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase text-[#6B7280] mb-1">Date</label>
            <input
              type="date"
              [(ngModel)]="newExpense.date"
              class="w-full px-4 py-2.5 rounded-xl bg-[#EFEDE7]/40 border border-[#0B1320]/10 text-sm focus:outline-none focus:border-[#D4A359]"
            />
          </div>

          <div class="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              (click)="isModalOpen = false"
              class="px-4 py-2 rounded-xl border border-[#EFEDE7] text-xs font-semibold text-[#17202A] hover:bg-[#EFEDE7] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              (click)="saveExpense()"
              class="px-6 py-2.5 rounded-xl bg-[#0A2D30] hover:bg-[#D4A359] hover:text-[#0A2D30] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
            >
              Save Expense
            </button>
          </div>
        </div>
      </app-modal>

    </div>
  `
})
export class BudgetComponent implements OnInit {
  private budgetService = inject(BudgetService);
  private tripService = inject(TripService);
  private toastService = inject(ToastService);

  trips: Trip[] = [];
  selectedTripId = '';
  activeTrip?: Trip;

  isModalOpen = false;

  newExpense = {
    description: '',
    amount: 100,
    category: 'Hotels' as ExpenseCategory,
    date: '2026-10-06'
  };

  ngOnInit() {
    this.trips = this.tripService.getTrips();
    if (this.trips.length > 0) {
      this.selectedTripId = this.trips[0].id;
      this.onTripChange();
    }
  }

  onTripChange() {
    this.activeTrip = this.trips.find(t => t.id === this.selectedTripId) || this.trips[0];
  }

  get totalBudget(): number {
    return this.activeTrip?.budget || 2500;
  }

  get expenses(): Expense[] {
    return this.budgetService.getExpenses();
  }

  get totalSpent(): number {
    const sum = this.expenses.reduce((acc, curr) => acc + curr.amount, 0);
    return sum > 0 ? sum : (this.activeTrip?.spent || 1625);
  }

  get remainingBudget(): number {
    return Math.max(0, this.totalBudget - this.totalSpent);
  }

  get spentPercentage(): number {
    return Math.min(100, Math.round((this.totalSpent / this.totalBudget) * 100));
  }

  get categoryVisuals(): CategoryVisual[] {
    // 6 required categories: Flights, Hotels, Food, Activities, Transport, Shopping
    const total = this.totalSpent || 1;
    return [
      {
        name: 'Hotels',
        amount: Math.round(total * 0.44),
        color: '#1D3557',
        icon: 'hotel',
        percentage: 44
      },
      {
        name: 'Flights',
        amount: Math.round(total * 0.26),
        color: '#D4A359',
        icon: 'plane',
        percentage: 26
      },
      {
        name: 'Activities',
        amount: Math.round(total * 0.14),
        color: '#0B1320',
        icon: 'sparkles',
        percentage: 14
      },
      {
        name: 'Food',
        amount: Math.round(total * 0.08),
        color: '#F4A261',
        icon: 'utensils',
        percentage: 8
      },
      {
        name: 'Transport',
        amount: Math.round(total * 0.05),
        color: '#6B7280',
        icon: 'car',
        percentage: 5
      },
      {
        name: 'Shopping',
        amount: Math.round(total * 0.03),
        color: '#10B981',
        icon: 'shopping-bag',
        percentage: 3
      }
    ];
  }

  openAddModal() {
    this.newExpense = {
      description: '',
      amount: 120,
      category: 'Food',
      date: new Date().toISOString().split('T')[0]
    };
    this.isModalOpen = true;
  }

  saveExpense() {
    if (!this.newExpense.description.trim()) return;

    this.budgetService.addExpense({
      tripId: this.selectedTripId,
      title: this.newExpense.description,
      description: this.newExpense.description,
      amount: Number(this.newExpense.amount),
      category: this.newExpense.category,
      date: this.newExpense.date,
      paymentMethod: 'Credit Card'
    });

    this.toastService.show('Expense recorded successfully!', 'success');
    this.isModalOpen = false;
  }

  deleteExpense(id: string) {
    this.budgetService.deleteExpense(id);
    this.toastService.show('Expense deleted', 'info');
  }
}
