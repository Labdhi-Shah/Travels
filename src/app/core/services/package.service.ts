import { Injectable, signal, inject } from '@angular/core';
import { StorageService } from './storage.service';
import { TourPackage } from '../../models/package.model';
import { PACKAGES } from '../../data/packages';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  private storage = inject(StorageService);

  private packagesSignal = signal<TourPackage[]>(
    this.storage.getItem<TourPackage[]>('packages', PACKAGES)
  );
  readonly packages = this.packagesSignal.asReadonly();

  getPackages(): TourPackage[] {
    return this.packagesSignal();
  }

  getPackageById(id: string): TourPackage | undefined {
    return this.packagesSignal().find(p => p.id === id);
  }

  addPackage(packageData: Partial<TourPackage>): TourPackage {
    const id = packageData.id || 'pkg-' + Date.now();
    const newPkg: TourPackage = {
      id,
      name: packageData.name || 'Exclusive Getaway',
      destination: packageData.destination || 'Goa',
      country: packageData.country || 'India',
      durationDays: packageData.durationDays || 4,
      durationNights: packageData.durationNights || 3,
      maxTravelers: packageData.maxTravelers || 8,
      rating: packageData.rating || 4.9,
      reviewsCount: packageData.reviewsCount || 45,
      price: packageData.price || 18999,
      originalPrice: packageData.originalPrice || Math.round((packageData.price || 18999) * 1.25),
      image: packageData.image || 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
      gallery: packageData.gallery && packageData.gallery.length > 0 ? packageData.gallery : [
        packageData.image || 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80'
      ],
      overview: packageData.overview || 'An exceptional bespoke vacation experience with luxury amenities.',
      category: packageData.category || 'Relaxation',
      included: packageData.included || ['Luxury Accommodation', 'Daily Breakfast', 'Guided Sightseeing', 'Airport Transfers'],
      excluded: packageData.excluded || ['Personal Expenses', 'Flight Tickets', 'Optional Activities'],
      itinerary: packageData.itinerary || [],
      hotelInfo: packageData.hotelInfo || {
        name: 'Premier Resort & Spa',
        stars: 5,
        description: 'Five-star waterfront sanctuary with private cabanas and gourmet dining.'
      },
      transportation: packageData.transportation || 'Private Chauffeur AC Vehicle',
      activitiesIncluded: packageData.activitiesIncluded || ['Heritage Walk', 'Sunset Boat Cruise'],
      reviews: packageData.reviews || [],
      featured: packageData.featured ?? true
    };

    const updated = [newPkg, ...this.packagesSignal()];
    this.packagesSignal.set(updated);
    this.storage.setItem('packages', updated);
    return newPkg;
  }

  updatePackage(id: string, updates: Partial<TourPackage>): TourPackage | null {
    const current = this.packagesSignal();
    const index = current.findIndex(p => p.id === id);
    if (index === -1) return null;

    const updatedPkg: TourPackage = { ...current[index], ...updates };
    const updated = [...current];
    updated[index] = updatedPkg;

    this.packagesSignal.set(updated);
    this.storage.setItem('packages', updated);
    return updatedPkg;
  }

  deletePackage(id: string): boolean {
    const filtered = this.packagesSignal().filter(p => p.id !== id);
    this.packagesSignal.set(filtered);
    this.storage.setItem('packages', filtered);
    return true;
  }
}
