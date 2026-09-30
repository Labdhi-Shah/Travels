export type PlaceCategory =
  | 'Attractions'
  | 'Restaurants'
  | 'Cafes'
  | 'Museums'
  | 'Parks'
  | 'Shopping'
  | 'Experiences';

export interface Place {
  id: string;
  tripId?: string;
  name: string;
  category: PlaceCategory;
  rating: number;
  location: string;
  image: string;
  description: string;
  isFavorite?: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
}
