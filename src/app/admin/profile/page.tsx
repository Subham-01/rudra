'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Lock, User } from 'lucide-react';

export default function ProfilePage() {
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [isSavingEmail, setIsSavingEmail] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [emailAuthPassword, setEmailAuthPassword] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {

    // fetch recovery email
    fetchRecoveryEmail();
  }, []);

  const fetchRecoveryEmail = async () => {
    try {
      const res = await fetch('/api/admin/auth/recovery-email');
      if (res.ok) {
        const data = await res.json();
        setRecoveryEmail(data.email || '');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = (key: string, value: string) => {
    setPasswordForm(prev => ({ ...prev, [key]: value }));
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage({ text: 'New passwords do not match.', type: 'error' });
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setMessage({ text: 'New password must be at least 6 characters long.', type: 'error' });
      return;
    }

    setIsSaving(true);
    setMessage({ text: '', type: '' });
    
    try {
      const res = await fetch('/api/admin/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setMessage({ text: 'Password changed successfully!', type: 'success' });
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        setMessage({ text: data.error || 'Failed to change password.', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'An error occurred.', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingEmail(true);
    setMessage({ text: '', type: '' });
    
    try {
      const res = await fetch('/api/admin/auth/recovery-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: recoveryEmail, currentPassword: emailAuthPassword }),
      });
      
      const data = await res.json();
      if (res.ok) {
        setMessage({ text: 'Recovery email updated successfully!', type: 'success' });
        setEmailAuthPassword('');
      } else {
        setMessage({ text: data.error || 'Failed to update recovery email.', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'An error occurred.', type: 'error' });
    } finally {
      setIsSavingEmail(false);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Admin Profile</h2>
        <p className="text-muted-foreground">Manage your account credentials and security settings.</p>
      </div>

      {message.text && (
        <div className={`p-4 rounded-md sticky top-0 z-10 ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Lock className="w-5 h-5" /> Change Password</CardTitle>
            <CardDescription>Update your admin login password.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Current Password</label>
                <input 
                  type="password" 
                  value={passwordForm.currentPassword} 
                  onChange={(e) => handleUpdate('currentPassword', e.target.value)} 
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">New Password</label>
                <input 
                  type="password" 
                  value={passwordForm.newPassword} 
                  onChange={(e) => handleUpdate('newPassword', e.target.value)} 
                  required
                  minLength={6}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Confirm New Password</label>
                <input 
                  type="password" 
                  value={passwordForm.confirmPassword} 
                  onChange={(e) => handleUpdate('confirmPassword', e.target.value)} 
                  required
                  minLength={6}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                />
              </div>

              <button 
                type="submit" 
                disabled={isSaving} 
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50 transition-colors"
              >
                {isSaving ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><User className="w-5 h-5" /> Password Recovery</CardTitle>
            <CardDescription>Configure how you recover your account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <form onSubmit={handleSaveEmail} className="space-y-4 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900 dark:text-gray-100">Recovery Email Address</label>
                <div className="space-y-4">
                  <input 
                    type="email" 
                    value={recoveryEmail} 
                    onChange={(e) => setRecoveryEmail(e.target.value)} 
                    placeholder="admin@example.com"
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                  />
                  <div className="flex gap-2">
                    <input 
                      type="password" 
                      value={emailAuthPassword} 
                      onChange={(e) => setEmailAuthPassword(e.target.value)} 
                      placeholder="Confirm Admin Password"
                      required
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                    />
                    <button 
                      type="submit" 
                      disabled={isSavingEmail} 
                      className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50 transition-colors whitespace-nowrap"
                    >
                      {isSavingEmail ? 'Saving...' : 'Save Email'}
                    </button>
                  </div>
                </div>
                <p className="text-xs">
                  We will send a password reset link to this email address if you ever forget your password.
                  <br />
                  <span className="text-amber-600 dark:text-amber-400 font-medium">
                    Note: SMTP settings must be configured in .env.local (SMTP_HOST, SMTP_USER, SMTP_PASS) for emails to send.
                  </span>
                </p>
              </div>
            </form>

            <div className="border-t pt-4">
              <p className="mb-2">
                <strong>Emergency CLI Reset (If email is not configured):</strong>
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Log into your server via SSH or open your local terminal.</li>
                <li>Navigate to the project root directory.</li>
                <li>Run the password reset script:
                  <code className="block mt-2 bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs font-mono">
                    npm run reset-admin-password
                  </code>
                </li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
