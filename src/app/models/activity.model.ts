export interface Activity {
  id: string;
  title: string;
  location: string;
  category: 'Adventure' | 'Beaches' | 'Mountains' | 'Cultural' | 'Food & Dining' | 'Luxury' | 'Wildlife' | 'Photography';
  duration: string;
  rating: number;
  reviewsCount: number;
  price: number;
  image: string;
  description: string;
  included?: string[];
  featured?: boolean;
}
