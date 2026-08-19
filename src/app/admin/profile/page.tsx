'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Lock } from 'lucide-react';

export default function ProfilePage() {
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

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

  return (
    <div className="space-y-6 pb-20">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Admin Profile</h2>
        <p className="text-muted-foreground">Manage your account credentials.</p>
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
      </div>
    </div>
  );
}
