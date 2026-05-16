"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  UtensilsCrossed, 
  Users, 
  LogOut, 
  Bell,
  Menu as MenuIcon,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Reservations', href: '/dashboard/reservations', icon: CalendarCheck },
    { name: 'Menu Items', href: '/dashboard/menu', icon: UtensilsCrossed },
    { name: 'Staff', href: '/dashboard/staff', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-foreground flex">
      {/* Sidebar */}
      <aside className={cn(
        "bg-secondary border-r border-white/5 transition-all duration-300 flex flex-col z-50",
        isSidebarOpen ? "w-64" : "w-20"
      )}>
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && (
            <Link href="/dashboard" className="flex flex-col">
              <span className="text-xl font-serif font-bold text-primary">Heritage</span>
              <span className="text-[8px] tracking-widest uppercase -mt-1">Admin</span>
            </Link>
          )}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-muted rounded-sm">
            {isSidebarOpen ? <X size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>

        <nav className="flex-1 mt-6 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center space-x-4 px-4 py-3 rounded-sm transition-all group",
                  isActive ? "bg-primary text-white" : "hover:bg-muted text-muted-foreground"
                )}
              >
                <item.icon size={20} className={cn(isActive ? "text-white" : "text-primary")} />
                {isSidebarOpen && <span className="font-medium text-sm">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={() => {
              // Handle logout logic
              router.push('/login');
            }}
            className="flex items-center space-x-4 px-4 py-3 rounded-sm text-red-400 hover:bg-red-400/10 w-full transition-all"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="font-medium text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-secondary border-b border-white/5 flex items-center justify-between px-8 shrink-0">
          <h2 className="text-lg font-serif">Welcome back, Admin</h2>
          <div className="flex items-center space-x-6">
            <button className="relative p-2 text-muted-foreground hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-white shadow-lg">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}
