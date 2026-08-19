'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Plus, Search, Upload, Download, Edit, Trash2, Save, X, Power } from 'lucide-react';
import * as XLSX from 'xlsx';

const CATEGORIES = [
  'General', 'Rooms', 'Booking', 'Restaurant', 'Banquet Hall', 
  'Wedding', 'Corporate Events', 'Policies', 'Facilities', 
  'Payments', 'Parking', 'Location', 'Nearby Attractions', 'Offers', 'Contact'
];

type FAQ = {
  id: string;
  category: string;
  question: string;
  keywords: string[];
  answer: string;
  disabled?: boolean;
};

export default function FAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    const res = await fetch('/api/admin/faqs?_t=' + Date.now(), { cache: 'no-store' });
    if (res.ok) setFaqs(await res.json());
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq) return;
    
    const keywordsArr = editingFaq.keywords || [];
    const cleanedKeywords = keywordsArr.map((k: any) => typeof k === 'string' ? k.trim() : k).filter(Boolean);
    const payload = { ...editingFaq, keywords: cleanedKeywords };

    const action = editingFaq.id ? 'edit' : 'add';
    const res = await fetch('/api/admin/faqs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, faq: payload })
    });
    
    if (res.ok) {
      fetchFaqs();
      setIsModalOpen(false);
      setEditingFaq(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;
    const res = await fetch('/api/admin/faqs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'delete', id })
    });
    if (res.ok) fetchFaqs();
  };
  
  const handleToggleStatus = async (faq: FAQ) => {
    const updated = { ...faq, disabled: !faq.disabled };
    const res = await fetch('/api/admin/faqs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'edit', faq: updated })
    });
    if (res.ok) fetchFaqs();
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(faqs, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = 'faqs.json';
    a.click();
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.name.endsWith('.json')) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const json = JSON.parse(event.target?.result as string);
          if (Array.isArray(json)) {
            await fetch('/api/admin/faqs', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ action: 'bulk_upload', faqs: json })
            });
            fetchFaqs();
            alert('FAQs imported successfully!');
          } else {
            alert('Invalid JSON format. Expected an array of FAQs.');
          }
        } catch (err) {
          alert('Failed to parse JSON file.');
        }
      };
      reader.readAsText(file);
    } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.csv') || file.name.endsWith('.xls')) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const data = new Uint8Array(event.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);

          const parsedFaqs = jsonData.map((row: any) => {
            const getVal = (key: string) => {
              const rowKey = Object.keys(row).find(k => k.trim().toLowerCase() === key.toLowerCase());
              return rowKey ? row[rowKey] : undefined;
            };

            return {
              id: `temp_${Math.random().toString(36).substr(2, 9)}`,
              category: getVal('category') || 'General',
              question: getVal('question') || '',
              answer: getVal('answer') || '',
              keywords: (getVal('keywords') || getVal('keyword') || getVal('trigger keywords') || '').toString().split(',').map((k: string) => k.trim()).filter(Boolean),
            };
          }).filter((faq: any) => faq.question && faq.answer);

          if (parsedFaqs.length > 0) {
            await fetch('/api/admin/faqs', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ action: 'bulk_upload', faqs: parsedFaqs })
            });
            fetchFaqs();
            alert(`Successfully imported ${parsedFaqs.length} FAQs!`);
          } else {
            alert('No valid FAQs found. Ensure your sheet has "question" and "answer" columns.');
          }
        } catch (err) {
          console.error(err);
          alert('Failed to parse Excel file.');
        }
      };
      reader.readAsArrayBuffer(file);
    }

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchSearch = faq.question.toLowerCase().includes(search.toLowerCase()) || faq.answer.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter ? faq.category === categoryFilter : true;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6 pb-20 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">FAQ Knowledge Base</h2>
          <p className="text-muted-foreground">Manage predefined answers for the AI Chatbot.</p>
        </div>
        <div className="flex gap-2">
          <input type="file" accept=".json,.xlsx,.csv,.xls" className="hidden" ref={fileInputRef} onChange={handleImport} />
          <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md transition-colors text-sm font-medium">
            <Upload className="w-4 h-4" /> Import
          </button>
          <button onClick={handleExport} className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md transition-colors text-sm font-medium">
            <Download className="w-4 h-4" /> Export
          </button>
          <button 
            onClick={() => {
              setEditingFaq({ id: '', category: CATEGORIES[0], question: '', keywords: [], answer: '' });
              setIsModalOpen(true);
            }} 
            className="flex items-center gap-2 px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" /> Add FAQ
          </button>
        </div>
      </div>

      <Card>
        <CardHeader className="py-4 border-b">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 w-full rounded-md border bg-background"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="py-2 px-3 rounded-md border bg-background"
            >
              <option value="">All Categories</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {filteredFaqs.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No FAQs found.</div>
            ) : (
              filteredFaqs.map(faq => (
                <div key={faq.id} className={`p-4 flex gap-4 items-start ${faq.disabled ? 'opacity-50 bg-gray-50 dark:bg-gray-900' : ''}`}>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                        {faq.category}
                      </span>
                      {faq.disabled && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                          Disabled
                        </span>
                      )}
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{faq.question}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{faq.answer}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {(faq.keywords || []).map(kw => (
                        <span key={kw} className="text-[10px] px-1.5 py-0.5 rounded-sm bg-gray-100 dark:bg-gray-800 text-gray-500">{kw}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => handleToggleStatus(faq)} className="p-2 text-gray-400 hover:text-amber-600 transition-colors" title={faq.disabled ? "Enable" : "Disable"}>
                      <Power className="w-4 h-4" />
                    </button>
                    <button onClick={() => { setEditingFaq(faq); setIsModalOpen(true); }} className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Edit">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(faq.id)} className="p-2 text-gray-400 hover:text-red-600 transition-colors" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      {isModalOpen && editingFaq && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b dark:border-gray-800">
              <h3 className="font-semibold text-lg">{editingFaq.id ? 'Edit FAQ' : 'Add FAQ'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="p-4 space-y-4 overflow-y-auto">
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select 
                  value={editingFaq.category} 
                  onChange={e => setEditingFaq({...editingFaq, category: e.target.value})}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Question</label>
                <input 
                  required
                  type="text" 
                  value={editingFaq.question} 
                  onChange={e => setEditingFaq({...editingFaq, question: e.target.value})}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                  placeholder="e.g. What time is check in?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Keywords (Comma separated)</label>
                <input 
                  required
                  type="text" 
                  value={(editingFaq.keywords || []).join(',')} 
                  onChange={e => setEditingFaq({...editingFaq, keywords: e.target.value.split(',')})}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                  placeholder="e.g. check in, arrival, time"
                />
                <p className="text-xs text-gray-500 mt-1">These power the fuzzy matching engine to answer instantly.</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Answer (Markdown Supported)</label>
                <textarea 
                  required
                  value={editingFaq.answer} 
                  onChange={e => setEditingFaq({...editingFaq, answer: e.target.value})}
                  className="w-full min-h-[150px] rounded-md border bg-background px-3 py-2 text-sm"
                  placeholder="Type the detailed answer here..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t dark:border-gray-800">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-md text-sm">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-amber-600 text-white rounded-md text-sm flex items-center gap-2">
                  <Save className="w-4 h-4" /> Save FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
