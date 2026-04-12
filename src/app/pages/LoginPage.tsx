import { useState } from 'react';
import { useNavigate } from 'react-router';
import { TestTube2, User, Shield, CheckCircle2, XCircle, AlertTriangle, Code2, Bug, Play, FileCheck } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';

export default function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  // Admin can only sign in, not sign up
  const canSignUp = role === 'user';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'user') {
      navigate('/user');
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.05)_1px,transparent_1px)] bg-[size:64px_64px] dark:bg-[linear-gradient(rgba(14,165,233,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.1)_1px,transparent_1px)]"></div>
        
        {/* Code Snippets Background */}
        <div className="absolute top-10 left-10 opacity-10 dark:opacity-5">
          <pre className="text-xs text-gray-700 dark:text-gray-300 font-mono">
{`function testLogin() {
  expect(user).toBeDefined();
  assert.isTrue(validated);
  return SUCCESS;
}`}
          </pre>
        </div>
        
        <div className="absolute bottom-20 right-20 opacity-10 dark:opacity-5">
          <pre className="text-xs text-gray-700 dark:text-gray-300 font-mono">
{`✓ All tests passed
✓ Coverage: 98%
✓ 0 vulnerabilities`}
          </pre>
        </div>

        {/* Floating Icons */}
        <div className="absolute top-1/4 left-1/4 animate-float">
          <CheckCircle2 className="w-8 h-8 text-green-400 opacity-20" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-float-delay-1">
          <Bug className="w-6 h-6 text-red-400 opacity-20" />
        </div>
        <div className="absolute bottom-1/4 left-1/3 animate-float-delay-2">
          <Code2 className="w-10 h-10 text-blue-400 opacity-20" />
        </div>
        <div className="absolute top-1/2 right-1/3 animate-float">
          <FileCheck className="w-7 h-7 text-teal-400 opacity-20" />
        </div>
        <div className="absolute bottom-1/3 right-1/4 animate-float-delay-1">
          <Play className="w-6 h-6 text-purple-400 opacity-20" />
        </div>
        <div className="absolute top-2/3 left-1/4 animate-float-delay-2">
          <AlertTriangle className="w-8 h-8 text-yellow-400 opacity-20" />
        </div>
        <div className="absolute bottom-1/2 right-1/2 animate-float">
          <XCircle className="w-6 h-6 text-orange-400 opacity-20" />
        </div>
        
        {/* Test Results Cards */}
        <div className="absolute top-32 right-10 bg-white/5 dark:bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-teal-200/20 dark:border-teal-500/20 opacity-30">
          <div className="flex items-center gap-2 text-xs">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span className="text-gray-600 dark:text-gray-300">125 Tests Passed</span>
          </div>
        </div>
        
        <div className="absolute bottom-32 left-10 bg-white/5 dark:bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-blue-200/20 dark:border-blue-500/20 opacity-30">
          <div className="flex items-center gap-2 text-xs">
            <Code2 className="w-4 h-4 text-blue-500" />
            <span className="text-gray-600 dark:text-gray-300">Unit Testing</span>
          </div>
        </div>

        {/* Circular Gradients */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-teal-300/20 to-transparent dark:from-teal-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-300/20 to-transparent dark:from-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <TestTube2 className="w-12 h-12 text-teal-500" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">SmartTest</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Professional Software Testing Platform</p>
        </div>

        {/* Login/SignUp Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            {canSignUp && isSignUp ? 'Sign Up' : 'Sign In'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name Field - Only for User Sign Up */}
            {canSignUp && isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                  placeholder="John Doe"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white rounded-lg font-medium transition-all transform hover:scale-[1.02] shadow-lg"
            >
              {canSignUp && isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </form>

          {/* Toggle between Sign In and Sign Up - Only for Users */}
          {canSignUp && (
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {isSignUp ? (
                  <>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setIsSignUp(false)}
                      className="text-teal-600 dark:text-teal-400 hover:underline font-medium"
                    >
                      Sign In
                    </button>
                  </>
                ) : (
                  <>
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setIsSignUp(true)}
                      className="text-teal-600 dark:text-teal-400 hover:underline font-medium"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </p>
            </div>
          )}

          {/* Role Selection */}
          <div className={`pt-6 border-t border-gray-200 dark:border-gray-700 ${canSignUp ? 'mt-6' : 'mt-4'}`}>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
              By {canSignUp && isSignUp ? 'signing up' : 'signing in'}, I agree to the <a href="#" className="text-teal-600 dark:text-teal-400 hover:underline">Terms & Conditions</a> and have selected my role:
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('user')}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                  role === 'user'
                    ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300'
                    : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <User className="w-5 h-5" />
                <span className="font-medium">User</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setRole('admin');
                  setIsSignUp(false); // Admin can only sign in
                }}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                  role === 'admin'
                    ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300'
                    : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <Shield className="w-5 h-5" />
                <span className="font-medium">Admin</span>
              </button>
            </div>
          </div>

          {/* Theme Toggle */}
          <div className="mt-6 flex justify-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}