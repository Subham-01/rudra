const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Read .env.local manually
const envPath = path.join(process.cwd(), '.env.local');
let MONGODB_URI = '';
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const match = envContent.match(/MONGODB_URI=(.*)/);
  if (match) MONGODB_URI = match[1].trim();
}

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not defined in .env.local");
  process.exit(1);
}

const PageContentSchema = new mongoose.Schema({
  pageKey: { type: String, required: true },
  sectionKey: { type: String, required: true },
  content: { type: String, required: true },
});

const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB.");

    const faqsPath = path.join(process.cwd(), 'data', 'faqs.json');
    if (!fs.existsSync(faqsPath)) {
      console.log("No faqs.json found. Skipping migration.");
      process.exit(0);
    }

    const data = fs.readFileSync(faqsPath, 'utf8');
    const faqs = JSON.parse(data);

    // Save to PageContent
    await PageContent.findOneAndUpdate(
      { pageKey: 'chatbot', sectionKey: 'faqs' },
      { content: JSON.stringify(faqs) },
      { upsert: true, new: true }
    );

    console.log(`Successfully migrated ${faqs.length} FAQs to MongoDB.`);
    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  }
}

run();
