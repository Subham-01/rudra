import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/db';
import { AdminUser } from '@/lib/models';

export async function GET(request: Request) {
  try {
    // Only allow in development or if no admin exists
    await connectToDatabase();

    const adminCount = await AdminUser.countDocuments();

    if (adminCount > 0) {
      return NextResponse.json({ message: 'Admin already exists. Setup ignored.' }, { status: 403 });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('admin123', salt);

    const admin = new AdminUser({
      username: 'admin',
      passwordHash,
    });

    await admin.save();

    return NextResponse.json({ message: 'Default admin created! username: admin, password: admin123' }, { status: 201 });
  } catch (error) {
    console.error('Setup error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
