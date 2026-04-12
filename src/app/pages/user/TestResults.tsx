import { UserSidebar } from '../../components/UserSidebar';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const overallData = [
  { name: 'Passed', value: 34, color: '#10b981' },
  { name: 'Failed', value: 3, color: '#ef4444' },
];

const categoryResults = [
  {
    category: 'Python Linting',
    passed: 12,
    failed: 0,
    errors: [],
  },
  {
    category: 'Jest Unit Tests',
    passed: 18,
    failed: 2,
    errors: ['Expected "foo" to be "bar" in test/app.test.js:12', 'Timeout exceeded in test/utils.test.js:45'],
  },
  {
    category: 'ESLint',
    passed: 4,
    failed: 1,
    errors: ['Unexpected console statement in src/utils.js:45'],
  },
  {
    category: 'TypeScript Check',
    passed: 0,
    failed: 0,
    errors: [],
  },
];

export default function TestResults() {
  const totalTests = 37;
  const passedTests = 34;
  const passPercentage = Math.round((passedTests / totalTests) * 100);
  
  const getGrade = (percentage: number) => {
    if (percentage >= 95) return 'A+';
    if (percentage >= 90) return 'A';
    if (percentage >= 85) return 'B+';
    if (percentage >= 80) return 'B';
    if (percentage >= 75) return 'C+';
    if (percentage >= 70) return 'C';
    return 'D';
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      <UserSidebar />
      
      <main className="flex-1 overflow-y-auto pt-[57px] lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-2">
                Final Test Result for: E-commerce App
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Completed on April 10, 2026 at 2:45 PM
              </p>
            </div>

            {/* Overall Score */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-8 mb-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="flex flex-col items-center justify-center">
                  <div className="relative w-48 h-48 mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={overallData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {overallData.map((entry) => (
                            <Cell key={`cell-${entry.name}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-4xl font-bold text-gray-900 dark:text-white">{passPercentage}%</div>
                      <div className="text-2xl font-semibold text-teal-600 dark:text-teal-400">{getGrade(passPercentage)}</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                    {passedTests} out of {totalTests} tests passed
                  </p>
                </div>

                <div className="flex flex-col justify-center space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Tests Passed</p>
                      <p className="text-2xl font-semibold text-green-600 dark:text-green-400">{passedTests}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Tests Failed</p>
                      <p className="text-2xl font-semibold text-red-600 dark:text-red-400">{totalTests - passedTests}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
              <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Detailed Breakdown</h2>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {categoryResults.map((category, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{category.category}</h3>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="text-sm font-medium text-green-600 dark:text-green-400">
                              {category.passed} passed
                            </span>
                          </div>
                          {category.failed > 0 && (
                            <div className="flex items-center gap-2">
                              <XCircle className="w-5 h-5 text-red-500" />
                              <span className="text-sm font-medium text-red-600 dark:text-red-400">
                                {category.failed} failed
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {category.errors.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {category.errors.map((error, errorIndex) => (
                            <div
                              key={errorIndex}
                              className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500"
                            >
                              <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                              <p className="text-sm text-red-900 dark:text-red-100">{error}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="mt-4">
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-500 to-teal-500"
                            style={{ width: `${(category.passed / (category.passed + category.failed || 1)) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}