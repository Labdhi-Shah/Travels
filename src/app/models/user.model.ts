export type UserRole = 'user' | 'admin';

export interface UserProfile {
  id: string;
  fullName: string;
  name?: string;
  email: string;
  avatar: string;
  phone: string;
  country: string;
  bio: string;
  role: UserRole;
  registeredDate?: string;
  status?: 'Active' | 'Blocked';
  tripsCount?: number;
  travelPreferences: string[];
  currency: string;
  notifications: {
    emailAlerts: boolean;
    tripReminders: boolean;
    dealOffers: boolean;
  };
  savedPlaces: string[];
}

export type AppUser = UserProfile;
