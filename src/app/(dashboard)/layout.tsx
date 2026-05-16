"use client";

import { useState } from 'react';
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
  X,
  User
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

  const handleLogout = async () => {
    // In a real app, clear the cookie here or call logout API
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-[#f5ede0] text-[#1e2215] flex">
      {/* Sidebar */}
      <aside className={cn(
        "bg-white border-r border-[#6b7c4a]/10 transition-all duration-300 flex flex-col z-50 shadow-sm",
        isSidebarOpen ? "w-64" : "w-20"
      )}>
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && (
            <Link href="/" className="flex flex-col leading-tight">
              <span className="text-xl font-serif font-bold text-[#4a5e32]">Heritage</span>
              <span className="text-[8px] tracking-[4px] uppercase -mt-0.5 text-[#6b7c4a]">Admin</span>
            </Link>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="p-2 hover:bg-[#f5ede0] rounded-lg text-[#6b7c4a] transition-colors"
          >
            {isSidebarOpen ? <X size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>

        <nav className="flex-1 mt-6 px-4 space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                  isActive 
                    ? "bg-[#6b7c4a] text-white shadow-md shadow-[#6b7c4a]/20" 
                    : "text-[#7a8060] hover:bg-[#f5ede0] hover:text-[#4a5e32]"
                )}
              >
                <item.icon size={18} className={cn(isActive ? "text-white" : "text-[#6b7c4a]")} />
                {isSidebarOpen && <span className="font-medium text-sm">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#6b7c4a]/10">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 rounded-xl text-[#c05050] hover:bg-red-50 w-full transition-all duration-200"
          >
            <LogOut size={18} />
            {isSidebarOpen && <span className="font-medium text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-[#6b7c4a]/10 flex items-center justify-between px-8 shrink-0 shadow-sm relative z-40">
          <h2 className="text-lg font-serif text-[#4a5e32]">
            {navItems.find(item => item.href === pathname)?.name || 'Dashboard'}
          </h2>
          <div className="flex items-center space-x-6">
            <button className="relative p-2 text-[#7a8060] hover:text-[#4a5e32] transition-colors bg-[#f5ede0]/50 rounded-full">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#c05050] rounded-full border-2 border-white" />
            </button>
            <div className="flex items-center space-x-3 pl-4 border-l border-[#6b7c4a]/10">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-[#1e2215]">Admin User</p>
                <p className="text-[10px] text-[#7a8060] uppercase tracking-widest font-bold">Manager</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6b7c4a] to-[#4a5e32] flex items-center justify-center shadow-lg">
                <User size={20} className="text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
