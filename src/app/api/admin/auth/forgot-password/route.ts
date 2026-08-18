import { NextResponse } from 'next/server';
import crypto from 'crypto';
import connectToDatabase from '@/lib/db';
import { AdminUser } from '@/lib/models';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { usernameOrEmail } = await request.json();

    if (!usernameOrEmail) {
      return NextResponse.json({ error: 'Username or email is required' }, { status: 400 });
    }

    await connectToDatabase();

    const admin = await AdminUser.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
    });

    if (!admin || !admin.email) {
      // Return success even if not found to prevent user enumeration attacks
      return NextResponse.json({ success: true, message: 'If an account with that email exists, a reset link has been sent.' }, { status: 200 });
    }

    // Generate secure token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Save token hash to db with 1 hour expiration
    admin.resetToken = resetTokenHash;
    admin.resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000);
    await admin.save();

    // Create reset URL
    const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin/reset-password?token=${resetToken}&user=${admin.username}`;

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
        to: admin.email,
        subject: 'Password Reset Request',
        html: `
          <p>You requested a password reset.</p>
          <p>Click the secure link below to set a new password:</p>
          <a href="${resetUrl}">Reset Password</a>
          <p>This link is valid for 1 hour.</p>
          <p>If you did not request this, please ignore this email.</p>
        `,
      });
    } else {
      // Fallback for development: Print the link to console so the admin can click it locally
      console.warn('=============================================');
      console.warn('SMTP NOT CONFIGURED IN .env.local');
      console.warn('Simulating password reset email for:', admin.email);
      console.warn('RESET URL:', resetUrl);
      console.warn('=============================================');
    }

    return NextResponse.json({ success: true, message: 'If an account with that email exists, a reset link has been sent.' }, { status: 200 });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
