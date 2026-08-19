'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function ResetPasswordForm() {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const username = searchParams.get('user');

  if (!username) {
    return <p className="text-red-500 text-center">Invalid request. Username missing.</p>;
  }

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (otp.length !== 6) {
      setError('OTP must be exactly 6 digits');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/admin/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp, username, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('Password reset successfully! Redirecting to login...');
        setTimeout(() => {
          router.push('/admin/login');
        }, 2000);
      } else {
        setError(data.error || 'Failed to reset password');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Verify OTP & Reset</h2>
      <p className="text-sm text-center text-gray-500 mb-4">An OTP has been sent to the secure recovery email for <strong>{username}</strong>.</p>
      
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      {success && <p className="text-green-600 text-sm text-center">{success}</p>}
      
      <form onSubmit={handleReset} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">6-Digit OTP</label>
          <input
            type="text"
            required
            maxLength={6}
            placeholder="123456"
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-center text-2xl tracking-[0.2em]"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
          <input
            type="password"
            required
            minLength={6}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
          <input
            type="password"
            required
            minLength={6}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={loading || !!success}
          className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none disabled:opacity-50 mt-4"
        >
          {loading ? 'Verifying...' : 'Verify OTP & Reset Password'}
        </button>
      </form>
    </>
  );
}

export default function ResetPassword() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded shadow-md">
        <Suspense fallback={<p>Loading...</p>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
