import { AdminSidebar } from '../../components/AdminSidebar';
import { ArrowLeft, User, Mail, Calendar, FileText, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router';

const userInfo = {
  id: 1,
  username: 'john_doe',
  email: 'john.doe@example.com',
  usageLimit: 100,
  usageCount: 48,
};

const activityTimeline = [
  { id: 1, type: 'upload', project: 'E-commerce App', date: '2026-04-10 14:32', details: 'Uploaded project files (2.3 MB)' },
  { id: 2, type: 'test', project: 'E-commerce App', date: '2026-04-10 14:35', details: 'Ran tests: Python, Jest, ESLint', result: 'passed' },
  { id: 3, type: 'upload', project: 'Mobile Dashboard', date: '2026-04-09 09:15', details: 'Uploaded project files (1.8 MB)' },
  { id: 4, type: 'test', project: 'Mobile Dashboard', date: '2026-04-09 09:18', details: 'Ran tests: TypeScript, React', result: 'failed' },
  { id: 5, type: 'upload', project: 'API Service', date: '2026-04-08 16:42', details: 'Uploaded project files (3.1 MB)' },
  { id: 6, type: 'test', project: 'API Service', date: '2026-04-08 16:45', details: 'Ran tests: Python, Coverage', result: 'passed' },
];

const toolsUsage = [
  { tool: 'Python Linting', count: 12, color: 'blue' },
  { tool: 'Jest Unit Tests', count: 18, color: 'purple' },
  { tool: 'ESLint', count: 15, color: 'yellow' },
  { tool: 'TypeScript Check', count: 8, color: 'teal' },
  { tool: 'Code Coverage', count: 5, color: 'green' },
];

export default function UserDetail() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      <AdminSidebar />
      
      <main className="flex-1 overflow-y-auto pt-[57px] lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="mb-8">
            <Link
              to="/admin/users"
              className="inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 hover:underline mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to User Management
            </Link>
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-2">
              Activity Detail: {userInfo.username}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Complete user history and usage statistics
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* User Information Card */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-white text-3xl font-semibold">
                    JD
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Username</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{userInfo.username}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{userInfo.email}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Usage Limit</p>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">Tests</span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {userInfo.usageCount} / {userInfo.usageLimit}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-teal-500 to-blue-500 rounded-full"
                        style={{ width: `${(userInfo.usageCount / userInfo.usageLimit) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Timeline */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Activity Timeline</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    {activityTimeline.map((activity, index) => (
                      <div key={activity.id} className="relative pl-8">
                        {/* Timeline line */}
                        {index !== activityTimeline.length - 1 && (
                          <div className="absolute left-2 top-8 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
                        )}
                        
                        {/* Timeline dot */}
                        <div className={`absolute left-0 top-1 w-4 h-4 rounded-full ${
                          activity.type === 'upload'
                            ? 'bg-blue-500'
                            : activity.result === 'passed'
                            ? 'bg-green-500'
                            : 'bg-red-500'
                        }`} />

                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{activity.project}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{activity.details}</p>
                            </div>
                            {activity.type === 'test' && (
                              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                                activity.result === 'passed'
                                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                  : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                              }`}>
                                {activity.result === 'passed' ? (
                                  <CheckCircle className="w-3 h-3" />
                                ) : (
                                  <XCircle className="w-3 h-3" />
                                )}
                                {activity.result}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                            <Calendar className="w-3 h-3" />
                            {activity.date}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tools & Extensions Used */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Tools & Extensions Used
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {toolsUsage.map((tool, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-teal-500 dark:hover:border-teal-500 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-gray-900 dark:text-white">{tool.tool}</p>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full bg-${tool.color}-100 dark:bg-${tool.color}-900/30 text-${tool.color}-700 dark:text-${tool.color}-400`}>
                        {tool.count}x
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Used {tool.count} {tool.count === 1 ? 'time' : 'times'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}