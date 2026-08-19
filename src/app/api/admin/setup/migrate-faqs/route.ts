import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { PageContent } from '@/lib/models';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectToDatabase();
    
    const faqsPath = path.join(process.cwd(), 'data', 'faqs.json');
    if (!fs.existsSync(faqsPath)) {
      return NextResponse.json({ error: 'data/faqs.json not found' }, { status: 404 });
    }

    const data = fs.readFileSync(faqsPath, 'utf8');
    const faqs = JSON.parse(data);

    await PageContent.findOneAndUpdate(
      { pageKey: 'chatbot', sectionKey: 'faqs' },
      { content: JSON.stringify(faqs) },
      { upsert: true }
    );

    return NextResponse.json({ success: true, count: faqs.length, message: 'Successfully migrated FAQs to production DB' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
