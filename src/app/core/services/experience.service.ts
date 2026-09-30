import { Injectable, signal, inject } from '@angular/core';
import { StorageService } from './storage.service';
import { Activity } from '../../models/activity.model';
import { ACTIVITIES } from '../../data/activities';

export interface ExperienceItem extends Activity {
  status?: 'Active' | 'Draft' | 'Archived';
}

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private storage = inject(StorageService);

  private experiencesSignal = signal<ExperienceItem[]>(
    this.storage.getItem<ExperienceItem[]>('experiences', ACTIVITIES.map(a => ({ ...a, status: 'Active' })))
  );
  readonly experiences = this.experiencesSignal.asReadonly();

  getExperiences(): ExperienceItem[] {
    return this.experiencesSignal();
  }

  getExperienceById(id: string): ExperienceItem | undefined {
    return this.experiencesSignal().find(e => e.id === id);
  }

  addExperience(data: Partial<ExperienceItem>): ExperienceItem {
    const id = data.id || 'exp-' + Date.now();
    const newExp: ExperienceItem = {
      id,
      title: data.title || 'Curated Experience',
      location: data.location || 'Goa, India',
      category: data.category || 'Adventure',
      duration: data.duration || '3 Hours',
      rating: data.rating || 4.9,
      reviewsCount: data.reviewsCount || 42,
      price: data.price || 75,
      image: data.image || 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      description: data.description || 'An immersive personalized adventure led by seasoned local experts.',
      included: data.included || ['Safety Gear', 'Local Guide', 'Refreshments'],
      featured: data.featured ?? true,
      status: data.status || 'Active'
    };

    const updated = [newExp, ...this.experiencesSignal()];
    this.experiencesSignal.set(updated);
    this.storage.setItem('experiences', updated);
    return newExp;
  }

  updateExperience(id: string, updates: Partial<ExperienceItem>): ExperienceItem | null {
    const current = this.experiencesSignal();
    const index = current.findIndex(e => e.id === id);
    if (index === -1) return null;

    const updatedItem: ExperienceItem = { ...current[index], ...updates };
    const updated = [...current];
    updated[index] = updatedItem;

    this.experiencesSignal.set(updated);
    this.storage.setItem('experiences', updated);
    return updatedItem;
  }

  deleteExperience(id: string): boolean {
    const filtered = this.experiencesSignal().filter(e => e.id !== id);
    this.experiencesSignal.set(filtered);
    this.storage.setItem('experiences', filtered);
    return true;
  }
}
