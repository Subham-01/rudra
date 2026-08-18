import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const faqsPath = path.join(process.cwd(), 'data', 'faqs.json');

function getFaqs() {
  try {
    if (!fs.existsSync(faqsPath)) {
      return [];
    }
    const data = fs.readFileSync(faqsPath, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

function saveFaqs(faqs: any[]) {
  fs.writeFileSync(faqsPath, JSON.stringify(faqs, null, 2));
}

export async function GET(request: Request) {
  return NextResponse.json(getFaqs(), { status: 200 });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const faqs = getFaqs();

    if (data.action === 'bulk_upload') {
      const newFaqs = data.faqs;
      // Merge logic or replace logic
      const merged = [...faqs];
      for (const newFaq of newFaqs) {
        if (!newFaq.id) newFaq.id = `faq_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        merged.push(newFaq);
      }
      saveFaqs(merged);
      return NextResponse.json(merged, { status: 200 });
    }

    if (data.action === 'add') {
      const newFaq = { ...data.faq, id: `faq_${Date.now()}` };
      faqs.push(newFaq);
      saveFaqs(faqs);
      return NextResponse.json(newFaq, { status: 201 });
    }

    if (data.action === 'edit') {
      const index = faqs.findIndex((f: any) => f.id === data.faq.id);
      if (index > -1) {
        faqs[index] = data.faq;
        saveFaqs(faqs);
        return NextResponse.json(faqs[index], { status: 200 });
      }
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
    }

    if (data.action === 'delete') {
      const newFaqs = faqs.filter((f: any) => f.id !== data.id);
      saveFaqs(newFaqs);
      return NextResponse.json({ success: true }, { status: 200 });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
