import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { SiteSettings } from '@/lib/models';

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const settings = await SiteSettings.find();
    return NextResponse.json(settings, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await connectToDatabase();
    
    // Expecting { key: 'gtm_code', value: '<script>...</script>' }
    const setting = await SiteSettings.findOneAndUpdate(
      { key: data.key },
      { value: data.value },
      { upsert: true, new: true }
    );
    
    return NextResponse.json(setting, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update setting' }, { status: 500 });
  }
}
