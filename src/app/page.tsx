'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

// Animation variants
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

const buttonHover = {
  scale: 1.05,
  transition: { type: "spring" as const, stiffness: 400, damping: 10 },
};

const buttonTap = {
  scale: 0.95,
};

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Header */}
      <motion.header 
        className="bg-white shadow-sm border-b border-gray-100"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                Rudra Hotel
              </h1>
            </motion.div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/rooms">
                <motion.span
                  className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Rooms
                </motion.span>
              </Link>
              {["Dining", "Spa & Wellness", "Meetings", "Contact"].map((item, i) => (
                <motion.a
                  key={i}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.a>
              ))}
            </nav>
            <motion.button
              className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-shadow"
              whileHover={buttonHover}
              whileTap={buttonTap}
            >
              Book Now
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white hero-bg min-h-screen flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/hotel-rudra-regency-motihari-reception4.JPG')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-32">
          <div className="text-center">
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              variants={slideInVariants}
              initial="hidden"
              animate="visible"
            >
              Welcome to Rudra Hotel
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100"
              variants={slideInVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              Experience luxury and comfort in the heart of the city. Your perfect stay awaits.
            </motion.p>

            {/* Search Form */}
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto"
              variants={scaleVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { label: "Check-in", type: "date" },
                  { label: "Check-out", type: "date" },
                  { label: "Guests", type: "select" },
                ].map((field, i) => (
                  <motion.div
                    key={i}
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      {field.label}
                    </label>
                    {field.type === "select" ? (
                      <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all">
                        <option>1 Guest</option>
                        <option>2 Guests</option>
                        <option>3 Guests</option>
                        <option>4+ Guests</option>
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      />
                    )}
                  </motion.div>
                ))}
                <div className="flex items-end">
                  <motion.button
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-6 rounded-xl font-semibold"
                    whileHover={buttonHover}
                    whileTap={buttonTap}
                  >
                    Search Rooms
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Offers */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2
              className="text-4xl font-bold text-gray-900 mb-4"
              variants={itemVariants}
            >
              Special Offers
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600"
              variants={itemVariants}
            >
              Take advantage of our exclusive deals and packages
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              {
                title: "Weekend Getaway",
                desc: "Enjoy 20% off on weekend stays with complimentary breakfast",
                price: "$199/night",
                gradient: "from-green-400 to-blue-500",
              },
              {
                title: "Business Traveler",
                desc: "High-speed WiFi, workspace, and meeting room access included",
                price: "$149/night",
                gradient: "from-purple-400 to-pink-500",
              },
              {
                title: "Family Package",
                desc: "Spacious suites with kids' amenities and family activities",
                price: "$249/night",
                gradient: "from-yellow-400 to-orange-500",
              },
            ].map((offer, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer"
                variants={itemVariants}
                onHoverStart={() => setHoveredCard(i)}
                onHoverEnd={() => setHoveredCard(null)}
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <motion.div
                  className={`h-48 bg-gradient-to-r ${offer.gradient}`}
                  animate={hoveredCard === i ? { scale: 1.05 } : { scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {offer.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{offer.desc}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">
                      {offer.price}
                    </span>
                    <motion.button
                      className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-2 rounded-full font-semibold"
                      whileHover={buttonHover}
                      whileTap={buttonTap}
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

      {/* Hotel Amenities */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2
              className="text-4xl font-bold text-gray-900 mb-4"
              variants={itemVariants}
            >
              Hotel Amenities
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600"
              variants={itemVariants}
            >
              Everything you need for a comfortable and memorable stay
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              { icon: "✨", title: "Free WiFi", desc: "High-speed internet" },
              { icon: "💆", title: "Spa & Wellness", desc: "Relaxation services" },
              { icon: "🍽️", title: "Fine Dining", desc: "Multiple restaurants" },
              { icon: "📚", title: "Meetings", desc: "Modern facilities" },
            ].map((amenity, i) => (
              <motion.div
                key={i}
                className="text-center"
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl"
                  whileHover={{ rotate: 10, boxShadow: "0 10px 30px rgba(59,130,246,0.2)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {amenity.icon}
                </motion.div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {amenity.title}
                </h3>
                <p className="text-gray-600">{amenity.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Guest Reviews */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2
              className="text-4xl font-bold text-gray-900 mb-4"
              variants={itemVariants}
            >
              Guest Reviews
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600"
              variants={itemVariants}
            >
              What our guests say about their experience
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              {
                review:
                  "Exceptional service and luxurious accommodations. The staff went above and beyond.",
                name: "Sarah Johnson",
                title: "Business Traveler",
              },
              {
                review:
                  "Perfect location and stunning views. The spa facilities were incredible.",
                name: "Michael Chen",
                title: "Family Vacation",
              },
              {
                review:
                  "The conference facilities were top-notch. Everything was perfectly organized.",
                name: "Emily Rodriguez",
                title: "Corporate Event",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
                variants={itemVariants}
                whileHover={{ boxShadow: "0 15px 40px rgba(0,0,0,0.1)", y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <motion.div className="flex items-center mb-4">
                  <motion.span className="text-yellow-400 text-lg">
                    ★★★★★
                  </motion.span>
                  <span className="ml-2 text-gray-600 font-semibold">5.0</span>
                </motion.div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{item.review}"
                </p>
                <div className="font-bold text-gray-900">{item.name}</div>
                <div className="text-gray-600 text-sm">{item.title}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        className="bg-gray-900 text-white py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                Rudra Hotel
              </h3>
              <p className="text-gray-400 mb-4">
                Experience luxury and comfort in the heart of the city.
              </p>
              <div className="flex space-x-4">
                {["Facebook", "Twitter", "Instagram"].map((social, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {[
              {
                title: "Quick Links",
                links: ["Rooms & Suites", "Dining", "Spa & Wellness"],
              },
              {
                title: "Support",
                links: ["Contact Us", "FAQ", "Privacy Policy"],
              },
            ].map((col, i) => (
              <motion.div key={i} variants={itemVariants}>
                <h4 className="text-lg font-semibold mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link, j) => (
                    <motion.li
                      key={j}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      <a
                        href="#"
                        className="text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        {link}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}

            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="text-gray-400 space-y-2">
                <p>123 Luxury Avenue</p>
                <p>Downtown City, ST 12345</p>
                <p>Phone: (555) 123-4567</p>
                <p>Email: info@rudrahotel.com</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="border-t border-gray-800 pt-8 text-center text-gray-400"
            variants={itemVariants}
          >
            <p>&copy; 2024 Rudra Hotel. All rights reserved.</p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}
