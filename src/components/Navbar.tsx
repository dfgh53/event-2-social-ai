import React from 'react';
import { 
  Sparkles, 
  LayoutDashboard, 
  PenTool, 
  Smartphone, 
  Share2, 
  Calendar, 
  BarChart3, 
  FolderKanban, 
  Settings,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onRunJudgeDemo: () => void;
  isJudgeDemoActive: boolean;
  onOpenPreferences: () => void;
  isDemoMode: boolean;
  setIsDemoMode: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  onRunJudgeDemo,
  isJudgeDemoActive,
  onOpenPreferences,
  isDemoMode,
  setIsDemoMode,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'create', label: 'Create Post', icon: PenTool },
    { id: 'preview', label: 'Preview Studio', icon: Smartphone },
    { id: 'accounts', label: 'Accounts', icon: Share2 },
    { id: 'scheduled', label: 'Schedule', icon: Calendar },
    { id: 'analytics', label: 'Analytics & Feedback', icon: BarChart3 },
    { id: 'library', label: 'Event Library', icon: FolderKanban },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/90 bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentTab('dashboard')}
              className="flex items-center gap-2.5 text-left group cursor-pointer focus-visible:outline-none"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-teal-400 flex items-center justify-center shadow-xs group-hover:bg-slate-800 transition-colors">
                <Sparkles className="w-4 h-4 text-teal-400" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm tracking-tight text-slate-900 group-hover:text-teal-900 transition-colors">
                  Event2Social
                </span>
                <span className="text-[11px] font-medium text-teal-800 bg-teal-50 border border-teal-200/70 px-2 py-0.5 rounded-md">
                  Studio
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Tabs (Segmented Clean Style) */}
          <nav className="hidden lg:flex items-center gap-1 p-1 bg-slate-100/80 border border-slate-200/70 rounded-xl">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-xs border border-slate-200/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/40 border border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-teal-600' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2">
            {/* Judge 1-Click Demo Tour Button */}
            <button
              onClick={onRunJudgeDemo}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-xs ${
                isJudgeDemoActive
                  ? 'bg-teal-700 text-white ring-2 ring-teal-600/30'
                  : 'bg-teal-600 hover:bg-teal-700 text-white'
              }`}
              title="Run 1-minute guided interactive tour with sample event Tech Arena 2026"
            >
              <Zap className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Run Demo Tour</span>
              <span className="sm:hidden">Demo</span>
            </button>

            {/* Demo / Live Mode Indicator */}
            <button
              onClick={() => setIsDemoMode(!isDemoMode)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                isDemoMode
                  ? 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  : 'bg-teal-50 text-teal-800 border-teal-200'
              }`}
              title="Toggle Demo Mode (simulated environment) vs Live Mode"
            >
              <ShieldCheck className={`w-3.5 h-3.5 ${isDemoMode ? 'text-slate-500' : 'text-teal-600'}`} />
              <span className="hidden md:inline">{isDemoMode ? 'Demo Mode' : 'Live Mode'}</span>
            </button>

            {/* Preferences Modal Trigger */}
            <button
              onClick={onOpenPreferences}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200 cursor-pointer"
              title="Brand & Generation Preferences"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex lg:hidden overflow-x-auto py-2 gap-1 border-t border-slate-100 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
