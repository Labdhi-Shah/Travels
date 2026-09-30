export type BookingCategory =
  | 'Flights'
  | 'Hotels'
  | 'Hotel'
  | 'Activities'
  | 'Restaurants'
  | 'Transportation'
  | 'Package'
  | 'Packages';

export interface Booking {
  id: string;
  reference: string;
  tripId?: string;
  category: BookingCategory;
  title: string;
  provider?: string;
  location: string;
  date: string;
  time?: string;
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
  price?: number;
  amount?: number;
  confirmationCode?: string;
  currency?: string;
  details: string;
  guestName?: string;
  passengersOrGuests?: number;
  confirmationFile?: string;
}
