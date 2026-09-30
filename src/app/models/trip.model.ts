export interface Trip {
  id: string;
  name: string;
  destination: string;
  country: string;
  startDate: string;
  endDate: string;
  travelers: {
    adults: number;
    children: number;
  };
  status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Planned';
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
  activities?: string[];
  progress?: number;
  duration?: string;
}
