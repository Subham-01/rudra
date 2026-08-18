export const pageSchemas: Record<string, any> = {
  home: {
    name: 'Home',
    sections: [
      {
        key: 'hero',
        label: 'Hero & Booking',
        type: 'object',
        fields: [
          { name: 'bgImage', label: 'Background Image', type: 'image' },
          { name: 'eyebrow', label: 'Small Title (Eyebrow)', type: 'text' },
          { name: 'heading', label: 'Main Heading', type: 'text' },
          { name: 'btn1', label: 'Button 1 Text', type: 'text' },
          { name: 'btn2', label: 'Button 2 Text', type: 'text' },
        ],
        defaultValue: {
          bgImage: '/images/hotel-rudra-regency-motihari-reception4.JPG',
          eyebrow: 'Welcome to Hotel Rudra Regency',
          heading: 'Where Royalty Meets Refined Luxury',
          btn1: 'Explore Rooms',
          btn2: 'Book Directly',
        }
      },
      {
        key: 'sliderImages',
        label: 'Hero Slider Images',
        type: 'array',
        fields: [
          { name: 'src', label: 'Image URL', type: 'image' },
          { name: 'title', label: 'Title', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' },
          { name: 'position', label: 'Object Position', type: 'text' },
        ],
        defaultValue: [
          { src: '/images/hotel-rudra-regency-motihari-luxury-suite-lounge.jpg', title: 'Luxury Suite Lounge', description: 'Premium interiors, elegant seating, and a refined stay experience designed for comfort.', position: 'center' },
          { src: '/images/hotel-rudra-regency-motihari-open-terrace-night.jpg', title: 'Open Terrace Ambience', description: 'A striking terrace setting for evening dining, relaxed conversations, and memorable visits.', position: 'center 58%' },
          { src: '/images/hotel-rudra-regency-motihari-conference-meeting-room.jpg', title: 'Business Meeting Hall', description: 'A polished conference setting built for presentations, meetings, and corporate sessions.', position: 'center' },
          { src: '/images/hotel-rudra-regency-motihari-grand-banquet-hall.jpg', title: 'Grand Banquet Hall', description: 'Spacious interiors and premium event ambience for celebrations, receptions, and gatherings.', position: 'center' },
          { src: '/images/hotel-rudra-regency-motihari-terrace-restaurant-lounge.jpg', title: 'Restaurant Terrace Dining', description: 'Open terrace dining with lounge-style seating for relaxed meals and premium hospitality.', position: 'center 42%' },
        ]
      },
      {
        key: 'whyChooseUs',
        label: 'Why Guests Choose Us',
        type: 'object',
        fields: [
          { name: 'eyebrow', label: 'Small Title', type: 'text' },
          { name: 'title', label: 'Main Title', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' },
        ],
        defaultValue: {
          eyebrow: 'Why Guests Choose Us',
          title: 'A premium stay destination for Motihari visitors',
          description: 'Whether you are planning a weekend stay, hosting a wedding function, arranging a corporate meeting, or looking for a quality restaurant in Motihari, Hotel Rudra Regency brings all of it together under one hospitality experience.',
        }
      },
      {
        key: 'whyChooseUsHighlights',
        label: 'Why Guests Choose Us - Bullet Points',
        type: 'array',
        fields: [
          { name: 'text', label: 'Bullet Point Text', type: 'textarea' }
        ],
        defaultValue: [
          { text: 'A premium hotel in Motihari with luxury rooms, a 10,000 sq ft banquet hall, and a high-tech meeting hall.' },
          { text: 'Modern guest facilities including gym, spa, lounge, bar, and attentive hospitality for a seamless stay.' },
          { text: 'Open terrace restaurant, family-friendly ambience, and premium support for celebrations and business visits.' },
          { text: 'Direct booking assistance for rooms, dining, banquet events, conferences, and curated guest experiences.' },
        ]
      },
      {
        key: 'facilitiesHeader',
        label: 'Premium Facilities Header',
        type: 'object',
        fields: [
          { name: 'eyebrow', label: 'Small Title', type: 'text' },
          { name: 'title', label: 'Main Title', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' },
        ],
        defaultValue: {
          eyebrow: 'Premium Facilities at Hotel Rudra Regency',
          title: 'Crafted spaces for stay, dining, celebrations, and business',
          description: 'Every facility is shaped to support a premium guest experience, from restful stays and grand events to dining ambience and professional meetings.',
        }
      },
      {
        key: 'facilities',
        label: 'Facilities Cards',
        type: 'array',
        fields: [
          { name: 'eyebrow', label: 'Small Title', type: 'text' },
          { name: 'title', label: 'Main Title', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' },
          { name: 'href', label: 'Link URL', type: 'text' },
          { name: 'action', label: 'Button Text', type: 'text' },
          { name: 'image', label: 'Image URL', type: 'image' },
          { name: 'position', label: 'Image Position', type: 'text' },
        ],
        defaultValue: [
          { eyebrow: 'Luxury Stay', title: 'Luxury Rooms', description: 'Luxury rooms designed for premium comfort with polished interiors and modern in-room amenities.', href: '/rooms', action: 'Explore Rooms', image: '/images/hotel-rudra-regency-motihari-premium-deluxe-room.jpg', position: 'center' },
          { eyebrow: 'Grand Events', title: 'Banquet Hall', description: 'A 10,000 sq ft banquet hall created for weddings, receptions, celebrations, and large social events.', href: '/banquet', action: 'View Banquet Hall', image: '/images/hotel-rudra-regency-motihari-wedding-banquet-venue.jpg', position: 'center' },
          { eyebrow: 'Premium Dining', title: 'Restaurant', description: 'Enjoy Open terrace dining, lounge-style seating, and a premium restaurant experience with bar service.', href: '/dining', action: 'Discover Dining', image: '/images/hotel-rudra-regency-motihari-premium-dining-restaurant.jpg', position: 'center' },
          { eyebrow: 'Business Ready', title: 'Meeting Hall', description: 'A high-tech meeting and conference hall designed for presentations, business and corporate events.', href: '/conference-room', action: 'View Conference Room', image: '/images/hotel-rudra-regency-motihari-business-conference.jpg', position: 'center' },
        ]
      },
      {
        key: 'roomsHeader',
        label: 'Popular Rooms Header',
        type: 'object',
        fields: [
          { name: 'eyebrow', label: 'Small Title', type: 'text' },
          { name: 'title', label: 'Main Title', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' },
        ],
        defaultValue: {
          eyebrow: 'Best Luxury Room',
          title: 'Most popular rooms',
          description: 'Choose from elegantly designed rooms that balance premium comfort, clean interiors, and a memorable stay experience in Motihari.',
        }
      },
      {
        key: 'rooms',
        label: 'Room Cards (Most Popular)',
        type: 'array',
        fields: [
          { name: 'title', label: 'Room Name', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' },
          { name: 'href', label: 'Link URL', type: 'text' },
          { name: 'image', label: 'Image URL', type: 'image' },
          { name: 'position', label: 'Image Position', type: 'text' },
        ],
        defaultValue: [
          { title: 'Premium Deluxe Room', description: 'A comfortable luxury stay with modern essentials and a calm, refined interior.', href: '/rooms', image: '/images/hotel-rudra-regency-motihari-premium-deluxe-room.jpg', position: 'center' },
          { title: 'Royal Semi-Suite', description: 'Extra space and polished detailing for guests who want a richer stay experience.', href: '/rooms', image: '/images/hotel-rudra-regency-motihari-royal-suite.jpg', position: 'center' },
          { title: 'Royal Suite', description: 'A premium suite atmosphere created for special stays and elevated comfort.', href: '/rooms', image: '/images/hotel-rudra-regency-motihari-premium-deluxe-room.jpg', position: 'center right' },
        ]
      },
      {
        key: 'serviceBlocksHeader',
        label: 'Service Blocks Header (Luxury Redefined)',
        type: 'object',
        fields: [
          { name: 'eyebrow', label: 'Small Title', type: 'text' },
          { name: 'title', label: 'Main Title', type: 'text' },
        ],
        defaultValue: {
          eyebrow: 'Luxury Redefined',
          title: 'Stay, celebrate, dine, and gather with one premium identity',
        }
      },
      {
        key: 'serviceBlocks',
        label: 'Service Blocks (Luxury Stay, Grand Events...)',
        type: 'array',
        fields: [
          { name: 'title', label: 'Title', type: 'text' },
          { name: 'subtitle', label: 'Subtitle', type: 'text' },
          { name: 'text', label: 'Description', type: 'textarea' },
          { name: 'href', label: 'Link URL', type: 'text' },
          { name: 'action', label: 'Button Text', type: 'text' },
          { name: 'icon', label: 'Icon Name (lucide)', type: 'text' },
          { name: 'hl1', label: 'Highlight 1', type: 'text' },
          { name: 'hl2', label: 'Highlight 2', type: 'text' },
          { name: 'accent', label: 'Gradient Accent', type: 'text' },
        ],
        defaultValue: [
          { title: 'Luxury Stay', subtitle: 'Premium Comfort', text: 'Luxury rooms designed for premium comfort with polished interiors and modern in-room amenities.', href: '/rooms', action: 'Explore Rooms', icon: 'BedDoubleIcon', hl1: 'Premium room categories', hl2: 'Gym and spa access for guests', accent: 'from-amber-300/20 via-amber-200/8 to-transparent' },
          { title: 'Grand Events', subtitle: 'Banquet Experience', text: 'A 10,000 sq ft banquet hall created for weddings, receptions, celebrations, and large social events.', href: '/banquet', action: 'View Banquet Hall', icon: 'PartyPopperIcon', hl1: 'Wedding and reception hosting', hl2: 'Large-format banquet support', accent: 'from-rose-300/18 via-amber-200/8 to-transparent' },
          { title: 'Premium Dining', subtitle: 'Restaurant Ambience', text: 'Enjoy Open terrace dining, lounge-style seating, and a premium restaurant experience with bar service.', href: '/dining', action: 'Discover Dining', icon: 'UtensilsCrossedIcon', hl1: 'Open terrace restaurant setting', hl2: 'Lounge and bar experience', accent: 'from-yellow-200/18 via-amber-200/8 to-transparent' },
          { title: 'Business Hub', subtitle: 'Conference Ready', text: 'A high-tech meeting and conference hall designed for presentations, business and corporate events.', href: '/conference-room', action: 'View Conference Room', icon: 'BriefcaseBusinessIcon', hl1: 'High-tech meeting setup', hl2: 'Conference-ready hospitality', accent: 'from-sky-200/16 via-neutral-200/8 to-transparent' },
        ]
      },
      {
        key: 'directBooking',
        label: 'Direct Booking Advantage',
        type: 'object',
        fields: [
          { name: 'eyebrow', label: 'Small Title', type: 'text' },
          { name: 'title', label: 'Main Title', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' },
          { name: 'b1', label: 'Benefit 1', type: 'textarea' },
          { name: 'b2', label: 'Benefit 2', type: 'textarea' },
          { name: 'b3', label: 'Benefit 3', type: 'textarea' },
        ],
        defaultValue: {
          eyebrow: 'Direct Booking Advantage',
          title: 'A Motihari hotel built for direct guest support',
          description: 'Guests looking for hotels in Motihari often need more than a room. They need a reliable place for family visits, event planning, dining, or business meetings. Hotel Rudra Regency is structured around that full-service need.',
          b1: 'Fast assistance for room, banquet hall, restaurant, and conference hall inquiries.',
          b2: 'Support for guests visiting Motihari for family functions, business travel, or premium leisure stays.',
          b3: 'One property for luxury rooms, gym, spa, lounge, bar, open terrace dining, and grand events.',
        }
      },
      {
        key: 'faqs',
        label: 'FAQs',
        type: 'array',
        fields: [
          { name: 'question', label: 'Question', type: 'text' },
          { name: 'answer', label: 'Answer', type: 'textarea' },
        ],
        defaultValue: [
          { question: 'Why choose Hotel Rudra Regency in Motihari?', answer: 'Hotel Rudra Regency combines luxury rooms, a 10,000 sq ft banquet hall, open terrace restaurant dining, gym, spa, lounge, bar, and a high-tech meeting hall in one destination for stays, events, and business visits.' },
          { question: 'Is Hotel Rudra Regency one of the best hotels in Motihari for family and business stays?', answer: 'Hotel Rudra Regency is a preferred choice for guests looking for a premium hotel in Motihari with comfortable rooms, modern amenities, dining, and event spaces for both family visits and business travel.' },
          { question: 'Can I book rooms and event spaces directly?', answer: 'Yes. Guests can contact the hotel directly for room bookings, banquet hall reservations, dining inquiries, and conference room availability.' },
          { question: 'Do you offer room booking in Motihari for weddings, local functions, and outstation guests?', answer: 'Yes. Guests visiting Motihari for weddings, family functions, business meetings, or short stays can book rooms directly with Hotel Rudra Regency for quick assistance and availability updates.' },
          { question: 'Is the hotel suitable for weddings and corporate meetings?', answer: 'Yes. The property is designed for both social celebrations and professional events, with dedicated banquet and conference spaces.' },
          { question: 'Does Hotel Rudra Regency offer dining options?', answer: 'Yes. The hotel offers an open terrace restaurant, premium dining ambience, lounge-style seating, and a hospitality experience suited to family meals and social evenings.' },
          { question: 'Do you have a banquet hall in Motihari for weddings, receptions, and events?', answer: 'Yes. Hotel Rudra Regency offers banquet facilities in Motihari for weddings, receptions, engagement functions, birthday parties, and other social events, along with hospitality support.' },
        ]
      },
      {
        key: 'footerCta',
        label: 'Footer CTA (Reserve)',
        type: 'object',
        fields: [
          { name: 'eyebrow', label: 'Small Title', type: 'text' },
          { name: 'title', label: 'Main Title', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' },
        ],
        defaultValue: {
          eyebrow: 'Reserve Your Experience',
          title: 'Experience a more refined stay in Motihari',
          description: 'Plan your stay, event, dining experience, or corporate gathering with a hotel designed to feel premium at every touchpoint.',
        }
      }
    ]
  },
  about: {
    name: 'About Us',
    sections: [
      {
        key: 'hero',
        label: 'Hero Section',
        type: 'object',
        fields: [
          { name: 'heading', label: 'Main Heading', type: 'text' }
        ]
      },
      {
        key: 'aboutUs',
        label: 'About Us Text',
        type: 'object',
        fields: [
          { name: 'title', label: 'Title', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' }
        ]
      },
      {
        key: 'pillars',
        label: 'Core Pillars',
        type: 'array',
        fields: [
          { name: 'title', label: 'Title', type: 'text' },
          { name: 'text', label: 'Description', type: 'textarea' },
          { name: 'icon', label: 'Icon Name (lucide-react)', type: 'text' }
        ]
      },
      {
        key: 'director',
        label: 'Director Message',
        type: 'object',
        fields: [
          { name: 'name', label: 'Director Name', type: 'text' },
          { name: 'title', label: 'Title', type: 'text' },
          { name: 'image', label: 'Director Image', type: 'image' },
          { name: 'messageHeading', label: 'Message Heading', type: 'text' },
          { name: 'messageParagraph1', label: 'Paragraph 1', type: 'textarea' },
          { name: 'messageParagraph2', label: 'Paragraph 2', type: 'textarea' }
        ]
      }
    ]
  },
  rooms: {
    name: 'Rooms',
    sections: [
      {
        key: 'hero',
        label: 'Hero Section',
        type: 'object',
        fields: [
          { name: 'eyebrow', label: 'Small Title', type: 'text' },
          { name: 'heading', label: 'Main Heading', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' },
          { name: 'bgImage', label: 'Background Image', type: 'image' },
        ],
        defaultValue: {
          eyebrow: 'Stay Collection',
          heading: 'Luxury Rooms in Motihari',
          description: 'Experience comfort, elegance, and modern amenities at one of the best luxury hotels in Motihari, with premium rooms, wellness facilities, dining, and event-ready hospitality.',
          bgImage: '/images/hotel-rudra-regency-motihari-premium-deluxe-room.jpg'
        }
      },
      {
        key: 'roomsHeader',
        label: 'Rooms Header',
        type: 'object',
        fields: [
          { name: 'eyebrow', label: 'Small Title', type: 'text' },
          { name: 'title', label: 'Main Title', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' },
        ],
        defaultValue: {
          eyebrow: 'Our Room Categories',
          title: 'A Curated Collection of Elegant Stays',
          description: 'Choose from our carefully curated collection of rooms designed to exceed your expectations.',
        }
      },
      {
        key: 'rooms',
        label: 'Room Types',
        type: 'array',
        fields: [
          { name: 'name', label: 'Room Name', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' },
          { name: 'idealFor', label: 'Ideal For', type: 'text' },
          { name: 'color', label: 'Gradient Colors (Tailwind)', type: 'text' },
          { name: 'image', label: 'Image URL', type: 'image' },
          { name: 'position', label: 'Image Position', type: 'text' },
          { name: 'amenity1', label: 'Amenity 1', type: 'text' },
          { name: 'amenity2', label: 'Amenity 2', type: 'text' },
          { name: 'amenity3', label: 'Amenity 3', type: 'text' },
          { name: 'amenity4', label: 'Amenity 4', type: 'text' }
        ],
        defaultValue: [
          {
            name: "Premium Deluxe Room",
            description: "Designed for comfort and functionality, the Premium Deluxe Room is perfect for guests seeking a relaxing stay with modern amenities and elegant interiors.",
            idealFor: "Solo travelers & couples",
            color: "from-amber-400 to-yellow-500",
            image: "/images/hotel-rudra-regency-motihari-premium-deluxe-room.jpg",
            position: "center",
            amenity1: "Comfortable King Size Bed",
            amenity2: "Air Conditioning & Free WiFi",
            amenity3: "LED TV & Room Service",
            amenity4: "Modern Bathroom"
          },
          {
            name: "Royal Semi-Suite",
            description: "Enjoy extra space and refined interiors in our Royal Semi-Suite, offering a premium experience for guests who want more comfort and style.",
            idealFor: "Families & business travelers",
            color: "from-amber-500 to-orange-500",
            image: "/images/hotel-rudra-regency-motihari-royal-suite.jpg",
            position: "center",
            amenity1: "Comfortable King Size Bed",
            amenity2: "Air Conditioning & Free WiFi",
            amenity3: "LED TV & Room Service",
            amenity4: "Modern Bathroom"
          },
          {
            name: "Royal Suite",
            description: "Experience the highest level of luxury with our Royal Suite, designed with premium features and elegant detailing for an unforgettable stay.",
            idealFor: "VIP guests & special occasions",
            color: "from-yellow-400 to-amber-600",
            image: "/images/hotel-rudra-regency-motihari-premium-deluxe-room.jpg",
            position: "center right",
            amenity1: "Large Luxury Room with Premium Design",
            amenity2: "Separate Living Space",
            amenity3: "Premium Bathroom & Amenities",
            amenity4: "Exclusive Comfort"
          }
        ]
      },
      {
        key: 'features',
        label: 'Room Features',
        type: 'array',
        fields: [
          { name: 'icon', label: 'Emoji Icon', type: 'text' },
          { name: 'title', label: 'Title', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' }
        ],
        defaultValue: [
          { icon: "✨", title: "Luxury Comfort", description: "Experience premium comfort with spacious rooms, elegant interiors, plush bedding, and a hospitality experience designed for a relaxing stay." },
          { icon: "🏋️", title: "Wellness & Amenities", description: "Enjoy modern amenities along with access to gym, spa, lounge spaces, and the comforts expected from a luxury hotel in Motihari." },
          { icon: "♿", title: "Accessible Facilities", description: "Specially designed rooms and facilities for differently abled guests, ensuring a comfortable, barrier-free, and welcoming stay for everyone." },
          { icon: "🍽️", title: "Full-Service Hospitality", description: "Stay connected to open terrace dining, banquet experiences, and business-ready spaces within one premium hospitality destination." }
        ]
      },
      {
        key: 'whyChooseUsHeader',
        label: 'Why Choose Us Header',
        type: 'object',
        fields: [
          { name: 'title', label: 'Main Title', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' },
        ],
        defaultValue: {
          title: 'Why Guests Choose Rudra Regency',
          description: 'Discover what makes Hotel Rudra Regency the perfect choice for your stay.',
        }
      },
      {
        key: 'whyChooseUs',
        label: 'Why Choose Us',
        type: 'array',
        fields: [
          { name: 'reason', label: 'Reason', type: 'textarea' }
        ],
        defaultValue: [
          { reason: 'A complete experience of luxury stay, dining, wellness, and events' },
          { reason: 'Premium rooms backed by gym, spa, lounge, and bar facilities' },
          { reason: 'Professional and attentive hospitality for families, couples, and business travelers' },
          { reason: 'Elegant spaces for stays, dining, celebrations, and corporate visits' },
          { reason: 'Thoughtfully designed rooms for comfort, privacy, and refined relaxation' },
          { reason: 'Specially equipped rooms and facilities for differently abled guests' },
          { reason: 'A premium hotel in Motihari with modern amenities and direct booking support' }
        ]
      },
      {
        key: 'footerCta',
        label: 'Footer CTA (Book Stay)',
        type: 'object',
        fields: [
          { name: 'title', label: 'Main Title', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' },
        ],
        defaultValue: {
          title: 'Ready to Book Your Stay?',
          description: 'Experience luxury and comfort at Hotel Rudra Regency. Choose the perfect room for your needs.',
        }
      }
    ]
  },
  footer: {
    name: 'Global Footer',
    sections: [
      {
        key: 'socialLinks',
        label: 'Social Media Links',
        type: 'array',
        fields: [
          { name: 'label', label: 'Platform Name', type: 'text' },
          { name: 'href', label: 'URL', type: 'text' },
          { name: 'svg', label: 'SVG Icon Path', type: 'textarea' },
        ],
        defaultValue: [
          {
            href: "https://www.facebook.com/hotelrudraregency7",
            label: "Facebook",
            svg: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
          },
          {
            href: "https://www.instagram.com/hotel.rudra.regency?igsh=MTUzbmN6dnJ6bGJidA==",
            label: "Instagram",
            svg: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
          },
          {
            href: "https://wa.me/918651600015",
            label: "WhatsApp",
            svg: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488",
          }
        ]
      },
      {
        key: 'companyInfo',
        label: 'Company Information',
        type: 'object',
        fields: [
          { name: 'name', label: 'Company Name', type: 'text' },
          { name: 'description1', label: 'Description 1', type: 'text' },
          { name: 'description2', label: 'Description 2', type: 'textarea' },
          { name: 'copyright', label: 'Copyright Text', type: 'text' },
        ],
        defaultValue: {
          name: 'Hotel Rudra Regency',
          description1: 'Book a refined stay, plan a banquet, reserve dining, or coordinate a conference experience with one hospitality team.',
          description2: 'A premium hospitality destination in Motihari for luxury stays, banquets, dining, and business gatherings.',
          copyright: 'Hotel Rudra Regency. All rights reserved.'
        }
      },
      {
        key: 'contactInfo',
        label: 'Contact Info',
        type: 'object',
        fields: [
          { name: 'subtitle', label: 'Subtitle', type: 'text' },
          { name: 'address', label: 'Address', type: 'textarea' },
          { name: 'email', label: 'Email', type: 'text' },
          { name: 'phone', label: 'Phone Numbers', type: 'text' },
          { name: 'mapUrl', label: 'Google Maps Link', type: 'text' },
        ],
        defaultValue: {
          subtitle: 'Easy to reach for stay, dining, and events.',
          address: 'Chandrahiya, Motihari, Chararhiya, Bihar 845401',
          email: 'info@rudraregency.com',
          phone: '+91 8651600015 | +91 8581828182',
          mapUrl: 'https://www.google.com/maps/search/?api=1&query=Hotel+Rudra+Regency+Chandrahiya+Motihari+Bihar+845401'
        }
      }
    ]
  },
  dining: {
    name: 'Dining',
    sections: [
      {
        key: 'diningExperiences',
        label: 'Dining Experiences',
        type: 'array',
        fields: [
          { name: 'title', label: 'Title', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' },
          { name: 'color', label: 'Gradient Colors', type: 'text' },
          { name: 'image', label: 'Image URL', type: 'image' },
          { name: 'position', label: 'Image Position', type: 'text' }
        ]
      },
      {
        key: 'featurePoints',
        label: 'Features',
        type: 'array',
        fields: [
          { name: 'icon', label: 'Emoji Icon', type: 'text' },
          { name: 'title', label: 'Title', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' }
        ]
      }
    ]
  },
  banquet: {
    name: 'Banquet',
    sections: [
      {
        key: 'hero',
        label: 'Hero Section',
        type: 'object',
        fields: [
          { name: 'eyebrow', label: 'Small Title', type: 'text' },
          { name: 'heading', label: 'Main Heading', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' },
          { name: 'bgImage', label: 'Background Image', type: 'image' },
          { name: 'btnText', label: 'Button Text', type: 'text' },
          { name: 'btnUrl', label: 'Button Link / Upload PDF', type: 'image' },
        ],
        defaultValue: {
          eyebrow: 'Banquet Hall',
          heading: 'Banquet Packages Crafted for Grand Celebrations',
          description: 'Discover premium event packages with a 10,000 sq ft banquet hall, luxury room inventory, dining support, and curated inclusions designed for unforgettable weddings, receptions, and milestone celebrations.',
          bgImage: '/images/hotel-rudra-regency-motihari-luxury-banquet-setup.jpg',
          btnText: 'View Catering',
          btnUrl: '/dining'
        }
      },
      {
        key: 'packagesHeader',
        label: 'Packages Header',
        type: 'object',
        fields: [
          { name: 'eyebrow', label: 'Small Title', type: 'text' },
          { name: 'title', label: 'Main Title', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' },
        ],
        defaultValue: {
          eyebrow: 'Banquet Packages',
          title: 'Choose the Celebration Style That Fits You',
          description: 'Three premium package tiers designed to match the scale, comfort, and elegance of your event.'
        }
      },
      {
        key: 'packages',
        label: 'Packages',
        type: 'array',
        fields: [
          { name: 'name', label: 'Package Name', type: 'text' },
          { name: 'badge', label: 'Badge (e.g. Premium)', type: 'text' },
          { name: 'price', label: 'Price', type: 'text' },
          { name: 'gradient', label: 'Gradient Colors', type: 'text' },
          { name: 'border', label: 'Border Classes', type: 'text' },
          { name: 'featured', label: 'Is Featured? (true/false)', type: 'text' },
          { name: 'item1', label: 'Included Item 1', type: 'text' },
          { name: 'item2', label: 'Included Item 2', type: 'text' },
          { name: 'item3', label: 'Included Item 3', type: 'text' },
          { name: 'item4', label: 'Included Item 4', type: 'text' },
          { name: 'item5', label: 'Included Item 5', type: 'text' },
          { name: 'item6', label: 'Included Item 6', type: 'text' },
        ],
        defaultValue: [
          {
            name: "Premium Package",
            badge: "Premium",
            price: "₹ 2,11,000",
            gradient: "from-amber-500 to-yellow-400",
            border: "border-amber-400/30",
            featured: "false",
            item1: "Saumya Hall",
            item2: "Deluxe Room – 8",
            item3: "Family Suite – 1",
            item4: "Kitchen Area"
          },
          {
            name: "Elite Package",
            badge: "Elite",
            price: "₹ 2,41,000",
            gradient: "from-amber-300 to-orange-400",
            border: "border-amber-300/40",
            featured: "true",
            item1: "Saumya Hall",
            item2: "1st Floor Banquet Hall",
            item3: "Deluxe Room – 8",
            item4: "Family Suite – 1",
            item5: "Semi Suite – 2",
            item6: "Kitchen Area"
          },
          {
            name: "Signature Package",
            badge: "Signature",
            price: "₹ 2,71,000",
            gradient: "from-yellow-500 to-amber-700",
            border: "border-yellow-400/30",
            featured: "false",
            item1: "Saumya Hall",
            item2: "1st Floor Banquet Hall",
            item3: "Deluxe Room – 8",
            item4: "Family Suite – 1",
            item5: "Premium Deluxe Room – 8",
            item6: "Kitchen Area"
          }
        ]
      },
      {
        key: 'venueAtmosphere',
        label: 'Venue Atmosphere',
        type: 'object',
        fields: [
          { name: 'eyebrow', label: 'Small Title', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' },
          { name: 'image', label: 'Image URL', type: 'image' },
        ],
        defaultValue: {
          eyebrow: 'Venue Atmosphere',
          description: 'Elegant halls, polished interiors, luxury stay support, and refined hospitality for premium wedding and celebration experiences.',
          image: '/images/hotel-rudra-regency-motihari-elegant-venue-atmosphere.jpg'
        }
      },
      {
        key: 'complimentaryHeader',
        label: 'Complimentary Header',
        type: 'object',
        fields: [
          { name: 'eyebrow', label: 'Small Title', type: 'text' },
          { name: 'title', label: 'Main Title', type: 'text' },
        ],
        defaultValue: {
          eyebrow: 'Complimentary',
          title: 'Included in Every Package'
        }
      },
      {
        key: 'complimentaryItems',
        label: 'Complimentary Items',
        type: 'array',
        fields: [
          { name: 'icon', label: 'Icon (e.g. ✦)', type: 'text' },
          { name: 'text', label: 'Text', type: 'text' }
        ],
        defaultValue: [
          { icon: "✦", text: "200 VIP Chairs" },
          { icon: "✦", text: "1 Maharaja Sofa" },
          { icon: "✦", text: "10 Round Tables" },
          { icon: "✦", text: "8 Sofas" }
        ]
      },
      {
        key: 'termsHeader',
        label: 'Terms Header',
        type: 'object',
        fields: [
          { name: 'eyebrow', label: 'Small Title', type: 'text' },
          { name: 'title', label: 'Main Title', type: 'text' },
        ],
        defaultValue: {
          eyebrow: 'Terms and Conditions',
          title: 'Important Booking Notes'
        }
      },
      {
        key: 'terms',
        label: 'Terms List',
        type: 'array',
        fields: [
          { name: 'text', label: 'Term Text', type: 'textarea' }
        ],
        defaultValue: [
          { text: "Decoration & catering charges not included" },
          { text: "Cleaning charges: ₹5,000 extra" },
          { text: "All package prices are exclusive of GST" },
          { text: "Refundable security deposit of ₹25,000 required" },
          { text: "Any property damage during event will lead to deposit forfeiture" }
        ]
      },
      {
        key: 'footerCta',
        label: 'Footer CTA',
        type: 'object',
        fields: [
          { name: 'title', label: 'Main Title', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' },
        ],
        defaultValue: {
          title: 'Ready to Host a Grand Event?',
          description: 'Speak with our team to reserve the right banquet package, align dining and room requirements, and plan a celebration with confidence at one of Motihari\'s premium event destinations.',
        }
      }
    ]
  },
  conference: {
    name: 'Conference Room',
    sections: [
      {
        key: 'roomFormats',
        label: 'Room Formats',
        type: 'array',
        fields: [
          { name: 'title', label: 'Format Name', type: 'text' },
          { name: 'capacity', label: 'Capacity', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' },
          { name: 'image', label: 'Image URL', type: 'image' }
        ]
      },
      {
        key: 'essentials',
        label: 'Essentials',
        type: 'array',
        fields: [
          { name: 'icon', label: 'Emoji Icon', type: 'text' },
          { name: 'title', label: 'Title', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' }
        ]
      }
    ]
  },
  contact: {
    name: 'Contact',
    sections: [
      {
        key: 'details',
        label: 'Contact Details (Not yet linked)',
        type: 'object',
        fields: [
          { name: 'address', label: 'Address', type: 'textarea' },
          { name: 'phone', label: 'Phone', type: 'text' },
          { name: 'email', label: 'Email', type: 'text' }
        ]
      }
    ]
  }
};
