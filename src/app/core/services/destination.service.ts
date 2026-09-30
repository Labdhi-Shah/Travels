import { Injectable, signal, inject } from '@angular/core';
import { StorageService } from './storage.service';
import { Destination } from '../../models/destination.model';
import { DESTINATIONS } from '../../data/destinations';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {
  private storage = inject(StorageService);

  private destinationsSignal = signal<Destination[]>(
    this.storage.getItem<Destination[]>('destinations', DESTINATIONS)
  );
  readonly destinations = this.destinationsSignal.asReadonly();

  getDestinations(): Destination[] {
    return this.destinationsSignal();
  }

  getDestinationById(id: string): Destination | undefined {
    return this.destinationsSignal().find(d => d.id === id);
  }

  addDestination(destinationData: Partial<Destination>): Destination {
    const id = destinationData.id || (destinationData.name || 'destination').toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();
    const newDest: Destination = {
      id,
      name: destinationData.name || 'New Destination',
      country: destinationData.country || 'Global',
      region: destinationData.region || 'Asia',
      description: destinationData.description || 'Stunning retreat waiting to be explored.',
      overview: destinationData.overview || destinationData.description || '',
      image: destinationData.image || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      gallery: destinationData.gallery && destinationData.gallery.length > 0 ? destinationData.gallery : [
        destinationData.image || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
      ],
      startingPrice: destinationData.startingPrice || 999,
      rating: destinationData.rating || 4.8,
      reviewsCount: destinationData.reviewsCount || 120,
      tags: destinationData.tags || ['Explore', 'Scenic'],
      travelTypes: destinationData.travelTypes || ['Relaxation', 'Culture'],
      bestTimeToVisit: destinationData.bestTimeToVisit || 'October – March',
      recommendedDuration: destinationData.recommendedDuration || '5 – 7 Days',
      averageBudgetPerDay: destinationData.averageBudgetPerDay || 100,
      coordinates: destinationData.coordinates || { lat: 15.2993, lng: 74.1240 },
      weather: destinationData.weather || {
        temp: '28°C',
        condition: 'Clear Sky',
        icon: 'sun',
        humidity: '65%',
        wind: '12 km/h',
        forecast: []
      },
      popularAttractions: destinationData.popularAttractions || [],
      hotelsCount: destinationData.hotelsCount || 150
    };

    const updated = [newDest, ...this.destinationsSignal()];
    this.destinationsSignal.set(updated);
    this.storage.setItem('destinations', updated);
    return newDest;
  }

  updateDestination(id: string, updates: Partial<Destination>): Destination | null {
    const current = this.destinationsSignal();
    const index = current.findIndex(d => d.id === id);
    if (index === -1) return null;

    const updatedDest: Destination = { ...current[index], ...updates };
    const updated = [...current];
    updated[index] = updatedDest;

    this.destinationsSignal.set(updated);
    this.storage.setItem('destinations', updated);
    return updatedDest;
  }

  deleteDestination(id: string): boolean {
    const filtered = this.destinationsSignal().filter(d => d.id !== id);
    this.destinationsSignal.set(filtered);
    this.storage.setItem('destinations', filtered);
    return true;
  }
}
