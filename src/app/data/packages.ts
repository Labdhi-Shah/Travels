import { TourPackage } from '../models/package.model';

export const PACKAGES: TourPackage[] = [
  {
    id: 'bali-escape-wellness',
    name: 'Bali Escape & Wellness',
    destination: 'Bali',
    country: 'Indonesia',
    durationDays: 8,
    durationNights: 7,
    maxTravelers: 2,
    rating: 4.9,
    reviewsCount: 380,
    price: 950,
    originalPrice: 1250,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=800&q=80'
    ],
    overview: 'Rejuvenate your mind, body and soul in the tropical paradise of Bali. Spa retreats, sunset temple visits and island cruises.',
    category: 'Relaxation',
    included: [
      '7 Nights in 5-Star Luxury Ubud & Seminyak Resorts',
      'Daily Organic Farm Breakfast & Ayurvedic Spa Sessions',
      'Uluwatu Sunset Temple Visit & Kecak Fire Dance',
      'Nusa Penida Snorkeling Catamaran Day Cruise',
      'Private Chauffeur with Airport Transfers'
    ],
    excluded: [
      'International Airfare',
      'Personal Souvenirs & Gratuities'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Bali & Ubud Jungle Welcome',
        description: 'Chauffeured transfer to your luxury valley resort in Ubud, herbal welcome bath, and candlelit welcome dinner.',
        activities: ['Airport Meet & Greet', 'Check-in at Maya Ubud', 'Welcome Spa Treatment'],
        meals: ['Dinner'],
        stay: 'Maya Ubud Resort & Spa'
      },
      {
        day: 2,
        title: 'Emerald Rice Terraces & Sacred Water Temple',
        description: 'Trek through Tegallalang cascading terraces and partake in a traditional Tirta Empul purification ceremony.',
        activities: ['Tegallalang Walk', 'Tirta Empul Blessing', 'Yoga Class'],
        meals: ['Breakfast', 'Lunch'],
        stay: 'Maya Ubud Resort & Spa'
      },
      {
        day: 3,
        title: 'Mount Batur Sunrise & Hot Springs',
        description: 'Pre-dawn 4WD ascent for volcanic sunrise, followed by therapeutic volcanic mineral thermal pools.',
        activities: ['Sunrise Viewing', 'Thermal Hot Springs', 'Coffee Plantation'],
        meals: ['Breakfast', 'Lunch'],
        stay: 'Maya Ubud Resort & Spa'
      }
    ],
    hotelInfo: {
      name: 'Maya Ubud Resort & Spa',
      stars: 5,
      description: 'Lush riverside sanctuary offering world-renowned holistic spa pavilions and panoramic jungle infinity pools.'
    },
    transportation: 'Private Air-Conditioned SUV with Personal Chauffeur',
    activitiesIncluded: ['Spa Treatments', 'Temple Tours', 'Snorkeling', '+2 more'],
    reviews: [
      {
        userName: 'Amanda Reynolds',
        userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: 'February 2026',
        comment: 'Truly an ethereal wellness retreat. The Ubud resort is breathtaking and the spa staff are world class.'
      }
    ],
    featured: true
  },
  {
    id: 'dubai-premium-desert',
    name: 'Dubai Premium Desert & Gold Luxury',
    destination: 'Dubai',
    country: 'UAE',
    durationDays: 6,
    durationNights: 5,
    maxTravelers: 2,
    rating: 4.8,
    reviewsCount: 420,
    price: 1950,
    originalPrice: 2400,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=80'
    ],
    overview: 'Experience the glittering jewel of the Middle East in pure luxury, from sky-high dining to dune bashing in a 4x4 Land Cruiser.',
    category: 'Luxury',
    included: [
      '5 Nights in Palm Jumeirah Luxury Ocean Suite',
      'Burj Khalifa At The Top (VIP Lounge Access)',
      'Royal Red Dune Desert Safari with Private Bedouin Camp',
      'Marina Mega-Yacht Champagne Dinner Cruise'
    ],
    excluded: [
      'UAE Visa Fees',
      'Helicopter Add-on'
    ],
    itinerary: [
      {
        day: 1,
        title: 'VIP Arrival in Dubai',
        description: 'Chauffeured airport transfer in a Mercedes Maybach to Atlantis The Royal on Palm Jumeirah.',
        activities: ['VIP Airport Reception', 'Suite Check-In', 'Sky Pool Cocktails'],
        meals: ['Dinner'],
        stay: 'Atlantis The Royal Palm'
      }
    ],
    hotelInfo: {
      name: 'Atlantis The Royal Palm',
      stars: 5,
      description: 'Ultra-luxury modern landmark destination with dramatic architecture, sky pools, and Michelin dining.'
    },
    transportation: 'Private Luxury Fleet with Chauffeur',
    activitiesIncluded: ['Desert Safari', 'Burj Khalifa', 'Marina Cruise', '+1 more'],
    reviews: [
      {
        userName: 'Tariq Al-Mansoor',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: 'January 2026',
        comment: 'Unsurpassed five-star service. The desert safari was completely luxurious.'
      }
    ],
    featured: true
  },
  {
    id: 'paris-highlights-cultural',
    name: 'Paris Highlights & Cultural Tour',
    destination: 'Paris',
    country: 'France',
    durationDays: 7,
    durationNights: 6,
    maxTravelers: 2,
    rating: 4.9,
    reviewsCount: 510,
    price: 1850,
    originalPrice: 2200,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80'
    ],
    overview: 'Explore the City of Light with priority access to iconic landmarks, world-renowned museums, romantic river cruises and fine dining.',
    category: 'Cultural',
    included: [
      '6 Nights in Luxury 1st Arrondissement Hotel',
      'Skip-the-Line Eiffel Tower & Louvre Guided Tours',
      'Private Seine Sunset Wine & Cheese Cruise',
      'Gourmet Saint-Germain Food & Pastry Walking Tour'
    ],
    excluded: [
      'Gratuities',
      'Transatlantic Flights'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Bienvenue à Paris',
        description: 'Arrival at Charles de Gaulle Airport, transfer to Hotel Regina Louvre, and evening stroll in Tuileries Gardens.',
        activities: ['Chauffeured Transfer', 'Tuileries Walk', 'Bistro Dinner'],
        meals: ['Dinner'],
        stay: 'Hotel Regina Louvre'
      }
    ],
    hotelInfo: {
      name: 'Hotel Regina Louvre',
      stars: 5,
      description: 'Historic grand Parisian hotel with direct views of the Louvre Museum and Eiffel Tower.'
    },
    transportation: 'Private Chauffeur & First Class Metro Passes',
    activitiesIncluded: ['Eiffel Tower Fast Pass', 'Louvre Museum Tour', 'Seine River Cruise', '+2 more'],
    reviews: [
      {
        userName: 'Claire Dupont',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: 'March 2026',
        comment: 'Every moment in Paris felt like a dream. The skip-the-line museum passes saved hours!'
      }
    ],
    featured: true
  },
  {
    id: 'switzerland-alps-adventure',
    name: 'Switzerland Alps Mountain Adventure',
    destination: 'Switzerland',
    country: 'Switzerland',
    durationDays: 8,
    durationNights: 7,
    maxTravelers: 2,
    rating: 4.9,
    reviewsCount: 390,
    price: 1850,
    originalPrice: 2300,
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80'
    ],
    overview: 'Traverse high altitude peaks and emerald valleys on the Swiss mountain railways. View majestic glaciers, alpine lakes, and chalets.',
    category: 'Adventure',
    included: [
      '7 Nights in Luxury Alpine Chalet Hotels in Interlaken & Zermatt',
      'First-Class Swiss Travel Pass (Trains, Boats, Cable Cars)',
      'Jungfraujoch – Top of Europe Cogwheel Train Tickets',
      'Lake Geneva Scenic Steamship Excursion'
    ],
    excluded: [
      'Ski Rental Equipment',
      'Travel Insurance'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Zurich & Scenic Train to Interlaken',
        description: 'First class rail through scenic alpine valleys to Interlaken, nestled between two crystal lakes.',
        activities: ['Zurich Airport Transfer', 'Panoramic Train Ride', 'Alpine Dinner'],
        meals: ['Dinner'],
        stay: 'Victoria-Jungfrau Grand Hotel'
      }
    ],
    hotelInfo: {
      name: 'Victoria-Jungfrau Grand Hotel & Spa',
      stars: 5,
      description: 'Historic palace hotel with direct views of the snow-crowned Jungfrau massif.'
    },
    transportation: 'Swiss 1st Class Panoramic Rail',
    activitiesIncluded: ['Jungfraujoch Pass', 'Lake Geneva Cruise', 'Glacier Express Train'],
    reviews: [
      {
        userName: 'Hans Weber',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: 'February 2026',
        comment: 'The scenic railways are unbelievable. Jungfraujoch was the absolute highlight of my life.'
      }
    ],
    featured: true
  },
  {
    id: 'maldives-overwater-retreat',
    name: 'Maldives Luxury Overwater Retreat',
    destination: 'Maldives',
    country: 'Maldives',
    durationDays: 6,
    durationNights: 5,
    maxTravelers: 2,
    rating: 4.9,
    reviewsCount: 310,
    price: 3200,
    originalPrice: 3900,
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80'
    ],
    overview: 'Escape to an exclusive private lagoon and bask in the crystal clear turquoise ocean, staying in ultra-luxury overwater villas.',
    category: 'Luxury',
    included: [
      '5 Nights in Luxury Overwater Villa with Private Plunge Pool',
      'Round-Trip Scenic Seaplane Transfers from Malé (MLE)',
      'All-Inclusive Fine Dining & Champagne Bar',
      'Private Sandbank Sunset Dinner with Personal Chef'
    ],
    excluded: [
      'Scuba Certification Course',
      'Spa Treatments Beyond Package'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Seaplane Arrival in Paradise',
        description: 'Breathtaking 30-minute aerial seaplane flight to your private atoll and welcome into your overwater villa.',
        activities: ['Seaplane Transfer', 'Villa Welcome Tour', 'Sunset Cocktails'],
        meals: ['Dinner'],
        stay: 'Soneva Jani Overwater Sanctuary'
      }
    ],
    hotelInfo: {
      name: 'Soneva Jani Overwater Sanctuary',
      stars: 5,
      description: 'Iconic water villas with retractable roofs to stargaze from bed and private water slides into the turquoise sea.'
    },
    transportation: 'Aerial Seaplane & Private Speedboat',
    activitiesIncluded: ['Overwater Villa Stay', 'Private Sandbank Dinner', 'Reef Scuba Tour'],
    reviews: [
      {
        userName: 'Sophia Miller',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: 'January 2026',
        comment: 'Pure magic. Sliding straight from our villa into the crystal warm water was unforgettable.'
      }
    ],
    featured: true
  },
  {
    id: 'london-royal-heritage',
    name: 'London Royal Heritage & City Tour',
    destination: 'London',
    country: 'United Kingdom',
    durationDays: 7,
    durationNights: 6,
    maxTravelers: 2,
    rating: 4.8,
    reviewsCount: 460,
    price: 1650,
    originalPrice: 1950,
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80'
    ],
    overview: 'Immerse yourself in centuries of British royal history, world-class theatre, bustling riverside markets, and famous landmarks.',
    category: 'Cultural',
    included: [
      '6 Nights in Luxury Westminster 5-Star Hotel',
      'Tower of London & Crown Jewels Early Access Tour',
      'Private Capsule Experience on the London Eye',
      'Traditional Afternoon Tea at The Ritz London'
    ],
    excluded: [
      'West End Theatre Tickets (Optional Add-on)',
      'Personal Shopping'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in British Capital',
        description: 'Chauffeured ride from Heathrow to your historic Westminster hotel overlooking the Thames.',
        activities: ['Chauffeured Airport Transfer', 'Westminster Abbey Stroll', 'Pub Dinner'],
        meals: ['Dinner'],
        stay: 'The Savoy London'
      }
    ],
    hotelInfo: {
      name: 'The Savoy London',
      stars: 5,
      description: 'World-famous historic hotel on the Strand offering British grandeur and legendary riverside luxury.'
    },
    transportation: 'Black Cab Passes & Private Airport Transfers',
    activitiesIncluded: ['Tower of London & Crown Jewels', 'London Eye Flight', 'River Thames Cruise'],
    reviews: [
      {
        userName: 'Richard Thorne',
        userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: 'March 2026',
        comment: 'The early access to the Crown Jewels before any crowds arrived was worth every single penny.'
      }
    ],
    featured: true
  },
  {
    id: 'kyoto-cultural-journey',
    name: 'Kyoto Cultural Journey & Ancient Temples',
    destination: 'Kyoto',
    country: 'Japan',
    durationDays: 8,
    durationNights: 7,
    maxTravelers: 2,
    rating: 4.9,
    reviewsCount: 480,
    price: 1750,
    originalPrice: 2150,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80'
    ],
    overview: 'Step into traditional Japan in ancient Kyoto, wander through thousands of vermilion torii gates, and relax in authentic ryokans.',
    category: 'Cultural',
    included: [
      '4 Nights in Luxury Machiya + 3 Nights in Onsen Ryokan',
      'Private Master Matcha Tea Ceremony in Gion',
      'Early Morning Arashiyama Bamboo Grove & Monkey Park Walk',
      'Multi-Course Kaiseki Dining Experiences'
    ],
    excluded: [
      'JR Pass Beyond Kyoto Route',
      'Kimono Purchase'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Kyoto via Shinkansen',
        description: 'Meet your guide at Kyoto Station, transfer to your private machiya townhouse, and evening walk along Kamo River.',
        activities: ['Station Transfer', 'Gion Evening Walk', 'Kaiseki Dinner'],
        meals: ['Dinner'],
        stay: 'Sowaka Heritage Luxury Machiya'
      }
    ],
    hotelInfo: {
      name: 'Sowaka Heritage Luxury Machiya',
      stars: 5,
      description: 'Restored century-old Japanese sukiya-style inn featuring private rock gardens and hinoki cedar soaking tubs.'
    },
    transportation: 'Private Chauffeured Van & Shinkansen Passes',
    activitiesIncluded: ['Tea Ceremony', 'Bamboo Forest Walk', 'Ryokan Stay'],
    reviews: [
      {
        userName: 'Elena Rostova',
        userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: 'April 2026',
        comment: 'Staying in an authentic ryokan with private onsen was the most relaxing travel experience I have ever had.'
      }
    ],
    featured: true
  },
  {
    id: 'goa-tropical-beach',
    name: 'Goa Tropical Beach & Heritage Getaway',
    destination: 'Goa',
    country: 'India',
    durationDays: 5,
    durationNights: 4,
    maxTravelers: 2,
    rating: 4.7,
    reviewsCount: 350,
    price: 750,
    originalPrice: 950,
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80'
    ],
    overview: 'Unwind on golden beaches, explore colonial Portuguese architecture, savor fresh seafood by the sea, and take a sunset river cruise.',
    category: 'Beaches',
    included: [
      '4 Nights in 5-Star Beachfront Luxury Resort',
      'Old Goa Heritage Cathedral Tour & Fontainhas Latin Quarter Walk',
      'Private Mandovi River Sunset Catamaran Cruise',
      'Daily Buffet Breakfast & Beachside Seafood BBQ'
    ],
    excluded: [
      'Motorized Water Sports Fees',
      'Alcoholic Beverages'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Tropical Welcome in Goa',
        description: 'Chauffeured arrival from Goa airport to your beachfront resort, coconut water welcome, and sunset on Benaulim beach.',
        activities: ['Airport Chauffeur', 'Resort Welcome', 'Beach Sunset'],
        meals: ['Dinner'],
        stay: 'Taj Exotica Resort & Spa'
      }
    ],
    hotelInfo: {
      name: 'Taj Exotica Resort & Spa',
      stars: 5,
      description: 'Mediterranean-style coastal oasis set in 56 acres of lush gardens with pristine white sand beachfront.'
    },
    transportation: 'Private Air-Conditioned SUV',
    activitiesIncluded: ['Calangute Beach Day', 'Old Goa Cathedral Tour', 'Mandovi River Cruise'],
    reviews: [
      {
        userName: 'Pooja Verma',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: 'January 2026',
        comment: 'The resort was heavenly and the heritage tour in Fontainhas was so photogenic. Highly recommend!'
      }
    ],
    featured: true
  },
  {
    id: 'goa-beach-escape-4d',
    name: 'Goa Beach Escape – 4 Days',
    destination: 'Goa',
    country: 'India',
    durationDays: 4,
    durationNights: 3,
    maxTravelers: 10,
    rating: 4.88,
    reviewsCount: 340,
    price: 499,
    originalPrice: 650,
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80'
    ],
    overview: 'Experience golden sandy shores, vibrant Portuguese heritage streets in Fontainhas, fresh coastal seafood, and relaxing sunset river cruises in Goa.',
    category: 'Beaches',
    included: [
      '3 Nights in 5-Star Beachfront Resort',
      'Daily Tropical Breakfast & Seafood Beach Dinner',
      'Old Goa Heritage Churches & Fontainhas Walking Tour',
      'Private Mandovi River Sunset Catamaran Cruise',
      'Airport Meet & Greet with Air-Conditioned Transfers'
    ],
    excluded: [
      'Domestic Airfare',
      'Water Sports Charges (Jet Ski, Parasailing)',
      'Alcoholic Beverages Outside Meals'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in North Goa & Beachside Welcome',
        description: 'Chauffeured arrival from Dabolim or Mopa Airport to luxury resort, welcome cocktail, and evening stroll on Calangute shore.',
        activities: ['Airport Transfer', 'Resort Welcome Reception', 'Calangute Sunset'],
        meals: ['Dinner'],
        stay: 'Taj Exotica Resort & Spa'
      },
      {
        day: 2,
        title: 'Old Goa Cathedrals & Latin Quarter Fontainhas',
        description: 'Guided exploration of Basilica of Bom Jesus and Se Cathedral followed by pastel-coloured alleys of Fontainhas in Panaji.',
        activities: ['Bom Jesus Basilica', 'Fontainhas Heritage Walk', 'Goan Spice Lunch'],
        meals: ['Breakfast', 'Lunch'],
        stay: 'Taj Exotica Resort & Spa'
      },
      {
        day: 3,
        title: 'Dudhsagar Falls & Organic Spice Plantation',
        description: '4WD jungle drive to Dudhsagar waterfall viewpoint with fresh river swim, followed by a traditional Goan buffet at Sahakari Spice Farm.',
        activities: ['Jeep Jungle Safari', 'Waterfall Swim', 'Spice Farm Tour'],
        meals: ['Breakfast', 'Lunch', 'Beach BBQ Dinner'],
        stay: 'Taj Exotica Resort & Spa'
      },
      {
        day: 4,
        title: 'South Goa Serenity & Departure',
        description: 'Relax at Palolem Beach, pick up Goan feni and cashews, then transfer to the airport for your onward journey.',
        activities: ['Palolem Beach Leisure', 'Souvenir Shopping', 'Airport Drop-off'],
        meals: ['Breakfast'],
        stay: 'Departure'
      }
    ],
    hotelInfo: {
      name: 'Taj Exotica Resort & Spa Benaulim',
      stars: 5,
      description: 'Mediterranean-style coastal oasis set in 56 acres of lush gardens with pristine white sand beachfront.'
    },
    transportation: 'Private Air-Conditioned SUV with Chauffeur',
    activitiesIncluded: ['Catamaran Sunset Cruise', 'Fontainhas Tour', 'Dudhsagar Jeep Safari', 'Spice Plantation Lunch'],
    reviews: [
      {
        userName: 'Pooja Verma',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: 'January 2026',
        comment: 'The resort was heavenly and the heritage tour in Fontainhas was so photogenic. Highly recommend!'
      }
    ],
    featured: true
  },
  {
    id: 'dubai-explorer-6d',
    name: 'Dubai Explorer – 6 Days',
    destination: 'Dubai',
    country: 'United Arab Emirates',
    durationDays: 6,
    durationNights: 5,
    maxTravelers: 12,
    rating: 4.95,
    reviewsCount: 620,
    price: 1399,
    originalPrice: 1750,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80'
    ],
    overview: 'Witness towering skyscrapers, thrilling red dune safaris, world-record observation decks, and luxury mega-yacht marina cruises.',
    category: 'Luxury',
    included: [
      '5 Nights in 5-Star Palm Jumeirah Resort',
      'Burj Khalifa At The Top (124th & 125th Floor) Fast Track',
      'Red Dune Desert Safari with BBQ Buffet & Dune Bashing',
      'Marina Mega-Yacht Dinner Cruise with Live Shows',
      'Museum of the Future Entry & Private Transfers'
    ],
    excluded: [
      'UAE Tourist Visa Fees',
      'Helicopter Flight (Optional Add-on)',
      'Personal Shopping'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Dubai & Marina Skyline Walk',
        description: 'VIP airport transfer, check-in to Palm Jumeirah hotel, and evening stroll along the bustling Dubai Marina promenade.',
        activities: ['VIP Airport Pickup', 'Hotel Check-in', 'Dubai Marina Walk'],
        meals: ['Welcome Dinner'],
        stay: 'Atlantis The Royal Palm'
      },
      {
        day: 2,
        title: 'Modern Marvels: Burj Khalifa & Dubai Mall',
        description: 'Ascend the Burj Khalifa observation deck, watch the world’s largest choreographed fountain show, and explore the Dubai Mall Aquarium.',
        activities: ['Burj Khalifa Observation Deck', 'Dubai Mall & Fountain Show'],
        meals: ['Breakfast'],
        stay: 'Atlantis The Royal Palm'
      },
      {
        day: 3,
        title: 'Museum of the Future & Old Dubai Souks',
        description: 'Morning visit to the futuristic torus-shaped museum followed by a traditional Abra boat ride across Dubai Creek to Gold and Spice Souks.',
        activities: ['Museum of the Future', 'Abra Creek Ride', 'Spice & Gold Souks'],
        meals: ['Breakfast', 'Emirati Lunch'],
        stay: 'Atlantis The Royal Palm'
      },
      {
        day: 4,
        title: 'Red Dune Safari & Arabian Desert Camp',
        description: 'Thrilling 4x4 dune bashing across Lahbab desert, sandboarding, camel rides, and starlit BBQ buffet with fire and Tanoura dance.',
        activities: ['Dune Bashing', 'Camel Ride', 'BBQ Desert Feast'],
        meals: ['Breakfast', 'Desert BBQ Dinner'],
        stay: 'Atlantis The Royal Palm'
      },
      {
        day: 5,
        title: 'Atlantis Aquaventure & Marina Yacht Dinner',
        description: 'Full day pass to the world’s largest waterpark, followed by a 3-hour sunset cruise on a 150-ft luxury mega-yacht.',
        activities: ['Aquaventure Waterpark', 'Luxury Yacht Cruise'],
        meals: ['Breakfast', 'Gourmet Yacht Dinner'],
        stay: 'Atlantis The Royal Palm'
      },
      {
        day: 6,
        title: 'Leisure Morning & Departure',
        description: 'Breakfast overlooking the Arabian Gulf, private check-out, and chauffeur transfer to Dubai International Airport (DXB).',
        activities: ['Palm Jumeirah Boardwalk', 'Airport Transfer'],
        meals: ['Breakfast'],
        stay: 'Departure'
      }
    ],
    hotelInfo: {
      name: 'Atlantis The Royal Palm',
      stars: 5,
      description: 'Iconic ultra-luxury architectural wonder featuring sky pools, celebrity chef restaurants, and private beachfront.'
    },
    transportation: 'Private Mercedes Chauffeur Service',
    activitiesIncluded: ['Burj Khalifa Tickets', 'Desert Safari', 'Museum of the Future', 'Mega-Yacht Cruise'],
    reviews: [
      {
        userName: 'Tariq Al-Mansoor',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: 'February 2026',
        comment: 'The desert safari and Burj Khalifa fast-track passes were completely worth it. Unbelievable organization.'
      }
    ],
    featured: true
  },
  {
    id: 'japan-discovery-8d',
    name: 'Japan Discovery – 8 Days',
    destination: 'Tokyo & Kyoto',
    country: 'Japan',
    durationDays: 8,
    durationNights: 7,
    maxTravelers: 10,
    rating: 4.96,
    reviewsCount: 780,
    price: 2199,
    originalPrice: 2600,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=800&q=80'
    ],
    overview: 'Immerse yourself in neon-drenched Tokyo avenues, ancient Kyoto zen temples, bullet train journeys past Mt. Fuji, and authentic tea ceremonies.',
    category: 'Cultural',
    included: [
      '7 Nights in 5-Star Luxury Hotels and Ryokan',
      '7-Day JR Shinkansen Bullet Train Green Pass',
      'Authentic Tea Ceremony & Kimono Experience in Kyoto',
      'Tsukiji Outer Market Culinary Tasting Walk',
      'teamLab Planets Priority Digital Art Ticket'
    ],
    excluded: [
      'International Flights',
      'Travel Visa Fees',
      'Alcoholic Beverages with Meals'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrive in Tokyo & Shibuya Crossing',
        description: 'Chauffeured arrival at Haneda or Narita, hotel check-in in Shinjuku, and evening sunset view over the iconic Shibuya Crossing.',
        activities: ['Airport Transfer', 'Shibuya Crossing', 'Shinjuku Neon Walk'],
        meals: ['Welcome Kaiseki Dinner'],
        stay: 'The Capitol Hotel Tokyu'
      },
      {
        day: 2,
        title: 'Senso-ji & teamLab Digital Planets',
        description: 'Step into ancient Asakusa at Senso-ji temple, followed by barefoot immersion into the digital art installations of teamLab Planets.',
        activities: ['Senso-ji Temple', 'teamLab Planets Digital Museum'],
        meals: ['Breakfast', 'Ramen Tasting Lunch'],
        stay: 'The Capitol Hotel Tokyu'
      },
      {
        day: 3,
        title: 'Tsukiji Market & Shinkansen to Kyoto',
        description: 'Sashimi tasting at Tsukiji outer market, then board the 300 km/h Shinkansen bullet train past Mt. Fuji towards ancient Kyoto.',
        activities: ['Tsukiji Market Food Tour', 'Shinkansen Bullet Train'],
        meals: ['Breakfast', 'Bento Box Lunch'],
        stay: 'Sowaka Heritage Luxury Machiya'
      },
      {
        day: 4,
        title: 'Fushimi Inari & Gion Geisha District',
        description: 'Walk through thousands of vermilion torii gates at dawn, visit Kiyomizu-dera wooden terrace, and stroll Gion lantern-lit alleys.',
        activities: ['Fushimi Inari Taisha', 'Kiyomizu-dera', 'Gion Evening Tour'],
        meals: ['Breakfast'],
        stay: 'Sowaka Heritage Luxury Machiya'
      },
      {
        day: 5,
        title: 'Arashiyama Bamboo Grove & Golden Pavilion',
        description: 'Listen to the rustle of the Arashiyama bamboo forest, cross the Togetsukyo Bridge, and visit the glittering Kinkaku-ji (Golden Pavilion).',
        activities: ['Arashiyama Bamboo Grove', 'Kinkaku-ji Golden Pavilion'],
        meals: ['Breakfast', 'Shojin Ryori Vegetarian Lunch'],
        stay: 'Sowaka Heritage Luxury Machiya'
      },
      {
        day: 6,
        title: 'Nara Deer Park & Todai-ji Temple',
        description: 'Day trip to Nara to meet free-roaming sacred deer and see the world’s largest bronze Buddha statue in Todai-ji.',
        activities: ['Nara Deer Park', 'Todai-ji Great Buddha'],
        meals: ['Breakfast'],
        stay: 'Sowaka Heritage Luxury Machiya'
      },
      {
        day: 7,
        title: 'Osaka Street Food Extravaganza',
        description: 'Bullet train to Osaka for street food tasting in Dotonbori: crispy takoyaki, okonomiyaki, and Kuromon Ichiba market.',
        activities: ['Osaka Castle', 'Dotonbori Street Food Tour'],
        meals: ['Breakfast', 'Dinner'],
        stay: 'The St. Regis Osaka'
      },
      {
        day: 8,
        title: 'Farewell Japan',
        description: 'Private airport transfer from Osaka Kansai (KIX) or return Shinkansen to Tokyo for your flight home.',
        activities: ['Airport Chauffeur Transfer'],
        meals: ['Breakfast'],
        stay: 'Departure'
      }
    ],
    hotelInfo: {
      name: 'The Capitol Hotel Tokyu & Sowaka Kyoto',
      stars: 5,
      description: 'Award-winning blend of Japanese minimalist aesthetics, zen gardens, and premier hospitality.'
    },
    transportation: 'JR Shinkansen First Class & Private Chauffeur Transfers',
    activitiesIncluded: ['teaLab Planets Entry', 'Tea Ceremony', 'Shinkansen Bullet Train', 'Food Walking Tours'],
    reviews: [
      {
        userName: 'Jonathan Scott',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: 'November 2025',
        comment: 'Kyoto machiya stay was magical and the bullet train was smoother than flying. Unforgettable.'
      }
    ],
    featured: true
  },
  {
    id: 'swiss-alps-7d',
    name: 'Swiss Alps & Matterhorn – 7 Days',
    destination: 'Interlaken & Zermatt',
    country: 'Switzerland',
    durationDays: 7,
    durationNights: 6,
    maxTravelers: 8,
    rating: 4.97,
    reviewsCount: 310,
    price: 2650,
    originalPrice: 3050,
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80'
    ],
    overview: 'Conquer the Swiss Alps on legendary panoramic trains, hike flower-filled meadows under the Matterhorn, and gaze from the Top of Europe.',
    category: 'Adventure',
    included: [
      '6 Nights in Alpine Chalet Luxury Resorts',
      'First-Class Swiss Travel Pass with Glacier Express',
      'Jungfraujoch – Top of Europe Cogwheel Train Ticket',
      'Gornergrat Matterhorn Vista Cableway Ticket',
      'Daily Swiss Breakfast & Traditional Cheese Fondue Dinner'
    ],
    excluded: [
      'Ski Gear Rental (Optional)',
      'Paragliding Activity (Optional Add-on)'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Zurich to Interlaken',
        description: 'Board panoramic lake train to Interlaken situated between Lake Thun and Lake Brienz. Evening stroll along Hohematte.',
        activities: ['Scenic Train to Interlaken', 'Lakeside Welcome Walk'],
        meals: ['Welcome Swiss Fondue'],
        stay: 'Victoria-Jungfrau Grand Hotel'
      },
      {
        day: 2,
        title: 'Jungfraujoch – Top of Europe',
        description: 'Ascend the Eiger Express cableway and cogwheel railway through mountain tunnels to 3,454m summit ice palace.',
        activities: ['Jungfraujoch Summit', 'Aletsch Glacier Panorama'],
        meals: ['Breakfast'],
        stay: 'Victoria-Jungfrau Grand Hotel'
      },
      {
        day: 3,
        title: 'Glacier Express to Zermatt',
        description: 'Ride the world’s slowest express train across 291 bridges and 91 tunnels directly into the car-free mountain village of Zermatt.',
        activities: ['Glacier Express Rail', 'Zermatt Village Walk'],
        meals: ['Breakfast', '3-Course Train Lunch'],
        stay: 'Mont Cervin Palace Zermatt'
      },
      {
        day: 4,
        title: 'Gornergrat & Iconic Matterhorn Reflection',
        description: 'Take the open-air cogwheel railway up to 3,089m Gornergrat for unmatched reflections of the Matterhorn in Lake Riffelsee.',
        activities: ['Gornergrat Cogwheel Train', 'Riffelsee Alpine Hike'],
        meals: ['Breakfast'],
        stay: 'Mont Cervin Palace Zermatt'
      },
      {
        day: 5,
        title: 'Matterhorn Glacier Paradise',
        description: 'Highest cable car station in Europe at 3,883m with ice palace carvings and panoramic viewing platform looking towards Mont Blanc.',
        activities: ['Matterhorn Glacier Cableway', 'Ice Palace'],
        meals: ['Breakfast'],
        stay: 'Mont Cervin Palace Zermatt'
      },
      {
        day: 6,
        title: 'Lake Geneva & Montreux Chillon Castle',
        description: 'Scenic descent towards Montreux on Lake Geneva shoreline, visit medieval Château de Chillon, and enjoy Swiss wine tasting.',
        activities: ['Château de Chillon Visit', 'Montreux Lakeside Stroll'],
        meals: ['Breakfast', 'Dinner'],
        stay: 'Fairmont Le Montreux Palace'
      },
      {
        day: 7,
        title: 'Geneva or Zurich Departure',
        description: 'First-class train to Geneva (GVA) or Zurich (ZRH) International Airport for your return departure.',
        activities: ['Airport Rail Transfer'],
        meals: ['Breakfast'],
        stay: 'Departure'
      }
    ],
    hotelInfo: {
      name: 'Victoria-Jungfrau Grand Hotel & Mont Cervin Palace',
      stars: 5,
      description: 'Historic Belle Époque alpine luxury hotels with heated outdoor saltwater pools overlooking alpine peaks.'
    },
    transportation: 'Swiss Federal Railways & Glacier Express First Class',
    activitiesIncluded: ['Jungfraujoch Railway', 'Gornergrat Summit', 'Glacier Express Train', 'Fondue Workshop'],
    reviews: [
      {
        userName: 'Liam Gallagher',
        userAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: 'February 2026',
        comment: 'Glacier Express through snowy passes was mind-blowing. Flawless organization from start to finish.'
      }
    ],
    featured: true
  },
  {
    id: 'european-explorer-10d',
    name: 'European Explorer – 10 Days',
    destination: 'Paris & Rome',
    country: 'France & Italy',
    durationDays: 10,
    durationNights: 9,
    maxTravelers: 12,
    rating: 4.88,
    reviewsCount: 512,
    price: 2450,
    originalPrice: 2890,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80'
    ],
    overview: 'Embark on a grand European odyssey through iconic capitals: from the romantic art-filled boulevards of Paris to ancient Colosseum arches in Rome.',
    category: 'Cultural',
    included: [
      '9 Nights in Handpicked 4-Star Boutique Hotels',
      'High-Speed TGV / Eurostar & Intra-Europe Flight',
      'Skip-the-Line Museum & Monument Passes',
      'Daily Artisanal Breakfast & 3 Wine Tastings',
      'Dedicated Multilingual Tour Director'
    ],
    excluded: [
      'International Transatlantic Flights',
      'Optional Evening Cabaret Shows',
      'Personal Souvenirs'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Bienvenue à Paris',
        description: 'Arrive at Charles de Gaulle, hotel check-in in Saint-Germain-des-Prés, and twilight Seine river cruise with champagne.',
        activities: ['Airport Welcome', 'Seine River Cruise'],
        meals: ['Welcome Dinner'],
        stay: 'Hôtel D’Orsay Paris'
      },
      {
        day: 2,
        title: 'Louvre Treasures & Montmartre',
        description: 'VIP early entrance to the Louvre followed by afternoon walking tour through cobblestone alleyways of Montmartre.',
        activities: ['Louvre VIP Tour', 'Montmartre Artists Walk'],
        meals: ['Breakfast'],
        stay: 'Hôtel D’Orsay Paris'
      },
      {
        day: 3,
        title: 'Versailles Grandeur',
        description: 'Half-day excursion to the Hall of Mirrors and royal gardens of Palace of Versailles.',
        activities: ['Versailles Palace Tour', 'Gardens Tram Ride'],
        meals: ['Breakfast', 'French Lunch'],
        stay: 'Hôtel D’Orsay Paris'
      },
      {
        day: 4,
        title: 'Flight to Rome & Trastevere Welcome',
        description: 'Morning flight to Rome Fiumicino, check-in near Piazza Navona, and lively food tour in bohemian Trastevere.',
        activities: ['Rome Transfer', 'Trastevere Street Food Tour'],
        meals: ['Breakfast', 'Dinner'],
        stay: 'Boutique Hotel Campo de’ Fiori'
      },
      {
        day: 5,
        title: 'Colosseum & Roman Forum',
        description: 'Walk in the footsteps of gladiators with exclusive arena floor access at the Colosseum and Palatine Hill.',
        activities: ['Colosseum Underground Tour', 'Roman Forum'],
        meals: ['Breakfast'],
        stay: 'Boutique Hotel Campo de’ Fiori'
      }
    ],
    hotelInfo: {
      name: 'Grand Boutique European Collection',
      stars: 4,
      description: 'Historical properties centrally situated within walking distance of prime city monuments and cafes.'
    },
    transportation: 'High Speed TGV Trains & Private City Shuttles',
    activitiesIncluded: ['Louvre VIP Tour', 'Colosseum Access', 'Seine Cruise', 'Trastevere Food Tasting'],
    reviews: [
      {
        userName: 'David Miller',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: 'December 2025',
        comment: 'Every transfer was completely on time. The guide was incredibly respectful and knowledgeable.'
      }
    ],
    featured: true
  },
  {
    id: 'bali-luxury-5d',
    name: 'Bali Luxury Retreat – 5 Days',
    destination: 'Bali',
    country: 'Indonesia',
    durationDays: 5,
    durationNights: 4,
    maxTravelers: 8,
    rating: 4.92,
    reviewsCount: 384,
    price: 899,
    originalPrice: 1199,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=800&q=80'
    ],
    overview: 'Unwind in the Island of the Gods with a curated 5-day journey taking you from sacred jungle ravines in Ubud to golden surf sunsets in Uluwatu.',
    category: 'Relaxation',
    included: [
      '4 Nights in 5-star Villa with Private Pool',
      'Daily Gourmet Breakfast & 2 Fine Dining Dinners',
      'Private Chauffeur & Airport Transfers',
      'Ubud Sacred Monkey Forest & Rice Terrace Excursion',
      'Sunset Catamaran Cruise & Snorkeling Gear'
    ],
    excluded: [
      'International Airfare',
      'Personal Travel Insurance',
      'Discretionary Gratuities'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Denpasar & Ubud Sanctuary',
        description: 'VIP airport meet-and-greet, scenic transfer into Ubud tropical highlands, check-in to private pool villa, and welcome balinese massage.',
        activities: ['Airport VIP Pick-up', 'Villa Check-in', 'Balinese Welcome Massage'],
        meals: ['Dinner'],
        stay: 'Kamandalu Ubud Luxury Resort'
      },
      {
        day: 2,
        title: 'Temples, Waterfalls & Jungle Swing',
        description: 'Early morning visit to Tegallalang rice terraces followed by Tegenungan waterfall dip and sacred Tirta Empul cleansing ritual.',
        activities: ['Tegallalang Terraces', 'Tirta Empul Blessing', 'Jungle Swing Adventure'],
        meals: ['Breakfast', 'Lunch'],
        stay: 'Kamandalu Ubud Luxury Resort'
      },
      {
        day: 3,
        title: 'Artisan Markets & Transfer to Seminyak',
        description: 'Browse Ubud royal palace and craft market before driving south to oceanfront Seminyak. Evening sunset cocktails at Potato Head.',
        activities: ['Ubud Art Market', 'Scenic South Transfer', 'Seminyak Beach Sunset'],
        meals: ['Breakfast', 'Dinner'],
        stay: 'The Seminyak Beach Resort & Spa'
      },
      {
        day: 4,
        title: 'Uluwatu Cliffs & Kecak Fire Dance',
        description: 'Explore southern beaches, cliffside Uluwatu temple perched 70 meters above crashing waves, and witness dramatic Kecak dance.',
        activities: ['Padang Padang Beach', 'Uluwatu Temple', 'Kecak Fire Performance'],
        meals: ['Breakfast', 'Seafood Dinner in Jimbaran'],
        stay: 'The Seminyak Beach Resort & Spa'
      },
      {
        day: 5,
        title: 'Leisure Morning & Departure',
        description: 'Enjoy a leisurely floating breakfast in your private pool before private transfer to Ngurah Rai International Airport.',
        activities: ['Floating Breakfast', 'Souvenir Shopping', 'Airport Transfer'],
        meals: ['Breakfast'],
        stay: 'Departure'
      }
    ],
    hotelInfo: {
      name: 'Kamandalu Ubud & Seminyak Luxury Spa',
      stars: 5,
      description: 'Exclusive rainforest villas featuring private infinity plunge pools and lush jungle valley views.'
    },
    transportation: 'Private Air-Conditioned Luxury Van with Dedicated Chauffeur',
    activitiesIncluded: ['Temples Tour', 'Snorkeling Excursion', 'Spa Treatment', 'Kecak Fire Dance'],
    reviews: [
      {
        userName: 'Elena Rostova',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: 'October 2025',
        comment: 'Pure paradise! The private pool villas and the Uluwatu sunset were the highlights of our entire year.'
      }
    ],
    featured: true
  },
  {
    id: 'rajasthan-royal-7d',
    name: 'Rajasthan Royal Odyssey – 7 Days',
    destination: 'Jaipur, Jodhpur & Udaipur',
    country: 'India',
    durationDays: 7,
    durationNights: 6,
    maxTravelers: 8,
    rating: 4.94,
    reviewsCount: 420,
    price: 1550,
    originalPrice: 1900,
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
    ],
    overview: 'Live like royalty through the Golden Triangle of Rajasthan: massive sandstone forts, royal palaces on lakes, and colorful bazaars.',
    category: 'Cultural',
    included: [
      '6 Nights in Authentic Heritage Palaces & Luxury Hotels',
      'Private Chauffeur-Driven Air-Conditioned Vehicle',
      'Private Sunset Boat Ride on Lake Pichola in Udaipur',
      'Amber Fort Elephant/Jeep Safari & Mehrangarh Fort Audio Pass',
      'Royal Welcome Dinners with Folk Music & Kalbelia Dance'
    ],
    excluded: [
      'Domestic Airfare',
      'Camera Fees at Monuments',
      'Discretionary Tips'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Jaipur – The Pink City',
        description: 'Traditional garland welcome, check-in to heritage haveli, and evening visit to the illuminated City Palace and Hawa Mahal.',
        activities: ['Airport Pickup', 'Hawa Mahal Photo Stop', 'City Palace Visit'],
        meals: ['Royal Rajasthani Thali Dinner'],
        stay: 'The Raj Palace Heritage Grand'
      },
      {
        day: 2,
        title: 'Amber Fort & Royal Observatory',
        description: 'Ascend Amber Fort on the hill, marvel at the mirror mosaics of Sheesh Mahal, and visit UNESCO Jantar Mantar observatory.',
        activities: ['Amber Fort Exploration', 'Jantar Mantar', 'Johari Bazaar Shopping'],
        meals: ['Breakfast', 'Lunch'],
        stay: 'The Raj Palace Heritage Grand'
      },
      {
        day: 3,
        title: 'Jaipur to Jodhpur – The Blue City',
        description: 'Scenic drive to Jodhpur. Visit the monumental Mehrangarh Fort perched 400 feet above the blue city houses.',
        activities: ['Scenic Highway Drive', 'Mehrangarh Fort Tour', 'Jaswant Thada'],
        meals: ['Breakfast', 'Dinner'],
        stay: 'Umaid Bhawan Palace Hotel'
      },
      {
        day: 4,
        title: 'Bishnoi Village Safari & Drive to Udaipur',
        description: 'Morning jeep tour visiting indigenous Bishnoi artisans and blackbuck antelopes, followed by drive to romantic Udaipur via Ranakpur Jain Temple.',
        activities: ['Bishnoi Safari', 'Ranakpur Marble Temples'],
        meals: ['Breakfast', 'Lunch'],
        stay: 'Taj Lake Palace Udaipur'
      },
      {
        day: 5,
        title: 'Udaipur – City of Lakes & Royal Pichola Boat Ride',
        description: 'Tour the grand City Palace complex along the lake shore, followed by a private royal boat ride during twilight on Lake Pichola.',
        activities: ['Udaipur City Palace', 'Lake Pichola Sunset Cruise', 'Saheliyon ki Bari'],
        meals: ['Breakfast', 'Dinner by the Lake'],
        stay: 'Taj Lake Palace Udaipur'
      },
      {
        day: 6,
        title: 'Monsoon Palace & Artisan Workshop',
        description: 'Panoramic view from Sajjangarh Monsoon Palace and afternoon hands-on miniature painting and gemstone cutting workshop.',
        activities: ['Sajjangarh Monsoon Palace', 'Artisan Painting Workshop'],
        meals: ['Breakfast'],
        stay: 'Taj Lake Palace Udaipur'
      },
      {
        day: 7,
        title: 'Departure from Udaipur',
        description: 'Leisurely palace breakfast and private transfer to Udaipur Maharana Pratap Airport (UDR).',
        activities: ['Airport Transfer'],
        meals: ['Breakfast'],
        stay: 'Departure'
      }
    ],
    hotelInfo: {
      name: 'Taj Lake Palace Udaipur & The Raj Palace',
      stars: 5,
      description: 'Historic marble palaces floating on lakes with authentic royal butler service and regal Mewari architecture.'
    },
    transportation: 'Private Toyota Innova Crysta Luxury Chauffeur',
    activitiesIncluded: ['Mehrangarh Fort Pass', 'Lake Pichola Royal Boat', 'Amber Fort Tour', 'Bishnoi Safari'],
    reviews: [
      {
        userName: 'Aarav Mehta',
        userAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: 'January 2026',
        comment: 'Staying at Taj Lake Palace felt like living in another era. Incredible guide and spotless arrangements.'
      }
    ],
    featured: true
  },
  {
    id: 'singapore-sentosa-5d',
    name: 'Singapore & Sentosa Discovery – 5 Days',
    destination: 'Singapore',
    country: 'Singapore',
    durationDays: 5,
    durationNights: 4,
    maxTravelers: 12,
    rating: 4.93,
    reviewsCount: 510,
    price: 1250,
    originalPrice: 1500,
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80'
    ],
    overview: 'Discover futuristic Supertree groves, world-class nightlife, Sentosa island beach clubs, and Michelin-starred hawker delicacies.',
    category: 'City Tours',
    included: [
      '4 Nights in 5-Star Marina Bay Sands & Sentosa Luxury Resort',
      'Gardens by the Bay Flower Dome & Cloud Forest Tickets',
      'Spectra Light & Water Show Reserved Seating',
      'Sentosa Cable Car Round-Trip & Universal Studios Day Pass',
      'Airport Meet & Greet with Changi Jewel Tour'
    ],
    excluded: [
      'International Flights',
      'Personal Expenditures',
      'Visa Processing Fees'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Changi & Marina Bay Sands Infinity Pool',
        description: 'Changi Jewel Rain Vortex tour, private transfer to Marina Bay Sands, check-in, and swim in the world’s most iconic rooftop infinity pool.',
        activities: ['Changi Jewel Rain Vortex', 'MBS Infinity Pool Swim', 'Marina Bay Stroll'],
        meals: ['Welcome Dinner at Ce La Vi'],
        stay: 'Marina Bay Sands'
      },
      {
        day: 2,
        title: 'Gardens by the Bay & Chinatown Heritage',
        description: 'Explore misty indoor waterfalls at Cloud Forest, walk the OCBC Skyway among giant Supertrees, and feast at Maxwell Food Centre.',
        activities: ['Gardens by the Bay', 'Cloud Forest & Flower Dome', 'Chinatown Hawker Food Walk'],
        meals: ['Breakfast', 'Hawker Tasting Lunch'],
        stay: 'Marina Bay Sands'
      },
      {
        day: 3,
        title: 'Sentosa Island & Universal Studios',
        description: 'Ride the scenic Singapore Cable Car into Sentosa island, thrill at Universal Studios, and watch the Wings of Time night fireworks.',
        activities: ['Singapore Cable Car', 'Universal Studios Singapore', 'Wings of Time Fireworks'],
        meals: ['Breakfast'],
        stay: 'The Barracks Hotel Sentosa'
      },
      {
        day: 4,
        title: 'Singapore River Cruise & Night Safari',
        description: 'Bumboat river cruise past Clarke Quay and Merlion Park. In the evening, take the world-first open-air tram through the Night Safari wildlife park.',
        activities: ['Singapore River Cruise', 'Merlion Park', 'Night Safari Tram'],
        meals: ['Breakfast', 'Chili Crab Dinner'],
        stay: 'The Barracks Hotel Sentosa'
      },
      {
        day: 5,
        title: 'Orchard Road Shopping & Departure',
        description: 'Duty-free shopping on Orchard Road before private chauffeur transfer to Singapore Changi Airport.',
        activities: ['Orchard Road Walk', 'Airport Chauffeur Transfer'],
        meals: ['Breakfast'],
        stay: 'Departure'
      }
    ],
    hotelInfo: {
      name: 'Marina Bay Sands & The Barracks Sentosa',
      stars: 5,
      description: 'World-famous skyline luxury hotel paired with heritage tranquil colonial suites on Sentosa island.'
    },
    transportation: 'Private Air-Conditioned Van & Cable Car Passes',
    activitiesIncluded: ['Gardens by the Bay Pass', 'Universal Studios Ticket', 'Cable Car Pass', 'Night Safari'],
    reviews: [
      {
        userName: 'Chloe Dubois',
        userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: 'January 2026',
        comment: 'Marina Bay Sands pool was on our bucket list forever! Everything about this package was world-class.'
      }
    ],
    featured: true
  },
  {
    id: 'manali-retreat-5d',
    name: 'Manali Retreat – 5 Days',
    destination: 'Manali',
    country: 'India',
    durationDays: 5,
    durationNights: 4,
    maxTravelers: 10,
    rating: 4.91,
    reviewsCount: 395,
    price: 550,
    originalPrice: 720,
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    ],
    overview: 'Escape to snow-clad Himalayan peaks, apple orchards, Solang Valley adventure glamping, and tranquil Beas riverbank bonfires.',
    category: 'Adventure',
    included: [
      '4 Nights in Luxury Pine Chalet Resort',
      'Daily Mountain Breakfast & Himalayan BBQ Dinner',
      'Solang Valley Paragliding & ATV Adventure Pass',
      'Rohtang Snow Point Excursion with 4x4 Chauffeur',
      'Old Manali Heritage Village & Hadimba Temple Walk'
    ],
    excluded: [
      'Personal Winter Clothing Rental',
      'Domestic Flights to Kullu/Bhuntar',
      'Extreme Sports Insurance'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Manali & Riverside Check-in',
        description: 'Chauffeured arrival from Chandigarh or Bhuntar, welcome spiced tea, check-in to timber pine chalet overlooking the Beas River.',
        activities: ['Scenic Mountain Transfer', 'Chalet Check-in', 'Riverside Stroll'],
        meals: ['Welcome Dinner'],
        stay: 'The Himalayan Luxury Resort & Spa'
      },
      {
        day: 2,
        title: 'Solang Valley Thrills & Paragliding',
        description: 'Soar like a bird on a tandem paragliding flight over lush green alpine valleys, followed by zorbing and quad biking.',
        activities: ['Tandem Paragliding', 'ATV Mountain Ride', 'Apple Orchard Walk'],
        meals: ['Breakfast', 'Picnic Lunch'],
        stay: 'The Himalayan Luxury Resort & Spa'
      },
      {
        day: 3,
        title: 'Rohtang Pass Snow Paradise',
        description: 'Drive up through hairpin bends to Rohtang Pass at 3,978 meters for panoramic glacier views and snow sledging.',
        activities: ['Rohtang Pass Excursion', 'Snow Sledging', 'Hot Chai at Mountain Pass'],
        meals: ['Breakfast', 'Dinner'],
        stay: 'The Himalayan Luxury Resort & Spa'
      },
      {
        day: 4,
        title: 'Old Manali, Hadimba Temple & Vashisht Hot Springs',
        description: 'Visit the 16th-century wooden Hadimba Temple nestled in cedar woods, dip into natural sulfur springs at Vashisht, and explore bohemian Old Manali cafes.',
        activities: ['Hadimba Temple', 'Vashisht Hot Springs', 'Old Manali Cafe Trail'],
        meals: ['Breakfast', 'Trout Dinner'],
        stay: 'The Himalayan Luxury Resort & Spa'
      },
      {
        day: 5,
        title: 'Farewell Himalayas',
        description: 'Breakfast with panoramic views of Pir Panjal peaks before your private transfer towards Chandigarh or onward flight.',
        activities: ['Morning Mountain Meditation', 'Airport Transfer'],
        meals: ['Breakfast'],
        stay: 'Departure'
      }
    ],
    hotelInfo: {
      name: 'The Himalayan Luxury Resort & Spa',
      stars: 5,
      description: 'Gothic-inspired stone castle and timber cottages nestled among apple and cherry orchards with heated pool.'
    },
    transportation: 'Private 4x4 Luxury Mountain SUV with Expert Chauffeur',
    activitiesIncluded: ['Paragliding Flight', 'Rohtang Pass Permit', 'Vashisht Bath Pass', 'Hadimba Temple Tour'],
    reviews: [
      {
        userName: 'Rohan Deshmukh',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: 'January 2026',
        comment: 'Paragliding in Solang Valley was exhilarating! The resort was cozy and had breathtaking mountain views.'
      }
    ],
    featured: true
  },
  {
    id: 'maldives-getaway-6d',
    name: 'Maldives Getaway – 6 Days',
    destination: 'Maldives',
    country: 'Maldives',
    durationDays: 6,
    durationNights: 5,
    maxTravelers: 6,
    rating: 4.96,
    reviewsCount: 420,
    price: 1070,
    originalPrice: 1215,
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=800&q=80'
    ],
    overview: 'Escape to an idyllic tropical haven with turquoise lagoons, overwater thatched villas, vibrant coral reefs, and romantic sunset dolphin cruises.',
    category: 'Beaches',
    included: [
      '5 Nights in Luxury Overwater Lagoon Villa',
      'All-Inclusive Gourmet Dining & Premium Beverages',
      'Roundtrip Scenic Seaplane Airport Transfers',
      'Guided Snorkeling with Sea Turtles & Manta Rays',
      'Sunset Dolphin Watching Catamaran Cruise'
    ],
    excluded: [
      'International Flights to Male (MLE)',
      'Scuba Diving PADI Certification Courses',
      'Personal Spa Treatments'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Seaplane Arrival & Villa Check-in',
        description: 'Spectacular 30-minute aerial seaplane flight across azure atolls, champagne reception, and settled into your private overwater haven.',
        activities: ['Seaplane Transfer', 'Island Welcome', 'Lagoon Sunset Walk'],
        meals: ['Dinner'],
        stay: 'Soneva Jani / Gili Lankanfushi'
      },
      {
        day: 2,
        title: 'House Reef Snorkeling & Coral Garden Discovery',
        description: 'Explore thriving marine biodiversity with our resident marine biologist alongside clownfish, hawksbill turtles, and vibrant coral formations.',
        activities: ['Reef Snorkeling', 'Marine Biology Briefing', 'Starlight Cinema'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        stay: 'Soneva Jani / Gili Lankanfushi'
      },
      {
        day: 3,
        title: 'Sunset Dolphin Cruise & Sandbank Picnic',
        description: 'Speedboat cruise to a secluded private sandbank for a gourmet lunch, followed by an evening catamaran voyage watching spinner dolphins leap.',
        activities: ['Private Sandbank Lunch', 'Catamaran Dolphin Cruise'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        stay: 'Soneva Jani / Gili Lankanfushi'
      },
      {
        day: 4,
        title: 'Overwater Spa & Kayaking',
        description: 'Rejuvenate with a 90-minute holistic coconut oil massage followed by transparent glass-bottom kayaking over shallow crystal lagoons.',
        activities: ['Overwater Spa Therapy', 'Transparent Kayak Safari'],
        meals: ['Breakfast', 'Lunch', 'Candlelit Beach BBQ'],
        stay: 'Soneva Jani / Gili Lankanfushi'
      },
      {
        day: 5,
        title: 'Underwater Dining Experience',
        description: 'Enjoy a multi-course culinary tasting 5 meters below sea level surrounded by colorful reef sharks and schools of tropical fish.',
        activities: ['Subaquatic Lunch', 'Sunset Cocktail Party'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        stay: 'Soneva Jani / Gili Lankanfushi'
      },
      {
        day: 6,
        title: 'Farewell Paradise',
        description: 'Floating breakfast in your private infinity pool before your seaplane departure to Velana International Airport.',
        activities: ['Floating Pool Breakfast', 'Seaplane Departure Transfer'],
        meals: ['Breakfast'],
        stay: 'Departure'
      }
    ],
    hotelInfo: {
      name: 'Gili Lankanfushi Luxury Eco-Resort',
      stars: 5,
      description: 'World-renowned eco-luxury overwater resort set atop a sparkling turquoise lagoon with personalized Mr./Ms. Friday butler service.'
    },
    transportation: 'Scenic Twin-Otter Seaplane & Private Speedboat Transfers',
    activitiesIncluded: ['Guided Reef Snorkel', 'Dolphin Catamaran Cruise', 'Glass Bottom Kayak', 'Sandbank Picnic'],
    reviews: [
      {
        userName: 'Aanya Kapoor',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: 'February 2026',
        comment: 'Pure paradise! Waking up above crystal clear turquoise water and watching dolphins at sunset was unforgettable.'
      }
    ],
    featured: true
  }
];
