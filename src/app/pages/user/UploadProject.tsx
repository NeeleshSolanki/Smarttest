import { useState } from 'react';
import { UserSidebar } from '../../components/UserSidebar';
import { Upload, FileCode, CheckCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router';

const detectedTools = [
  { id: 'python-lint', name: 'Python Linting', description: 'Check Python code for style and errors', detected: true, enabled: true },
  { id: 'jest', name: 'Jest Unit Tests', description: 'Run JavaScript/React unit tests', detected: true, enabled: true },
  { id: 'eslint', name: 'ESLint', description: 'JavaScript/TypeScript code quality', detected: true, enabled: true },
  { id: 'coverage', name: 'Code Coverage', description: 'Measure test coverage percentage', detected: true, enabled: false },
  { id: 'typescript', name: 'TypeScript Check', description: 'Type checking for TypeScript files', detected: true, enabled: true },
];

export default function UploadProject() {
  const navigate = useNavigate();
  const [uploadStep, setUploadStep] = useState<'upload' | 'analyzing' | 'configure'>('upload');
  const [selectedTests, setSelectedTests] = useState<string[]>(['python-lint', 'jest', 'eslint', 'typescript']);
  const [liveErrorReporting, setLiveErrorReporting] = useState(true);
  const [pauseOnError, setPauseOnError] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setUploadStep('analyzing');
      setTimeout(() => {
        setUploadStep('configure');
      }, 2000);
    }
  };

  const toggleTest = (testId: string) => {
    setSelectedTests(prev =>
      prev.includes(testId)
        ? prev.filter(id => id !== testId)
        : [...prev, testId]
    );
  };

  const handleLiveErrorReportingToggle = () => {
    setLiveErrorReporting(!liveErrorReporting);
    if (!liveErrorReporting) {
      // If turning ON Live Error Reporting, turn OFF Pause on Error
      setPauseOnError(false);
    }
  };

  const handlePauseOnErrorToggle = () => {
    setPauseOnError(!pauseOnError);
    if (!pauseOnError) {
      // If turning ON Pause on Error, turn OFF Live Error Reporting
      setLiveErrorReporting(false);
    }
  };

  const handleStartTesting = () => {
    navigate('/user/monitor/demo-project-1', {
      state: {
        liveErrorReporting,
        pauseOnError
      }
    });
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      <UserSidebar />
      
      <main className="flex-1 overflow-y-auto pt-[57px] lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-2">
                Project Upload & Setup
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Upload your project files and configure testing preferences
              </p>
            </div>

            {/* Step 1: Upload */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-8 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-semibold">
                  1
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Upload Project Files</h2>
              </div>

              <div className="relative">
                <input
                  type="file"
                  id="file-upload"
                  className="sr-only"
                  onChange={handleFileUpload}
                  accept=".zip,.tar,.tar.gz"
                />
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors"
                >
                  {fileName ? (
                    <div className="flex flex-col items-center">
                      <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                      <p className="text-lg font-medium text-gray-900 dark:text-white mb-1">{fileName}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Click to change file</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Upload className="w-16 h-16 text-gray-400 mb-4" />
                      <p className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                        Drop your project files here
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        or click to browse
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                        Supports .zip, .tar, .tar.gz
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Step 2: Analysis */}
            {uploadStep === 'analyzing' && (
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-8 mb-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-semibold">
                    2
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Analyzing Project Structure</h2>
                </div>

                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="w-12 h-12 text-teal-500 animate-spin mb-4" />
                  <p className="text-lg text-gray-900 dark:text-white mb-2">File structure analysis in progress...</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">This may take a few moments</p>
                </div>
              </div>
            )}

            {/* Step 3: Configure Tests */}
            {uploadStep === 'configure' && (
              <>
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-8 mb-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-semibold">
                      2
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Detected Technologies</h2>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg font-medium">
                      <FileCode className="w-4 h-4 inline mr-2" />
                      Python
                    </span>
                    <span className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-lg font-medium">
                      <FileCode className="w-4 h-4 inline mr-2" />
                      JavaScript
                    </span>
                    <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg font-medium">
                      <FileCode className="w-4 h-4 inline mr-2" />
                      TypeScript
                    </span>
                    <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg font-medium">
                      <FileCode className="w-4 h-4 inline mr-2" />
                      React
                    </span>
                    <span className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg font-medium">
                      <FileCode className="w-4 h-4 inline mr-2" />
                      Jest
                    </span>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-8 mb-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-semibold">
                      3
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Select Testing Tools</h2>
                  </div>

                  <div className="space-y-3">
                    {detectedTools.map((tool) => (
                      <div
                        key={tool.id}
                        className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                          selectedTests.includes(tool.id)
                            ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                        onClick={() => toggleTest(tool.id)}
                      >
                        <div className="flex items-start gap-4">
                          <input
                            type="checkbox"
                            checked={selectedTests.includes(tool.id)}
                            onChange={() => {}}
                            className="mt-1 w-5 h-5 text-teal-500 rounded"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900 dark:text-white mb-1">{tool.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{tool.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-8 mb-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-semibold">
                      4
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Testing Preferences</h2>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white mb-1">Live Error Reporting</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Receive and view errors in real-time as tests run
                        </p>
                        {liveErrorReporting && (
                          <p className="text-xs text-teal-600 dark:text-teal-400 mt-1">
                            ✓ Active - Errors will be logged without pausing
                          </p>
                        )}
                      </div>
                      <button
                        onClick={handleLiveErrorReportingToggle}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          liveErrorReporting ? 'bg-teal-500' : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            liveErrorReporting ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white mb-1">Pause on Error</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Stop the testing sequence after each error found to review
                        </p>
                        {pauseOnError && (
                          <p className="text-xs text-teal-600 dark:text-teal-400 mt-1">
                            ✓ Active - Tests will pause on errors for review
                          </p>
                        )}
                      </div>
                      <button
                        onClick={handlePauseOnErrorToggle}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          pauseOnError ? 'bg-teal-500' : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            pauseOnError ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleStartTesting}
                  className="w-full py-4 px-6 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white rounded-lg font-medium text-lg transition-all transform hover:scale-[1.02] shadow-lg"
                >
                  Start Testing
                </button>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}