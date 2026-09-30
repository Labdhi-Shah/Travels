export interface DayItinerary {
  day: number;
  title: string;
  description: string;
  activities: string[];
  meals: string[];
  stay: string;
}

export interface PackageReview {
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface TourPackage {
  id: string;
  name: string;
  destination: string;
  country: string;
  durationDays: number;
  durationNights: number;
  maxTravelers: number;
  rating: number;
  reviewsCount: number;
  price: number;
  originalPrice?: number;
  image: string;
  gallery: string[];
  overview: string;
  category: 'Adventure' | 'Luxury' | 'Cultural' | 'Relaxation' | 'Romantic' | 'Family' | 'Beaches' | 'City Tours';
  included: string[];
  excluded: string[];
  itinerary: DayItinerary[];
  hotelInfo: {
    name: string;
    stars: number;
    description: string;
  };
  transportation: string;
  activitiesIncluded: string[];
  reviews: PackageReview[];
  featured?: boolean;
}
