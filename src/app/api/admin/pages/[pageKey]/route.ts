import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { PageContent } from '@/lib/models';

export async function GET(request: Request, props: { params: Promise<{ pageKey: string }> }) {
  try {
    const params = await props.params;
    await connectToDatabase();
    const content = await PageContent.find({ pageKey: params.pageKey }).lean();
    return NextResponse.json(content, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch page content' }, { status: 500 });
  }
}

export async function PUT(request: Request, props: { params: Promise<{ pageKey: string }> }) {
  try {
    const params = await props.params;
    const { updates } = await request.json(); // Array of { sectionKey, content }
    
    await connectToDatabase();
    
    for (const update of updates) {
      await PageContent.findOneAndUpdate(
        { pageKey: params.pageKey, sectionKey: update.sectionKey },
        { content: update.content },
        { upsert: true, new: true }
      );
    }
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update page content' }, { status: 500 });
  }
}
