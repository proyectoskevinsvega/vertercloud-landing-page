import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/dashboard/Sidebar';
import { Menu, User, Bell } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarHidden, setSidebarHidden] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="flex h-screen bg-[#f3f5f8] overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} isHidden={sidebarHidden} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 shrink-0 relative z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-500 hover:text-brand-primary"
            >
              <Menu className="w-6 h-6" />
            </button>
            <button
              onClick={() => setSidebarHidden(!sidebarHidden)}
              className="hidden lg:block p-2 text-slate-500 hover:text-brand-primary"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold text-slate-800 hidden md:block">
              {t('dashboard.header.title', 'Panel de Control VerterCloud')}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-brand-primary rounded-full hover:bg-slate-100 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
            </button>
            
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-sm font-medium text-slate-800">Admin User</span>
                <span className="text-xs text-slate-500">ID: vx-8921-bc</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold cursor-pointer border border-brand-primary/20">
                <User className="w-5 h-5" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-[#f3f5f8] p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
