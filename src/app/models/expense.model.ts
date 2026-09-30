export type ExpenseCategory =
  | 'Flights'
  | 'Hotels'
  | 'Food'
  | 'Activities'
  | 'Shopping'
  | 'Transportation'
  | 'Transport'
  | 'Other';

export interface Expense {
  id: string;
  tripId: string;
  category: ExpenseCategory;
  title: string;
  description?: string;
  amount: number;
  date: string;
  paymentMethod: 'Credit Card' | 'Cash' | 'Debit Card' | 'Digital Wallet';
  notes?: string;
}

export interface BudgetCategorySummary {
  category: ExpenseCategory;
  allocated: number;
  spent: number;
  color: string;
}
