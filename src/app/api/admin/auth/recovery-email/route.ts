import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload || !payload.userId) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const email = process.env.ADMIN_RECOVERY_EMAIL || '';
    
    if (!email) {
      return NextResponse.json({ email: 'Not Configured (.env: ADMIN_RECOVERY_EMAIL)' }, { status: 200 });
    }

    // Mask email for security (e.g. a***@gmail.com)
    const parts = email.split('@');
    if (parts.length === 2) {
      const masked = parts[0].charAt(0) + '****@' + parts[1];
      return NextResponse.json({ email: masked }, { status: 200 });
    }

    return NextResponse.json({ email: 'Invalid Email Format in .env' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
