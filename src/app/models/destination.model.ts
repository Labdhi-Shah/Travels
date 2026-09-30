export type TravelType =
  | 'Beach'
  | 'Mountain'
  | 'City'
  | 'Adventure'
  | 'Luxury'
  | 'Nature'
  | 'Culture'
  | 'Romantic'
  | 'Family'
  | 'Photography'
  | 'Relaxation'
  | 'Shopping';

export interface Destination {
  id: string;
  name: string;
  country: string;
  region: 'Europe' | 'Asia' | 'Americas' | 'Middle East' | 'Oceania' | 'Africa';
  description: string;
  overview: string;
  image: string;
  gallery: string[];
  startingPrice: number;
  rating: number;
  reviewsCount: number;
  tags: string[];
  travelTypes: TravelType[];
  bestTimeToVisit: string;
  recommendedDuration: string;
  averageBudgetPerDay: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  weather: {
    temp: string;
    condition: string;
    icon: string;
    humidity: string;
    wind?: string;
    forecast?: { day: string; temp: string; condition: string }[];
  };
  popularAttractions: {
    name: string;
    image: string;
    description: string;
    coordinates?: { lat: number; lng: number };
  }[];
  hotelsCount?: number;
  activitiesCount?: number;
  restaurantsCount?: number;
  travelTips?: string[];
  isFeatured?: boolean;
  isPopular?: boolean;
}
