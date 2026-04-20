# Rudra Hotel - Luxury Accommodations Landing Page

A modern, responsive hotel landing page built with Next.js 16, TypeScript, and Tailwind CSS. Inspired by premium hotel websites like Radisson Hotels.

## 🚀 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive Layout**: Fully responsive across all devices
- **Interactive Elements**: Hover effects, animations, and interactive booking form
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Fast Performance**: Built with Next.js for optimal performance
- **TypeScript**: Full type safety throughout the application

## 🏨 Hotel Features Showcased

- **Room Booking System**: Interactive booking form with date selection
- **Special Offers**: Weekend getaway, business traveler, and family packages
- **Hotel Amenities**: WiFi, spa, fine dining, conference rooms
- **Guest Reviews**: Customer testimonials with star ratings
- **Contact Information**: Complete hotel contact details

## 🛠️ Tech Stack

- **Framework**: Next.js 16.2.4
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.2.2
- **Package Manager**: pnpm
- **Font**: Geist Sans & Geist Mono

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (Latest LTS recommended)
- pnpm package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd rudraapp
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm build
pnpm start
```

## 📁 Project Structure

```
rudraapp/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout with metadata
│   │   ├── page.tsx        # Main landing page
│   │   ├── globals.css     # Global styles and animations
│   │   └── favicon.ico
│   └── architecture.md     # Project architecture documentation
├── public/                 # Static assets
├── package.json
├── tsconfig.json
├── next.config.ts
└── tailwind.config.ts
```

## 🎨 Design Features

- **Hero Section**: Eye-catching gradient background with booking form
- **Animated Cards**: Smooth hover effects and entrance animations
- **Star Ratings**: Custom styled star ratings for reviews
- **Responsive Grid**: Flexible layouts for different screen sizes
- **Custom Buttons**: Styled buttons with hover effects

## 📱 Responsive Design

The landing page is fully responsive and optimized for:
- Desktop computers (1200px+)
- Tablets (768px - 1199px)
- Mobile devices (320px - 767px)

## 🔧 Customization

### Colors
The design uses a blue color scheme that can be easily customized in the Tailwind configuration.

### Content
All text content, pricing, and hotel information can be easily modified in the `page.tsx` file.

### Images
Add hotel images to the `public/` directory and update the image references in the components.

## 📈 Performance

- **Next.js Optimization**: Automatic code splitting and optimization
- **Tailwind CSS**: Utility-first CSS with purging for minimal bundle size
- **TypeScript**: Compile-time type checking for better performance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Contact

For questions or support, please contact:
- Email: info@rudrahotel.com
- Phone: (555) 123-4567
- Address: 123 Luxury Avenue, Downtown City, ST 12345

---

Built with ❤️ using Next.js and Tailwind CSS
