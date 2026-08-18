'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, Image as ImageIcon, MessageSquare } from 'lucide-react';

export default function AdminDashboard() {
  // In a real app, you would fetch these stats from an API
  const stats = [
    { title: 'Total Blogs', value: '12', icon: FileText, color: 'text-blue-500' },
    { title: 'Total Images', value: '48', icon: ImageIcon, color: 'text-purple-500' },
    { title: 'New Inquiries', value: '3', icon: MessageSquare, color: 'text-green-500' },
    { title: 'Admin Users', value: '1', icon: Users, color: 'text-orange-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Welcome to Admin Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Select an option from the sidebar to manage your website content. You can manage blogs, upload images, update page text, and view contact form submissions.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
