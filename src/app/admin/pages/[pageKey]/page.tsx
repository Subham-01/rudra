'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { pageSchemas } from '@/lib/pageSchema';
import { ChevronLeft, Plus, Trash2, Save, Upload, X } from 'lucide-react';
import Link from 'next/link';

export default function PageEditor() {
  const router = useRouter();
  const params = useParams();
  const pageKey = params?.pageKey as string;
  const schema = pageSchemas[pageKey];
  
  const [contentData, setContentData] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!schema || !pageKey) return;
    fetch(`/api/admin/pages/${pageKey}`)
      .then(res => res.json())
      .then(data => {
        const state: Record<string, any> = {};
        
        schema.sections.forEach((section: any) => {
          const dbItem = data.find((d: any) => d.sectionKey === section.key);
          if (dbItem) {
            try {
              state[section.key] = JSON.parse(dbItem.content);
            } catch (e) {
              state[section.key] = section.defaultValue || (section.type === 'array' ? [] : {});
            }
          } else {
            state[section.key] = section.defaultValue || (section.type === 'array' ? [] : {});
          }
        });
        
        setContentData(state);
        setIsLoading(false);
      });
  }, [pageKey, schema]);

  const saveSingleField = async (sectionKey: string, payload: any) => {
    try {
      const updates = [{ sectionKey, content: JSON.stringify(payload) }];
      const res = await fetch(`/api/admin/pages/${pageKey}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates })
      });
      if (res.ok) {
        const iframe = document.getElementById('preview-iframe') as HTMLIFrameElement;
        if (iframe && iframe.contentWindow) iframe.contentWindow.location.reload();
      }
    } catch (e) {
      console.error('Inline save failed', e);
    }
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'OPEN_EDIT_SECTION') {
        setActiveSection(event.data.sectionKey);
        setActiveItemIndex(event.data.itemIndex ?? null);
      } else if (event.data?.type === 'INLINE_EDIT') {
        const { sectionKey, index, field, value } = event.data;
        
        setContentData(prev => {
          const next = { ...prev };
          if (index !== null) {
            next[sectionKey] = [...(next[sectionKey] || [])];
            const currentItem = next[sectionKey][index] || {};
            next[sectionKey][index] = { ...currentItem, [field]: value };
          } else {
            next[sectionKey] = { ...(next[sectionKey] || []), [field]: value };
          }
          
          // Fire save immediately with the new payload
          saveSingleField(sectionKey, next[sectionKey]);
          return next;
        });
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [pageKey]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updates = Object.keys(contentData).map(key => ({
        sectionKey: key,
        content: JSON.stringify(contentData[key])
      }));
      
      const res = await fetch(`/api/admin/pages/${pageKey}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates })
      });
      
      if (res.ok) {
        // Reload the iframe
        const iframe = document.getElementById('preview-iframe') as HTMLIFrameElement;
        if (iframe && iframe.contentWindow) {
          iframe.contentWindow.location.reload();
        }
        setActiveSection(null);
        setActiveItemIndex(null);
      } else {
        alert('Failed to save.');
      }
    } catch (e) {
      alert('Network error.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, sectionKey: string, index: number | null, fieldName: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    
    const fd = new FormData(); 
    fd.append('file', file);
    
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      if (res.ok) { 
        const data = await res.json(); 
        handleChange(sectionKey, index, fieldName, data.url);
      }
    } catch (e) {
      alert('Upload failed');
    } finally { 
      setIsUploading(false); 
    }
  };

  const handleChange = (sectionKey: string, index: number | null, fieldName: string, value: string) => {
    setContentData(prev => {
      const next = { ...prev };
      if (index !== null) {
        next[sectionKey] = [...(next[sectionKey] || [])];
        const currentItem = next[sectionKey][index] || {};
        next[sectionKey][index] = { ...currentItem, [fieldName]: value };
      } else {
        next[sectionKey] = { ...(next[sectionKey] || []), [fieldName]: value };
      }
      return next;
    });
  };

  const addArrayItem = (sectionKey: string) => {
    setContentData(prev => ({
      ...prev,
      [sectionKey]: [...(prev[sectionKey] || []), {}]
    }));
  };

  const removeArrayItem = (sectionKey: string, index: number) => {
    setContentData(prev => {
      const next = { ...prev };
      next[sectionKey] = next[sectionKey].filter((_: any, i: number) => i !== index);
      return next;
    });
  };

  if (!schema) {
    return <div className="p-8">Page schema not found. Cannot edit this page dynamically yet.</div>;
  }

  if (isLoading) return <div className="p-8">Loading editor...</div>;

  const previewUrl = (pageKey === 'home' || pageKey === 'footer') 
    ? `/?editMode=true&editingPage=${pageKey}` 
    : `/${pageKey}?editMode=true&editingPage=${pageKey}`;
  const activeSectionData = schema.sections.find((s: any) => s.key === activeSection);

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] -m-8 bg-neutral-950">
      {/* Topbar */}
      <div className="flex-shrink-0 flex items-center gap-4 bg-black p-4 border-b border-white/10">
        <Link href="/admin/pages" className="p-2 bg-white/5 rounded-lg text-white hover:bg-white/10 transition">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">Visual Editor: {schema.name}</h1>
          <p className="text-xs text-neutral-400 mt-0.5">Click any "Edit Section" button in the preview below to change content.</p>
        </div>
      </div>

      {/* Main Area: Iframe Preview */}
      <div className="flex-1 relative overflow-hidden">
        <iframe 
          id="preview-iframe"
          src={previewUrl} 
          className="w-full h-full border-none bg-white"
          title="Live Preview"
        />

        {/* Floating Sidebar Form */}
        {activeSectionData && (
          <div className="absolute top-0 right-0 h-full w-[450px] bg-white shadow-2xl border-l border-gray-200 flex flex-col transform transition-transform animate-in slide-in-from-right">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50">
              <h2 className="font-bold text-gray-900 text-lg">Editing: {activeSectionData.label}</h2>
              <button onClick={() => { setActiveSection(null); setActiveItemIndex(null); }} className="p-2 hover:bg-gray-200 rounded-full text-gray-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 bg-white">
              {activeSectionData.type === 'array' ? (
                <div className="space-y-6">
                  {(contentData[activeSectionData.key] || []).map((item: any, index: number) => {
                    if (activeItemIndex !== null && activeItemIndex !== index) return null;
                    return (
                    <div key={index} className="border border-gray-200 rounded-xl p-5 relative bg-gray-50/50">
                      <div className="absolute top-4 right-4">
                        <button 
                          onClick={() => removeArrayItem(activeSectionData.key, index)}
                          className="p-1.5 bg-white text-red-500 hover:bg-red-50 rounded-md border border-gray-200 transition shadow-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-4 pr-8">
                        {activeSectionData.fields.filter((f: any) => f.name !== 'color').map((field: any) => (
                          <div key={field.name}>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                              {field.label}
                            </label>
                            {field.type === 'textarea' ? (
                              <textarea
                                value={item[field.name] || ''}
                                onChange={e => handleChange(activeSectionData.key, index, field.name, e.target.value)}
                                className="w-full p-2.5 text-sm rounded-lg border border-gray-300 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none min-h-[80px]"
                              />
                            ) : field.type === 'image' ? (
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={item[field.name] || ''}
                                  onChange={e => handleChange(activeSectionData.key, index, field.name, e.target.value)}
                                  className="flex-1 p-2.5 text-sm rounded-lg border border-gray-300 outline-none"
                                />
                                <label className="bg-gray-900 hover:bg-black text-white px-3 rounded-lg cursor-pointer flex items-center justify-center text-xs font-medium transition">
                                  {isUploading ? '...' : 'Upload'}
                                  <input type="file" className="hidden" onChange={e => handleFileUpload(e, activeSectionData.key, index, field.name)} />
                                </label>
                              </div>
                            ) : (
                              <input
                                type="text"
                                value={item[field.name] || ''}
                                onChange={e => handleChange(activeSectionData.key, index, field.name, e.target.value)}
                                className="w-full p-2.5 text-sm rounded-lg border border-gray-300 focus:border-[#D4AF37] outline-none"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                  })}
                  
                  {activeItemIndex === null && (
                    <button 
                      onClick={() => addArrayItem(activeSectionData.key)}
                      className="w-full bg-indigo-50 text-indigo-700 hover:bg-indigo-100 py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition"
                    >
                      <Plus className="w-4 h-4" /> Add New Item
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-5">
                  {activeSectionData.fields.map((field: any) => (
                    <div key={field.name}>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                        {field.label}
                      </label>
                      {field.type === 'textarea' ? (
                        <textarea
                          value={contentData[activeSectionData.key]?.[field.name] || ''}
                          onChange={e => handleChange(activeSectionData.key, null, field.name, e.target.value)}
                          className="w-full p-3 text-sm rounded-lg border border-gray-300 outline-none min-h-[100px]"
                        />
                      ) : field.type === 'image' ? (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={contentData[activeSectionData.key]?.[field.name] || ''}
                            onChange={e => handleChange(activeSectionData.key, null, field.name, e.target.value)}
                            className="flex-1 p-3 text-sm rounded-lg border border-gray-300 outline-none"
                          />
                          <label className="bg-gray-900 hover:bg-black text-white px-4 rounded-lg cursor-pointer flex items-center justify-center gap-2 text-sm font-medium transition">
                            <Upload className="w-4 h-4" />
                            <input type="file" className="hidden" onChange={e => handleFileUpload(e, activeSectionData.key, null, field.name)} />
                          </label>
                        </div>
                      ) : (
                        <input
                          type="text"
                          value={contentData[activeSectionData.key]?.[field.name] || ''}
                          onChange={e => handleChange(activeSectionData.key, null, field.name, e.target.value)}
                          className="w-full p-3 text-sm rounded-lg border border-gray-300 outline-none"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="p-5 border-t border-gray-200 bg-gray-50">
              <button 
                onClick={handleSave} 
                disabled={isSaving}
                className="w-full bg-[#D4AF37] hover:bg-[#c4a133] text-black py-3 rounded-lg font-bold shadow-lg flex items-center justify-center gap-2 transition disabled:opacity-50"
              >
                <Save className="w-5 h-5" /> {isSaving ? 'Saving...' : 'Save & Refresh Live View'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
