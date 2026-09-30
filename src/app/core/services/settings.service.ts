import { Injectable, signal, inject } from '@angular/core';
import { StorageService, SiteSettings } from './storage.service';

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
export class SettingsService {
  private storage = inject(StorageService);

  private settingsSignal = signal<SiteSettings>(
    this.storage.getItem<SiteSettings>('settings', DEFAULT_SETTINGS)
  );
  readonly settings = this.settingsSignal.asReadonly();

  getSettings(): SiteSettings {
    return this.settingsSignal();
  }

  updateSettings(updates: Partial<SiteSettings>): SiteSettings {
    const current = this.settingsSignal();
    const updated = { ...current, ...updates };
    this.settingsSignal.set(updated);
    this.storage.setItem('settings', updated);
    return updated;
  }
}
