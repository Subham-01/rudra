import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { ContactInquiry } from '@/lib/models';

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const contacts = await ContactInquiry.find().sort({ createdAt: -1 });
    return NextResponse.json(contacts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await connectToDatabase();
    
    const contact = new ContactInquiry(data);
    await contact.save();
    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create contact' }, { status: 500 });
  }
}
