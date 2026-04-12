import { useState } from 'react';
import { AdminSidebar } from '../../components/AdminSidebar';
import { Search, Ban, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const initialUsers = [
  { id: 1, username: 'john_doe', email: 'john.doe@example.com', lastTest: '2026-04-10', filesTested: 24, status: 'active' },
  { id: 2, username: 'jane_smith', email: 'jane.smith@example.com', lastTest: '2026-04-09', filesTested: 38, status: 'active' },
  { id: 3, username: 'bob_wilson', email: 'bob.wilson@example.com', lastTest: '2026-04-08', filesTested: 15, status: 'active' },
  { id: 4, username: 'alice_brown', email: 'alice.brown@example.com', lastTest: '2026-04-07', filesTested: 42, status: 'active' },
  { id: 5, username: 'charlie_davis', email: 'charlie.davis@example.com', lastTest: '2026-04-06', filesTested: 19, status: 'active' },
  { id: 6, username: 'emma_johnson', email: 'emma.johnson@example.com', lastTest: '2026-04-05', filesTested: 31, status: 'active' },
];

export default function UsersManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState(initialUsers);

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleUserStatus = (userId: number) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId
          ? { ...user, status: user.status === 'active' ? 'disabled' : 'active' }
          : user
      )
    );
    const user = users.find(u => u.id === userId);
    if (user) {
      toast.success(
        user.status === 'active' 
          ? `User ${user.username} has been disabled` 
          : `User ${user.username} has been enabled`
      );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      <AdminSidebar />
      
      <main className="flex-1 overflow-y-auto pt-[57px] lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-2">
              User Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage user accounts and access controls
            </p>
          </div>

          {/* Search */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full table-auto min-w-max">
                <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Username
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Last Test
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider w-28">
                      Files Tested
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider w-28">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider w-40">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {user.username}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                        {new Date(user.lastTest).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white text-center">
                        {user.filesTested}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                          user.status === 'active'
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                            : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleUserStatus(user.id)}
                          className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                            user.status === 'active'
                              ? 'text-white bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700'
                              : 'text-white bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700'
                          }`}
                        >
                          {user.status === 'active' ? (
                            <>
                              <Ban className="w-4 h-4" />
                              Disable
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-4 h-4" />
                              Enable
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="p-12 text-center">
                <p className="text-gray-500 dark:text-gray-400">No users found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}