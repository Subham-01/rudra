import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Image } from '@/lib/models';

export async function GET() {
  try {
    await connectToDatabase();
    const images = await Image.find().sort({ createdAt: -1 });
    return NextResponse.json(images, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await connectToDatabase();
    
    const image = new Image(data);
    await image.save();
    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create image record' }, { status: 500 });
  }
}
