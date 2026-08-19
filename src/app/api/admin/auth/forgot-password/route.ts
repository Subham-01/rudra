import { NextResponse } from 'next/server';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/db';
import { AdminUser } from '@/lib/models';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { usernameOrEmail } = await request.json();

    if (!usernameOrEmail) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    await connectToDatabase();

    // In the OTP flow, the recovery email is strictly from .env.local
    const recoveryEmail = process.env.ADMIN_RECOVERY_EMAIL;

    const admin = await AdminUser.findOne({ username: usernameOrEmail });

    if (!admin) {
      // Return success even if not found to prevent user enumeration attacks
      return NextResponse.json({ success: true, message: 'If an account exists, an OTP has been sent.' }, { status: 200 });
    }

    if (!recoveryEmail) {
      console.error('ADMIN_RECOVERY_EMAIL is not set in environment variables.');
      return NextResponse.json({ error: 'Recovery email is not configured on the server.' }, { status: 500 });
    }

    // Generate secure 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHash = await bcrypt.hash(otp, 10);

    // Save token hash to db with 10 minute expiration
    admin.resetToken = otpHash;
    admin.resetTokenExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await admin.save();

    // Send email using nodemailer
    const hasSmtpConfig = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;

    if (hasSmtpConfig) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Admin System" <${process.env.SMTP_USER}>`,
        to: recoveryEmail,
        subject: 'Your Password Reset OTP',
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f5; text-align: center;">
            <div style="max-w: 500px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <h2 style="color: #111827; margin-top: 0;">Password Reset Code</h2>
              <p style="color: #4b5563; font-size: 16px;">You requested a password reset for the admin panel.</p>
              <p style="color: #4b5563; font-size: 16px;">Enter the following 6-digit code to reset your password:</p>
              
              <div style="margin: 30px 0; padding: 15px; background-color: #f3f4f6; border-radius: 6px; letter-spacing: 5px; font-size: 32px; font-weight: bold; color: #4f46e5;">
                ${otp}
              </div>
              
              <p style="color: #6b7280; font-size: 14px;">This code is valid for exactly 10 minutes.</p>
              <p style="color: #6b7280; font-size: 14px;">If you did not request this, please ignore this email immediately.</p>
            </div>
          </div>
        `,
      });
    } else {
      // Fallback for development
      console.warn('=============================================');
      console.warn('SMTP NOT CONFIGURED IN .env.local');
      console.warn('Simulating password reset email to:', recoveryEmail);
      console.warn('YOUR OTP IS:', otp);
      console.warn('=============================================');
    }

    return NextResponse.json({ success: true, message: 'OTP has been sent to the recovery email.' }, { status: 200 });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
