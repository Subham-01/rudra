import fs from 'fs';
import path from 'path';
import { findBestFAQ } from './faqMatcher';
import connectToDatabase from '@/lib/db';
import { PageContent } from '@/lib/models';

// Simple cache
let cachedFaqs: any[] | null = null;
let faqsLastFetched = 0;

async function loadFaqs() {
  const now = Date.now();
  if (cachedFaqs && (now - faqsLastFetched) < 60000) {
    // Cache for 60 seconds
    return cachedFaqs;
  }
  
  try {
    await connectToDatabase();
    const doc = await PageContent.findOne({ pageKey: 'chatbot', sectionKey: 'faqs' }).lean();
    if (doc) {
      cachedFaqs = JSON.parse(doc.content);
      faqsLastFetched = now;
    } else {
      cachedFaqs = [];
    }
  } catch (e) {
    cachedFaqs = [];
  }
  return cachedFaqs || [];
}

function searchHotelJson(query: string): string | null {
  const hotelPath = path.join(process.cwd(), 'data', 'hotel.json');
  try {
    const data = fs.readFileSync(hotelPath, 'utf8');
    const hotel = JSON.parse(data);
    
    const q = query.toLowerCase();
    
    // Simple heuristic to extract info without AI
    if (q.includes('room') && !q.includes('banquet')) {
      let res = `We have the following rooms:\n`;
      hotel.rooms.forEach((r: any) => {
        res += `- **${r.type}**: ${r.description} (Amenities: ${r.amenities.join(', ')})\n`;
      });
      return res;
    }
    
    if (q.includes('facility') || q.includes('facilities') || q.includes('amenity') || q.includes('amenities')) {
      return `Our facilities include:\n${hotel.facilities.map((f: string) => `- ${f}`).join('\n')}`;
    }
    
    if (q.includes('policy') || q.includes('cancellation')) {
      return `**Check-in**: ${hotel.policies.checkIn}\n**Check-out**: ${hotel.policies.checkOut}\n**Cancellation**: ${hotel.policies.cancellation}`;
    }
    
    if (q.includes('event') || q.includes('wedding') || q.includes('banquet')) {
      return `We host various events including: ${hotel.events.join(', ')}.\nWe have a 10,000 sq ft Banquet Hall that fits up to 1000 guests, perfect for your needs!`;
    }
    
  } catch (e) {
    console.error('Failed to read hotel.json', e);
  }
  
  return null;
}

export type SearchResult = {
  foundLocally: boolean;
  answer: string | null;
  hotelData?: string; // If not found locally, pass this to AI
};

export async function searchKnowledgeBase(query: string): Promise<SearchResult> {
  // 1. Search FAQs
  const faqs = await loadFaqs();
  const bestFaq = findBestFAQ(query, faqs);
  
  if (bestFaq) {
    return {
      foundLocally: true,
      answer: bestFaq.answer
    };
  }
  
  // 2. Search hotel.json
  const hotelAnswer = searchHotelJson(query);
  if (hotelAnswer) {
    return {
      foundLocally: true,
      answer: hotelAnswer
    };
  }
  
  // 3. Fallback to AI (pass minimal hotel data instead of huge chunk)
  // We'll just pass the full hotel data for the AI since it's small enough,
  // but if it was huge we could filter it here.
  let hotelData = '';
  try {
    hotelData = fs.readFileSync(path.join(process.cwd(), 'data', 'hotel.json'), 'utf8');
  } catch (e) {}

  return {
    foundLocally: false,
    answer: null,
    hotelData
  };
}
