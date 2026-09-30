export interface Testimonial {
  id: string;
  name: string;
  location: string;
  destination: string;
  rating: number;
  review: string;
  avatar: string;
  tripType: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-priya',
    name: 'Priya Shah',
    location: 'Mumbai, India',
    destination: 'Bali, Indonesia',
    rating: 5,
    review: 'TripSphere made our Bali trip so easy and stress-free. The experience was beyond amazing!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    tripType: 'Couple Getaway'
  },
  {
    id: 't-rohan',
    name: 'Rohan Mehta',
    location: 'Ahmedabad, India',
    destination: 'Dubai & Abu Dhabi',
    rating: 5,
    review: 'Great service, best prices and super support. Highly recommended for anyone who loves to travel!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    tripType: 'Family Explorer'
  },
  {
    id: 't-sneha',
    name: 'Sneha Patel',
    location: 'Vadodara, India',
    destination: 'Swiss Alps & Paris',
    rating: 5,
    review: 'The planning tools are so helpful and the packages are really value for money.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    tripType: 'Scenic Adventure'
  },
  {
    id: '1',
    name: 'Sophia Montgomery',
    location: 'London, United Kingdom',
    destination: 'Kyoto, Japan',
    rating: 5,
    review: 'TripSphere completely revolutionized how we planned our anniversary trip to Japan. The day-by-day itinerary builder and local recommendations were breathtaking!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    tripType: 'Cultural Expedition'
  },
  {
    id: '2',
    name: 'Alexander Wright',
    location: 'San Francisco, USA',
    destination: 'Swiss Alps',
    rating: 5,
    review: 'The budget tracker and interactive route map kept our group of six completely organized across 4 train journeys and mountain chalets. Truly a 10/10 platform.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    tripType: 'Alpine Hiking Tour'
  },
  {
    id: '3',
    name: 'Camila Rodriguez',
    location: 'Madrid, Spain',
    destination: 'Santorini & Mykonos',
    rating: 5,
    review: 'Finding hidden caldera gems and booking boutique cave hotels was effortless. The visual design is so clean and premium, it felt like reading an editorial travel magazine.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    tripType: 'Luxury Beach Holiday'
  },
  {
    id: '4',
    name: 'Julian Thorne',
    location: 'Sydney, Australia',
    destination: 'Bali, Indonesia',
    rating: 5,
    review: 'From the multi-step trip planner to the live itinerary sync on mobile, everything worked seamlessly. We will never plan another holiday without TripSphere.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    tripType: 'Tropical Wellness'
  },
  {
    id: '5',
    name: 'Aarav Mehta',
    location: 'Mumbai, India',
    destination: 'Rajasthan Royal Heritage',
    rating: 5,
    review: 'Planning our family heritage tour across Udaipur, Jodhpur, and Jaipur was so intuitive. The expense splitting and detailed day-by-day notes made travel stress-free.',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    tripType: 'Royal Heritage Journey'
  },
  {
    id: '6',
    name: 'Elena Rostova',
    location: 'Vienna, Austria',
    destination: 'Parisian Spring Escape',
    rating: 5,
    review: 'The interactive map feature showing nearby cafes, galleries, and museums right inside our Paris itinerary saved us hours every day. Simply brilliant!',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    tripType: 'Art & Gastronomy'
  },
  {
    id: '7',
    name: 'Marcus Chen',
    location: 'Singapore',
    destination: 'Dubai Sky & Dunes',
    rating: 5,
    review: 'Booking our hotel suites and private desert safari on TripSphere was flawless. The currency conversion and budget breakdowns were extremely helpful.',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
    tripType: 'Modern Architecture Tour'
  },
  {
    id: '8',
    name: 'Chloe Dubois',
    location: 'Montreal, Canada',
    destination: 'Goa Coast & Spice Plantations',
    rating: 5,
    review: 'The drag-and-drop itinerary builder allowed us to rearrange beach mornings and historic spice plantation lunches effortlessly. TripSphere is our go-to app!',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    tripType: 'Coastal Explorer'
  }
];
