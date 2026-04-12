import { useState } from 'react';
import { AdminSidebar } from '../../components/AdminSidebar';
import { Shield, Database, Server, LogOut } from 'lucide-react';
import { ThemeToggle } from '../../components/ThemeToggle';
import { toast } from 'sonner';
import { useAdmin } from '../../contexts/AdminContext';
import { useNavigate } from 'react-router';

export default function AdminSettings() {
  const { adminData, updateAdminData } = useAdmin();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState(adminData.fullName);
  const [email, setEmail] = useState(adminData.email);
  const [maxConcurrentTests, setMaxConcurrentTests] = useState(50);
  const [testTimeout, setTestTimeout] = useState(30);
  const [maxFileSize, setMaxFileSize] = useState(100);

  const handleSaveChanges = () => {
    updateAdminData({ fullName, email });
    toast.success('Settings saved successfully!');
  };

  const handleLogout = () => {
    toast.success('Logged out successfully!');
    navigate('/');
  };

  // Get initials from full name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      <AdminSidebar />
      
      <main className="flex-1 overflow-y-auto pt-[57px] lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-2">
                Admin Settings
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage system settings and administrative preferences
              </p>
            </div>

            <div className="space-y-6">
              {/* Admin Profile */}
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Admin Profile
                  </h2>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-6 mb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white text-2xl font-semibold">
                      {getInitials(fullName)}
                    </div>
                    <button className="px-4 py-2 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:border-teal-500 dark:hover:border-teal-500 transition-all">
                      Change Avatar
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Role
                      </label>
                      <input
                        type="text"
                        defaultValue="System Administrator"
                        disabled
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* System Statistics */}
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    System Statistics
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-3xl font-semibold text-gray-900 dark:text-white mb-1">1,247</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-3xl font-semibold text-gray-900 dark:text-white mb-1">3,429</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Files Tested</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-3xl font-semibold text-gray-900 dark:text-white mb-1">99.8%</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Uptime</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Server Configuration */}
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <Server className="w-5 h-5" />
                    Server Configuration
                  </h2>
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Max Concurrent Tests
                      </label>
                      <input
                        type="number"
                        value={maxConcurrentTests}
                        onChange={(e) => setMaxConcurrentTests(Number(e.target.value))}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Test Timeout (minutes)
                      </label>
                      <input
                        type="number"
                        value={testTimeout}
                        onChange={(e) => setTestTimeout(Number(e.target.value))}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Max File Size (MB)
                    </label>
                    <input
                      type="number"
                      value={maxFileSize}
                      onChange={(e) => setMaxFileSize(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Appearance */}
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Appearance</h2>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Theme</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Switch between light and dark mode</p>
                    </div>
                    <ThemeToggle />
                  </div>
                </div>
              </div>

              {/* Account Actions & Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleLogout}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border-2 border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 rounded-lg font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  Log Out
                </button>
                <button 
                  onClick={handleSaveChanges}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white rounded-lg font-medium transition-all shadow-lg"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}