import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { PageContent } from '@/lib/models';

export const dynamic = 'force-dynamic';

async function getFaqs() {
  await connectToDatabase();
  const doc = await PageContent.findOne({ pageKey: 'chatbot', sectionKey: 'faqs' }).lean();
  if (!doc) return [];
  try {
    return JSON.parse(doc.content);
  } catch (e) {
    return [];
  }
}

async function saveFaqs(faqs: any[]) {
  await connectToDatabase();
  await PageContent.findOneAndUpdate(
    { pageKey: 'chatbot', sectionKey: 'faqs' },
    { content: JSON.stringify(faqs) },
    { upsert: true }
  );
}

export async function GET(request: Request) {
  const faqs = await getFaqs();
  return NextResponse.json(faqs, { status: 200 });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const faqs = await getFaqs();

    if (data.action === 'bulk_upload') {
      const newFaqs = data.faqs;
      const merged = [...faqs];
      for (const newFaq of newFaqs) {
        if (!newFaq.id) newFaq.id = `faq_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        merged.push(newFaq);
      }
      await saveFaqs(merged);
      return NextResponse.json(merged, { status: 200 });
    }

    if (data.action === 'add') {
      const newFaq = { ...data.faq, id: `faq_${Date.now()}` };
      faqs.push(newFaq);
      await saveFaqs(faqs);
      return NextResponse.json(newFaq, { status: 201 });
    }

    if (data.action === 'edit') {
      const index = faqs.findIndex((f: any) => f.id === data.faq.id);
      if (index > -1) {
        faqs[index] = data.faq;
        await saveFaqs(faqs);
        return NextResponse.json(faqs[index], { status: 200 });
      }
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
    }

    if (data.action === 'delete') {
      const newFaqs = faqs.filter((f: any) => f.id !== data.id);
      await saveFaqs(newFaqs);
      return NextResponse.json({ success: true }, { status: 200 });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
