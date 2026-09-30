export interface HotelRoom {
  id: string;
  name: string;
  price: number;
  capacity: string;
  bed: string;
  image: string;
  features: string[];
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  city: string;
  country: string;
  rating: number;
  reviewsCount: number;
  pricePerNight: number;
  image: string;
  gallery: string[];
  description: string;
  overview?: string;
  amenities: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  checkIn?: string;
  checkOut?: string;
  roomTypes?: HotelRoom[];
  featured?: boolean;
}
