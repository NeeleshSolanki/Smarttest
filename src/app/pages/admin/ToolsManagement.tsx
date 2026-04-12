import { useState } from 'react';
import { AdminSidebar } from '../../components/AdminSidebar';
import { Search, CheckCircle, Circle } from 'lucide-react';
import { toast } from 'sonner';

const initialTools = [
  {
    id: 1,
    name: 'Python Pylint',
    category: 'Python',
    fileTypes: ['.py'],
    version: '2.17.2',
    lastUpdated: '2026-03-15',
    enabled: true,
    description: 'Python code analysis tool for error detection and code quality',
  },
  {
    id: 2,
    name: 'Jest',
    category: 'JavaScript',
    fileTypes: ['.js', '.jsx', '.ts', '.tsx'],
    version: '29.5.0',
    lastUpdated: '2026-04-01',
    enabled: true,
    description: 'JavaScript testing framework with focus on simplicity',
  },
  {
    id: 3,
    name: 'ESLint',
    category: 'JavaScript',
    fileTypes: ['.js', '.jsx', '.ts', '.tsx'],
    version: '8.42.0',
    lastUpdated: '2026-03-28',
    enabled: true,
    description: 'Pluggable linting utility for JavaScript and JSX',
  },
  {
    id: 4,
    name: 'TypeScript Compiler',
    category: 'TypeScript',
    fileTypes: ['.ts', '.tsx'],
    version: '5.0.4',
    lastUpdated: '2026-04-05',
    enabled: true,
    description: 'TypeScript type checking and compilation',
  },
  {
    id: 5,
    name: 'Pytest',
    category: 'Python',
    fileTypes: ['.py'],
    version: '7.3.1',
    lastUpdated: '2026-03-20',
    enabled: true,
    description: 'Python testing framework for unit and integration tests',
  },
  {
    id: 6,
    name: 'React DevTools',
    category: 'React',
    fileTypes: ['.jsx', '.tsx'],
    version: '4.27.8',
    lastUpdated: '2026-03-10',
    enabled: false,
    description: 'React component debugging and profiling tools',
  },
  {
    id: 7,
    name: 'Coverage.py',
    category: 'Python',
    fileTypes: ['.py'],
    version: '7.2.5',
    lastUpdated: '2026-03-25',
    enabled: true,
    description: 'Code coverage measurement for Python',
  },
  {
    id: 8,
    name: 'Prettier',
    category: 'Multi-language',
    fileTypes: ['.js', '.jsx', '.ts', '.tsx', '.css', '.json'],
    version: '2.8.8',
    lastUpdated: '2026-04-02',
    enabled: false,
    description: 'Opinionated code formatter for multiple languages',
  },
];

export default function ToolsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [tools, setTools] = useState(initialTools);

  const categories = ['all', ...Array.from(new Set(tools.map(t => t.category)))];

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || tool.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleToolStatus = (toolId: number) => {
    setTools(prevTools =>
      prevTools.map(tool =>
        tool.id === toolId
          ? { ...tool, enabled: !tool.enabled }
          : tool
      )
    );
    const tool = tools.find(t => t.id === toolId);
    if (tool) {
      toast.success(
        tool.enabled 
          ? `${tool.name} has been disabled. Users will no longer have access to this tool.` 
          : `${tool.name} has been enabled. Users can now use this tool.`
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
              Testing Tools Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage supported testing tools and extensions
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setFilterCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filterCategory === category
                        ? 'bg-teal-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {category === 'all' ? 'All' : category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <div
                key={tool.id}
                className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {tool.name}
                    </h3>
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                      {tool.category}
                    </span>
                  </div>
                  <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                    tool.enabled
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}>
                    {tool.enabled ? (
                      <>
                        <CheckCircle className="w-3 h-3" />
                        Enabled
                      </>
                    ) : (
                      <>
                        <Circle className="w-3 h-3" />
                        Disabled
                      </>
                    )}
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {tool.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Version</span>
                    <span className="font-medium text-gray-900 dark:text-white">{tool.version}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Last Updated</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {new Date(tool.lastUpdated).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Supported File Types</p>
                  <div className="flex flex-wrap gap-1">
                    {tool.fileTypes.map((type, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs font-mono bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => toggleToolStatus(tool.id)}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-all ${
                    tool.enabled
                      ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      : 'bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white'
                  }`}
                >
                  {tool.enabled ? 'Disable Tool' : 'Enable Tool'}
                </button>
              </div>
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-12 text-center">
              <p className="text-gray-500 dark:text-gray-400">No tools found matching your filters.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}