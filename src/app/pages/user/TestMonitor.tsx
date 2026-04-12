import { useState, useEffect } from 'react';
import { UserSidebar } from '../../components/UserSidebar';
import { AlertCircle, CheckCircle, Loader2, XCircle, PlayCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';

const testSteps = [
  { id: 1, name: 'Python Linting', status: 'completed', duration: '2.3s' },
  { id: 2, name: 'Jest Unit Tests', status: 'completed', duration: '5.1s' },
  { id: 3, name: 'ESLint Check', status: 'running', duration: '-' },
  { id: 4, name: 'TypeScript Check', status: 'pending', duration: '-' },
];

const errors = [
  { id: 1, severity: 'error', tool: 'ESLint', message: 'Unexpected console statement', file: 'src/utils.js:45', time: '2s ago' },
  { id: 2, severity: 'warning', tool: 'Python Lint', message: 'Line too long (87 > 80 characters)', file: 'main.py:23', time: '8s ago' },
  { id: 3, severity: 'error', tool: 'Jest', message: 'Expected "foo" to be "bar"', file: 'test/app.test.js:12', time: '15s ago' },
];

export default function TestMonitor() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showErrorCode, setShowErrorCode] = useState(false);
  const [testsPassed, setTestsPassed] = useState(34);
  const [testsFailed, setTestsFailed] = useState(3);
  
  // Get testing preferences from navigation state
  const { liveErrorReporting = true, pauseOnError = false } = location.state || {};

  useEffect(() => {
    // Only show error modal if Pause on Error is enabled
    if (pauseOnError) {
      const timer = setTimeout(() => {
        setShowErrorModal(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [pauseOnError]);

  const handleContinue = () => {
    setShowErrorModal(false);
    setShowErrorCode(false);
    // Simulate completion
    setTimeout(() => {
      navigate('/user/results/demo-project-1');
    }, 2000);
  };

  const handleSkip = () => {
    setShowErrorModal(false);
    setShowErrorCode(false);
    // Simulate completion
    setTimeout(() => {
      navigate('/user/results/demo-project-1');
    }, 2000);
  };

  const handleViewErrorCode = () => {
    setShowErrorModal(false);
    setShowErrorCode(true);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      <UserSidebar />
      
      <main className="flex-1 overflow-y-auto pt-[57px] lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-2">
              Test Run Monitor
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Real-time testing progress and error detection
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Panel - Process Status */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
              <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Testing Progress</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {testSteps.map((step) => (
                    <div key={step.id} className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex-shrink-0">
                        {step.status === 'completed' && (
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        )}
                        {step.status === 'running' && (
                          <Loader2 className="w-6 h-6 text-teal-500 animate-spin" />
                        )}
                        {step.status === 'pending' && (
                          <div className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">{step.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {step.status === 'completed' ? `Completed in ${step.duration}` : 
                           step.status === 'running' ? 'Running...' : 'Waiting...'}
                        </p>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{step.duration}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Panel - Errors and Stats */}
            <div className="space-y-6">
              {/* Error Feed */}
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    Live Error Feed
                  </h2>
                </div>
                <div className="p-6">
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {errors.map((error) => (
                      <div
                        key={error.id}
                        className={`p-3 rounded-lg border-l-4 ${
                          error.severity === 'error'
                            ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                            : 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-1">
                          <span className={`text-xs font-semibold uppercase ${
                            error.severity === 'error' ? 'text-red-700 dark:text-red-400' : 'text-yellow-700 dark:text-yellow-400'
                          }`}>
                            {error.severity}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{error.time}</span>
                        </div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">{error.message}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {error.tool} • {error.file}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Test Cases Counter */}
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Test Results</h2>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Passed</span>
                      <span className="text-sm font-semibold text-green-600 dark:text-green-400">{testsPassed}</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full transition-all duration-500"
                        style={{ width: `${(testsPassed / (testsPassed + testsFailed)) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Failed</span>
                      <span className="text-sm font-semibold text-red-600 dark:text-red-400">{testsFailed}</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-red-500 rounded-full transition-all duration-500"
                        style={{ width: `${(testsFailed / (testsPassed + testsFailed)) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Total</span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {testsPassed + testsFailed} tests
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Error Modal (Pause on Error) */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full border border-gray-200 dark:border-gray-800">
            <div className="p-6">
              <div className="flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full mx-auto mb-4">
                <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-2">
                ERROR DETECTED
              </h3>
              
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 mb-6">
                <p className="text-sm font-medium text-red-900 dark:text-red-100 mb-1">
                  Unexpected console statement
                </p>
                <p className="text-xs text-red-700 dark:text-red-300">
                  ESLint • src/utils.js:45
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleContinue}
                  className="w-full py-3 px-4 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white rounded-lg font-medium transition-all"
                >
                  <PlayCircle className="w-4 h-4 inline mr-2" />
                  Continue Testing
                </button>
                <button
                  onClick={handleViewErrorCode}
                  className="w-full py-3 px-4 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:border-gray-300 dark:hover:border-gray-600 transition-all"
                >
                  View Error Code
                </button>
                <button
                  onClick={handleSkip}
                  className="w-full py-3 px-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all"
                >
                  Fix Later and Skip
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Code Modal */}
      {showErrorCode && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full border border-gray-200 dark:border-gray-800">
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full mx-auto mb-4">
                <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white text-center mb-2">
                ERROR DETECTED
              </h3>

              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 mb-8">
                <p className="text-sm font-medium text-red-900 dark:text-red-100 mb-1">
                  Unexpected console statement
                </p>
                <p className="text-xs text-red-700 dark:text-red-300">
                  ESLint • src/utils.js:45
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleContinue}
                  className="w-full py-3 px-4 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                >
                  <PlayCircle className="w-5 h-5" />
                  Continue Testing
                </button>
                <button
                  onClick={handleSkip}
                  className="w-full py-3 px-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all font-medium"
                >
                  Fix Later and Skip
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}