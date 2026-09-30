import { Expense } from '../models/expense.model';

export const INITIAL_EXPENSES: Expense[] = [
  {
    id: 'exp-1',
    tripId: 'japan-adventure-2026',
    category: 'Flights',
    title: 'ANA SFO ⇄ Haneda Flight Tickets',
    amount: 1850,
    date: '2026-01-20',
    paymentMethod: 'Credit Card',
    notes: 'Booked via ANA official portal'
  },
  {
    id: 'exp-2',
    tripId: 'japan-adventure-2026',
    category: 'Hotels',
    title: 'Hotel Groove Shinjuku (2 Nights)',
    amount: 680,
    date: '2026-02-14',
    paymentMethod: 'Credit Card',
    notes: 'Paid deposit via Booking.com'
  },
  {
    id: 'exp-3',
    tripId: 'japan-adventure-2026',
    category: 'Hotels',
    title: 'Sowaka Heritage Machiya Kyoto (4 Nights)',
    amount: 1620,
    date: '2026-02-18',
    paymentMethod: 'Credit Card',
    notes: 'Luxury ryokan with kaiseki package'
  },
  {
    id: 'exp-4',
    tripId: 'japan-adventure-2026',
    category: 'Transportation',
    title: '7-Day JR Green Car Pass (x2)',
    amount: 590,
    date: '2026-03-01',
    paymentMethod: 'Credit Card',
    notes: 'Official JR voucher exchange orders'
  },
  {
    id: 'exp-5',
    tripId: 'japan-adventure-2026',
    category: 'Activities',
    title: 'Shibuya Sky Sunset Entry',
    amount: 48,
    date: '2026-03-10',
    paymentMethod: 'Credit Card',
    notes: 'Online advance purchase'
  },
  {
    id: 'exp-6',
    tripId: 'japan-adventure-2026',
    category: 'Food',
    title: 'Michelin 3-Star Kaiseki Deposit',
    amount: 200,
    date: '2026-03-15',
    paymentMethod: 'Credit Card',
    notes: '50% advance deposit for Gion Sasaki'
  },
  {
    id: 'exp-7',
    tripId: 'japan-adventure-2026',
    category: 'Shopping',
    title: 'Travel Gear & Packing Cubes',
    amount: 135,
    date: '2026-04-02',
    paymentMethod: 'Credit Card',
    notes: 'Lightweight weather-resistant daypacks'
  }
];
