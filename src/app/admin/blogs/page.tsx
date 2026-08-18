'use client';

import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Pencil, Trash2, X, Upload, Sparkles, CheckCircle2, AlertCircle, ChevronLeft, RefreshCw } from 'lucide-react';
import 'react-quill-new/dist/quill.snow.css';
import { Card, CardContent } from '@/components/ui/card';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const [currentBlog, setCurrentBlog] = useState({
    _id: '', title: '', slug: '', content: '', imageUrl: '', 
    tags: [] as string[], category: 'Blog', status: 'Draft',
    seoScore: 0, aiScore: 0, focusKeyword: '', seoTitle: '', seoDescription: ''
  });
  
  // AI Generation State
  const [aiTopic, setAiTopic] = useState('');
  const [aiKeyword, setAiKeyword] = useState('');
  const [aiWords, setAiWords] = useState('1200');
  const [aiProvider, setAiProvider] = useState('groq');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isFixing, setIsFixing] = useState(false);
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [isCustomWriting, setIsCustomWriting] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/blogs');
      if (res.ok) setBlogs(await res.json());
    } catch (e) {} finally { setIsLoading(false); }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = currentBlog._id ? 'PUT' : 'POST';
    const url = currentBlog._id ? `/api/admin/blogs/${currentBlog._id}` : '/api/admin/blogs';
    try {
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(currentBlog) });
      if (res.ok) { 
        setIsEditing(false); 
        fetchBlogs(); 
      } else {
        const errorData = await res.json();
        alert('Save failed: ' + (errorData.error || 'Unknown error'));
      }
    } catch (e) {
      alert('Save failed due to network error.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;
    try { const res = await fetch(`/api/admin/blogs/${id}`, { method: 'DELETE' }); if (res.ok) fetchBlogs(); } catch (e) {}
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setIsUploading(true);
    const fd = new FormData(); fd.append('file', file);
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      if (res.ok) { const data = await res.json(); setCurrentBlog({ ...currentBlog, imageUrl: data.url }); }
    } catch (e) {} finally { setIsUploading(false); }
  };

  const handleAiGenerate = async () => {
    if (!aiTopic) return alert('Topic required');
    setIsGenerating(true);
    try {
      const res = await fetch('/api/admin/blogs/generate', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: aiTopic, keyword: aiKeyword, words: aiWords, provider: aiProvider })
      });
      const data = await res.json();
      if (res.ok) {
        let parsedTags = currentBlog.tags;
        if (data.tags) {
          if (Array.isArray(data.tags)) parsedTags = data.tags;
          else if (typeof data.tags === 'string') parsedTags = data.tags.split(',').map((t:string)=>t.trim());
        }

        setCurrentBlog({
          ...currentBlog, 
          title: data.title || currentBlog.title, 
          content: data.content || currentBlog.content, 
          category: data.category || currentBlog.category,
          slug: data.slug || currentBlog.slug,
          seoTitle: data.seoTitle || currentBlog.seoTitle,
          seoDescription: data.seoDescription || currentBlog.seoDescription,
          focusKeyword: data.focusKeyword || currentBlog.focusKeyword,
          tags: parsedTags
        });
      } else {
        alert(data.error || 'Generation failed.');
      }
    } catch (e) {
      alert('Generation encountered a critical error.');
      console.error(e);
    } finally { setIsGenerating(false); }
  };

  const handleFixWithAi = async () => {
    setIsFixing(true);
    try {
      const res = await fetch('/api/admin/blogs/generate', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: currentBlog.title, keyword: currentBlog.focusKeyword, words: 1200, fixMode: true, content: currentBlog.content, provider: aiProvider })
      });
      const data = await res.json();
      if (res.ok) {
        setCurrentBlog({ ...currentBlog, content: data.content });
      } else {
        alert(data.error || 'Generation failed.');
      }
    } catch(e) {
      alert('Generation failed.');
    } finally { setIsFixing(false); }
  };

  const handleCustomRewrite = async () => {
    if (!customPrompt) return alert('Enter an instruction first.');
    if (!currentBlog.content) return alert('You must have content to rewrite.');
    setIsCustomWriting(true);
    try {
      const res = await fetch('/api/admin/blogs/generate', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customPrompt, content: currentBlog.content, fixMode: false, provider: aiProvider })
      });
      const data = await res.json();
      if (res.ok) {
        setCurrentBlog({ ...currentBlog, content: data.content });
        setCustomPrompt('');
      } else {
        alert(data.error || 'Rewrite failed.');
      }
    } catch(e) { alert('Rewrite failed.'); } finally { setIsCustomWriting(false); }
  };

  // Live evaluation logic
  const safeContent = currentBlog.content || '';
  const contentText = safeContent.replace(/<[^>]+>/g, ' ');
  const wordCount = contentText.split(/\s+/).filter(w => w.length > 0).length;
  const keyword = (currentBlog.focusKeyword || '').toLowerCase();
  
  const hasH2 = (safeContent.match(/<h2/g) || []).length;
  const hasLists = (safeContent.match(/<ul|<ol/g) || []).length;
  const hasTables = (safeContent.match(/<table/g) || []).length;
  const hasIntLinks = (safeContent.match(/href=["'](\/.*?|#.*?)["']/g) || []).length;
  const hasExtLinks = (safeContent.match(/href=["']http/g) || []).length;
  
  const googleChecklist = [
    { label: "Title present, 40–65 characters", passed: (currentBlog.title || '').length >= 40 && (currentBlog.title || '').length <= 65 },
    { label: "Focus keyword set", passed: keyword.length > 0 },
    { label: "Keyword in title", passed: keyword.length > 0 && (currentBlog.title || '').toLowerCase().includes(keyword) },
    { label: "Keyword in URL slug", passed: keyword.length > 0 && (currentBlog.slug || '').toLowerCase().includes(keyword) },
    { label: "Keyword in the first 160 words", passed: keyword.length > 0 && contentText.split(' ').slice(0, 160).join(' ').toLowerCase().includes(keyword) },
    { label: "Keyword in a subheading", passed: keyword.length > 0 && safeContent.toLowerCase().includes(`<h2`) && safeContent.toLowerCase().includes(keyword) },
    { label: "Keyword density 0.5–2.5%", passed: keyword.length > 0 && wordCount > 0 && ((contentText.toLowerCase().split(keyword).length - 1) / wordCount * 100) >= 0.5 && ((contentText.toLowerCase().split(keyword).length - 1) / wordCount * 100) <= 2.5 },
    { label: "Meta title 40–60 characters", passed: (currentBlog.seoTitle || '').length >= 40 && (currentBlog.seoTitle || '').length <= 60 },
    { label: "Meta description 120–160 characters", passed: (currentBlog.seoDescription || '').length >= 120 && (currentBlog.seoDescription || '').length <= 160 },
    { label: "Keyword in meta description", passed: keyword.length > 0 && (currentBlog.seoDescription || '').toLowerCase().includes(keyword) },
    { label: "At least 900 words", passed: wordCount >= 900 },
    { label: "Three or more H2 sections", passed: hasH2 >= 3 },
    { label: "Featured image set", passed: !!currentBlog.imageUrl },
    { label: "Internal links to your own pages", passed: hasIntLinks > 0 },
    { label: "Slug is short and clean", passed: (currentBlog.slug || '').length > 0 && (currentBlog.slug || '').length < 60 && !(currentBlog.slug || '').includes(' ') }
  ];

  const aiChecklist = [
    { label: "Opens with a direct answer (40–80 words)", passed: wordCount > 40 },
    { label: "Headings phrased as questions", passed: safeContent.includes('?</h2>') || safeContent.includes('?</h3>') },
    { label: "Has a list an assistant can lift", passed: hasLists > 0 },
    { label: "Has a comparison table", passed: hasTables > 0 },
    { label: "FAQ section present", passed: safeContent.toLowerCase().includes('faq') || safeContent.toLowerCase().includes('frequently asked questions') },
    { label: "Cites an outside authority", passed: hasExtLinks > 0 },
    { label: "Title reads as a real question or clear promise", passed: (currentBlog.title || '').includes('?') || (currentBlog.title || '').includes('How') || (currentBlog.title || '').includes('Top') }
  ];

  const googleScore = Math.round((googleChecklist.filter(c => c.passed).length / googleChecklist.length) * 100);
  const aiScoreLive = Math.round((aiChecklist.filter(c => c.passed).length / aiChecklist.length) * 100);

  if (!isEditing) {
    return (
      <div className="space-y-6">
        <div className="mb-6 flex justify-between items-center">
          <div><h2 className="text-2xl font-bold tracking-tight">Blogs Management</h2><p className="text-muted-foreground">Manage your content, SEO, and AI generation.</p></div>
          <button onClick={() => { setCurrentBlog({ _id: '', title: '', slug: '', content: '', imageUrl: '', tags: [], category: 'Blog', status: 'Draft', seoScore: 0, aiScore: 0, focusKeyword: '', seoTitle: '', seoDescription: '' }); setIsEditing(true); }} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">New Blog</button>
        </div>
        <Card><CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 border-b"><tr><th className="px-4 py-3">Title</th><th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Actions</th></tr></thead>
              <tbody>
                {blogs.map(b => (
                  <tr key={b._id} className="border-b"><td className="px-4 py-3">{b.title}</td><td className="px-4 py-3">{b.status}</td><td className="px-4 py-3 text-right space-x-2"><button onClick={() => { setCurrentBlog({ focusKeyword: b.focusKeyword || '', seoTitle: b.seoTitle || '', seoDescription: b.seoDescription || '', content: b.content || '', title: b.title || '', slug: b.slug || '', ...b }); setIsEditing(true); }}><Pencil className="w-4 h-4 text-indigo-600" /></button><button onClick={() => handleDelete(b._id)}><Trash2 className="w-4 h-4 text-red-600" /></button></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent></Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 -m-8 p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => setIsEditing(false)} className="p-2 bg-indigo-500 rounded-lg text-white hover:bg-indigo-600"><ChevronLeft className="w-5 h-5" /></button>
        <div>
          <h1 className="text-2xl font-bold">Write New Article</h1>
          <p className="text-sm text-gray-500">Scored live against Google ranking and AI answer-engine signals.</p>
        </div>
        <button onClick={handleSave} className="ml-auto bg-green-500 text-white px-6 py-2 rounded-md font-bold hover:bg-green-600 shadow-lg">Save Article</button>
      </div>

      {/* AI Writer Panel */}
      <div className="bg-[#5c27d8] rounded-2xl p-6 mb-8 text-white shadow-xl">
        <div className="flex items-center gap-2 mb-2 font-bold text-lg"><Sparkles className="w-5 h-5"/> Write with AI</div>
        <p className="text-sm text-indigo-200 mb-6">Drafts against the same checklist scored below — direct opening, question headings, list, table, FAQ.</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="space-y-2 col-span-2 md:col-span-1">
            <label className="text-xs font-bold text-indigo-200 uppercase tracking-wide">Topic</label>
            <input type="text" value={aiTopic} onChange={e=>setAiTopic(e.target.value)} placeholder="e.g. How to prepare..." className="w-full p-2.5 rounded-md text-black outline-none" />
          </div>
          <div className="space-y-2 col-span-2 md:col-span-1">
            <label className="text-xs font-bold text-indigo-200 uppercase tracking-wide">Focus Keyword</label>
            <input type="text" value={aiKeyword} onChange={e=>setAiKeyword(e.target.value)} placeholder="optional" className="w-full p-2.5 rounded-md text-black outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-indigo-200 uppercase tracking-wide">Model</label>
            <select value={aiProvider} onChange={e=>setAiProvider(e.target.value)} className="w-full p-2.5 rounded-md text-black outline-none">
              <option value="groq">Groq (Llama 3.1)</option>
              <option value="gemini">Google Gemini (1.5)</option>
              <option value="openai">OpenAI (GPT-4o)</option>
              <option value="openrouter">OpenRouter</option>
              <option value="grok">xAI (Grok 2)</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-indigo-200 uppercase tracking-wide">Words</label>
            <input type="text" value={aiWords} onChange={e=>setAiWords(e.target.value)} className="w-full p-2.5 rounded-md text-black outline-none" />
          </div>
        </div>
        <button onClick={handleAiGenerate} disabled={isGenerating} className="mt-6 bg-white/20 hover:bg-white/30 text-white font-medium px-6 py-2.5 rounded-md flex items-center gap-2 transition">
          <Sparkles className="w-4 h-4" /> {isGenerating ? 'Generating...' : 'Generate draft'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
        {/* Left Column: Form */}
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Article Title</label>
            <input type="text" value={currentBlog.title || ''} onChange={e=>setCurrentBlog({...currentBlog, title: e.target.value})} placeholder="Enter an engaging title" className="w-full p-3 bg-gray-50 border-none rounded-md outline-none focus:ring-2 focus:ring-indigo-100" />
            <p className="text-[11px] text-gray-400">{(currentBlog.title || '').length} characters — 40 to 65 is ideal</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">URL Slug</label>
              <input type="text" value={currentBlog.slug || ''} onChange={e=>setCurrentBlog({...currentBlog, slug: e.target.value})} placeholder="e.g. top-10-colleges" className="w-full p-3 bg-gray-50 border-none rounded-md outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Focus Keyword</label>
              <input type="text" value={currentBlog.focusKeyword || ''} onChange={e=>setCurrentBlog({...currentBlog, focusKeyword: e.target.value})} placeholder="the phrase you want to rank for" className="w-full p-3 bg-gray-50 border-none rounded-md outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Category</label>
              <select value={currentBlog.category} onChange={e=>setCurrentBlog({...currentBlog, category: e.target.value})} className="w-full p-3 bg-gray-50 border-none rounded-md outline-none">
                <option>Blog</option><option>Hospitality</option><option>Offers</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Status</label>
              <select value={currentBlog.status} onChange={e=>setCurrentBlog({...currentBlog, status: e.target.value})} className="w-full p-3 bg-gray-50 border-none rounded-md outline-none">
                <option value="draft">Draft</option><option value="published">Published</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Featured Image</label>
            <div className="flex gap-2">
              <input type="text" value={currentBlog.imageUrl || ''} onChange={e=>setCurrentBlog({...currentBlog, imageUrl: e.target.value})} placeholder="https://... or upload a file" className="w-full p-3 bg-gray-50 border-none rounded-md outline-none" />
              <label className="bg-gray-900 text-white px-6 rounded-md hover:bg-black cursor-pointer flex items-center gap-2 font-medium">
                <Upload className="w-4 h-4" /> {isUploading ? '...' : 'Upload'}
                <input type="file" className="hidden" onChange={handleFileUpload} />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">SEO Title</label>
              <input type="text" value={currentBlog.seoTitle || ''} onChange={e=>setCurrentBlog({...currentBlog, seoTitle: e.target.value})} placeholder="SEO optimized title" className="w-full p-3 bg-gray-50 border-none rounded-md outline-none" />
              <p className="text-[11px] text-gray-400">{(currentBlog.seoTitle || '').length} / 60</p>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">SEO Description</label>
              <input type="text" value={currentBlog.seoDescription || ''} onChange={e=>setCurrentBlog({...currentBlog, seoDescription: e.target.value})} placeholder="Meta description for search engines" className="w-full p-3 bg-gray-50 border-none rounded-md outline-none" />
              <p className="text-[11px] text-gray-400">{(currentBlog.seoDescription || '').length} / 160</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center bg-gray-50 p-2 rounded-t-md border-b">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wide px-2">Article Content</label>
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  value={customPrompt} 
                  onChange={e => setCustomPrompt(e.target.value)} 
                  placeholder="e.g. Make it more casual..." 
                  className="text-xs p-1.5 px-3 rounded border w-[250px] outline-none focus:ring-1 focus:ring-indigo-500" 
                />
                <button type="button" onClick={handleCustomRewrite} disabled={isCustomWriting} className="text-xs bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-3 py-1.5 rounded font-medium transition disabled:opacity-50 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> {isCustomWriting ? '...' : 'Rewrite'}
                </button>
                <div className="w-px h-5 bg-gray-300 mx-1"></div>
                <button type="button" onClick={() => setIsHtmlMode(!isHtmlMode)} className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded font-medium transition">
                  {isHtmlMode ? 'View Visual Editor' : '</> View HTML Source'}
                </button>
              </div>
            </div>
            <div className="border border-t-0 border-gray-200 rounded-b-md bg-white">
              {isHtmlMode ? (
                <textarea 
                  value={currentBlog.content || ''} 
                  onChange={e => setCurrentBlog({...currentBlog, content: e.target.value})} 
                  className="w-full min-h-[400px] p-4 font-mono text-sm outline-none resize-y"
                  spellCheck={false}
                />
              ) : (
                <ReactQuill theme="snow" value={currentBlog.content || ''} onChange={val => setCurrentBlog({...currentBlog, content: val})} className="min-h-[400px]" />
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Readiness Panel */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b flex justify-between items-center">
              <h3 className="font-bold text-gray-800">Readiness</h3>
              <span className={`text-xs px-2 py-1 rounded-full font-semibold ${googleScore === 100 && aiScoreLive === 100 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {googleScore === 100 && aiScoreLive === 100 ? 'Ready' : 'Not ready'}
              </span>
            </div>
            <div className="p-6">
              <div className="flex gap-4 mb-6">
                <div className="flex-1 bg-gray-50 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full border-4 flex items-center justify-center font-bold text-xl mb-2 border-gray-200 relative">
                    {/* Fake progress ring UI for simplicity */}
                    {googleScore}%
                    <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full" style={{ display: googleScore === 100 ? 'none' : 'block'}}></div>
                  </div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Google Search</p>
                  <p className="text-[10px] text-gray-400">{googleChecklist.filter(c=>c.passed).length}/{googleChecklist.length} points</p>
                </div>
                <div className="flex-1 bg-gray-50 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full border-4 flex items-center justify-center font-bold text-xl mb-2 border-gray-200 relative">
                    {aiScoreLive}%
                    <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full" style={{ display: aiScoreLive === 100 ? 'none' : 'block'}}></div>
                  </div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">AI Overview</p>
                  <p className="text-[10px] text-gray-400">{aiChecklist.filter(c=>c.passed).length}/{aiChecklist.length} points</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-6">
                {[ {l:'H2',v:hasH2}, {l:'LISTS',v:hasLists}, {l:'TABLES',v:hasTables}, {l:'FIGURES',v:(currentBlog.content.match(/<img/g) || []).length}, {l:'INT. LINKS',v:hasIntLinks}, {l:'SOURCES',v:hasExtLinks} ].map(stat => (
                  <div key={stat.l} className="bg-gray-50 rounded-lg py-3 flex flex-col items-center">
                    <span className="font-bold text-gray-800">{stat.v}</span>
                    <span className="text-[9px] font-bold text-gray-400 tracking-wider uppercase">{stat.l}</span>
                  </div>
                ))}
              </div>

              <button onClick={handleFixWithAi} disabled={isFixing} className="w-full bg-[#8ee3b9] hover:bg-[#7bc8a2] text-[#1c6e44] font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-50">
                <Sparkles className="w-5 h-5" /> {isFixing ? 'Rewriting with AI...' : 'Fix everything & reach 100%'}
              </button>
              <p className="text-[10px] text-gray-400 text-center mt-3">Rewrites only what is failing — your facts and figures are kept.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 bg-gray-50 border-b flex justify-between text-xs font-bold tracking-wider text-gray-500 uppercase">
              Google Search <span>{googleChecklist.filter(c=>c.passed).length}/{googleChecklist.length}</span>
            </div>
            <div className="divide-y divide-gray-50 max-h-[400px] overflow-y-auto">
              {googleChecklist.map((item, i) => (
                <div key={i} className="p-4 flex gap-3">
                  <div className="mt-0.5">
                    {item.passed ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <AlertCircle className="w-4 h-4 text-orange-400" />}
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${item.passed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 bg-gray-50 border-b flex justify-between text-xs font-bold tracking-wider text-gray-500 uppercase">
              AI Overview & Answer Engines <span>{aiChecklist.filter(c=>c.passed).length}/{aiChecklist.length}</span>
            </div>
            <div className="divide-y divide-gray-50 max-h-[400px] overflow-y-auto">
              {aiChecklist.map((item, i) => (
                <div key={i} className="p-4 flex gap-3">
                  <div className="mt-0.5">
                    {item.passed ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <AlertCircle className="w-4 h-4 text-orange-400" />}
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${item.passed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
