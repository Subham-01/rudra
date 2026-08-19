import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/db';
import { AdminUser } from '@/lib/models';

export async function POST(request: Request) {
  try {
    const { otp, username, newPassword } = await request.json();

    if (!otp || !username || !newPassword) {
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
      return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 });
    }

    // Verify OTP using bcrypt
    const isValid = await bcrypt.compare(otp, admin.resetToken);
    
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 });
    }

    // OTP is valid! Update password
    const passwordHash = await bcrypt.hash(newPassword, 10);
    admin.passwordHash = passwordHash;
    admin.resetToken = undefined; // Clear OTP
    admin.resetTokenExpiry = undefined;
    await admin.save();

    return NextResponse.json({ success: true, message: 'Password has been reset successfully' }, { status: 200 });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
