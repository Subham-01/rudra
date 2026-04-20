'use client';
import { motion } from "framer-motion";
import { useState } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 10 },
  },
};

const slideInVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 80, damping: 15 },
  },
};

const scaleVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 120, damping: 12 },
  },
};

export default function RoomsPage() {
  const [hoveredRoom, setHoveredRoom] = useState<number | null>(null);

  const rooms = [
    {
      id: 1,
      name: "Premium Deluxe Room",
      description:
        "Designed for comfort and functionality, the Premium Deluxe Room is perfect for guests seeking a relaxing stay with modern amenities and elegant interiors.",
      amenities: [
        "Comfortable King Size Bed",
        "Air Conditioning & Free WiFi",
        "LED TV & Room Service",
        "Modern Bathroom",
      ],
      idealFor: "Solo travelers & couples",
      color: "from-blue-400 to-cyan-500",
    },
    {
      id: 2,
      name: "Royal Semi-Suite",
      description:
        "Enjoy extra space and refined interiors in our Royal Semi-Suite, offering a premium experience for guests who want more comfort and style.",
      amenities: [
        "Comfortable King Size Bed",
        "Air Conditioning & Free WiFi",
        "LED TV & Room Service",
        "Modern Bathroom",
      ],
      idealFor: "Families & business travelers",
      color: "from-purple-400 to-pink-500",
    },
    {
      id: 3,
      name: "Royal Suite",
      description:
        "Experience the highest level of luxury with our Royal Suite, designed with premium features and elegant detailing for an unforgettable stay.",
      amenities: [
        "Large Luxury Room with Premium Design",
        "Separate Living Space",
        "Premium Bathroom & Amenities",
        "Exclusive Comfort",
      ],
      idealFor: "VIP guests & special occasions",
      color: "from-amber-400 to-orange-500",
    },
  ];

  const features = [
    {
      icon: "✨",
      title: "Luxury Comfort",
      description:
        "Experience premium comfort with spacious rooms, elegant interiors, and plush bedding designed for a relaxing stay.",
    },
    {
      icon: "💻",
      title: "Modern Amenities",
      description:
        "Enjoy high-speed WiFi, smart TV, air conditioning, and all essential facilities for a seamless and comfortable experience.",
    },
    {
      icon: "📍",
      title: "Perfect Location",
      description:
        "Located near Bariya Devi Mandir, our hotel offers easy access to key attractions and a peaceful environment.",
    },
  ];

  const whyChooseUs = [
    "A complete experience of stay, dining, and events",
    "Perfect blend of luxury, convenience, and hospitality",
    "Professional and attentive service at every step",
    "Elegant spaces for stays, dining, and celebrations",
    "Thoughtfully designed rooms for comfort and relaxation",
    "Experience refined comfort with modern amenities",
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 md:py-28"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/images/hotel-rudra-regency-motihari-reception4.JPG')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Luxury Rooms in Motihari
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Experience comfort, elegance, and modern amenities at one of the
              best hotels in Motihari.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white p-8 rounded-2xl shadow-md text-center hover:shadow-xl transition-shadow"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Rooms Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Room Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our carefully curated collection of rooms designed to
              exceed your expectations
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {rooms.map((room) => (
              <motion.div
                key={room.id}
                variants={scaleVariants}
                onHoverStart={() => setHoveredRoom(room.id)}
                onHoverEnd={() => setHoveredRoom(null)}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Room Image Placeholder */}
                <div
                  className={`h-56 bg-gradient-to-br ${room.color} relative overflow-hidden`}
                >
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={
                      hoveredRoom === room.id ? { scale: 1.05 } : { scale: 1 }
                    }
                    transition={{ type: "spring", stiffness: 100 }}
                    className="w-full h-full flex items-center justify-center text-white text-6xl font-light"
                  >
                    🏨
                  </motion.div>
                </div>

                {/* Room Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {room.name}
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {room.description}
                  </p>

                  {/* Amenities */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Amenities:
                    </h4>
                    <ul className="space-y-2">
                      {room.amenities.map((amenity, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ x: -10, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-center text-gray-600"
                        >
                          <span className="text-blue-600 mr-3 font-bold">✓</span>
                          {amenity}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Ideal For */}
                  <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold text-gray-900">
                        Ideal for:
                      </span>{" "}
                      {room.idealFor}
                    </p>
                  </div>

                  {/* CTAs */}
                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow"
                    >
                      Learn More
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors"
                    >
                      Book Now
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover what makes Hotel Rudra Regency the perfect choice for
              your stay
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {whyChooseUs.map((reason, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex items-start gap-4"
              >
                <div className="text-2xl font-bold text-blue-600 flex-shrink-0">
                  ✓
                </div>
                <p className="text-gray-700 text-lg">{reason}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Book Your Stay?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Experience luxury and comfort at Hotel Rudra Regency. Choose the
              perfect room for your needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:shadow-lg transition-shadow"
              >
                Explore Rooms
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:bg-opacity-10 transition-colors"
              >
                Contact Us
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
