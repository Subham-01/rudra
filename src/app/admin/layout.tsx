'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, FileText, Image as ImageIcon, MessageSquare, Settings, User, LogOut, PanelBottom, Bot, HelpCircle } from 'lucide-react';

const sidebarLinks = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Pages', href: '/admin/pages', icon: FileText },
  { name: 'Footer', href: '/admin/pages/footer', icon: PanelBottom },
  { name: 'Blogs', href: '/admin/blogs', icon: FileText },
  { name: 'Contacts', href: '/admin/contacts', icon: MessageSquare },
  { name: 'Chat Assistant', href: '/admin/chat-settings', icon: Bot },
  { name: 'FAQs', href: '/admin/faqs', icon: HelpCircle },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
  { name: 'Profile', href: '/admin/profile', icon: User },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  // Do not show sidebar on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b dark:border-gray-700">
          <span className="text-xl font-bold text-gray-800 dark:text-white">Admin Panel</span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const currentPath = pathname || '';
            const isExact = currentPath === link.href;
            const isPrefix = currentPath.startsWith(link.href + '/');
            const hasMoreSpecificMatch = sidebarLinks.some(other => 
              other.href !== link.href && 
              other.href.length > link.href.length && 
              (currentPath === other.href || currentPath.startsWith(other.href + '/'))
            );
            const isActive = isExact || (link.href !== '/admin' && isPrefix && !hasMoreSpecificMatch);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t dark:border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 w-full text-left text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors dark:text-gray-300 dark:hover:bg-red-900/50 dark:hover:text-red-400"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <header className="h-16 bg-white dark:bg-gray-800 border-b dark:border-gray-700 flex items-center px-8 shadow-sm">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white capitalize">
            {(pathname || '').split('/').pop() || 'Dashboard'}
          </h1>
        </header>
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
