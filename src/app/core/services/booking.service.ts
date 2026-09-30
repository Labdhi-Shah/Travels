import { Injectable, signal, inject } from '@angular/core';
import { StorageService } from './storage.service';
import { Booking, BookingCategory } from '../../models/booking.model';
import { INITIAL_BOOKINGS } from '../../data/initial-bookings';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private storage = inject(StorageService);

  private bookingsSignal = signal<Booking[]>(
    this.storage.getItem<Booking[]>('bookings', INITIAL_BOOKINGS)
  );
  readonly bookings = this.bookingsSignal.asReadonly();

  getBookings(): Booking[] {
    return this.bookingsSignal();
  }

  getBookingsByTripId(tripId: string): Booking[] {
    return this.bookingsSignal().filter(b => b.tripId === tripId);
  }

  getBookingsByCategory(category: BookingCategory): Booking[] {
    return this.bookingsSignal().filter(b => b.category === category);
  }

  addBooking(bookingData: Omit<Booking, 'id' | 'reference' | 'status'> & { status?: Booking['status'] }): Booking {
    const reference = 'TS-' + bookingData.category.substring(0, 2).toUpperCase() + '-' + Math.floor(1000 + Math.random() * 9000);
    const newBooking: Booking = {
      ...bookingData,
      id: 'bkg-' + Date.now(),
      reference,
      status: bookingData.status || 'Confirmed'
    };

    const updated = [newBooking, ...this.bookingsSignal()];
    this.bookingsSignal.set(updated);
    this.storage.setItem('bookings', updated);
    return newBooking;
  }

  createBooking(bookingData: any): Booking {
    return this.addBooking(bookingData);
  }

  cancelBooking(id: string): void {
    const current = this.bookingsSignal();
    const index = current.findIndex(b => b.id === id);
    if (index !== -1) {
      const updated = [...current];
      updated[index] = { ...updated[index], status: 'Cancelled' };
      this.bookingsSignal.set(updated);
      this.storage.setItem('bookings', updated);
    }
  }

  updateBookingStatus(id: string, status: Booking['status']): void {
    const current = this.bookingsSignal();
    const index = current.findIndex(b => b.id === id);
    if (index !== -1) {
      const updated = [...current];
      updated[index] = { ...updated[index], status };
      this.bookingsSignal.set(updated);
      this.storage.setItem('bookings', updated);
    }
  }

  updateBooking(id: string, updates: Partial<Booking>): Booking | null {
    const current = this.bookingsSignal();
    const index = current.findIndex(b => b.id === id);
    if (index === -1) return null;

    const updatedBooking = { ...current[index], ...updates };
    const updated = [...current];
    updated[index] = updatedBooking;
    this.bookingsSignal.set(updated);
    this.storage.setItem('bookings', updated);
    return updatedBooking;
  }

  deleteBooking(id: string): void {
    const updated = this.bookingsSignal().filter(b => b.id !== id);
    this.bookingsSignal.set(updated);
    this.storage.setItem('bookings', updated);
  }
}
