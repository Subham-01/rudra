'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Upload } from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({
    ai_provider: 'groq',
    groq_api_key: '',
    openai_api_key: '',
    gemini_api_key: '',
    openrouter_api_key: '',
    grok_api_key: '',
    gtm_code: '',
    whatsapp_number: '',
    phone_number: '',
    address: '',
    dining_menu_pdf: '',
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings');
      if (res.ok) {
        const data = await res.json();
        const newSettings = { ...settings };
        data.forEach((s: any) => {
          if (newSettings[s.key] !== undefined) {
            newSettings[s.key] = s.value;
          }
        });
        setSettings(newSettings);
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async (key: string) => {
    setIsSaving(true);
    setMessage({ text: '', type: '' });
    
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value: settings[key] }),
      });
      
      if (res.ok) {
        setMessage({ text: 'Setting saved successfully!', type: 'success' });
        setTimeout(() => setMessage({ text: '', type: '' }), 3000);
      } else {
        setMessage({ text: 'Failed to save setting.', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'An error occurred.', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        handleUpdate(key, data.url);
        // Automatically save the setting after successful upload
        await fetch('/api/admin/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key, value: data.url }),
        });
        setMessage({ text: 'File uploaded and saved successfully!', type: 'success' });
        setTimeout(() => setMessage({ text: '', type: '' }), 3000);
      } else {
        alert('Failed to upload file');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) {
    return <div className="p-8">Loading settings...</div>;
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Site Settings</h2>
        <p className="text-muted-foreground">Manage global configurations, contact details, and APIs.</p>
      </div>

      {message.text && (
        <div className={`p-4 rounded-md sticky top-0 z-10 ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Global Files & PDFs */}
        <Card>
          <CardHeader>
            <CardTitle>Global Files & Menus</CardTitle>
            <CardDescription>Upload or link to PDFs for your dining menu and other site-wide files.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Dining Menu PDF</label>
              <div className="flex gap-2 items-center">
                <input type="text" value={settings.dining_menu_pdf} onChange={(e) => handleUpdate('dining_menu_pdf', e.target.value)} placeholder="/uploads/menu.pdf" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                <button onClick={() => handleSave('dining_menu_pdf')} disabled={isSaving} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 whitespace-nowrap">Save</button>
              </div>
              <div className="mt-2">
                <label className="bg-white border text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 cursor-pointer inline-flex items-center gap-2 text-sm">
                  <Upload className="w-4 h-4" />
                  {isUploading ? 'Uploading...' : 'Upload New PDF'}
                  <input type="file" className="hidden" accept=".pdf" onChange={(e) => handleFileUpload(e, 'dining_menu_pdf')} disabled={isUploading} />
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Provider Settings */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>AI Provider Settings</CardTitle>
            <CardDescription>Select your active AI provider and manage API keys for the Blog Studio.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2 max-w-sm">
              <label className="text-sm font-medium">Active Provider</label>
              <div className="flex gap-2">
                <select value={settings.ai_provider} onChange={(e) => handleUpdate('ai_provider', e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="groq">Groq (Llama 3.1)</option>
                  <option value="openai">OpenAI (GPT-4o Mini)</option>
                  <option value="gemini">Google Gemini (1.5 Flash)</option>
                  <option value="openrouter">OpenRouter</option>
                  <option value="grok">xAI (Grok 2)</option>
                </select>
                <button onClick={() => handleSave('ai_provider')} disabled={isSaving} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 whitespace-nowrap">Save</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Groq API Key</label>
                <div className="flex gap-2">
                  <input type="password" value={settings.groq_api_key} onChange={(e) => handleUpdate('groq_api_key', e.target.value)} placeholder="gsk_..." className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  <button onClick={() => handleSave('groq_api_key')} disabled={isSaving} className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800">Save</button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">OpenAI API Key</label>
                <div className="flex gap-2">
                  <input type="password" value={settings.openai_api_key} onChange={(e) => handleUpdate('openai_api_key', e.target.value)} placeholder="sk-..." className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  <button onClick={() => handleSave('openai_api_key')} disabled={isSaving} className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800">Save</button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Gemini API Key</label>
                <div className="flex gap-2">
                  <input type="password" value={settings.gemini_api_key} onChange={(e) => handleUpdate('gemini_api_key', e.target.value)} placeholder="AIza..." className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  <button onClick={() => handleSave('gemini_api_key')} disabled={isSaving} className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800">Save</button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">OpenRouter API Key</label>
                <div className="flex gap-2">
                  <input type="password" value={settings.openrouter_api_key} onChange={(e) => handleUpdate('openrouter_api_key', e.target.value)} placeholder="sk-or-v1-..." className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  <button onClick={() => handleSave('openrouter_api_key')} disabled={isSaving} className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800">Save</button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">xAI Grok API Key</label>
                <div className="flex gap-2">
                  <input type="password" value={settings.grok_api_key} onChange={(e) => handleUpdate('grok_api_key', e.target.value)} placeholder="xai-..." className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  <button onClick={() => handleSave('grok_api_key')} disabled={isSaving} className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800">Save</button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Google Tag Manager */}
        <Card>
          <CardHeader>
            <CardTitle>Google Tag Manager</CardTitle>
            <CardDescription>Enter your GTM tracking code.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">GTM Code</label>
              <div className="flex gap-2">
                <input type="text" value={settings.gtm_code} onChange={(e) => handleUpdate('gtm_code', e.target.value)} placeholder="GTM-XXXXXXX" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                <button onClick={() => handleSave('gtm_code')} disabled={isSaving} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 whitespace-nowrap">Save</button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
