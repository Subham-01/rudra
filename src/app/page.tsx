import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">Rudra Hotel</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#rooms" className="text-gray-700 hover:text-blue-600 transition-colors">Rooms</a>
              <a href="#dining" className="text-gray-700 hover:text-blue-600 transition-colors">Dining</a>
              <a href="#spa" className="text-gray-700 hover:text-blue-600 transition-colors">Spa & Wellness</a>
              <a href="#meetings" className="text-gray-700 hover:text-blue-600 transition-colors">Meetings</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white hero-bg" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/hotel-rudra-regency-motihari-reception4.JPG')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 hero-section">
          <div className="text-center animate-fade-in-up">
            <h1 className="hero-title text-4xl md:text-6xl font-bold mb-6">
              Welcome to Rudra Hotel
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Experience luxury and comfort in the heart of the city. Your perfect stay awaits.
            </p>

            {/* Search Form */}
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto animate-slide-in-left">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>1 Guest</option>
                    <option>2 Guests</option>
                    <option>3 Guests</option>
                    <option>4+ Guests</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button className="w-full btn-primary">
                    Search Rooms
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Offers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Special Offers</h2>
            <p className="text-lg text-gray-600">Take advantage of our exclusive deals and packages</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden card-hover animate-slide-in-left">
              <div className="h-48 bg-gradient-to-r from-green-400 to-blue-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Weekend Getaway</h3>
                <p className="text-gray-600 mb-4">Enjoy 20% off on weekend stays with complimentary breakfast</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">From $199/night</span>
                  <button className="btn-primary">
                    Book Now
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden card-hover animate-fade-in-up">
              <div className="h-48 bg-gradient-to-r from-purple-400 to-pink-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Business Traveler</h3>
                <p className="text-gray-600 mb-4">High-speed WiFi, workspace, and meeting room access included</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">From $149/night</span>
                  <button className="btn-primary">
                    Book Now
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden card-hover animate-slide-in-right">
              <div className="h-48 bg-gradient-to-r from-yellow-400 to-orange-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Family Package</h3>
                <p className="text-gray-600 mb-4">Spacious suites with kids' amenities and family activities</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">From $249/night</span>
                  <button className="btn-primary">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Hotel Amenities</h2>
            <p className="text-lg text-gray-600">Everything you need for a comfortable and memorable stay</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Free WiFi</h3>
              <p className="text-gray-600">High-speed internet throughout the hotel</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Spa & Wellness</h3>
              <p className="text-gray-600">Relaxing spa treatments and fitness center</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Fine Dining</h3>
              <p className="text-gray-600">Multiple restaurants with diverse cuisines</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Conference Rooms</h3>
              <p className="text-gray-600">Modern facilities for meetings and events</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Guest Reviews</h2>
            <p className="text-lg text-gray-600">What our guests say about their experience</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md animate-slide-in-left">
              <div className="flex items-center mb-4">
                <div className="stars">
                  ★★★★★
                </div>
                <span className="ml-2 text-gray-600">5.0</span>
              </div>
              <p className="text-gray-700 mb-4">
                "Exceptional service and luxurious accommodations. The staff went above and beyond to make our stay memorable."
              </p>
              <div className="font-semibold">Sarah Johnson</div>
              <div className="text-gray-600 text-sm">Business Traveler</div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in-up">
              <div className="flex items-center mb-4">
                <div className="stars">
                  ★★★★★
                </div>
                <span className="ml-2 text-gray-600">5.0</span>
              </div>
              <p className="text-gray-700 mb-4">
                "Perfect location and stunning views. The spa facilities were incredible and the dining options were outstanding."
              </p>
              <div className="font-semibold">Michael Chen</div>
              <div className="text-gray-600 text-sm">Family Vacation</div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md animate-slide-in-right">
              <div className="flex items-center mb-4">
                <div className="stars">
                  ★★★★★
                </div>
                <span className="ml-2 text-gray-600">5.0</span>
              </div>
              <p className="text-gray-700 mb-4">
                "The conference facilities were top-notch. Everything was perfectly organized and the AV equipment worked flawlessly."
              </p>
              <div className="font-semibold">Emily Rodriguez</div>
              <div className="text-gray-600 text-sm">Corporate Event</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Rudra Hotel</h3>
              <p className="text-gray-400 mb-4">
                Experience luxury and comfort in the heart of the city. Your perfect stay awaits.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Rooms & Suites</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Dining</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Spa & Wellness</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Meetings & Events</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="text-gray-400 space-y-2">
                <p>123 Luxury Avenue<br />Downtown City, ST 12345</p>
                <p>Phone: (555) 123-4567</p>
                <p>Email: info@rudrahotel.com</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Rudra Hotel. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
