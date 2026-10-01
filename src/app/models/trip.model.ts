export type TripStatus = 'Draft' | 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled' | 'Upcoming' | 'Ongoing' | 'Planned';

export interface Trip {
  id: string;
  tripId?: string;
  name: string;
  destination: string;
  country: string;
  startDate: string;
  endDate: string;
  travelers: {
    adults: number;
    children: number;
    total?: number;
  };
  rooms?: number;
  status: TripStatus;
  budget: number;
  spent: number;
  coverImage: string;
  preferences: string[];
  destinationsList?: string[];
  notes?: string;
  createdAt: string;
  userId?: string;
  userName?: string;
  travelStyle?: string;
  hotelName?: string;
  flight?: string;
  activities?: string[];
  additionalPreferences?: string;
  progress?: number;
  duration?: string;
}

