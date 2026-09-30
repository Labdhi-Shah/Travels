import { Injectable, signal, computed, inject } from '@angular/core';
import { StorageService } from './storage.service';
import { DESTINATIONS } from '../../data/destinations';
import { HOTELS } from '../../data/hotels';
import { PACKAGES } from '../../data/packages';
import { ACTIVITIES } from '../../data/activities';

export interface SavedPlaceItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  image: string;
  category: 'Destination' | 'Hotel' | 'Package' | 'Activity';
  price?: number;
}

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private storage = inject(StorageService);

  private favoritesSignal = signal<string[]>(
    this.storage.getItem<string[]>('favorites', ['bali-indonesia', 'santorini-greece', 'kamandalu-ubud', 'bali-escape-5d'])
  );
  readonly favorites = this.favoritesSignal.asReadonly();
  readonly favoriteCount = computed(() => this.favoritesSignal().length);

  isFavorite(id: string): boolean {
    return this.favoritesSignal().includes(id);
  }

  toggleFavorite(id: string): boolean {
    const current = this.favoritesSignal();
    const exists = current.includes(id);
    let updated: string[];

    if (exists) {
      updated = current.filter(item => item !== id);
    } else {
      updated = [...current, id];
    }

    this.favoritesSignal.set(updated);
    this.storage.setItem('favorites', updated);
    return !exists;
  }

  getFavoriteItems(): SavedPlaceItem[] {
    const favIds = this.favoritesSignal();
    const results: SavedPlaceItem[] = [];

    // Check destinations
    for (const d of DESTINATIONS) {
      if (favIds.includes(d.id)) {
        results.push({
          id: d.id,
          name: d.name,
          location: d.country,
          rating: d.rating,
          image: d.image,
          category: 'Destination',
          price: d.startingPrice
        });
      }
    }

    // Check hotels
    for (const h of HOTELS) {
      if (favIds.includes(h.id)) {
        results.push({
          id: h.id,
          name: h.name,
          location: `${h.city}, ${h.country}`,
          rating: h.rating,
          image: h.image,
          category: 'Hotel',
          price: h.pricePerNight
        });
      }
    }

    // Check packages
    for (const p of PACKAGES) {
      if (favIds.includes(p.id)) {
        results.push({
          id: p.id,
          name: p.name,
          location: `${p.destination}, ${p.country}`,
          rating: p.rating,
          image: p.image,
          category: 'Package',
          price: p.price
        });
      }
    }

    // Check activities
    for (const a of ACTIVITIES) {
      if (favIds.includes(a.id)) {
        results.push({
          id: a.id,
          name: a.title,
          location: a.location,
          rating: a.rating,
          image: a.image,
          category: 'Activity',
          price: a.price
        });
      }
    }

    return results;
  }

  removeFavorite(id: string): void {
    if (this.isFavorite(id)) {
      this.toggleFavorite(id);
    }
  }
}
