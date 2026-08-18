import connectToDatabase from "@/lib/db";
import { PageContent, SiteSettings } from "@/lib/models";
import ConferenceRoomClient from "./ConferenceRoomClient";

export const dynamic = 'force-dynamic';

const defaultRoomFormats = [
  {
    title: "Executive Meetings",
    description: "A polished setting for client discussions, management meetings, and focused business sessions.",
    points: ["Private ambience", "Professional seating plan", "Ideal for formal discussions"],
  },
  {
    title: "Training Sessions",
    description: "Designed for workshops, inductions, seminars, and team learning with a clean and practical setup.",
    points: ["Presentation-ready layout", "Comfortable long-session use", "Flexible attendee arrangement"],
  },
  {
    title: "Corporate Gatherings",
    description: "Suitable for launches, briefings, networking meets, and compact business events with hospitality support.",
    points: ["Welcoming arrival experience", "Refreshment coordination", "Balanced formal-premium feel"],
  },
];

const defaultEssentials = [
  "High-speed WiFi connectivity",
  "Projector and presentation-friendly setup",
  "Air-conditioned comfort",
  "Custom seating arrangement support",
  "Tea, coffee, and dining coordination",
  "Dedicated assistance for event flow",
];

const defaultProcess = [
  "Share your event type, date, and expected guest count.",
  "Our team helps you finalize the layout and service requirements.",
  "Arrive to a polished, ready-to-use conference setup.",
];

export default async function ConferenceRoomPage() {
  await connectToDatabase();
  
  // Fetch global settings
  const rawSettings = await SiteSettings.find().lean();
  const settings: Record<string, string> = {};
  rawSettings.forEach((s: any) => settings[s.key] = s.value);
  const whatsappNumber = settings.whatsapp_number;

  // Fetch page content
  const rawContent = await PageContent.find({ pageKey: 'conference' }).lean();
  
  const getParsedContent = (key: string, fallback: any) => {
    const item = rawContent.find((c: any) => c.sectionKey === key);
    if (!item) return fallback;
    try { return JSON.parse(item.content); } catch { return fallback; }
  };

  const roomFormats = getParsedContent('roomFormats', defaultRoomFormats);
  const essentials = getParsedContent('essentials', defaultEssentials);
  const process = getParsedContent('process', defaultProcess);

  return (
    <ConferenceRoomClient 
      roomFormats={roomFormats} 
      essentials={essentials} 
      process={process} 
      whatsappNumber={whatsappNumber}
    />
  );
}