import { Injectable, signal, inject } from '@angular/core';
import { StorageService } from './storage.service';
import { ItineraryService } from './itinerary.service';
import { Trip } from '../../models/trip.model';
import { INITIAL_TRIPS } from '../../data/initial-trips';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private storage = inject(StorageService);
  private itineraryService = inject(ItineraryService);

  private tripsSignal = signal<Trip[]>(this.loadTrips());
  readonly trips = this.tripsSignal.asReadonly();

  private loadTrips(): Trip[] {
    const stored = this.storage.getItem<Trip[]>('trips', []);
    if (!stored || stored.length === 0 || !stored.some(t => t.id === 'goa-sun-and-sand')) {
      this.storage.setItem('trips', INITIAL_TRIPS);
      return INITIAL_TRIPS;
    }
    return stored;
  }

  getTrips(): Trip[] {
    return this.tripsSignal();
  }

  getTripById(id: string): Trip | undefined {
    return this.tripsSignal().find(t => t.id === id);
  }

  getConfirmedTrips(): Trip[] {
    return this.tripsSignal().filter(t => t.status === 'Confirmed');
  }

  getUpcomingTrips(): Trip[] {
    return this.tripsSignal().filter(t => t.status === 'Upcoming' || t.status === 'Confirmed');
  }

  getRecentTrips(limit = 3): Trip[] {
    return this.tripsSignal().slice(0, limit);
  }

  generateUniqueTripId(): string {
    const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `TS-2026-${randomSuffix}`;
  }

  createTrip(newTripData: Omit<Trip, 'id' | 'createdAt' | 'spent'> & { spent?: number; id?: string }): Trip {
    const id = newTripData.id || this.generateUniqueTripId();
    const trip: Trip = {
      ...newTripData,
      id,
      spent: newTripData.spent || 0,
      createdAt: new Date().toISOString(),
      progress: newTripData.progress !== undefined ? newTripData.progress : 25,
      status: newTripData.status || 'Draft'
    };

    const current = this.tripsSignal();
    const existingIndex = current.findIndex(t => t.id === id);
    let updated: Trip[];

    if (existingIndex !== -1) {
      updated = [...current];
      updated[existingIndex] = { ...updated[existingIndex], ...trip };
    } else {
      updated = [trip, ...current];
    }

    this.tripsSignal.set(updated);
    this.storage.setItem('trips', updated);
    this.syncConfirmedTrips(updated);

    // Auto-generate itinerary for the new trip so it appears in itinerary view immediately
    try {
      this.itineraryService.generateTripItinerary(
        trip.id,
        trip.destination,
        3,
        trip.activities || []
      );
    } catch (e) {
      console.warn('Itinerary auto-generation error:', e);
    }

    return trip;
  }

  confirmTrip(tripData: Partial<Trip> & { destination: string; country: string }): Trip {
    const current = this.tripsSignal();
    const id = tripData.id || this.generateUniqueTripId();
    const existingIndex = current.findIndex(t => t.id === id);

    const confirmedTrip: Trip = {
      id,
      name: tripData.name || `${tripData.destination} Confirmed Journey`,
      destination: tripData.destination,
      country: tripData.country,
      startDate: tripData.startDate || '2026-10-15',
      endDate: tripData.endDate || '2026-10-22',
      duration: tripData.duration || '07 Days',
      travelers: tripData.travelers || { adults: 2, children: 0 },
      rooms: tripData.rooms || 1,
      budget: tripData.budget || 2400,
      spent: tripData.spent || 0,
      coverImage: tripData.coverImage || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      preferences: tripData.preferences || ['Relaxing', 'Luxury'],
      destinationsList: tripData.destinationsList || [tripData.destination],
      notes: tripData.notes || `Confirmed via TripSphere Plan My Trip Architect. ID: ${id}`,
      createdAt: tripData.createdAt || new Date().toISOString(),
      userId: tripData.userId || 'usr-1',
      userName: tripData.userName || 'Labdhi',
      travelStyle: tripData.travelStyle || 'Relaxing',
      hotelName: tripData.hotelName || 'Luxury Resort & Sanctuary',
      flight: tripData.flight || 'Economy Flight',
      activities: tripData.activities || ['Beach Visit', 'Cultural Tour', 'Gourmet Dining'],
      additionalPreferences: tripData.additionalPreferences || 'VIP Airport Transfer',
      status: 'Confirmed',
      progress: 90
    };

    let updated: Trip[];
    if (existingIndex !== -1) {
      // Update in place without duplicating records
      updated = [...current];
      updated[existingIndex] = { ...updated[existingIndex], ...confirmedTrip };
    } else {
      updated = [confirmedTrip, ...current];
    }

    this.tripsSignal.set(updated);
    this.storage.setItem('trips', updated);
    this.syncConfirmedTrips(updated);

    // Auto-generate itinerary so it is available immediately
    try {
      this.itineraryService.generateTripItinerary(
        confirmedTrip.id,
        confirmedTrip.destination,
        4,
        confirmedTrip.activities || []
      );
    } catch (e) {
      console.warn('Itinerary auto-generation error:', e);
    }

    return confirmedTrip;
  }

  updateTrip(id: string, updates: Partial<Trip>): Trip | null {
    const current = this.tripsSignal();
    const index = current.findIndex(t => t.id === id);
    if (index === -1) return null;

    const updatedTrip: Trip = { ...current[index], ...updates };
    const updated = [...current];
    updated[index] = updatedTrip;

    this.tripsSignal.set(updated);
    this.storage.setItem('trips', updated);
    this.syncConfirmedTrips(updated);
    return updatedTrip;
  }

  deleteTrip(id: string): boolean {
    const filtered = this.tripsSignal().filter(t => t.id !== id);
    this.tripsSignal.set(filtered);
    this.storage.setItem('trips', filtered);
    this.syncConfirmedTrips(filtered);
    return true;
  }

  private syncConfirmedTrips(allTrips: Trip[]): void {
    const confirmed = allTrips.filter(t => t.status === 'Confirmed');
    this.storage.setItem('confirmed_trips', confirmed);
  }

  resetToDefaults(): void {
    this.tripsSignal.set(INITIAL_TRIPS);
    this.storage.setItem('trips', INITIAL_TRIPS);
    this.syncConfirmedTrips(INITIAL_TRIPS);
  }
}
