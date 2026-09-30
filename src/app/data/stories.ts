import { Story } from '../models/story.model';

export const STORIES: Story[] = [
  {
    id: 'india-unreal-places',
    title: '10 Places You Should Visit in India',
    category: 'Discovery & Culture',
    readingTime: '6 min read',
    date: 'Sep 24, 2026',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'From lunar valleys in Ladakh and surreal white salt deserts in Kutch to bioluminescent Goan shores and royal Udaipur palaces, explore India’s most awe-inspiring landscapes.',
    author: {
      name: 'Aarav Mehta',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80'
    }
  },
  {
    id: 'first-international-trip-guide',
    title: 'How to Plan Your First International Trip',
    category: 'Travel Blueprint',
    readingTime: '8 min read',
    date: 'Sep 18, 2026',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'An essential field guide to seamless visa approvals, flight bookings, multi-currency budgeting, and navigating foreign cultures with total poise and excitement.',
    author: {
      name: 'Sophia Montgomery',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    }
  },
  {
    id: 'hidden-destinations-around-the-world',
    title: 'Hidden Destinations Around the World',
    category: 'Secret Escapes',
    readingTime: '5 min read',
    date: 'Sep 12, 2026',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Escape crowded hotspots to discover secret turquoise lagoons, untouched alpine valleys, and secluded sanctuaries reachable only by foot, boat, or seaplane.',
    author: {
      name: 'Camila Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
    }
  }
];
