import { Hotel } from '../models/hotel.model';

export const HOTELS: Hotel[] = [
  {
    id: 'maya-ubud',
    name: 'Maya Ubud Resort & Spa',
    location: 'Ubud, Bali',
    city: 'Bali',
    country: 'Indonesia',
    rating: 4.9,
    reviewsCount: 780,
    pricePerNight: 180,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Nestled along the historic river valley, Maya Ubud offers a tranquil oasis with vibrant jungle gardens and luxury private pavilions.',
    overview: 'Perched on the lush green hills of Ubud, Maya Ubud Resort & Spa provides an authentic Balinese sanctuary with world-class hospitality, tranquil infinity pools overlooking the Petanu River valley, and award-winning holistic wellness therapies.',
    amenities: ['WiFi', 'Breakfast', 'Pool', 'Spa', 'Free Shuttle'],
    coordinates: { lat: -8.4908, lng: 115.2755 },
    checkIn: '2:00 PM',
    checkOut: '12:00 PM',
    featured: true,
    roomTypes: [
      {
        id: 'maya-superior',
        name: 'Superior Forest View Room',
        price: 180,
        capacity: '2 Adults',
        bed: '1 King Bed',
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
        features: ['Jungle valley view', 'Marble bathroom', 'Free high-speed WiFi']
      }
    ]
  },
  {
    id: 'hotel-regina-louvre',
    name: 'Hotel Regina Louvre',
    location: '1st Arr., Paris',
    city: 'Paris',
    country: 'France',
    rating: 4.8,
    reviewsCount: 650,
    pricePerNight: 280,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Formally situated opposite the Louvre Museum and Tuileries Gardens, this historic 1900 luxury hotel offers elegant French décor.',
    overview: 'Immerse yourself in Parisian elegance directly facing the Tuileries Garden and Musée du Louvre. Grand chandeliers, antique woodwork, and impeccable French concierge service.',
    amenities: ['WiFi', 'Breakfast', 'Air Conditioning', 'Concierge', 'Room Service'],
    coordinates: { lat: 48.8637, lng: 2.3323 },
    checkIn: '3:00 PM',
    checkOut: '12:00 PM',
    featured: true,
    roomTypes: [
      {
        id: 'regina-classic',
        name: 'Deluxe Tuileries View Room',
        price: 280,
        capacity: '2 Adults',
        bed: '1 Queen Bed',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        features: ['Tuileries garden view', 'French bath products', 'Nespresso bar']
      }
    ]
  },
  {
    id: 'canaves-oia-suites',
    name: 'Canaves Oia Suites',
    location: 'Oia Village, Santorini',
    city: 'Santorini',
    country: 'Greece',
    rating: 4.9,
    reviewsCount: 890,
    pricePerNight: 350,
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An exclusive boutique hotel carved into the volcanic cliffs of Santorini, featuring panoramic caldera views and luxury infinity pools.',
    overview: 'Elegantly sculpted into the rugged volcanic caldera cliffs in the picturesque village of Oia, Canaves Oia Suites blends traditional Cycladic cave architecture with ultra-modern luxury.',
    amenities: ['WiFi', 'Breakfast', 'Pool', 'Spa', 'Sea View Suites'],
    coordinates: { lat: 36.4618, lng: 25.3753 },
    checkIn: '3:00 PM',
    checkOut: '11:00 AM',
    featured: true,
    roomTypes: [
      {
        id: 'canaves-infinity',
        name: 'Caldera View Cave Suite',
        price: 350,
        capacity: '2 Guests',
        bed: '1 King Bed',
        image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
        features: ['Private plunge pool', 'Caldera sunset balcony', 'Complimentary Greek breakfast']
      }
    ]
  },
  {
    id: 'kamandalu-ubud',
    name: 'Kamandalu Ubud Resort',
    location: 'Jalan Andong, Petulu, Ubud',
    city: 'Bali',
    country: 'Indonesia',
    rating: 4.9,
    reviewsCount: 680,
    pricePerNight: 280,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Enchanting luxury resort designed like a traditional Balinese village nestled amid emerald terraced rice fields.',
    overview: 'Perched on the lush green hills of Ubud, Kamandalu provides an authentic Balinese sanctuary with world-class hospitality, tranquil infinity pools overlooking the Petanu River valley, and award-winning holistic wellness therapies.',
    amenities: ['Wi-Fi', 'Breakfast', 'Pool', 'Parking', 'Air Conditioning', 'Spa', 'Fitness Center'],
    coordinates: { lat: -8.4908, lng: 115.2755 },
    checkIn: '2:00 PM',
    checkOut: '12:00 PM',
    featured: true,
    roomTypes: [
      {
        id: 'kamandalu-deluxe',
        name: 'Deluxe Garden Villa',
        price: 280,
        capacity: '2 Adults',
        bed: '1 King Bed',
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
        features: ['Private terrace', 'Outdoor rain shower', 'Garden view', 'Free high-speed Wi-Fi']
      },
      {
        id: 'kamandalu-pool-villa',
        name: 'Private Pool Villa',
        price: 450,
        capacity: '2-3 Guests',
        bed: '1 King Bed + Daybed',
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
        features: ['Private plunge pool', 'Floating breakfast option', 'Valley view', 'Butler service']
      }
    ]
  },
  {
    id: 'hotel-orsay-paris',
    name: 'Hôtel D’Orsay Rive Gauche',
    location: '93 Rue de Lille, 7th Arrondissement',
    city: 'Paris',
    country: 'France',
    rating: 4.85,
    reviewsCount: 520,
    pricePerNight: 390,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Elegantly appointed 18th-century boutique mansion within steps of the Musée d’Orsay and River Seine.',
    overview: 'Immerse yourself in Parisian elegance on the historic Left Bank. Characterized by antique woodwork, tapestries, and bespoke French marble bathrooms, Hôtel D’Orsay offers aristocratic comfort with modern sophistication.',
    amenities: ['Wi-Fi', 'Breakfast', 'Air Conditioning', 'Spa'],
    coordinates: { lat: 48.8599, lng: 2.3266 },
    checkIn: '3:00 PM',
    checkOut: '11:00 AM',
    featured: true,
    roomTypes: [
      {
        id: 'orsay-classic',
        name: 'Classic Parisian Room',
        price: 390,
        capacity: '2 Adults',
        bed: '1 Queen Bed',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        features: ['Courtyard view', 'L’Occitane bath amenities', 'Nespresso bar', 'High-speed Wi-Fi']
      },
      {
        id: 'orsay-suite',
        name: 'Eiffel View Prestige Suite',
        price: 650,
        capacity: '2-3 Guests',
        bed: '1 King Bed + Lounge',
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
        features: ['Rooftop views', 'Marble soak tub', 'Complimentary Champagne', 'VIP Concierge']
      }
    ]
  },
  {
    id: 'atlantis-the-royal',
    name: 'Atlantis The Royal Palm',
    location: 'Crescent Road, Palm Jumeirah',
    city: 'Dubai',
    country: 'United Arab Emirates',
    rating: 4.96,
    reviewsCount: 1140,
    pricePerNight: 750,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Iconic architectural triumph offering Cloud 22 sky pool, celebrity chef dining, and private beach access.',
    overview: 'Crafted by world-leading designers and artists, Atlantis The Royal redefines ultra-luxury with fire-and-water fountain displays, private sky-high pools, and 17 signature restaurants including Nobu by the Beach and Dinner by Heston Blumenthal.',
    amenities: ['Wi-Fi', 'Breakfast', 'Pool', 'Parking', 'Air Conditioning', 'Spa', 'Ocean View', 'Fitness Center'],
    coordinates: { lat: 25.1388, lng: 55.1278 },
    checkIn: '3:00 PM',
    checkOut: '12:00 PM',
    featured: true,
    roomTypes: [
      {
        id: 'royal-seascape',
        name: 'Seascape King Room',
        price: 750,
        capacity: '2 Adults',
        bed: '1 King Bed',
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
        features: ['Arabian Sea view', 'Private balcony', 'Walk-in dressing room', 'Daily Aquaventure access']
      },
      {
        id: 'royal-sky-suite',
        name: 'Sky Terrace Suite',
        price: 1350,
        capacity: '3 Guests',
        bed: '1 King Bed + Living Area',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
        features: ['Expansive wrap-around terrace', 'Private heated plunge pool', 'Dedicated butler']
      }
    ]
  },
  {
    id: 'sowaka-heritage-kyoto',
    name: 'Sowaka Heritage Luxury Machiya',
    location: '480 Kiyoi-cho, Yasaka Jinja Mae, Higashiyama-ku',
    city: 'Kyoto',
    country: 'Japan',
    rating: 4.94,
    reviewsCount: 390,
    pricePerNight: 540,
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Sublime architectural sanctuary blending a hundred-year-old Sukiya-style ryokan with modern minimalist luxury.',
    overview: 'Located in Kyoto’s historic preservation district, Sowaka features restored courtyards, Japanese cedar aromas, tatami salon lounges, and Michelin-starred seasonal kaiseki cuisine.',
    amenities: ['Wi-Fi', 'Breakfast', 'Air Conditioning', 'Spa'],
    coordinates: { lat: 34.9998, lng: 135.7788 },
    checkIn: '3:00 PM',
    checkOut: '11:00 AM',
    featured: true,
    roomTypes: [
      {
        id: 'sowaka-traditional',
        name: 'Garden View Ryokan Room',
        price: 540,
        capacity: '2 Adults',
        bed: 'Japanese Futon / Twin Beds',
        image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
        features: ['Hinoki cypress bathtub', 'Private moss garden view', 'Matcha welcome ceremony']
      },
      {
        id: 'sowaka-maisonette',
        name: 'Machiya Maisonette Suite',
        price: 880,
        capacity: '3-4 Guests',
        bed: 'King Bed + 2 Futons',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
        features: ['Two-level cedar townhouse', 'Private teahouse room', 'Custom artisan pottery']
      }
    ]
  },
  {
    id: 'canaves-oia-santorini',
    name: 'Canaves Oia Suites & Spa',
    location: 'Main Street, Oia Caldera',
    city: 'Santorini',
    country: 'Greece',
    rating: 4.98,
    reviewsCount: 890,
    pricePerNight: 680,
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Dazzling white cave suites carved into the caldera cliff face, featuring private infinity plunge pools.',
    overview: 'Carved seamlessly into the steep cliffside overlooking the azure Aegean sea, Canaves Oia Suites provides breathtaking panoramic views of the famous Aegean sunset, fine dining, and private catamaran cruises.',
    amenities: ['Wi-Fi', 'Breakfast', 'Pool', 'Air Conditioning', 'Spa', 'Ocean View'],
    coordinates: { lat: 36.4618, lng: 25.3753 },
    checkIn: '3:00 PM',
    checkOut: '11:00 AM',
    featured: true,
    roomTypes: [
      {
        id: 'canaves-classic-suite',
        name: 'Junior Caldera Cave Suite',
        price: 680,
        capacity: '2 Guests',
        bed: '1 King Bed',
        image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
        features: ['Caldera panoramic view', 'Open-air veranda', 'Rain shower', 'Champagne breakfast']
      },
      {
        id: 'canaves-infinity-suite',
        name: 'Infinity Pool Sanctuary Suite',
        price: 1100,
        capacity: '2 Guests',
        bed: '1 King Bed',
        image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
        features: ['Private cantilevered infinity pool', 'Sunset panorama', 'Private wine tasting']
      }
    ]
  },
  {
    id: 'victoria-jungfrau-interlaken',
    name: 'Victoria-Jungfrau Grand Hotel & Spa',
    location: 'Höheweg 41, Interlaken',
    city: 'Interlaken',
    country: 'Switzerland',
    rating: 4.91,
    reviewsCount: 460,
    pricePerNight: 620,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Historic Belle Époque palace with a 5,500m² luxury spa world facing the snow-crowned Jungfrau peak.',
    overview: 'A legendary retreat since 1865, Victoria-Jungfrau provides Belle Époque opulence paired with state-of-the-art thermal wellness, fine Swiss gastronomy, and immediate access to alpine ski slopes and glacial lakes.',
    amenities: ['Wi-Fi', 'Breakfast', 'Pool', 'Parking', 'Air Conditioning', 'Spa', 'Fitness Center'],
    coordinates: { lat: 46.6863, lng: 7.8632 },
    checkIn: '3:00 PM',
    checkOut: '12:00 PM',
    featured: true,
    roomTypes: [
      {
        id: 'vj-superior',
        name: 'Superior Alpine Room',
        price: 620,
        capacity: '2 Guests',
        bed: '1 King Bed or 2 Twins',
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
        features: ['Bernese Oberland mountain view', 'Marble bathroom', 'Spa access included']
      },
      {
        id: 'vj-jungfrau-suite',
        name: 'Grand Tower Jungfrau Suite',
        price: 1250,
        capacity: '2-4 Guests',
        bed: '1 King Bed + Salon',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
        features: ['Unobstructed glacier views', 'Fireplace lounge', 'Private jacuzzi', 'Limousine pickup']
      }
    ]
  },
  {
    id: 'taj-lake-palace-udaipur',
    name: 'Taj Lake Palace Udaipur',
    location: 'Pichola, Udaipur',
    city: 'Udaipur',
    country: 'India',
    rating: 4.97,
    reviewsCount: 920,
    pricePerNight: 520,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An iconic 18th-century marble palace floating like a jewel in the middle of Lake Pichola.',
    overview: 'Built in 1746 by Maharana Jagat Singh II, Taj Lake Palace offers royal Mewari hospitality, ornate courtyards with fountains, private boat transfers across Lake Pichola, and bespoke heritage royal dining.',
    amenities: ['Wi-Fi', 'Breakfast', 'Pool', 'Air Conditioning', 'Spa', 'Ocean View', 'Fitness Center'],
    coordinates: { lat: 24.5756, lng: 73.6800 },
    checkIn: '2:00 PM',
    checkOut: '12:00 PM',
    featured: true,
    roomTypes: [
      {
        id: 'taj-palace-room',
        name: 'Luxury Palace Lake View Room',
        price: 520,
        capacity: '2 Adults',
        bed: '1 Royal King Bed',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        features: ['Panoramic Lake Pichola view', 'Hand-painted murals', 'Heritage marble bath', 'Royal Butler']
      },
      {
        id: 'taj-grand-royal-suite',
        name: 'Grand Royal Heritage Suite',
        price: 1150,
        capacity: '2-3 Guests',
        bed: '1 Emperor Bed + Private Salon',
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
        features: ['Stained glass windows', 'Private terrace over the water', 'Royal spa treatment included']
      }
    ]
  },
  {
    id: 'taj-exotica-goa',
    name: 'Taj Exotica Resort & Spa Benaulim',
    location: 'Calwaddo, Benaulim Beach',
    city: 'Goa',
    country: 'India',
    rating: 4.88,
    reviewsCount: 740,
    pricePerNight: 310,
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Mediterranean-style coastal oasis spread across 56 acres of lush gardens fronting pristine Benaulim Beach.',
    overview: 'Taj Exotica Goa offers tranquil luxury along the southwest coast of Goa. Enjoy sunset walks along the secluded shoreline, authentic Goan seafood at beachfront pavilions, and rejuvenating Ayurvedic therapies at Jiva Spa.',
    amenities: ['Wi-Fi', 'Breakfast', 'Pool', 'Parking', 'Air Conditioning', 'Spa', 'Ocean View', 'Fitness Center'],
    coordinates: { lat: 15.2608, lng: 73.9174 },
    checkIn: '3:00 PM',
    checkOut: '12:00 PM',
    featured: true,
    roomTypes: [
      {
        id: 'goa-villa-room',
        name: 'Premium Garden Villa Room',
        price: 310,
        capacity: '2 Adults',
        bed: '1 King Bed',
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
        features: ['Private veranda', 'Verdant garden views', 'Deep soaking tub', 'Beach direct access']
      },
      {
        id: 'goa-plunge-villa',
        name: 'Luxury Plunge Pool Villa',
        price: 580,
        capacity: '2-3 Guests',
        bed: '1 King Bed + Lounge',
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
        features: ['Private personal plunge pool', 'Sea breeze gazebo', 'Personalized dining experiences']
      }
    ]
  },
  {
    id: 'marina-bay-sands-singapore',
    name: 'Marina Bay Sands',
    location: '10 Bayfront Avenue, Marina Bay',
    city: 'Singapore',
    country: 'Singapore',
    rating: 4.93,
    reviewsCount: 1850,
    pricePerNight: 610,
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'World-famous luxury icon featuring the highest infinity rooftop pool and breathtaking skyline panoramas.',
    overview: 'Marina Bay Sands is an architectural marvel towering over the Singapore Strait. Guests enjoy exclusive access to the world’s largest rooftop infinity pool on the 57th floor, celebrity chef dining, and direct access to Gardens by the Bay.',
    amenities: ['Wi-Fi', 'Breakfast', 'Pool', 'Parking', 'Air Conditioning', 'Spa', 'Ocean View', 'Fitness Center'],
    coordinates: { lat: 1.2834, lng: 103.8607 },
    checkIn: '3:00 PM',
    checkOut: '11:00 AM',
    featured: true,
    roomTypes: [
      {
        id: 'mbs-deluxe',
        name: 'Deluxe Marina View Room',
        price: 610,
        capacity: '2 Guests',
        bed: '1 King Bed',
        image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80',
        features: ['Floor-to-ceiling windows', 'Infinity Pool entry included', 'High floor skyline view']
      },
      {
        id: 'mbs-sands-suite',
        name: 'Sands Premier Suite',
        price: 1180,
        capacity: '3 Guests',
        bed: '1 King Bed + Dining Salon',
        image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80',
        features: ['Club55 access with afternoon tea', 'Jacuzzi spa tub', '24-hour butler service']
      }
    ]
  },
  {
    id: 'the-savoy-london',
    name: 'The Savoy London',
    location: 'Strand, Covent Garden',
    city: 'London',
    country: 'United Kingdom',
    rating: 4.92,
    reviewsCount: 820,
    pricePerNight: 720,
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Britain’s most iconic luxury hotel, presiding over the Northbank of the River Thames since 1889.',
    overview: 'Steeped in history and Edwardian and Art Deco splendour, The Savoy has welcomed royalty and legends for over a century. Features world-famous cocktail venues, Gordon Ramsay’s Savoy Grill, and timeless Thames views.',
    amenities: ['Wi-Fi', 'Breakfast', 'Pool', 'Air Conditioning', 'Spa', 'Fitness Center'],
    coordinates: { lat: 51.5103, lng: -0.1206 },
    checkIn: '3:00 PM',
    checkOut: '12:00 PM',
    featured: true,
    roomTypes: [
      {
        id: 'savoy-superior',
        name: 'Superior Queen Room',
        price: 720,
        capacity: '2 Guests',
        bed: '1 Queen Bed',
        image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
        features: ['Edwardian styling', 'Marble bathroom with chrome fittings', 'Afternoon tea reservation priority']
      },
      {
        id: 'savoy-river-suite',
        name: 'River Thames Personality Suite',
        price: 1450,
        capacity: '2-3 Guests',
        bed: '1 King Bed + Sitting Room',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        features: ['Panoramic Thames river views', 'Dedicated Savoy Butler', 'Private in-suite bar']
      }
    ]
  }
];
