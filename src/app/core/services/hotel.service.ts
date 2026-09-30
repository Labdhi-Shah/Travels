import { Injectable, signal, inject } from '@angular/core';
import { StorageService } from './storage.service';
import { Hotel } from '../../models/hotel.model';
import { HOTELS } from '../../data/hotels';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private storage = inject(StorageService);

  private hotelsSignal = signal<Hotel[]>(
    this.storage.getItem<Hotel[]>('hotels', HOTELS)
  );
  readonly hotels = this.hotelsSignal.asReadonly();

  getHotels(): Hotel[] {
    return this.hotelsSignal();
  }

  getHotelById(id: string): Hotel | undefined {
    return this.hotelsSignal().find(h => h.id === id);
  }

  addHotel(hotelData: Partial<Hotel>): Hotel {
    const id = hotelData.id || (hotelData.name || 'hotel').toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();
    const newHotel: Hotel = {
      id,
      name: hotelData.name || 'Luxury Resort & Spa',
      location: hotelData.location || 'Goa, India',
      city: hotelData.city || 'Goa',
      country: hotelData.country || 'India',
      rating: hotelData.rating || 4.9,
      reviewsCount: hotelData.reviewsCount || 88,
      pricePerNight: hotelData.pricePerNight || 320,
      image: hotelData.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      gallery: hotelData.gallery && hotelData.gallery.length > 0 ? hotelData.gallery : [
        hotelData.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
      ],
      description: hotelData.description || 'Exclusive boutique luxury hotel featuring scenic panoramas and personalized butler service.',
      amenities: hotelData.amenities || ['Wi-Fi', 'Breakfast', 'Pool', 'Spa', 'Ocean View'],
      coordinates: hotelData.coordinates || { lat: 15.2993, lng: 74.1240 },
      featured: hotelData.featured ?? true
    };

    const updated = [newHotel, ...this.hotelsSignal()];
    this.hotelsSignal.set(updated);
    this.storage.setItem('hotels', updated);
    return newHotel;
  }

  updateHotel(id: string, updates: Partial<Hotel>): Hotel | null {
    const current = this.hotelsSignal();
    const index = current.findIndex(h => h.id === id);
    if (index === -1) return null;

    const updatedHotel: Hotel = { ...current[index], ...updates };
    const updated = [...current];
    updated[index] = updatedHotel;

    this.hotelsSignal.set(updated);
    this.storage.setItem('hotels', updated);
    return updatedHotel;
  }

  deleteHotel(id: string): boolean {
    const filtered = this.hotelsSignal().filter(h => h.id !== id);
    this.hotelsSignal.set(filtered);
    this.storage.setItem('hotels', filtered);
    return true;
  }
}
