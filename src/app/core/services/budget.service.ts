import { Injectable, signal, inject } from '@angular/core';
import { StorageService } from './storage.service';
import { Expense, ExpenseCategory, BudgetCategorySummary } from '../../models/expense.model';
import { INITIAL_EXPENSES } from '../../data/initial-expenses';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private storage = inject(StorageService);

  private expensesSignal = signal<Expense[]>(
    this.storage.getItem<Expense[]>('expenses', INITIAL_EXPENSES)
  );
  readonly expenses = this.expensesSignal.asReadonly();

  private categoryColors: Record<ExpenseCategory, string> = {
    Flights: '#1D3557', // Secondary navy
    Hotels: '#0B1320', // Midnight primary
    Food: '#F4A261', // Warm peach/gold
    Activities: '#D4A359', // Gold accent
    Shopping: '#9333EA', // Purple
    Transportation: '#457B9D', // Steel blue
    Transport: '#457B9D', // Steel blue alias
    Other: '#6B7280' // Muted gray
  };

  getExpenses(tripId?: string): Expense[] {
    const list = this.expensesSignal();
    return tripId ? list.filter(e => e.tripId === tripId) : list;
  }

  getTotalSpent(tripId?: string): number {
    return this.getExpenses(tripId).reduce((sum, item) => sum + item.amount, 0);
  }

  getCategoryBreakdown(tripId?: string): BudgetCategorySummary[] {
    const expenses = this.getExpenses(tripId);
    const categories: ExpenseCategory[] = [
      'Flights',
      'Hotels',
      'Food',
      'Activities',
      'Shopping',
      'Transport',
      'Transportation',
      'Other'
    ];

    const categoryAllocations: Record<ExpenseCategory, number> = {
      Flights: 2200,
      Hotels: 2500,
      Food: 800,
      Activities: 500,
      Shopping: 300,
      Transport: 700,
      Transportation: 700,
      Other: 200
    };

    return categories.map(cat => {
      const spent = expenses
        .filter(e => e.category === cat)
        .reduce((sum, e) => sum + e.amount, 0);

      return {
        category: cat,
        allocated: categoryAllocations[cat] || 500,
        spent,
        color: this.categoryColors[cat] || '#94a3b8'
      };
    });
  }

  addExpense(data: Omit<Expense, 'id'>): Expense {
    const newExpense: Expense = {
      ...data,
      id: 'exp-' + Date.now()
    };

    const updated = [newExpense, ...this.expensesSignal()];
    this.expensesSignal.set(updated);
    this.storage.setItem('expenses', updated);
    return newExpense;
  }

  updateExpense(id: string, updates: Partial<Expense>): Expense | null {
    const current = this.expensesSignal();
    const index = current.findIndex(e => e.id === id);
    if (index === -1) return null;

    const updatedExpense: Expense = { ...current[index], ...updates };
    const updated = [...current];
    updated[index] = updatedExpense;

    this.expensesSignal.set(updated);
    this.storage.setItem('expenses', updated);
    return updatedExpense;
  }

  deleteExpense(id: string): boolean {
    const filtered = this.expensesSignal().filter(e => e.id !== id);
    this.expensesSignal.set(filtered);
    this.storage.setItem('expenses', filtered);
    return true;
  }
}
