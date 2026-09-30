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

  createTrip(newTripData: Omit<Trip, 'id' | 'createdAt' | 'spent'> & { spent?: number; id?: string }): Trip {
    const id = newTripData.id || 'trip-' + Date.now();
    const trip: Trip = {
      ...newTripData,
      id,
      spent: newTripData.spent || 0,
      createdAt: new Date().toISOString(),
      progress: newTripData.progress !== undefined ? newTripData.progress : 15,
      status: newTripData.status || 'Planned'
    };

    const updated = [trip, ...this.tripsSignal()];
    this.tripsSignal.set(updated);
    this.storage.setItem('trips', updated);

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

  updateTrip(id: string, updates: Partial<Trip>): Trip | null {
    const current = this.tripsSignal();
    const index = current.findIndex(t => t.id === id);
    if (index === -1) return null;

    const updatedTrip: Trip = { ...current[index], ...updates };
    const updated = [...current];
    updated[index] = updatedTrip;

    this.tripsSignal.set(updated);
    this.storage.setItem('trips', updated);
    return updatedTrip;
  }

  deleteTrip(id: string): boolean {
    const filtered = this.tripsSignal().filter(t => t.id !== id);
    this.tripsSignal.set(filtered);
    this.storage.setItem('trips', filtered);
    return true;
  }

  resetToDefaults(): void {
    this.tripsSignal.set(INITIAL_TRIPS);
    this.storage.setItem('trips', INITIAL_TRIPS);
  }
}
