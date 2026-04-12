import { Link, useLocation } from 'react-router';
import { LayoutDashboard, Upload, FileText, Settings, TestTube2, Activity, Menu, X } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { useState } from 'react';

const mainMenuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/user' },
  { icon: Upload, label: 'Upload Project', path: '/user/upload' },
  { icon: Activity, label: 'Latest Results', path: '/user/results-summary' },
  { icon: FileText, label: 'Reports', path: '/user/reports' },
];

const bottomMenuItem = { icon: Settings, label: 'Settings', path: '/user/settings' };

export function UserSidebar() {
  const location = useLocation();
  const { userData } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Get initials from full name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TestTube2 className="w-6 h-6 text-teal-500" />
            <span className="text-lg font-semibold text-gray-900 dark:text-white">SmartTest</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 top-[57px]"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static top-[57px] lg:top-0 left-0 z-50
        w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 
        h-[calc(100vh-57px)] lg:h-screen flex flex-col
        transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo - Desktop Only */}
        <div className="hidden lg:block p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <TestTube2 className="w-8 h-8 text-teal-500" />
            <span className="text-xl font-semibold text-gray-900 dark:text-white">SmartTest</span>
          </div>
        </div>

        {/* Profile */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-white font-semibold">
              {getInitials(userData.fullName)}
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">{userData.fullName}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">User</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 flex flex-col overflow-y-auto">
          <ul className="space-y-2 flex-1">
            {mainMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={closeMobileMenu}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Settings at bottom */}
          <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-800">
            <Link
              to={bottomMenuItem.path}
              onClick={closeMobileMenu}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === bottomMenuItem.path
                  ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <bottomMenuItem.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{bottomMenuItem.label}</span>
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
}