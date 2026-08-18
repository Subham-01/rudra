import { NextResponse } from 'next/server';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/db';
import { AdminUser } from '@/lib/models';

export async function POST(request: Request) {
  try {
    const { token, username, newPassword } = await request.json();

    if (!token || !username || !newPassword) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    await connectToDatabase();

    const admin = await AdminUser.findOne({
      username,
      resetTokenExpiry: { $gt: new Date() } // Ensure token is not expired
    });

    if (!admin || !admin.resetToken) {
      return NextResponse.json({ error: 'Invalid or expired reset token' }, { status: 400 });
    }

    // Verify token hash
    const providedTokenHash = crypto.createHash('sha256').update(token).digest('hex');
    if (providedTokenHash !== admin.resetToken) {
      return NextResponse.json({ error: 'Invalid or expired reset token' }, { status: 400 });
    }

    // Token is valid! Update password
    const passwordHash = await bcrypt.hash(newPassword, 10);
    admin.passwordHash = passwordHash;
    admin.resetToken = undefined; // Clear token
    admin.resetTokenExpiry = undefined;
    await admin.save();

    return NextResponse.json({ success: true, message: 'Password has been reset successfully' }, { status: 200 });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
