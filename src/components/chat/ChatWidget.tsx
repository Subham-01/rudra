'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Trash2, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { createParser } from 'eventsource-parser';
import { motion, AnimatePresence } from 'framer-motion';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const SUGGESTED_QUESTIONS = [
  "Book a Room",
  "Banquet Hall",
  "Restaurant",
  "Room Price",
  "Contact",
  "Location"
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Load chat history from session storage
    const saved = sessionStorage.getItem('chat_history');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {}
    } else {
      // Add welcome message if new session
      setMessages([{ role: 'assistant', content: 'Hello! I am the Hotel Rudra Regency assistant. How can I help you today?' }]);
      setHasUnread(true);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem('chat_history', JSON.stringify(messages));
    }
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    // Auto resize
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  const clearChat = () => {
    const initial = [{ role: 'assistant', content: 'Chat cleared. How can I help you today?' } as Message];
    setMessages(initial);
    sessionStorage.setItem('chat_history', JSON.stringify(initial));
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const newMessages = [...messages, { role: 'user', content: text } as Message];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const body = response.body;
      if (!body) throw new Error('No body');

      const reader = body.getReader();
      const decoder = new TextDecoder();
      
      let assistantMessage = '';
      setMessages([...newMessages, { role: 'assistant', content: '' }]);

      const parser = createParser({
        onEvent(event: any) {
          if (event.data === '[DONE]') return;
          try {
            const data = JSON.parse(event.data);
            const content = data.choices?.[0]?.delta?.content || '';
            assistantMessage += content;
            setMessages(prev => {
              const updated = [...prev];
              updated[updated.length - 1] = { role: 'assistant', content: assistantMessage };
              return updated;
            });
          } catch (e) {
            console.error('Error parsing SSE', e);
          }
        }
      });

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        parser.feed(chunk);
      }
      
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'I apologize, but I am unable to process your request at the moment. For immediate assistance, please connect with our reception team at [+91 8651600015](tel:+918651600015) or [+91 8581828182](tel:+918581828182).' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-gray-900 w-[380px] sm:w-[420px] max-w-[calc(100vw-32px)] h-[600px] max-h-[calc(100vh-100px)] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col mb-4 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-600 to-amber-500 p-4 text-white flex justify-between items-center shrink-0 shadow-sm">
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Rudra Assistant
                </h3>
                <p className="text-amber-100 text-xs">Always here to help you</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={clearChat} className="p-2 hover:bg-white/20 rounded-full transition-colors" title="Clear Chat">
                  <Trash2 className="w-4 h-4" />
                </button>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/20 rounded-full transition-colors" title="Close (Esc)">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-gray-900/50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`group relative max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-amber-600 text-white rounded-tr-sm' 
                      : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-sm'
                  }`}>
                    {msg.role === 'assistant' && msg.content && (
                      <button 
                        onClick={() => copyToClipboard(msg.content, idx)}
                        className="absolute -right-10 top-2 p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Copy response"
                      >
                        {copiedIndex === idx ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    )}
                    <div className={`prose prose-sm max-w-none ${msg.role === 'user' ? 'prose-invert' : 'dark:prose-invert'}
                        prose-p:leading-relaxed prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-3 prose-pre:rounded-lg
                        prose-a:bg-blue-50 dark:prose-a:bg-blue-900/30 prose-a:text-blue-700 dark:prose-a:text-blue-300 prose-a:px-1.5 prose-a:py-0.5 prose-a:rounded prose-a:font-semibold prose-a:no-underline hover:prose-a:bg-blue-100 dark:hover:prose-a:bg-blue-900/50 prose-a:transition-colors`}>
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                          a: ({node, ...props}) => (
                            <a {...props} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md font-bold underline hover:bg-blue-200 transition-colors inline-block my-1" target="_blank" rel="noopener noreferrer" />
                          )
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex gap-1 items-center h-10">
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length <= 1 && !isLoading && (
              <div className="p-3 bg-gray-50/80 dark:bg-gray-900/80 border-t border-gray-100 dark:border-gray-800 flex gap-2 overflow-x-auto whitespace-nowrap hide-scrollbar">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-gray-600 dark:text-gray-300 hover:border-amber-500 hover:text-amber-600 transition-colors shrink-0"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="p-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
              <div className="relative flex items-end gap-2 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus-within:border-amber-500 focus-within:ring-1 focus-within:ring-amber-500 transition-all p-1">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={handleInput}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  className="w-full max-h-[120px] bg-transparent border-none focus:ring-0 resize-none py-2 px-3 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 m-0"
                  rows={1}
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || isLoading}
                  className="p-2.5 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 disabled:text-gray-500 dark:disabled:bg-gray-700 text-white rounded-lg transition-colors shrink-0 mb-0.5 mr-0.5"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="text-center mt-2">
                <span className="text-[10px] text-gray-400">Powered by Rudra AI Assistant • Press Enter to send</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-tr from-amber-600 to-amber-500 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center relative focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageSquare className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Unread Badge */}
        {!isOpen && hasUnread && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white dark:border-gray-900 rounded-full animate-pulse" />
        )}
      </button>
    </div>
  );
}
