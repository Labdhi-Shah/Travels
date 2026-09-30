import { Injectable, signal, inject } from '@angular/core';
import { StorageService } from './storage.service';
import { ItineraryItem } from '../../models/itinerary.model';
import { INITIAL_ITINERARIES } from '../../data/initial-itinerary';

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {
  private storage = inject(StorageService);

  private itemsSignal = signal<ItineraryItem[]>(
    this.storage.getItem<ItineraryItem[]>('itineraries', INITIAL_ITINERARIES)
  );
  readonly items = this.itemsSignal.asReadonly();

  getItemsByTripId(tripId: string): ItineraryItem[] {
    return this.itemsSignal()
      .filter(item => item.tripId === tripId)
      .sort((a, b) => a.dayNumber - b.dayNumber || a.order - b.order);
  }

  getItemsByTripAndDay(tripId: string, dayNumber: number): ItineraryItem[] {
    return this.itemsSignal()
      .filter(item => item.tripId === tripId && item.dayNumber === dayNumber)
      .sort((a, b) => a.order - b.order);
  }

  addItem(itemData: Omit<ItineraryItem, 'id' | 'order'> & { order?: number }): ItineraryItem {
    const current = this.itemsSignal();
    const sameDayItems = current.filter(
      i => i.tripId === itemData.tripId && i.dayNumber === itemData.dayNumber
    );
    const order = itemData.order !== undefined ? itemData.order : sameDayItems.length + 1;

    const newItem: ItineraryItem = {
      ...itemData,
      id: 'it-' + Date.now() + '-' + Math.random().toString(36).substring(2, 5),
      order
    };

    const updated = [...current, newItem];
    this.itemsSignal.set(updated);
    this.storage.setItem('itineraries', updated);
    return newItem;
  }

  updateItem(id: string, updates: Partial<ItineraryItem>): ItineraryItem | null {
    const current = this.itemsSignal();
    const index = current.findIndex(i => i.id === id);
    if (index === -1) return null;

    const updatedItem: ItineraryItem = { ...current[index], ...updates };
    const updated = [...current];
    updated[index] = updatedItem;

    this.itemsSignal.set(updated);
    this.storage.setItem('itineraries', updated);
    return updatedItem;
  }

  deleteItem(id: string): boolean {
    const filtered = this.itemsSignal().filter(i => i.id !== id);
    this.itemsSignal.set(filtered);
    this.storage.setItem('itineraries', filtered);
    return true;
  }

  toggleComplete(id: string): void {
    const item = this.itemsSignal().find(i => i.id === id);
    if (item) {
      this.updateItem(id, { isCompleted: !item.isCompleted });
    }
  }

  moveItem(id: string, direction: 'up' | 'down'): void {
    const item = this.itemsSignal().find(i => i.id === id);
    if (!item) return;

    const dayItems = this.getItemsByTripAndDay(item.tripId, item.dayNumber);
    const currentIndex = dayItems.findIndex(i => i.id === id);

    if (direction === 'up' && currentIndex > 0) {
      const prevItem = dayItems[currentIndex - 1];
      const tempOrder = item.order;
      this.updateItem(item.id, { order: prevItem.order });
      this.updateItem(prevItem.id, { order: tempOrder });
    } else if (direction === 'down' && currentIndex < dayItems.length - 1) {
      const nextItem = dayItems[currentIndex + 1];
      const tempOrder = item.order;
      this.updateItem(item.id, { order: nextItem.order });
      this.updateItem(nextItem.id, { order: tempOrder });
    }
  }

  reorderItems(updatedItems: ItineraryItem[]): void {
    this.itemsSignal.set(updatedItems);
    this.storage.setItem('itineraries', updatedItems);
  }

  loadForTrip(_tripId: string): void {
    // Already reactive from signal
  }

  getItemsForTrip(tripId: string): ItineraryItem[] {
    return this.getItemsByTripId(tripId);
  }

  getItemsForDay(tripId: string, dayNumber: number): ItineraryItem[] {
    return this.getItemsByTripAndDay(tripId, dayNumber);
  }

  updateDayOrder(tripId: string, dayNumber: number, orderedItems: ItineraryItem[]): void {
    const current = this.itemsSignal();
    const otherItems = current.filter(i => !(i.tripId === tripId && i.dayNumber === dayNumber));
    const reordered = orderedItems.map((item, idx) => ({ ...item, order: idx + 1 }));
    const all = [...otherItems, ...reordered];
    this.itemsSignal.set(all);
    this.storage.setItem('itineraries', all);
  }

  generateTripItinerary(tripId: string, destination: string, daysCount = 3, activities: string[] = []): void {
    const existing = this.getItemsByTripId(tripId);
    if (existing.length > 0) return;

    const templates: ItineraryItem[] = [
      // Day 1
      {
        id: 'it-' + Date.now() + '-1',
        tripId,
        dayNumber: 1,
        time: '09:00',
        title: 'Airport Arrival & Private Transfer',
        description: `Touchdown at ${destination} International Airport. Meet private chauffeur for scenic transit to accommodation.`,
        location: `${destination} Airport (GOI/DXB)`,
        category: 'Transport',
        order: 1,
        isCompleted: false,
        image: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'it-' + Date.now() + '-2',
        tripId,
        dayNumber: 1,
        time: '11:00',
        title: 'Hotel Check-in & Welcome Refreshment',
        description: 'Settle into premier sanctuary suite, unpack, and enjoy welcoming signature coconut infusion drink.',
        location: 'Heritage Resort & Sanctuary',
        category: 'Hotel',
        order: 2,
        isCompleted: false,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'it-' + Date.now() + '-3',
        tripId,
        dayNumber: 1,
        time: '14:00',
        title: 'Beach Visit & Coastal Stroll',
        description: 'Golden sands exploration, ocean breeze meditation, and casual beach shack tropical lunch.',
        location: 'Sunset Beach Coastline',
        category: 'Activity',
        order: 3,
        isCompleted: false,
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'it-' + Date.now() + '-4',
        tripId,
        dayNumber: 1,
        time: '19:00',
        title: 'Candlelight Seafood Dinner',
        description: 'Artisanal seaside multi-course culinary experience featuring locally sourced catches of the day.',
        location: 'The Fisherman\'s Wharf',
        category: 'Food',
        order: 4,
        isCompleted: false,
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80'
      },

      // Day 2
      {
        id: 'it-' + Date.now() + '-5',
        tripId,
        dayNumber: 2,
        time: '08:30',
        title: 'Sunrise Yoga & Tropical Breakfast',
        description: 'Invigorating beachfront meditation followed by organic acai bowls, mango lassi, and fresh espresso.',
        location: 'Resort Pavilion Garden',
        category: 'Activity',
        order: 1,
        isCompleted: false,
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'it-' + Date.now() + '-6',
        tripId,
        dayNumber: 2,
        time: '10:30',
        title: 'Historic Fort & Heritage Walk',
        description: 'Guided architectural expedition exploring ancient stone ramparts, lighthouses, and colonial quarters.',
        location: `${destination} Heritage Quarter`,
        category: 'Sightseeing',
        order: 2,
        isCompleted: false,
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'it-' + Date.now() + '-7',
        tripId,
        dayNumber: 2,
        time: '15:30',
        title: 'Water Sports & Coastal Kayaking',
        description: 'Guided kayak excursion across turquoise inlets, paddle boarding, and sheltered cove swimming.',
        location: 'Azure Cove Marina',
        category: 'Activity',
        order: 3,
        isCompleted: false,
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'it-' + Date.now() + '-8',
        tripId,
        dayNumber: 2,
        time: '18:30',
        title: 'Sunset Catamaran Cruise',
        description: 'Sail into the horizon with live acoustic guitar music, tapas, and breathtaking golden hour panoramas.',
        location: 'Marina Harbor Pier 4',
        category: 'Activity',
        order: 4,
        isCompleted: false,
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80'
      }
    ];

    const current = this.itemsSignal();
    const updated = [...current, ...templates];
    this.itemsSignal.set(updated);
    this.storage.setItem('itineraries', updated);
  }
}
