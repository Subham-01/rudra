const WHATSAPP_NUMBER = "918651600015";

export function createWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function createHotelInquiryLink(subject: string, details: string[] = []) {
  const lines = [
    "Hello Hotel Rudra Regency team,",
    `I would like to enquire about ${subject}.`,
    ...details.filter(Boolean),
    "Please share availability, pricing, and the next steps for booking.",
    "Thank you.",
  ];

  return createWhatsAppLink(lines.join("\n"));
}