export type ActivityCategory =
  | 'Flight'
  | 'Hotel'
  | 'Activity'
  | 'Dining'
  | 'Food'
  | 'Sightseeing'
  | 'Transport'
  | 'Relaxation';

export interface ItineraryItem {
  id: string;
  tripId: string;
  dayNumber: number;
  date?: string;
  time: string;
  title: string;
  category: ActivityCategory;
  location: string;
  notes?: string;
  description?: string;
  image?: string;
  estimatedCost?: number;
  isCompleted: boolean;
  order: number;
}
