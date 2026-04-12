import { UserSidebar } from '../../components/UserSidebar';
import { CheckCircle, XCircle } from 'lucide-react';

// Circular progress meter component
const CircularMeter = ({ 
  value, 
  max, 
  label, 
  color 
}: { 
  value: number; 
  max: number; 
  label: string; 
  color: string;
}) => {
  const percentage = (value / max) * 100;
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <svg className="w-32 h-32 transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="64"
            cy="64"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-gray-200 dark:text-gray-700"
          />
          {/* Progress circle */}
          <circle
            cx="64"
            cy="64"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={color}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">of {max}</p>
          </div>
        </div>
      </div>
      <p className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">{label}</p>
    </div>
  );
};

export default function ResultsSummary() {
  // Latest test result data
  const latestTest = {
    projectName: 'E-commerce App',
    date: '2026-04-10',
    totalTests: 40,
    passed: 37,
    failed: 2,
    errors: 1,
    score: 92,
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      <UserSidebar />
      
      <main className="flex-1 overflow-y-auto pt-[57px] lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-2">
                Latest Test Results
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Summary of your most recent test execution
              </p>
            </div>

            {/* Project Info Card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    {latestTest.projectName}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Tested on {new Date(latestTest.date).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Overall Score</p>
                  <p className="text-3xl font-semibold text-green-600 dark:text-green-400">
                    {latestTest.score}%
                  </p>
                </div>
              </div>
              
              {/* Score Bar */}
              <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-teal-500 to-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${latestTest.score}%` }}
                />
              </div>
            </div>

            {/* Circular Meters */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-8 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-8 text-center">
                Test Breakdown
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <CircularMeter 
                  value={latestTest.passed}
                  max={latestTest.totalTests}
                  label="Tests Passed"
                  color="text-green-500 dark:text-green-400"
                />
                <CircularMeter 
                  value={latestTest.failed}
                  max={latestTest.totalTests}
                  label="Tests Failed"
                  color="text-red-500 dark:text-red-400"
                />
                <CircularMeter 
                  value={latestTest.errors}
                  max={latestTest.totalTests}
                  label="Errors Found"
                  color="text-orange-500 dark:text-orange-400"
                />
              </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Tests</p>
                    <p className="text-3xl font-semibold text-gray-900 dark:text-white">
                      {latestTest.totalTests}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Success Rate</p>
                    <p className="text-3xl font-semibold text-green-600 dark:text-green-400">
                      {Math.round((latestTest.passed / latestTest.totalTests) * 100)}%
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Issues Found</p>
                    <p className="text-3xl font-semibold text-red-600 dark:text-red-400">
                      {latestTest.failed + latestTest.errors}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                    <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}