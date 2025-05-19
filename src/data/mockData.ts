
// Mock data for travel packages

export interface Package {
  id: string;
  title: string;
  destination: string;
  description: string;
  image: string;
  gallery: string[];
  price: number;
  duration: string;
  rating: number;
  reviews: number;
  includes: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
  hotel: {
    name: string;
    rating: number;
    image: string;
    amenities: string[];
  };
  airline: {
    name: string;
    logo: string;
    rating: number;
  };
  featured: boolean;
}

export const travelPackages: Package[] = [
  {
    id: "bali-luxury-escape",
    title: "Bali Luxury Escape",
    destination: "Bali, Indonesia",
    description: "Experience the ultimate luxury escape in beautiful Bali. This package includes a stay at a 5-star resort in Ubud, daily spa treatments, guided tours of ancient temples, and authentic Balinese cooking classes. Enjoy the stunning rice terraces, pristine beaches, and vibrant culture of this Indonesian paradise.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    price: 1899,
    duration: "7 days",
    rating: 4.8,
    reviews: 124,
    includes: [
      "Luxury accommodation",
      "Daily breakfast and dinner",
      "Airport transfers",
      "Guided tours",
      "Spa treatments",
      "Cooking classes"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Welcome",
        description: "Arrive at Denpasar International Airport. Private transfer to your luxury resort in Ubud. Welcome dinner and traditional dance performance."
      },
      {
        day: 2,
        title: "Ubud Culture Tour",
        description: "Visit sacred monkey forest, Ubud Palace, and local art galleries. Afternoon spa treatment."
      },
      {
        day: 3,
        title: "Tegalalang Rice Terraces",
        description: "Morning yoga session. Guided tour of the famous rice terraces. Traditional Balinese cooking class in the evening."
      }
    ],
    hotel: {
      name: "Hanging Gardens of Bali",
      rating: 5,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      amenities: ["Infinity pool", "Spa", "Restaurant", "Free WiFi", "Room service"]
    },
    airline: {
      name: "Singapore Airlines",
      logo: "https://logos-world.net/wp-content/uploads/2020/03/Singapore-Airlines-Logo-700x394.png",
      rating: 4.7
    },
    featured: true
  },
  {
    id: "santorini-romantic-getaway",
    title: "Santorini Romantic Getaway",
    destination: "Santorini, Greece",
    description: "Escape to the enchanting island of Santorini for a romantic getaway. Stay in a cliffside hotel with breathtaking views of the Aegean Sea. Explore charming villages with white-washed buildings and blue domes, enjoy sunset cruises, wine tastings, and intimate dinners overlooking the caldera.",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601581875039-e899893d520c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    price: 2499,
    duration: "6 days",
    rating: 4.9,
    reviews: 86,
    includes: [
      "Luxury cliffside accommodation",
      "Daily breakfast",
      "Sunset sailing cruise",
      "Wine tasting tour",
      "Airport transfers",
      "Romantic dinner"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Paradise",
        description: "Arrive at Santorini Airport. Transfer to your luxury hotel. Evening at leisure to enjoy your first Santorini sunset."
      },
      {
        day: 2,
        title: "Oia Village Exploration",
        description: "Morning exploration of the picturesque Oia village. Afternoon at leisure. Romantic dinner at a cliffside restaurant."
      },
      {
        day: 3,
        title: "Sunset Catamaran Cruise",
        description: "Leisure morning. Afternoon catamaran cruise around the caldera with swimming stops and BBQ dinner on board."
      }
    ],
    hotel: {
      name: "Andronis Luxury Suites",
      rating: 5,
      image: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      amenities: ["Infinity pool", "Spa", "Restaurant", "Sea view", "Room service"]
    },
    airline: {
      name: "Aegean Airlines",
      logo: "https://logos-world.net/wp-content/uploads/2023/01/Aegean-Airlines-Logo.png",
      rating: 4.5
    },
    featured: true
  },
  {
    id: "tokyo-cultural-experience",
    title: "Tokyo Cultural Experience",
    destination: "Tokyo, Japan",
    description: "Immerse yourself in the fascinating blend of ancient traditions and futuristic innovations in Tokyo. Visit historic temples, experience authentic tea ceremonies, explore vibrant districts, and enjoy world-class cuisine. This package offers the perfect introduction to Japan's rich culture and modern marvels.",
    image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    price: 2199,
    duration: "8 days",
    rating: 4.7,
    reviews: 94,
    includes: [
      "4-star hotel accommodation",
      "Daily breakfast",
      "Tokyo Metro pass",
      "Guided tours",
      "Tea ceremony experience",
      "Sumo wrestling show"
    ],
    itinerary: [
      {
        day: 1,
        title: "Welcome to Tokyo",
        description: "Arrive at Tokyo Narita/Haneda Airport. Transfer to your hotel. Evening orientation walk in Shinjuku district."
      },
      {
        day: 2,
        title: "Tokyo's Famous Landmarks",
        description: "Visit Senso-ji Temple in Asakusa, Tokyo Skytree, and Imperial Palace Gardens. Evening food tour in Shibuya."
      },
      {
        day: 3,
        title: "Cultural Immersion",
        description: "Morning visit to Meiji Shrine. Traditional tea ceremony experience. Afternoon exploring Harajuku and Omotesando districts."
      }
    ],
    hotel: {
      name: "Park Hotel Tokyo",
      rating: 4,
      image: "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      amenities: ["Restaurant", "Bar", "Free WiFi", "City views", "Concierge service"]
    },
    airline: {
      name: "Japan Airlines",
      logo: "https://logos-world.net/wp-content/uploads/2020/11/Japan-Airlines-Symbol.png",
      rating: 4.6
    },
    featured: false
  },
  {
    id: "maldives-overwater-villa",
    title: "Maldives Overwater Villa",
    destination: "Maldives",
    description: "Experience paradise in the Maldives with a stay in a luxurious overwater villa. Dive into crystal-clear turquoise waters teeming with marine life, relax on pristine white sand beaches, enjoy world-class spa treatments, and savor exquisite dining under the stars. This is the ultimate tropical escape.",
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540202404-a2f29016b523?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    price: 3999,
    duration: "5 days",
    rating: 5.0,
    reviews: 76,
    includes: [
      "Overwater villa accommodation",
      "All-inclusive meals and drinks",
      "Seaplane transfers",
      "Snorkeling equipment",
      "Sunset cruise",
      "Couple's spa treatment"
    ],
    itinerary: [
      {
        day: 1,
        title: "Paradise Arrival",
        description: "Arrive at Male International Airport. Seaplane transfer to your resort. Welcome drinks and resort orientation."
      },
      {
        day: 2,
        title: "Marine Adventure",
        description: "Morning snorkeling with marine biologist. Afternoon at leisure. Private sunset dinner on the beach."
      },
      {
        day: 3,
        title: "Island Relaxation",
        description: "Couple's spa treatment. Traditional Maldivian cooking class. Evening dolphin watching cruise."
      }
    ],
    hotel: {
      name: "Soneva Jani",
      rating: 5,
      image: "https://images.unsplash.com/photo-1578922746465-3b30e8ae2ddc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      amenities: ["Private pool", "Direct ocean access", "Outdoor bathroom", "Butler service", "Water sports"]
    },
    airline: {
      name: "Emirates",
      logo: "https://logos-world.net/wp-content/uploads/2020/03/Emirates-Logo-700x394.png",
      rating: 4.8
    },
    featured: true
  },
  {
    id: "machu-picchu-adventure",
    title: "Machu Picchu Adventure",
    destination: "Peru",
    description: "Embark on an unforgettable adventure to the ancient Inca citadel of Machu Picchu. Trek through the spectacular Andean mountains, explore historic Cusco, experience authentic Peruvian culture, and witness breathtaking archaeological sites. This journey combines adventure, history, and natural beauty.",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1572127842601-af12ce6ce257?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1631631480669-535cc43f2327?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    price: 2299,
    duration: "9 days",
    rating: 4.6,
    reviews: 112,
    includes: [
      "Hotel accommodation",
      "Daily breakfast",
      "Guided tours",
      "Train to Machu Picchu",
      "Entrance fees",
      "Airport transfers"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Cusco",
        description: "Arrive in Cusco. Transfer to hotel. Afternoon at leisure to acclimatize to the altitude."
      },
      {
        day: 2,
        title: "Cusco City Tour",
        description: "Explore Cusco's historic center, including the Cathedral and Qorikancha (Temple of the Sun). Visit nearby ruins of Sacsayhuaman."
      },
      {
        day: 3,
        title: "Sacred Valley",
        description: "Full-day tour of the Sacred Valley, including Pisac Market and the fortress of Ollantaytambo."
      }
    ],
    hotel: {
      name: "Palacio del Inka, a Luxury Collection Hotel",
      rating: 5,
      image: "https://images.unsplash.com/photo-1549298222-1c31e8915347?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      amenities: ["Restaurant", "Spa", "Free WiFi", "Breakfast included", "Bar"]
    },
    airline: {
      name: "LATAM Airlines",
      logo: "https://logos-world.net/wp-content/uploads/2022/01/LATAM-Airlines-Logo-700x394.png",
      rating: 4.2
    },
    featured: false
  },
  {
    id: "safari-tanzania",
    title: "Tanzania Safari Experience",
    destination: "Tanzania",
    description: "Witness the incredible wildlife of Tanzania on this unforgettable safari adventure. Explore the Serengeti National Park and Ngorongoro Crater, home to the 'Big Five' and the Great Migration. Stay in luxury lodges and tented camps for an authentic African experience with modern comforts.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547536516-f921cfeb9b6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    price: 4299,
    duration: "8 days",
    rating: 4.9,
    reviews: 68,
    includes: [
      "Luxury lodge/tented camp accommodation",
      "All meals",
      "Game drives",
      "Park entrance fees",
      "English-speaking guide",
      "Airport transfers"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Arusha",
        description: "Arrive at Kilimanjaro International Airport. Transfer to your hotel in Arusha. Safari briefing."
      },
      {
        day: 2,
        title: "Tarangire National Park",
        description: "Drive to Tarangire National Park. Afternoon game drive. Overnight at luxury lodge."
      },
      {
        day: 3,
        title: "Serengeti National Park",
        description: "Drive to the famous Serengeti National Park. Game drive en route to your camp. Evening game drive."
      }
    ],
    hotel: {
      name: "Four Seasons Safari Lodge Serengeti",
      rating: 5,
      image: "https://images.unsplash.com/photo-1548133650-7e2b96ebe5e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      amenities: ["Pool", "Restaurant", "Spa", "WiFi", "Air conditioning"]
    },
    airline: {
      name: "Ethiopian Airlines",
      logo: "https://logos-world.net/wp-content/uploads/2022/02/Ethiopian-Airlines-Logo.png",
      rating: 4.3
    },
    featured: false
  }
];

// Popular destinations
export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  description: string;
  packageCount: number;
}

export const popularDestinations: Destination[] = [
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Discover paradise on earth with Bali's stunning beaches, lush rice terraces, and vibrant spiritual culture.",
    packageCount: 8
  },
  {
    id: "santorini",
    name: "Santorini",
    country: "Greece",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Experience the iconic white and blue architecture overlooking the breathtaking Aegean Sea.",
    packageCount: 6
  },
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Explore the fascinating blend of ultra-modern and traditional in Japan's exciting capital.",
    packageCount: 5
  },
  {
    id: "maldives",
    name: "Maldives",
    country: "Maldives",
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Relax in overwater villas and swim in crystal-clear waters in this tropical paradise.",
    packageCount: 7
  },
  {
    id: "peru",
    name: "Machu Picchu",
    country: "Peru",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Marvel at the ancient Inca citadel set high in the Andes Mountains.",
    packageCount: 3
  },
  {
    id: "tanzania",
    name: "Serengeti",
    country: "Tanzania",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Experience the wildlife and natural beauty of Africa's most famous national park.",
    packageCount: 4
  }
];

// Testimonials
export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  location: string;
  rating: number;
  text: string;
  packageId: string;
  packageTitle: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "https://randomuser.me/api/portraits/women/62.jpg",
    location: "London, UK",
    rating: 5,
    text: "Our Bali trip was absolutely magical! The villa was stunning, and the itinerary perfectly balanced relaxation and adventure. Our guide was knowledgeable and friendly. We've already recommended this package to all our friends!",
    packageId: "bali-luxury-escape",
    packageTitle: "Bali Luxury Escape"
  },
  {
    id: "2",
    name: "Michael Chen",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    location: "Toronto, Canada",
    rating: 5,
    text: "The Santorini Romantic Getaway exceeded all our expectations. The views from our suite were breathtaking, and the sunset cruise was unforgettable. Perfect for our honeymoon!",
    packageId: "santorini-romantic-getaway",
    packageTitle: "Santorini Romantic Getaway"
  },
  {
    id: "3",
    name: "Emma Davis",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    location: "Sydney, Australia",
    rating: 4,
    text: "The Tokyo Cultural Experience was fascinating! Loved the mix of traditional and modern experiences. The only reason for 4 stars instead of 5 was some scheduling issues, but the team was quick to resolve them.",
    packageId: "tokyo-cultural-experience",
    packageTitle: "Tokyo Cultural Experience"
  },
  {
    id: "4",
    name: "James Wilson",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    location: "New York, USA",
    rating: 5,
    text: "Our Maldives trip was like a dream come true. The overwater villa was luxurious, the water was crystal clear, and the service was impeccable. Worth every penny!",
    packageId: "maldives-overwater-villa",
    packageTitle: "Maldives Overwater Villa"
  }
];
