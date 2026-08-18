import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { PageContent } from '@/lib/models';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const pageKey = searchParams.get('pageKey');
    
    await connectToDatabase();
    
    const filter = pageKey ? { pageKey } : {};
    const content = await PageContent.find(filter);
    
    return NextResponse.json(content, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await connectToDatabase();
    
    // Expecting { pageKey: 'home', sectionKey: 'hero', content: 'Welcome' }
    const content = await PageContent.findOneAndUpdate(
      { pageKey: data.pageKey, sectionKey: data.sectionKey },
      { content: data.content },
      { upsert: true, new: true }
    );
    
    return NextResponse.json(content, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
  }
}
