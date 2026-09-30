import { Destination } from '../models/destination.model';

export const DESTINATIONS: Destination[] = [
  {
    id: 'bali-indonesia',
    name: 'Bali',
    country: 'Indonesia',
    region: 'Asia',
    description: 'Enchanting tropical paradise known for emerald rice terraces, sacred volcanic temples, and world-class surfing.',
    overview: 'Bali is an Indonesian jewel renowned for its forested volcanic mountains, iconic rice paddies, pristine beaches, and coral reefs. The island is home to religious sites such as cliffside Uluwatu Temple, bustling yoga sanctuaries in Ubud, and vibrant beach clubs in Seminyak.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=800&q=80'
    ],
    startingPrice: 850,
    rating: 4.9,
    reviewsCount: 1420,
    tags: ['Tropical', 'Temples', 'Surf', 'Spiritual'],
    travelTypes: ['Beach', 'Nature', 'Culture', 'Romantic', 'Adventure', 'Relaxation'],
    bestTimeToVisit: 'April – October (Dry Season)',
    recommendedDuration: '7 – 10 Days',
    averageBudgetPerDay: 95,
    coordinates: { lat: -8.4095, lng: 115.1889 },
    weather: {
      temp: '29°C',
      condition: 'Tropical Sunshine',
      icon: 'sun',
      humidity: '76%',
      wind: '14 km/h',
      forecast: [
        { day: 'Mon', temp: '29°C', condition: 'Sunny' },
        { day: 'Tue', temp: '30°C', condition: 'Clear' },
        { day: 'Wed', temp: '28°C', condition: 'Partly Cloudy' },
        { day: 'Thu', temp: '29°C', condition: 'Sunny' }
      ]
    },
    popularAttractions: [
      {
        name: 'Tegallalang Rice Terraces',
        image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=600&q=80',
        description: 'Vibrant green cascading rice paddies offering scenic jungle swings and serene dawn walks.',
        coordinates: { lat: -8.4312, lng: 115.2796 }
      },
      {
        name: 'Uluwatu Cliff Temple',
        image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80',
        description: 'Spectacular cliffside sea temple hosting hypnotic sunset Kecak fire dances.',
        coordinates: { lat: -8.8291, lng: 115.0849 }
      },
      {
        name: 'Mount Batur Sunrise Trek',
        image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80',
        description: 'Hike up an active volcano in pre-dawn hours to watch the sunrise pierce the clouds.',
        coordinates: { lat: -8.242, lng: 115.3752 }
      }
    ],
    hotelsCount: 420,
    activitiesCount: 88,
    restaurantsCount: 310,
    travelTips: [
      'Dress respectfully when visiting Hindu temples by wearing a sarong and sash.',
      'Rent a scooter only if experienced with Bali traffic; otherwise, use private drivers.',
      'Keep hydrated with fresh young coconuts readily sold by local warungs.'
    ],
    isFeatured: true,
    isPopular: true
  },
  {
    id: 'paris-france',
    name: 'Paris',
    country: 'France',
    region: 'Europe',
    description: 'The City of Light captivates with timeless art, haute cuisine, iconic landmarks, and romantic boulevard strolls.',
    overview: 'Paris, France’s capital, is a major European city and a global center for art, fashion, gastronomy, and culture. Its 19th-century cityscape is crisscrossed by wide boulevards and the River Seine, punctuated by landmarks such as the Eiffel Tower, Notre-Dame Cathedral, and the Louvre.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520939817895-060bdef4dc1b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509299349698-dd22323b5963?auto=format&fit=crop&w=800&q=80'
    ],
    startingPrice: 1250,
    rating: 4.8,
    reviewsCount: 2310,
    tags: ['Romance', 'Museums', 'Gastronomy', 'Fashion'],
    travelTypes: ['City', 'Romantic', 'Culture', 'Luxury', 'Shopping'],
    bestTimeToVisit: 'May – September',
    recommendedDuration: '5 – 7 Days',
    averageBudgetPerDay: 195,
    coordinates: { lat: 48.8566, lng: 2.3522 },
    weather: {
      temp: '22°C',
      condition: 'Pleasant & Mild',
      icon: 'sun',
      humidity: '58%',
      wind: '11 km/h',
      forecast: [
        { day: 'Mon', temp: '22°C', condition: 'Sunny' },
        { day: 'Tue', temp: '23°C', condition: 'Sunny' },
        { day: 'Wed', temp: '20°C', condition: 'Showers' },
        { day: 'Thu', temp: '21°C', condition: 'Partly Cloudy' }
      ]
    },
    popularAttractions: [
      {
        name: 'Eiffel Tower',
        image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=600&q=80',
        description: 'World-renowned architectural marvel glittering every hour after sunset.',
        coordinates: { lat: 48.8584, lng: 2.2945 }
      },
      {
        name: 'Musée du Louvre',
        image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=600&q=80',
        description: 'The world’s largest art museum housing the Mona Lisa and Venus de Milo.',
        coordinates: { lat: 48.8606, lng: 2.3376 }
      }
    ],
    hotelsCount: 580,
    activitiesCount: 112,
    restaurantsCount: 780,
    travelTips: [
      'Book Louvre and Eiffel Tower skip-the-line tickets at least 2 weeks in advance.',
      'Always greet shopkeepers with a polite "Bonjour" upon entering.',
      'The Paris Metro is fast, affordable, and reaches nearly every neighborhood.'
    ],
    isFeatured: true,
    isPopular: true
  },
  {
    id: 'santorini-greece',
    name: 'Santorini',
    country: 'Greece',
    region: 'Europe',
    description: 'Whitewashed villages clinging to volcanic cliffs overlooking the azure Aegean Sea and legendary golden sunsets.',
    overview: 'Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, forever shaping its rugged caldera. The whitewashed houses of Fira and Oia cling to cliffs above an underwater crater.',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=800&q=80'
    ],
    startingPrice: 1100,
    rating: 4.95,
    reviewsCount: 1840,
    tags: ['Sunsets', 'Caldera', 'Luxury Villas', 'Aegean'],
    travelTypes: ['Beach', 'Romantic', 'Luxury', 'Photography'],
    bestTimeToVisit: 'Late April – Early November',
    recommendedDuration: '4 – 6 Days',
    averageBudgetPerDay: 230,
    coordinates: { lat: 36.3932, lng: 25.4615 },
    weather: {
      temp: '27°C',
      condition: 'Sunny Aegean Breeze',
      icon: 'sun',
      humidity: '52%',
      wind: '18 km/h',
      forecast: [
        { day: 'Mon', temp: '27°C', condition: 'Sunny' },
        { day: 'Tue', temp: '28°C', condition: 'Sunny' },
        { day: 'Wed', temp: '27°C', condition: 'Clear' },
        { day: 'Thu', temp: '26°C', condition: 'Sunny' }
      ]
    },
    popularAttractions: [
      {
        name: 'Oia Sunset Point',
        image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80',
        description: 'World’s most photographed sunset view bathing blue domes in pink twilight.',
        coordinates: { lat: 36.4618, lng: 25.3753 }
      }
    ],
    hotelsCount: 290,
    activitiesCount: 45,
    restaurantsCount: 180,
    travelTips: [
      'Wear sturdy walking shoes; paths are cobbled and stepped.',
      'Book caldera-facing cave hotels early for prime sunset balcony views.'
    ],
    isFeatured: true,
    isPopular: true
  },
  {
    id: 'tokyo-japan',
    name: 'Tokyo',
    country: 'Japan',
    region: 'Asia',
    description: 'Neon skyscrapers, tranquil Shinto shrines, Michelin omakase dining, and unmatched modern design.',
    overview: 'Tokyo, Japan’s bustling capital, mixes the ultramodern and the traditional, from neon-lit skyscrapers to historic temples. The opulent Meiji Shinto Shrine is known for its towering gate and surrounding woods.',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=800&q=80'
    ],
    startingPrice: 1150,
    rating: 4.94,
    reviewsCount: 2100,
    tags: ['Neon', 'Culinary', 'Shibuya', 'Shinto'],
    travelTypes: ['City', 'Culture', 'Food' as any, 'Shopping'],
    bestTimeToVisit: 'March – May & October – November',
    recommendedDuration: '6 – 8 Days',
    averageBudgetPerDay: 175,
    coordinates: { lat: 35.6762, lng: 139.6503 },
    weather: {
      temp: '21°C',
      condition: 'Clear Skies',
      icon: 'sun',
      humidity: '55%',
      wind: '10 km/h',
      forecast: [
        { day: 'Mon', temp: '21°C', condition: 'Sunny' },
        { day: 'Tue', temp: '22°C', condition: 'Sunny' },
        { day: 'Wed', temp: '19°C', condition: 'Cloudy' },
        { day: 'Thu', temp: '20°C', condition: 'Sunny' }
      ]
    },
    popularAttractions: [
      {
        name: 'Shibuya Crossing & Sky',
        image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80',
        description: 'World-famous scramble intersection and 360-degree rooftop observation deck.',
        coordinates: { lat: 35.6595, lng: 139.7005 }
      }
    ],
    hotelsCount: 520,
    activitiesCount: 140,
    restaurantsCount: 1100,
    travelTips: [
      'Get an IC card (Suica/Pasmo) for effortless subway journeys.',
      'Enjoy standing sushi bars in Tsukiji outer market for fresh morning bites.'
    ],
    isFeatured: true,
    isPopular: true
  },
  {
    id: 'dubai-uae',
    name: 'Dubai',
    country: 'United Arab Emirates',
    region: 'Middle East',
    description: 'Futuristic desert metropolis boasting ultra-modern architecture, luxury shopping, and golden sand dunes.',
    overview: 'Dubai is a city and emirate known for luxury shopping, ultramodern architecture, and a lively nightlife scene. Burj Khalifa dominates the skyscraper-filled skyline alongside Palm Jumeirah.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=80'
    ],
    startingPrice: 1350,
    rating: 4.85,
    reviewsCount: 1980,
    tags: ['Luxury', 'Skyscrapers', 'Desert Safari', 'Shopping'],
    travelTypes: ['Luxury', 'City', 'Family', 'Adventure'],
    bestTimeToVisit: 'November – March',
    recommendedDuration: '5 – 7 Days',
    averageBudgetPerDay: 260,
    coordinates: { lat: 25.2048, lng: 55.2708 },
    weather: {
      temp: '31°C',
      condition: 'Sunny & Warm',
      icon: 'sun',
      humidity: '48%',
      wind: '13 km/h',
      forecast: [
        { day: 'Mon', temp: '31°C', condition: 'Sunny' },
        { day: 'Tue', temp: '32°C', condition: 'Sunny' },
        { day: 'Wed', temp: '31°C', condition: 'Clear' },
        { day: 'Thu', temp: '33°C', condition: 'Sunny' }
      ]
    },
    popularAttractions: [
      {
        name: 'Burj Khalifa Observation Deck',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80',
        description: 'Stand atop the world’s tallest tower overlooking the Arabian Gulf.',
        coordinates: { lat: 25.1972, lng: 55.2744 }
      }
    ],
    hotelsCount: 460,
    activitiesCount: 95,
    restaurantsCount: 650,
    travelTips: ['Visit between November and March for pleasant outdoor temperatures.'],
    isFeatured: true,
    isPopular: true
  },
  {
    id: 'goa-india',
    name: 'Goa',
    country: 'India',
    region: 'Asia',
    description: 'Golden palm-lined Arabian Sea beaches, Portuguese colonial architecture, and lively seaside shacks.',
    overview: 'Goa is a state in western India with coastlines stretching along the Arabian Sea. Its long history as a Portuguese colony is evident in preserved 17th-century churches and tropical spice plantations.',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587922546307-776227941871?auto=format&fit=crop&w=800&q=80'
    ],
    startingPrice: 450,
    rating: 4.88,
    reviewsCount: 1680,
    tags: ['Beaches', 'Portuguese Heritage', 'Nightlife', 'Seafood'],
    travelTypes: ['Beach', 'Culture', 'Relaxation', 'Family'],
    bestTimeToVisit: 'November – February',
    recommendedDuration: '4 – 6 Days',
    averageBudgetPerDay: 75,
    coordinates: { lat: 15.2993, lng: 74.124 },
    weather: {
      temp: '30°C',
      condition: 'Tropical Breeze',
      icon: 'sun',
      humidity: '72%',
      wind: '12 km/h',
      forecast: [
        { day: 'Mon', temp: '30°C', condition: 'Sunny' },
        { day: 'Tue', temp: '31°C', condition: 'Clear' },
        { day: 'Wed', temp: '29°C', condition: 'Humid' },
        { day: 'Thu', temp: '30°C', condition: 'Sunny' }
      ]
    },
    popularAttractions: [
      {
        name: 'Fort Aguada & Lighthouse',
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80',
        description: '17th-century Portuguese fortress offering panoramic sunset sea views.',
        coordinates: { lat: 15.492, lng: 73.7737 }
      }
    ],
    hotelsCount: 380,
    activitiesCount: 65,
    restaurantsCount: 420,
    travelTips: ['Rent a scooter to explore secluded South Goa beaches like Palolem.'],
    isFeatured: true,
    isPopular: true
  },
  {
    id: 'rajasthan-india',
    name: 'Rajasthan',
    country: 'India',
    region: 'Asia',
    description: 'Land of Maharajas with golden Thar Desert dunes, majestic Rajput hill forts, and opulent lake palaces.',
    overview: 'Rajasthan is a northern Indian state bordering Pakistan. Its historical sites include the pink facades of Jaipur, the blue alleys of Jodhpur, and Udaipur’s floating Lake Palace.',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80'
    ],
    startingPrice: 650,
    rating: 4.93,
    reviewsCount: 1490,
    tags: ['Forts', 'Palaces', 'Desert Safari', 'Heritage'],
    travelTypes: ['Culture', 'Luxury', 'Photography', 'Adventure'],
    bestTimeToVisit: 'October – March',
    recommendedDuration: '7 – 10 Days',
    averageBudgetPerDay: 90,
    coordinates: { lat: 26.9124, lng: 75.7873 },
    weather: {
      temp: '26°C',
      condition: 'Sunny & Dry',
      icon: 'sun',
      humidity: '35%',
      wind: '9 km/h',
      forecast: [
        { day: 'Mon', temp: '26°C', condition: 'Sunny' },
        { day: 'Tue', temp: '27°C', condition: 'Sunny' },
        { day: 'Wed', temp: '25°C', condition: 'Clear' },
        { day: 'Thu', temp: '26°C', condition: 'Sunny' }
      ]
    },
    popularAttractions: [
      {
        name: 'Amber Fort Jaipur',
        image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=600&q=80',
        description: 'Majestic hilltop fortress overlooking Maota Lake with marble courtyards.',
        coordinates: { lat: 26.9855, lng: 75.8513 }
      }
    ],
    hotelsCount: 320,
    activitiesCount: 70,
    restaurantsCount: 290,
    travelTips: ['Stay in converted heritage Haveli palaces for genuine regal hospitality.'],
    isFeatured: true,
    isPopular: true
  },
  {
    id: 'london-uk',
    name: 'London',
    country: 'United Kingdom',
    region: 'Europe',
    description: 'Iconic world capital blending centuries of royal history, West End theater, and cutting-edge culture.',
    overview: 'London, the capital of England and the United Kingdom, is a 21st-century city with history stretching back to Roman times. At its centre stand the Houses of Parliament, Big Ben, and Westminster Abbey.',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=800&q=80'
    ],
    startingPrice: 1350,
    rating: 4.86,
    reviewsCount: 2800,
    tags: ['Royal', 'Museums', 'West End', 'History'],
    travelTypes: ['City', 'Culture', 'Shopping', 'Family'],
    bestTimeToVisit: 'May – September',
    recommendedDuration: '5 – 7 Days',
    averageBudgetPerDay: 220,
    coordinates: { lat: 51.5074, lng: -0.1278 },
    weather: {
      temp: '19°C',
      condition: 'Partly Cloudy',
      icon: 'sun',
      humidity: '65%',
      wind: '15 km/h',
      forecast: [
        { day: 'Mon', temp: '19°C', condition: 'Partly Cloudy' },
        { day: 'Tue', temp: '20°C', condition: 'Sunny' },
        { day: 'Wed', temp: '18°C', condition: 'Light Rain' },
        { day: 'Thu', temp: '19°C', condition: 'Cloudy' }
      ]
    },
    popularAttractions: [
      {
        name: 'Tower Bridge & Tower of London',
        image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80',
        description: 'Iconic suspension bridge and medieval fortress housing the Crown Jewels.',
        coordinates: { lat: 51.5055, lng: -0.0754 }
      }
    ],
    hotelsCount: 650,
    activitiesCount: 160,
    restaurantsCount: 1400,
    travelTips: ['Use contactless payment on the London Underground for best fare caps.'],
    isFeatured: false,
    isPopular: true
  },
  {
    id: 'new-york-usa',
    name: 'New York City',
    country: 'United States',
    region: 'Americas',
    description: 'The energetic global metropolis of towering skyscrapers, Broadway theater, world-class dining, and Central Park.',
    overview: 'New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean. At its core is Manhattan, home to Times Square, Broadway, and Central Park.',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=800&q=80'
    ],
    startingPrice: 1450,
    rating: 4.88,
    reviewsCount: 3200,
    tags: ['Skyline', 'Broadway', 'Food', 'Culture'],
    travelTypes: ['City', 'Culture', 'Shopping', 'Family'],
    bestTimeToVisit: 'April – June & September – November',
    recommendedDuration: '5 – 7 Days',
    averageBudgetPerDay: 240,
    coordinates: { lat: 40.7128, lng: -74.006 },
    weather: {
      temp: '24°C',
      condition: 'Sunny & Crisp',
      icon: 'sun',
      humidity: '50%',
      wind: '12 km/h',
      forecast: [
        { day: 'Mon', temp: '24°C', condition: 'Sunny' },
        { day: 'Tue', temp: '25°C', condition: 'Sunny' },
        { day: 'Wed', temp: '23°C', condition: 'Clear' },
        { day: 'Thu', temp: '24°C', condition: 'Sunny' }
      ]
    },
    popularAttractions: [
      {
        name: 'Central Park',
        image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=600&q=80',
        description: '843 acres of peaceful green lakes, bridges, and winding forest paths in the city heart.',
        coordinates: { lat: 40.7851, lng: -73.9683 }
      }
    ],
    hotelsCount: 620,
    activitiesCount: 140,
    restaurantsCount: 1200,
    travelTips: ['Walk across the Brooklyn Bridge towards Manhattan at sunset for the best skyline views.'],
    isFeatured: false,
    isPopular: true
  },
  {
    id: 'maldives',
    name: 'Maldives',
    country: 'Maldives',
    region: 'Asia',
    description: 'Idyllic overwater villas floating atop luminous turquoise lagoons and pristine coral atolls.',
    overview: 'The Maldives is a tropical nation composed of 26 ring-shaped atolls with over 1,000 coral islands. Renowned for overwater villas, vibrant marine life, and tranquil luxury.',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=800&q=80'
    ],
    startingPrice: 1950,
    rating: 4.98,
    reviewsCount: 1120,
    tags: ['Overwater Bungalows', 'Snorkeling', 'Honeymoon', 'Pristine'],
    travelTypes: ['Beach', 'Luxury', 'Romantic', 'Relaxation'],
    bestTimeToVisit: 'November – April',
    recommendedDuration: '5 – 8 Days',
    averageBudgetPerDay: 350,
    coordinates: { lat: 3.2028, lng: 73.2207 },
    weather: {
      temp: '30°C',
      condition: 'Tropical Blue Skies',
      icon: 'sun',
      humidity: '74%',
      wind: '14 km/h',
      forecast: [
        { day: 'Mon', temp: '30°C', condition: 'Sunny' },
        { day: 'Tue', temp: '30°C', condition: 'Clear' },
        { day: 'Wed', temp: '29°C', condition: 'Sunny' },
        { day: 'Thu', temp: '31°C', condition: 'Tropical Breeze' }
      ]
    },
    popularAttractions: [
      {
        name: 'Ari Atoll Whale Shark Sanctuary',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
        description: 'Snorkel alongside gentle ocean giants in warm crystal-clear currents.',
        coordinates: { lat: 3.5358, lng: 72.8258 }
      }
    ],
    hotelsCount: 180,
    activitiesCount: 38,
    restaurantsCount: 140,
    travelTips: ['Book all-inclusive packages to avoid surprise costs on isolated resort islands.'],
    isFeatured: false,
    isPopular: true
  },
  {
    id: 'swiss-alps',
    name: 'Switzerland',
    country: 'Switzerland',
    region: 'Europe',
    description: 'Pristine alpine wonderland of snow-capped peaks, crystal mountain lakes, and scenic panoramic rail journeys.',
    overview: 'Switzerland is a mountainous Central European country, home to lakes, medieval cities, and high peaks of the Alps like the Matterhorn and Jungfrau.',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    ],
    startingPrice: 1750,
    rating: 4.96,
    reviewsCount: 1540,
    tags: ['Alps', 'Skiing', 'Scenic Trains', 'Nature'],
    travelTypes: ['Mountain', 'Nature', 'Luxury', 'Adventure', 'Romantic'],
    bestTimeToVisit: 'June – September & Dec – March',
    recommendedDuration: '7 – 10 Days',
    averageBudgetPerDay: 280,
    coordinates: { lat: 46.8182, lng: 8.2275 },
    weather: {
      temp: '18°C',
      condition: 'Fresh Alpine Breeze',
      icon: 'sun',
      humidity: '45%',
      wind: '8 km/h',
      forecast: [
        { day: 'Mon', temp: '18°C', condition: 'Sunny' },
        { day: 'Tue', temp: '19°C', condition: 'Sunny' },
        { day: 'Wed', temp: '16°C', condition: 'Partly Cloudy' },
        { day: 'Thu', temp: '17°C', condition: 'Clear' }
      ]
    },
    popularAttractions: [
      {
        name: 'Jungfraujoch – Top of Europe',
        image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80',
        description: 'The highest railway station in Europe nestled amid glaciers and perpetual snow.',
        coordinates: { lat: 46.5475, lng: 7.9822 }
      }
    ],
    hotelsCount: 310,
    activitiesCount: 55,
    restaurantsCount: 220,
    travelTips: ['Get a Swiss Travel Pass for unlimited travel on trains, buses, and lake ferries.'],
    isFeatured: true,
    isPopular: true
  },
  {
    id: 'singapore',
    name: 'Singapore',
    country: 'Singapore',
    region: 'Asia',
    description: 'A dazzling garden city of futuristic architecture, Michelin street food hawkers, and lush tropical biomes.',
    overview: 'Singapore is a global financial center with a tropical climate and multicultural population. Its colonial core centres on the Padang, surrounded by grand buildings and Gardens by the Bay.',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=800&q=80'
    ],
    startingPrice: 1100,
    rating: 4.91,
    reviewsCount: 1950,
    tags: ['Futuristic', 'Gardens', 'Hawker Food', 'Luxury'],
    travelTypes: ['City', 'Luxury', 'Food' as any, 'Family'],
    bestTimeToVisit: 'November – February',
    recommendedDuration: '4 – 6 Days',
    averageBudgetPerDay: 210,
    coordinates: { lat: 1.3521, lng: 103.8198 },
    weather: {
      temp: '31°C',
      condition: 'Warm & Tropical',
      icon: 'sun',
      humidity: '78%',
      wind: '10 km/h',
      forecast: [
        { day: 'Mon', temp: '31°C', condition: 'Sunny' },
        { day: 'Tue', temp: '31°C', condition: 'Tropical Showers' },
        { day: 'Wed', temp: '30°C', condition: 'Clear' },
        { day: 'Thu', temp: '32°C', condition: 'Sunny' }
      ]
    },
    popularAttractions: [
      {
        name: 'Gardens by the Bay & Supertrees',
        image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=600&q=80',
        description: 'Spectacular futuristic nature park featuring massive illuminated Supertree groves.',
        coordinates: { lat: 1.2816, lng: 103.8636 }
      }
    ],
    hotelsCount: 390,
    activitiesCount: 82,
    restaurantsCount: 750,
    travelTips: ['Visit Maxwell Hawker Centre for world-famous Hainanese Chicken Rice.'],
    isFeatured: false,
    isPopular: true
  },
  {
    id: 'manali-india',
    name: 'Manali',
    country: 'India',
    region: 'Asia',
    description: 'Snow-draped Himalayan mountain peaks, cedar pine forests, thrilling Solang Valley adventure sports, and riverside alpine retreats.',
    overview: 'Manali is a high-altitude Himalayan resort town in Himachal Pradesh. It has a reputation as a backpacking center and honeymoon destination, situated on the Beas River near Solang Valley and Rohtang Pass.',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    ],
    startingPrice: 380,
    rating: 4.89,
    reviewsCount: 1250,
    tags: ['Snow Peaks', 'Solang Valley', 'Paragliding', 'Himalayas'],
    travelTypes: ['Mountain', 'Adventure', 'Nature', 'Romantic'],
    bestTimeToVisit: 'October – June',
    recommendedDuration: '5 – 7 Days',
    averageBudgetPerDay: 65,
    coordinates: { lat: 32.2432, lng: 77.1892 },
    weather: {
      temp: '14°C',
      condition: 'Crisp Mountain Breeze',
      icon: 'sun',
      humidity: '48%',
      wind: '7 km/h',
      forecast: [
        { day: 'Mon', temp: '14°C', condition: 'Sunny' },
        { day: 'Tue', temp: '15°C', condition: 'Clear' },
        { day: 'Wed', temp: '12°C', condition: 'Partly Cloudy' },
        { day: 'Thu', temp: '13°C', condition: 'Sunny' }
      ]
    },
    popularAttractions: [
      {
        name: 'Solang Valley & Rohtang Pass',
        image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80',
        description: 'Spectacular alpine adventure playground for paragliding, skiing, and snowmobiling.',
        coordinates: { lat: 32.3166, lng: 77.1583 }
      }
    ],
    hotelsCount: 260,
    activitiesCount: 48,
    restaurantsCount: 190,
    travelTips: ['Rent snow gear at the base before heading up to Rohtang Pass.'],
    isFeatured: true,
    isPopular: true
  },
  {
    id: 'kyoto-japan',
    name: 'Kyoto',
    country: 'Japan',
    region: 'Asia',
    description: 'Heartbeat of traditional Japanese culture, serene bamboo groves, traditional wooden machiya houses, and geisha traditions.',
    overview: 'Kyoto, once the capital of Japan, is a city on the island of Honshu. It is famous for its numerous classical Buddhist temples, gardens, imperial palaces, Shinto shrines and traditional wooden houses.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80'
    ],
    startingPrice: 1050,
    rating: 4.9,
    reviewsCount: 1890,
    tags: ['Temples', 'Geisha', 'Bamboo Forest', 'Tea Ceremony'],
    travelTypes: ['Culture', 'Romantic', 'Photography', 'Food' as any],
    bestTimeToVisit: 'March – May & October – November',
    recommendedDuration: '5 – 7 Days',
    averageBudgetPerDay: 160,
    coordinates: { lat: 35.0116, lng: 135.7681 },
    weather: {
      temp: '22°C',
      condition: 'Pleasant & Mild',
      icon: 'sun',
      humidity: '58%',
      wind: '8 km/h',
      forecast: [
        { day: 'Mon', temp: '22°C', condition: 'Sunny' },
        { day: 'Tue', temp: '23°C', condition: 'Clear' },
        { day: 'Wed', temp: '21°C', condition: 'Partly Cloudy' },
        { day: 'Thu', temp: '22°C', condition: 'Sunny' }
      ]
    },
    popularAttractions: [
      {
        name: 'Fushimi Inari-taisha',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80',
        description: 'Iconic mountain shrine with over 10,000 vibrant vermilion torii gates.',
        coordinates: { lat: 34.9671, lng: 135.7727 }
      },
      {
        name: 'Arashiyama Bamboo Grove',
        image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=600&q=80',
        description: 'Serene towering bamboo stalks swaying gently in the mountain breeze.',
        coordinates: { lat: 35.0169, lng: 135.6713 }
      }
    ],
    hotelsCount: 340,
    activitiesCount: 88,
    restaurantsCount: 620,
    travelTips: ['Experience a traditional matcha tea ceremony in the historic Gion district.'],
    isFeatured: true,
    isPopular: true
  }
];
