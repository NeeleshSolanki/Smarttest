import { useState } from 'react';
import { UserSidebar } from '../../components/UserSidebar';
import { CheckCircle, XCircle, Search, Calendar } from 'lucide-react';

const reports = [
  { id: 1, date: '2026-04-10', project: 'E-commerce App', result: 'passed', tests: 37, errors: 3, score: 92 },
  { id: 2, date: '2026-04-09', project: 'Mobile Dashboard', result: 'failed', tests: 45, errors: 12, score: 67 },
  { id: 3, date: '2026-04-08', project: 'API Service', result: 'passed', tests: 28, errors: 4, score: 88 },
  { id: 4, date: '2026-04-07', project: 'React Components', result: 'passed', tests: 52, errors: 3, score: 92 },
  { id: 5, date: '2026-04-06', project: 'Backend Service', result: 'passed', tests: 31, errors: 2, score: 95 },
  { id: 6, date: '2026-04-05', project: 'Admin Panel', result: 'failed', tests: 40, errors: 9, score: 73 },
  { id: 7, date: '2026-04-04', project: 'User Authentication', result: 'passed', tests: 24, errors: 1, score: 96 },
  { id: 8, date: '2026-04-03', project: 'Payment Integration', result: 'passed', tests: 19, errors: 0, score: 100 },
];

export default function Reports() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'passed' | 'failed'>('all');

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = filterDate ? report.date === filterDate : true;
    const matchesStatus = filterStatus === 'all' ? true : report.result === filterStatus;
    return matchesSearch && matchesDate && matchesStatus;
  });

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      <UserSidebar />
      
      <main className="flex-1 overflow-y-auto pt-[57px] lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-2">
              Test Reports
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              History of all previous test runs
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    filterStatus === 'all'
                      ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-lg'
                      : 'border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-teal-500 dark:hover:border-teal-500'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterStatus('passed')}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    filterStatus === 'passed'
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-green-500 dark:hover:border-green-500'
                  }`}
                >
                  Passed
                </button>
                <button
                  onClick={() => setFilterStatus('failed')}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    filterStatus === 'failed'
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-red-500 dark:hover:border-red-500'
                  }`}
                >
                  Failed
                </button>
              </div>
            </div>
          </div>

          {/* Reports Table */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
            {filteredReports.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-gray-500 dark:text-gray-400">No reports found matching your filters.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Project Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Result
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Tests
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Errors
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Score
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {filteredReports.map((report) => (
                      <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                          {new Date(report.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{report.project}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                            report.result === 'passed'
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                              : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                          }`}>
                            {report.result === 'passed' ? (
                              <CheckCircle className="w-3 h-3" />
                            ) : (
                              <XCircle className="w-3 h-3" />
                            )}
                            {report.result}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {report.tests}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {report.errors}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-teal-500 to-blue-500"
                                style={{ width: `${report.score}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {report.score}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}