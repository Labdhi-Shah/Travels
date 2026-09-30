import { Injectable, signal, computed, inject } from '@angular/core';
import { StorageService } from './storage.service';
import { Testimonial, TESTIMONIALS } from '../../data/testimonials';

export interface ExtendedTestimonial extends Testimonial {
  approved?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {
  private storage = inject(StorageService);

  private testimonialsSignal = signal<ExtendedTestimonial[]>(
    this.storage.getItem<ExtendedTestimonial[]>(
      'testimonials',
      TESTIMONIALS.map((t, idx) => ({ ...t, approved: idx !== 4 }))
    )
  );
  readonly testimonials = this.testimonialsSignal.asReadonly();
  readonly approvedTestimonials = computed(() =>
    this.testimonialsSignal().filter(t => t.approved !== false)
  );

  getAllTestimonials(): ExtendedTestimonial[] {
    return this.testimonialsSignal();
  }

  getApproved(): ExtendedTestimonial[] {
    return this.approvedTestimonials();
  }

  addTestimonial(data: Partial<ExtendedTestimonial>): ExtendedTestimonial {
    const id = data.id || 'test-' + Date.now();
    const newTestimonial: ExtendedTestimonial = {
      id,
      name: data.name || 'Anonymous Traveler',
      location: data.location || 'London, UK',
      destination: data.destination || 'Bali, Indonesia',
      rating: data.rating || 5,
      review: data.review || 'TripSphere crafted an unforgettable journey with smooth itinerary planning!',
      avatar: data.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      tripType: data.tripType || 'Bespoke Vacation',
      approved: data.approved ?? true
    };

    const updated = [newTestimonial, ...this.testimonialsSignal()];
    this.testimonialsSignal.set(updated);
    this.storage.setItem('testimonials', updated);
    return newTestimonial;
  }

  updateTestimonial(id: string, updates: Partial<ExtendedTestimonial>): ExtendedTestimonial | null {
    const current = this.testimonialsSignal();
    const index = current.findIndex(t => t.id === id);
    if (index === -1) return null;

    const updatedItem: ExtendedTestimonial = { ...current[index], ...updates };
    const updated = [...current];
    updated[index] = updatedItem;

    this.testimonialsSignal.set(updated);
    this.storage.setItem('testimonials', updated);
    return updatedItem;
  }

  toggleApprove(id: string): void {
    const item = this.testimonialsSignal().find(t => t.id === id);
    if (item) {
      this.updateTestimonial(id, { approved: !item.approved });
    }
  }

  deleteTestimonial(id: string): boolean {
    const filtered = this.testimonialsSignal().filter(t => t.id !== id);
    this.testimonialsSignal.set(filtered);
    this.storage.setItem('testimonials', filtered);
    return true;
  }
}
