import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { ROUTES } from '@/shared/constants';
import { useAuthStore } from '@/features/auth/store/authStore';
import { LayoutDashboard, DollarSign, Bell, User } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const { user } = useAuthStore();

  const navItems = [
    { path: ROUTES.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { path: ROUTES.EARNINGS, label: 'Earnings', icon: DollarSign },
    { path: '#', label: 'Notifications', icon: Bell },
    { path: ROUTES.PROFILE, label: 'Profile', icon: User },
  ];

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main Content */}
      <main className="flex-1 pb-20 overflow-y-auto">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
        <div className="flex justify-around items-center h-20 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  active
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className={`h-6 w-6 mb-1 ${active ? 'text-primary' : ''}`} />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
