'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

type Inquiry = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: 'new' | 'read' | 'resolved';
  createdAt: string;
};

export default function ContactsAdminPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/contact');
      if (res.ok) {
        const data = await res.json();
        setInquiries(data);
      }
    } catch (error) {
      console.error('Failed to fetch inquiries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setInquiries(inquiries.map(inq => inq._id === id ? { ...inq, status: newStatus as any } : inq));
      }
    } catch (error) {
      console.error('Failed to update inquiry:', error);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-20">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Contact Inquiries & Leads</h2>
          <p className="text-muted-foreground">Manage messages sent from the public website contact forms.</p>
        </div>
        <div className="text-sm text-gray-500">
          Total Leads: {inquiries.length}
        </div>
      </div>

      <div className="grid gap-4">
        {isLoading ? (
          <div className="text-gray-500">Loading inquiries...</div>
        ) : inquiries.length === 0 ? (
          <Card>
            <CardContent className="py-10 text-center text-gray-500">
              No contact inquiries found.
            </CardContent>
          </Card>
        ) : (
          inquiries.map((inquiry) => (
            <Card key={inquiry._id} className={`border-l-4 ${
              inquiry.status === 'new' ? 'border-l-indigo-500 bg-indigo-50/10' :
              inquiry.status === 'resolved' ? 'border-l-green-500 bg-gray-50' : 
              'border-l-gray-300'
            }`}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{inquiry.name}</CardTitle>
                    <CardDescription className="flex gap-4 mt-1">
                      <span><a href={`mailto:${inquiry.email}`} className="text-indigo-600 hover:underline">{inquiry.email}</a></span>
                      {inquiry.phone && <span><a href={`tel:${inquiry.phone}`} className="text-indigo-600 hover:underline">{inquiry.phone}</a></span>}
                      <span>• {new Date(inquiry.createdAt).toLocaleString()}</span>
                    </CardDescription>
                  </div>
                  <select 
                    value={inquiry.status}
                    onChange={(e) => updateStatus(inquiry._id, e.target.value)}
                    className={`text-xs font-semibold rounded-full px-3 py-1 border outline-none ${
                      inquiry.status === 'new' ? 'bg-indigo-100 text-indigo-700 border-indigo-200' :
                      inquiry.status === 'resolved' ? 'bg-green-100 text-green-700 border-green-200' :
                      'bg-gray-100 text-gray-700 border-gray-200'
                    }`}
                  >
                    <option value="new">NEW</option>
                    <option value="read">READ</option>
                    <option value="resolved">RESOLVED</option>
                  </select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-white p-4 rounded-md border border-gray-100 text-sm text-gray-800 whitespace-pre-wrap">
                  {inquiry.message}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
