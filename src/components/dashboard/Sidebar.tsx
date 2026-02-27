import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  LayoutDashboard, 
  Globe, 
  ShieldCheck, 
  Server, 
  Zap, 
  Network, 
  Settings,
  Cloud
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const Sidebar = ({ isOpen, onClose, isHidden = false }: { isOpen: boolean; onClose: () => void; isHidden?: boolean }) => {
  const { t } = useTranslation();

  const navItems = [
    { name: t('dashboard.nav.overview', 'Overview'), href: '/dashboard', icon: LayoutDashboard, exact: true },
    { name: t('dashboard.nav.vps', 'VerterVPS'), href: '/dashboard/vps', icon: Server },
    { name: t('dashboard.nav.vpn', 'VerterVPN'), href: '/dashboard/vpn', icon: Globe },
    { name: t('dashboard.nav.auth', 'VerterAuth'), href: '/dashboard/auth', icon: ShieldCheck },
    { name: t('dashboard.nav.gateway', 'API Gateway'), href: '/dashboard/gateway', icon: Zap },
    { name: t('dashboard.nav.balancer', 'Load Balancer'), href: '/dashboard/balancer', icon: Network },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 bottom-0 z-50 w-64 bg-[#010b3a] text-white flex flex-col transition-all duration-300 lg:static lg:shrink-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          isHidden ? "lg:-ml-64" : "lg:ml-0",
          "lg:translate-x-0"
        )}
      >
        {/* Header/Logo */}
        <div className="h-16 flex items-center px-6 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2 group cursor-pointer w-full">
            <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center shrink-0">
              <Cloud className="text-white w-5 h-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white truncate">
              Verter<span className="text-brand-primary">Cloud</span>
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-4 mb-2 text-xs font-bold text-white/50 uppercase tracking-wider">
            {t('dashboard.nav.hub', 'Hub de servicios')}
          </div>
          <nav className="space-y-1 px-2">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.exact}
                onClick={() => onClose()} // Close mobile menu when clicked
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors relative overflow-hidden group",
                  isActive 
                    ? "bg-brand-primary/10 text-white" 
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                )}
              >
                {({ isActive }) => (
                  <>
                    {/* Active indicator bar */}
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-primary rounded-r-full" />
                    )}
                    <item.icon className={cn(
                      "w-5 h-5 shrink-0 transition-colors",
                      isActive ? "text-brand-primary" : "text-slate-400 group-hover:text-slate-300"
                    )} />
                    <span className="truncate">{item.name}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Footer/Settings */}
        <div className="p-4 border-t border-white/10 shrink-0">
          <NavLink
            to="/dashboard/settings"
            onClick={() => onClose()}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
              isActive 
                ? "bg-white/10 text-white" 
                : "text-slate-300 hover:bg-white/5 hover:text-white"
            )}
          >
            <Settings className="w-5 h-5 shrink-0 text-slate-400" />
            <span className="truncate">{t('dashboard.nav.settings', 'Settings')}</span>
          </NavLink>
        </div>
      </aside>
    </>
  );
};
