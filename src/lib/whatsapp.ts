const DEFAULT_WHATSAPP_NUMBER = "918651600015";

export function createWhatsAppLink(message: string, overrideNumber?: string) {
  const number = overrideNumber ? overrideNumber.replace(/[^0-9]/g, '') : DEFAULT_WHATSAPP_NUMBER;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function createHotelInquiryLink(subject: string, details: string[] = [], overrideNumber?: string) {
  const lines = [
    "Hello Hotel Rudra Regency team,",
    `I would like to enquire about ${subject}.`,
    ...details.filter(Boolean),
    "Please share availability, pricing, and the next steps for booking.",
    "Thank you.",
  ];

  return createWhatsAppLink(lines.join("\n"), overrideNumber);
}