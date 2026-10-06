import { Injectable } from '@angular/core';
import { INITIAL_TRIPS } from '../../data/initial-trips';
import { INITIAL_ITINERARIES } from '../../data/initial-itinerary';
import { INITIAL_BOOKINGS } from '../../data/initial-bookings';
import { INITIAL_EXPENSES } from '../../data/initial-expenses';
import { DESTINATIONS } from '../../data/destinations';
import { PACKAGES } from '../../data/packages';
import { HOTELS } from '../../data/hotels';
import { ACTIVITIES } from '../../data/activities';
import { STORIES } from '../../data/stories';
import { TESTIMONIALS } from '../../data/testimonials';
import { MOCK_USERS } from '../../data/mock-users';
import { UserProfile } from '../../models/user.model';

export interface SiteSettings {
  siteName: string;
  logo: string;
  contactEmail: string;
  phone: string;
  currency: string;
  theme: string;
  bookingCommission: number;
}

const DEFAULT_SETTINGS: SiteSettings = {
  siteName: 'TripSphere',
  logo: 'TripSphere',
  contactEmail: 'contact@tripsphere.travel',
  phone: '+1 (800) 555-TRIP',
  currency: 'USD ($)',
  theme: 'Dark Ecru Editorial',
  bookingCommission: 10
};

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly PREFIX = 'tripsphere_';

  constructor() {
    this.initDefaultData();
  }

  getItem<T>(key: string, defaultValue: T): T {
    try {
      // Normalize 'user' to 'current_user' if requested
      const resolvedKey = key === 'user' ? 'current_user' : key;
      const item = localStorage.getItem(this.PREFIX + resolvedKey);
      if (item !== null) {
        return JSON.parse(item);
      }
      // Fallback check without prefix or legacy key
      if (key === 'user' || key === 'current_user') {
        const legacy = localStorage.getItem(this.PREFIX + 'user');
        if (legacy) return JSON.parse(legacy);
      }
      return defaultValue;
    } catch (e) {
      console.error(`Error reading key ${key} from localStorage`, e);
      return defaultValue;
    }
  }

  setItem<T>(key: string, value: T): void {
    try {
      const resolvedKey = key === 'user' ? 'current_user' : key;
      localStorage.setItem(this.PREFIX + resolvedKey, JSON.stringify(value));
      if (key === 'current_user') {
        localStorage.setItem(this.PREFIX + 'user', JSON.stringify(value));
      }
    } catch (e) {
      console.error(`Error writing key ${key} to localStorage`, e);
    }
  }

  removeItem(key: string): void {
    try {
      const resolvedKey = key === 'user' ? 'current_user' : key;
      localStorage.removeItem(this.PREFIX + resolvedKey);
      if (key === 'current_user' || key === 'user') {
        localStorage.removeItem(this.PREFIX + 'user');
        localStorage.removeItem(this.PREFIX + 'current_user');
      }
    } catch (e) {
      console.error(`Error removing key ${key} from localStorage`, e);
    }
  }

  private initDefaultData(): void {
    // 1. tripsphere_users
    if (!localStorage.getItem(this.PREFIX + 'users')) {
      this.setItem('users', MOCK_USERS);
    }

    // 2. tripsphere_current_user
    const existingCurrent = localStorage.getItem(this.PREFIX + 'current_user') || localStorage.getItem(this.PREFIX + 'user');
    if (!existingCurrent) {
      this.setItem('current_user', MOCK_USERS[0]); // Labdhi
    }

    // 3. tripsphere_trips
    if (!localStorage.getItem(this.PREFIX + 'trips')) {
      this.setItem('trips', INITIAL_TRIPS);
    }

    // 4. tripsphere_destinations
    if (!localStorage.getItem(this.PREFIX + 'destinations')) {
      this.setItem('destinations', DESTINATIONS);
    }

    // 5. tripsphere_packages
    if (!localStorage.getItem(this.PREFIX + 'packages')) {
      this.setItem('packages', PACKAGES);
    }

    // 6. tripsphere_hotels
    if (!localStorage.getItem(this.PREFIX + 'hotels')) {
      this.setItem('hotels', HOTELS);
    }

    // 7. tripsphere_experiences
    if (!localStorage.getItem(this.PREFIX + 'experiences')) {
      this.setItem('experiences', ACTIVITIES);
    }

    // 8. tripsphere_bookings
    if (!localStorage.getItem(this.PREFIX + 'bookings')) {
      this.setItem('bookings', INITIAL_BOOKINGS);
    }

    // 9. tripsphere_favorites
    const existingFavs = localStorage.getItem(this.PREFIX + 'favorites');
    const favsMigrated = localStorage.getItem(this.PREFIX + 'favorites_migrated');
    
    if (!existingFavs) {
      this.setItem('favorites', []);
      this.setItem('favorites_migrated', 'true');
    } else if (!favsMigrated) {
      // One-time wipe to clear any old mock data from previous versions
      this.setItem('favorites', []);
      this.setItem('favorites_migrated', 'true');
    }

    // 10. tripsphere_itineraries
    if (!localStorage.getItem(this.PREFIX + 'itineraries')) {
      this.setItem('itineraries', INITIAL_ITINERARIES);
    }

    // 11. tripsphere_expenses
    if (!localStorage.getItem(this.PREFIX + 'expenses')) {
      this.setItem('expenses', INITIAL_EXPENSES);
    }

    // 12. tripsphere_stories
    if (!localStorage.getItem(this.PREFIX + 'stories')) {
      this.setItem('stories', STORIES);
    }

    // 13. tripsphere_testimonials
    if (!localStorage.getItem(this.PREFIX + 'testimonials')) {
      // Add approved flag to testimonials
      const mapped = TESTIMONIALS.map((t, idx) => ({
        ...t,
        approved: idx !== 4 // approve first few by default
      }));
      this.setItem('testimonials', mapped);
    }

    // 14. tripsphere_settings
    if (!localStorage.getItem(this.PREFIX + 'settings')) {
      this.setItem('settings', DEFAULT_SETTINGS);
    }

    // 15. tripsphere_login_session
    if (!localStorage.getItem(this.PREFIX + 'login_session')) {
      this.setItem('login_session', {
        isLoggedIn: true,
        email: MOCK_USERS[0].email,
        userName: MOCK_USERS[0].fullName,
        role: MOCK_USERS[0].role,
        token: 'tripsphere_mock_session_token_123456',
        createdAt: new Date().toISOString()
      });
    }

    // 16. tripsphere_confirmed_trips
    if (!localStorage.getItem(this.PREFIX + 'confirmed_trips')) {
      const confirmed = INITIAL_TRIPS.filter(t => t.status === 'Confirmed' || t.status === 'Upcoming');
      this.setItem('confirmed_trips', confirmed);
    }

    // 17. tripsphere_preferences
    if (!localStorage.getItem(this.PREFIX + 'preferences')) {
      this.setItem('preferences', {
        theme: 'Dark Ecru Editorial',
        currency: 'USD ($)',
        travelStyles: ['Relaxing', 'Culture', 'Luxury'],
        defaultAdults: 2,
        notificationsEnabled: true
      });
    }
  }
}
