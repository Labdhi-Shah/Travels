import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { UserProfile } from '../../models/user.model';
import { MOCK_USERS } from '../../data/mock-users';

export const DEMO_PASSWORD = '123456';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storage = inject(StorageService);
  private router = inject(Router);

  // All registered users signal
  private usersSignal = signal<UserProfile[]>(
    this.storage.getItem<UserProfile[]>('users', MOCK_USERS)
  );
  readonly users = this.usersSignal.asReadonly();

  // Current logged in user signal
  private userSignal = signal<UserProfile | null>(
    this.storage.getItem<UserProfile | null>('current_user', MOCK_USERS[0])
  );
  readonly currentUser = this.userSignal.asReadonly();
  readonly isAuthenticated = computed(() => !!this.userSignal());

  login(email: string, password?: string, rememberMe = true): boolean {
    const cleanEmail = (email || '').trim().toLowerCase();

    // Check fixed frontend demo password requirement: "123456"
    if (!password || password.trim() !== DEMO_PASSWORD) {
      return false;
    }

    // Check existing users
    const allUsers = this.usersSignal();
    let found = allUsers.find(u => u.email.toLowerCase() === cleanEmail);
    if (!found) {
      // Create user on the fly if testing different emails
      found = {
        id: 'usr-' + Date.now(),
        fullName: cleanEmail.split('@')[0] || 'Traveler',
        name: cleanEmail.split('@')[0] || 'Traveler',
        email: cleanEmail,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        phone: '+1 (555) 234-5678',
        country: 'United States',
        bio: 'Avid traveler and explorer.',
        role: 'user',
        registeredDate: new Date().toISOString().split('T')[0],
        status: 'Active',
        tripsCount: 1,
        travelPreferences: ['Beach', 'Culture'],
        currency: 'USD ($)',
        notifications: { emailAlerts: true, tripReminders: true, dealOffers: true },
        savedPlaces: []
      };
      this.addUser(found);
    }

    this.userSignal.set(found);
    this.storage.setItem('current_user', found);
    this.storage.setItem('login_session', {
      isLoggedIn: true,
      email: found.email,
      userName: found.fullName,
      role: found.role,
      token: 'tripsphere_session_token_' + Date.now(),
      loggedInAt: new Date().toISOString()
    });
    return true;
  }

  demoLogin(): void {
    const demo = this.usersSignal().find(u => u.id === 'usr-1') || MOCK_USERS[0];
    this.login(demo.email, DEMO_PASSWORD);
  }

  register(fullNameOrData: string | any, email?: string, password?: string): boolean {
    let fullName = '';
    let userEmail = '';
    let phone = '+1 (555) 234-5678';

    if (typeof fullNameOrData === 'object' && fullNameOrData !== null) {
      fullName = fullNameOrData.fullName || `${fullNameOrData.firstName || ''} ${fullNameOrData.lastName || ''}`.trim() || 'Traveler';
      userEmail = fullNameOrData.email || '';
      phone = fullNameOrData.phone || phone;
    } else {
      fullName = fullNameOrData;
      userEmail = email || '';
    }

    const newUser: UserProfile = {
      id: 'usr-' + Date.now(),
      fullName,
      name: fullName,
      email: userEmail.toLowerCase(),
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      phone,
      country: 'United States',
      bio: 'New explorer ready for exciting travel journeys around the globe.',
      role: 'user',
      registeredDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      tripsCount: 0,
      travelPreferences: ['Adventure', 'Nature', 'Culture'],
      currency: 'USD ($)',
      notifications: { emailAlerts: true, tripReminders: true, dealOffers: true },
      savedPlaces: []
    };

    this.addUser(newUser);
    this.userSignal.set(newUser);
    this.storage.setItem('current_user', newUser);
    return true;
  }

  logout(): void {
    this.userSignal.set(null);
    this.storage.removeItem('current_user');
    this.storage.removeItem('login_session');
    this.router.navigate(['/']);
  }

  updateProfile(updated: Partial<UserProfile>): void {
    const current = this.userSignal();
    if (current) {
      const merged: UserProfile = { ...current, ...updated };
      this.userSignal.set(merged);
      this.storage.setItem('current_user', merged);
      this.updateUserInList(merged);
    }
  }

  addUser(user: UserProfile): void {
    const updated = [user, ...this.usersSignal()];
    this.usersSignal.set(updated);
    this.storage.setItem('users', updated);
  }

  private updateUserInList(user: UserProfile): void {
    const current = this.usersSignal();
    const index = current.findIndex(u => u.id === user.id);
    if (index !== -1) {
      const updated = [...current];
      updated[index] = user;
      this.usersSignal.set(updated);
      this.storage.setItem('users', updated);
    }
  }
}
