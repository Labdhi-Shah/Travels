import { Place } from '../models/place.model';

export const PLACES: Place[] = [
  {
    id: 'place-sensoji',
    tripId: 'trip-1',
    name: 'Senso-ji Ancient Temple',
    category: 'Attractions',
    rating: 4.88,
    location: 'Asakusa, Tokyo, Japan',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
    description: 'Tokyo’s oldest and most famous Buddhist temple, founded in 645 AD, with its iconic giant red lantern and Nakamise shopping street.',
    coordinates: { lat: 35.7148, lng: 139.7967 },
    isFavorite: true
  },
  {
    id: 'place-teamlab',
    tripId: 'trip-1',
    name: 'teamLab Planets Digital Museum',
    category: 'Museums',
    rating: 4.95,
    location: 'Toyosu, Tokyo, Japan',
    image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=800&q=80',
    description: 'Immersive digital art museum where visitors walk barefoot through crystal universes and floating flower gardens.',
    coordinates: { lat: 35.6493, lng: 139.7925 },
    isFavorite: true
  },
  {
    id: 'place-sukiyabashi',
    tripId: 'trip-1',
    name: 'Sukiyabashi Artisan Sushi',
    category: 'Restaurants',
    rating: 4.92,
    location: 'Ginza, Tokyo, Japan',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
    description: 'World-renowned intimate omakase dining experience serving seasonal wild fish sourced fresh daily from Toyosu Market.',
    coordinates: { lat: 35.6719, lng: 139.7645 },
    isFavorite: false
  },
  {
    id: 'place-fuglen',
    tripId: 'trip-1',
    name: 'Fuglen Scandinavian Coffee Bar',
    category: 'Cafes',
    rating: 4.79,
    location: 'Tomigaya, Shibuya, Tokyo',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    description: 'Chic retro cafe combining Oslo single-origin pour-overs by day with craft Nordic cocktails and vinyl jazz by night.',
    coordinates: { lat: 35.6672, lng: 139.6913 },
    isFavorite: true
  },
  {
    id: 'place-shinjuku-gyoen',
    tripId: 'trip-1',
    name: 'Shinjuku Gyoen National Garden',
    category: 'Parks',
    rating: 4.87,
    location: 'Shinjuku, Tokyo, Japan',
    image: 'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=800&q=80',
    description: 'Sprawling 144-acre oasis combining traditional Japanese landscaping, English landscape gardens, and French formal plantings.',
    coordinates: { lat: 35.6852, lng: 139.7101 },
    isFavorite: false
  },
  {
    id: 'place-tegalalang',
    tripId: 'trip-2',
    name: 'Tegalalang Emerald Rice Terraces',
    category: 'Attractions',
    rating: 4.91,
    location: 'Ubud, Gianyar, Bali',
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
    description: 'UNESCO-recognized ancient Subak cooperative irrigation system carving stepped green terraces through the tropical valley.',
    coordinates: { lat: -8.4312, lng: 115.2792 },
    isFavorite: true
  },
  {
    id: 'place-cretya-ubud',
    tripId: 'trip-2',
    name: 'Cretya Sunset Lounge & Dayclub',
    category: 'Cafes',
    rating: 4.84,
    location: 'Alas Harum, Tegalalang, Bali',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    description: 'Multi-tiered turquoise swimming pools and bamboo dining decks cantilevered directly over terraced rice fields.',
    coordinates: { lat: -8.4345, lng: 115.2815 },
    isFavorite: true
  },
  {
    id: 'place-locavore',
    tripId: 'trip-2',
    name: 'Locavore NXT Sustainable Dining',
    category: 'Restaurants',
    rating: 4.96,
    location: 'Ubud, Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    description: 'Hyper-local experimental dining laboratory celebrating Indonesian bio-diversity using 100% indigenous archipelago ingredients.',
    coordinates: { lat: -8.5069, lng: 115.2625 },
    isFavorite: false
  },
  {
    id: 'place-jungfraujoch',
    tripId: 'trip-3',
    name: 'Jungfraujoch – Top of Europe',
    category: 'Attractions',
    rating: 4.97,
    location: 'Bernese Alps, Switzerland',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
    description: 'Europe’s highest railway station at 3,454m altitude, featuring the Ice Palace, Sphinx Observatory, and Aletsch Glacier.',
    coordinates: { lat: 46.5475, lng: 7.9822 },
    isFavorite: true
  },
  {
    id: 'place-louvre',
    tripId: 'trip-4',
    name: 'Musée du Louvre & Tuileries',
    category: 'Museums',
    rating: 4.92,
    location: 'Rue de Rivoli, Paris, France',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80',
    description: 'The world’s largest art museum holding over 35,000 priceless masterworks from the Mona Lisa to the Venus de Milo.',
    coordinates: { lat: 48.8606, lng: 2.3376 },
    isFavorite: true
  },
  {
    id: 'place-palolem',
    tripId: 'trip-5',
    name: 'Palolem Crescent Beach',
    category: 'Parks',
    rating: 4.86,
    location: 'Canacona, South Goa, India',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    description: 'A serene semi-circular white sand beach lined with swaying coconut palms, colourful wooden beach shacks, and calm blue waters.',
    coordinates: { lat: 15.0100, lng: 74.0232 },
    isFavorite: true
  },
  {
    id: 'place-fisherman-wharf',
    tripId: 'trip-5',
    name: 'The Fisherman’s Wharf Cavelossim',
    category: 'Restaurants',
    rating: 4.89,
    location: 'Sal River, Mobor, Cavelossim, Goa',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    description: 'Riverside Goan culinary haven serving legendary butter garlic crabs, prawn balchão, and chilled tropical feni cocktails.',
    coordinates: { lat: 15.1764, lng: 73.9469 },
    isFavorite: true
  }
];
