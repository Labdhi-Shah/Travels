import { ItineraryItem } from '../models/itinerary.model';

export const INITIAL_ITINERARIES: ItineraryItem[] = [
  // Day 1
  {
    id: 'it-1',
    tripId: 'japan-adventure-2026',
    dayNumber: 1,
    date: '2026-05-22',
    time: '14:30',
    title: 'Hotel Check-in & Rest',
    category: 'Hotel',
    location: 'Hotel Groove Shinjuku, Tokyo',
    notes: 'Confirm high-floor room with panoramic Tokyo skyline view.',
    estimatedCost: 0,
    isCompleted: true,
    order: 1
  },
  {
    id: 'it-2',
    tripId: 'japan-adventure-2026',
    dayNumber: 1,
    date: '2026-05-22',
    time: '17:00',
    title: 'Shinjuku Gyoen Twilight Stroll',
    category: 'Sightseeing',
    location: 'Shinjuku Gyoen National Garden',
    notes: 'Entry closes at 18:00. Traditional teahouse on the north pond.',
    estimatedCost: 15,
    isCompleted: true,
    order: 2
  },
  {
    id: 'it-3',
    tripId: 'japan-adventure-2026',
    dayNumber: 1,
    date: '2026-05-22',
    time: '19:30',
    title: 'Omoide Yokocho Yakitori Dinner',
    category: 'Dining',
    location: 'Memory Lane, Shinjuku',
    notes: 'Cash-only grilled skewers and draft Sapporo under paper lanterns.',
    estimatedCost: 45,
    isCompleted: false,
    order: 3
  },

  // Day 2
  {
    id: 'it-4',
    tripId: 'japan-adventure-2026',
    dayNumber: 2,
    date: '2026-05-23',
    time: '08:30',
    title: 'Asakusa Senso-ji & Nakamise Street',
    category: 'Sightseeing',
    location: 'Asakusa, Taito City, Tokyo',
    notes: 'Arrive early before tour groups. Buy freshly made ningyo-yaki sweets.',
    estimatedCost: 20,
    isCompleted: false,
    order: 1
  },
  {
    id: 'it-5',
    tripId: 'japan-adventure-2026',
    dayNumber: 2,
    date: '2026-05-23',
    time: '12:30',
    title: 'Tsukiji Outer Market Culinary Walk',
    category: 'Dining',
    location: 'Tsukiji, Chuo City, Tokyo',
    notes: 'Try fatty tuna nigiri and tamagoyaki omelet skewers.',
    estimatedCost: 65,
    isCompleted: false,
    order: 2
  },
  {
    id: 'it-6',
    tripId: 'japan-adventure-2026',
    dayNumber: 2,
    date: '2026-05-23',
    time: '16:00',
    title: 'Shibuya Crossing & Shibuya Sky Observation',
    category: 'Activity',
    location: 'Scramble Square, Shibuya',
    notes: 'Sunset slot reserved for 17:40 on the open-air rooftop deck.',
    estimatedCost: 30,
    isCompleted: false,
    order: 3
  },

  // Day 3
  {
    id: 'it-7',
    tripId: 'japan-adventure-2026',
    dayNumber: 3,
    date: '2026-05-24',
    time: '09:00',
    title: 'Shinkansen Bullet Train to Kyoto',
    category: 'Transport',
    location: 'Tokyo Station → Kyoto Station',
    notes: 'Nozomi train, seats on right side (Window E) for Mount Fuji view.',
    estimatedCost: 110,
    isCompleted: false,
    order: 1
  },
  {
    id: 'it-8',
    tripId: 'japan-adventure-2026',
    dayNumber: 3,
    date: '2026-05-24',
    time: '14:00',
    title: 'Sowaka Heritage Ryokan Check-in',
    category: 'Hotel',
    location: 'Gion-Yasaka, Kyoto',
    notes: 'Traditional yukata provided; schedule onsen bath for 18:00.',
    estimatedCost: 0,
    isCompleted: false,
    order: 2
  },
  {
    id: 'it-9',
    tripId: 'japan-adventure-2026',
    dayNumber: 3,
    date: '2026-05-24',
    time: '16:30',
    title: 'Gion Evening Lantern Walk & Geisha District',
    category: 'Sightseeing',
    location: 'Hanami-koji Street, Kyoto',
    notes: 'Keep photography polite and restricted to public walkways.',
    estimatedCost: 0,
    isCompleted: false,
    order: 3
  },

  // Day 4
  {
    id: 'it-10',
    tripId: 'japan-adventure-2026',
    dayNumber: 4,
    date: '2026-05-25',
    time: '06:45',
    title: 'Fushimi Inari Torii Gate Sunrise Hike',
    category: 'Sightseeing',
    location: 'Fushimi Ward, Kyoto',
    notes: 'Hike to Yotsutsuji intersection for panoramic morning vista.',
    estimatedCost: 0,
    isCompleted: false,
    order: 1
  },
  {
    id: 'it-11',
    tripId: 'japan-adventure-2026',
    dayNumber: 4,
    date: '2026-05-25',
    time: '11:00',
    title: 'Traditional Zen Tea Ceremony',
    category: 'Activity',
    location: 'Higashiyama Tea House',
    notes: 'Urasenke school demonstration with tea master.',
    estimatedCost: 55,
    isCompleted: false,
    order: 2
  },
  {
    id: 'it-12',
    tripId: 'japan-adventure-2026',
    dayNumber: 4,
    date: '2026-05-25',
    time: '14:30',
    title: 'Arashiyama Bamboo Grove & Tenryu-ji Garden',
    category: 'Sightseeing',
    location: 'Ukyo Ward, Kyoto',
    notes: 'Stroll across Togetsukyo Bridge and sample matcha soft serve.',
    estimatedCost: 25,
    isCompleted: false,
    order: 3
  }
];
