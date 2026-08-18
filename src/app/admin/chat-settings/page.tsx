'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Save, Bot, MessageSquare, Settings2, Sliders } from 'lucide-react';

export default function ChatSettingsPage() {
  const [settings, setSettings] = useState({
    chat_enabled: 'true',
    chat_provider: 'gemini',
    chat_welcome_message: 'Hello! I am the Hotel Rudra Regency assistant. How can I help you today?',
    chat_suggested_questions: 'Book a Room, Banquet Hall, Restaurant, Room Price, Contact, Location',
    chat_system_prompt: 'You are a helpful and polite concierge assistant for Hotel Rudra Regency. You help guests with booking rooms, answering questions about the hotel, and providing local information. Keep answers concise, friendly, and formatted nicely in markdown.',
    chat_temperature: '0.7',
    chat_max_tokens: '500',
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings');
      if (res.ok) {
        const data = await res.json();
        const loadedSettings = { ...settings };
        data.forEach((s: any) => {
          if (Object.keys(loadedSettings).includes(s.key)) {
            loadedSettings[s.key as keyof typeof settings] = s.value;
          }
        });
        setSettings(loadedSettings);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = (key: keyof typeof settings, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ text: '', type: '' });
    
    try {
      // Save each setting
      const promises = Object.entries(settings).map(([key, value]) => 
        fetch('/api/admin/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key, value }),
        })
      );
      
      await Promise.all(promises);
      setMessage({ text: 'Chat settings saved successfully!', type: 'success' });
    } catch (error) {
      setMessage({ text: 'Failed to save settings.', type: 'error' });
    } finally {
      setIsSaving(false);
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    }
  };

  if (isLoading) {
    return <div className="p-8">Loading settings...</div>;
  }

  return (
    <div className="space-y-6 pb-20 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Bot className="w-6 h-6 text-amber-600" />
            AI Chatbot Settings
          </h2>
          <p className="text-muted-foreground">Configure your website's AI assistant.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving} 
          className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 disabled:opacity-50 transition-colors flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      {message.text && (
        <div className={`p-4 rounded-md sticky top-4 z-10 ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Settings2 className="w-5 h-5" /> General Settings</CardTitle>
            <CardDescription>Basic configurations for the chatbot.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50 dark:bg-gray-800/50">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100">Enable AI Chatbot</h4>
                <p className="text-sm text-gray-500">Show the floating chat widget on the website.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={settings.chat_enabled === 'true'}
                  onChange={(e) => handleUpdate('chat_enabled', e.target.checked ? 'true' : 'false')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 dark:peer-focus:ring-amber-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-amber-600"></div>
              </label>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Default AI Provider</label>
              <select 
                value={settings.chat_provider}
                onChange={(e) => handleUpdate('chat_provider', e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="gemini">Google Gemini (Recommended)</option>
                <option value="openai">OpenAI (ChatGPT)</option>
                <option value="groq">Groq (Llama 3)</option>
                <option value="openrouter">OpenRouter</option>
              </select>
              <p className="text-xs text-amber-600 mt-1 font-medium">
                Note: You must set the corresponding API KEY in your server's .env.local file!
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Sliders className="w-5 h-5" /> Model Parameters</CardTitle>
            <CardDescription>Fine-tune the AI's behavior.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Temperature: {settings.chat_temperature}</label>
              </div>
              <input 
                type="range" 
                min="0" max="2" step="0.1"
                value={settings.chat_temperature}
                onChange={(e) => handleUpdate('chat_temperature', e.target.value)}
                className="w-full accent-amber-600"
              />
              <p className="text-xs text-muted-foreground">Lower = More factual, Higher = More creative</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Max Tokens: {settings.chat_max_tokens}</label>
              </div>
              <input 
                type="range" 
                min="100" max="2000" step="50"
                value={settings.chat_max_tokens}
                onChange={(e) => handleUpdate('chat_max_tokens', e.target.value)}
                className="w-full accent-amber-600"
              />
              <p className="text-xs text-muted-foreground">Maximum length of the AI's response</p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><MessageSquare className="w-5 h-5" /> Persona & Prompts</CardTitle>
            <CardDescription>Control how the AI speaks and interacts with guests.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">System Prompt (The AI's Brain)</label>
              <textarea 
                value={settings.chat_system_prompt}
                onChange={(e) => handleUpdate('chat_system_prompt', e.target.value)}
                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="You are a helpful assistant..."
              />
              <p className="text-xs text-muted-foreground">
                This dictates the AI's personality and instructions. (Hotel facts from data/hotel.json are automatically injected).
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Welcome Message</label>
              <input 
                type="text"
                value={settings.chat_welcome_message}
                onChange={(e) => handleUpdate('chat_welcome_message', e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Suggested Questions (Comma separated)</label>
              <input 
                type="text"
                value={settings.chat_suggested_questions}
                onChange={(e) => handleUpdate('chat_suggested_questions', e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
              <p className="text-xs text-muted-foreground">
                These appear as quick-reply chips for new users.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
