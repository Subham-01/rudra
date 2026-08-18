import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Image } from '@/lib/models';

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    await connectToDatabase();
    const image = await Image.findByIdAndDelete(resolvedParams.id);
    if (!image) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}
