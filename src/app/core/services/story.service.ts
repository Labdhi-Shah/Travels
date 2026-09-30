import { Injectable, signal, inject } from '@angular/core';
import { StorageService } from './storage.service';
import { Story } from '../../models/story.model';
import { STORIES } from '../../data/stories';

export interface TravelStory extends Story {
  description?: string;
  status?: 'Published' | 'Draft';
}

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  private storage = inject(StorageService);

  private storiesSignal = signal<TravelStory[]>(
    this.storage.getItem<TravelStory[]>('stories', STORIES)
  );
  readonly stories = this.storiesSignal.asReadonly();

  getStories(): TravelStory[] {
    return this.storiesSignal();
  }

  getStoryById(id: string): TravelStory | undefined {
    return this.storiesSignal().find(s => s.id === id);
  }

  addStory(data: Partial<TravelStory>): TravelStory {
    const id = data.id || 'story-' + Date.now();
    const newStory: TravelStory = {
      id,
      title: data.title || 'Untitled Travel Story',
      category: data.category || 'Editorial Journal',
      readingTime: data.readingTime || '5 min read',
      date: data.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      image: data.image || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      excerpt: data.excerpt || data.description || 'A fascinating journey into untamed lands and vibrant cultures.',
      description: data.description || data.excerpt || 'A fascinating journey into untamed lands and vibrant cultures.',
      author: data.author || {
        name: 'Aarav Mehta',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80'
      },
      status: data.status || 'Published'
    };

    const updated = [newStory, ...this.storiesSignal()];
    this.storiesSignal.set(updated);
    this.storage.setItem('stories', updated);
    return newStory;
  }

  updateStory(id: string, updates: Partial<TravelStory>): TravelStory | null {
    const current = this.storiesSignal();
    const index = current.findIndex(s => s.id === id);
    if (index === -1) return null;

    const updatedStory: TravelStory = { ...current[index], ...updates };
    const updated = [...current];
    updated[index] = updatedStory;

    this.storiesSignal.set(updated);
    this.storage.setItem('stories', updated);
    return updatedStory;
  }

  deleteStory(id: string): boolean {
    const filtered = this.storiesSignal().filter(s => s.id !== id);
    this.storiesSignal.set(filtered);
    this.storage.setItem('stories', filtered);
    return true;
  }
}
