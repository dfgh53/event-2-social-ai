import React from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Smartphone,
  BarChart2, 
  Play
} from 'lucide-react';

interface JudgeDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartInteractiveDemo: () => void;
  onJumpToTab: (tab: string) => void;
}

export const JudgeDemoModal: React.FC<JudgeDemoModalProps> = ({
  isOpen,
  onClose,
  onStartInteractiveDemo,
  onJumpToTab,
}) => {
  if (!isOpen) return null;

  const criteria = [
    {
      title: '1. Problem Understanding',
      score: 'Core Friction Solved',
      desc: 'Attendees take photos and notes at conferences/hackathons, but writing tailored posts for LinkedIn, Instagram, and X is tedious. Manual prompts lose factual context and sound robotic.',
      icon: Layers,
    },
    {
      title: '2. Innovation & Architecture',
      score: 'Event Story Engine + Multimodal Vibe',
      desc: 'Multimodal perception extracts visual banners & atmosphere. "Event Story Engine" maps narrative arcs (Hook → Takeaway → CTA). "One Event → Many Stories" powers multi-platform packages.',
      icon: Cpu,
    },
    {
      title: '3. Full Working Functionality',
      score: 'Real Gemini Flash Multimodal Engine',
      desc: 'Live Gemini 3.8 Flash server calls for multimodal extraction, 3+ platform-adapted variations, single-post regeneration with 9 modes, and smart handle verification.',
      icon: CheckCircle2,
    },
    {
      title: '4. UI / UX Design',
      score: 'Interactive Mobile Studio',
      desc: 'High-fidelity mobile phone preview for Instagram, LinkedIn, and X with real-time text synchronization, engagement counters, and smart aspect ratio optimization.',
      icon: Smartphone,
    },
    {
      title: '5. AI Feedback Loop',
      score: 'Closed-Loop Learning',
      desc: 'Simulated post-event analytics feedback translates into actionable recommendations and updates the user’s default preferences for future events.',
      icon: BarChart2,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Top Header */}
        <div className="px-6 py-5 bg-white border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200/80 flex items-center justify-center text-teal-700">
              <Sparkles className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">Judge Demo & Evaluation Overview</h3>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-teal-50 text-teal-800 border border-teal-200">
                  Interactive Tour
                </span>
              </div>
              <p className="text-xs text-slate-500">
                How Event2Social AI fulfills event-to-social content creation workflows.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="p-4 rounded-xl bg-teal-50/80 border border-teal-200 text-xs text-slate-700 leading-relaxed flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-start gap-2.5">
              <Play className="w-4 h-4 text-teal-700 mt-0.5 shrink-0" />
              <div>
                <strong className="text-teal-950 font-bold">Recommended Demo Flow (1–2 minutes):</strong>
                <p className="mt-0.5 text-slate-600">
                  Click the button to load sample event Tech Arena 2026, inspect multimodal analysis, test 3 platform variations, edit in the phone preview studio, and grab the 1-click copy package.
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                onClose();
                onStartInteractiveDemo();
              }}
              className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs transition-colors shrink-0 shadow-xs cursor-pointer"
            >
              Start Guided Tour →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {criteria.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/90 flex flex-col justify-between space-y-2 shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                        <Icon className="w-4 h-4 text-teal-700" />
                        <span>{item.title}</span>
                      </div>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white text-teal-800 border border-slate-200">
                        {item.score}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Jump Bar */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Jump directly to any section:
            </h4>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => { onClose(); onJumpToTab('create'); }}
                className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-xs font-medium text-slate-700 border border-slate-200 transition cursor-pointer"
              >
                7-Step Create Wizard
              </button>
              <button
                onClick={() => { onClose(); onJumpToTab('preview'); }}
                className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-xs font-medium text-slate-700 border border-slate-200 transition cursor-pointer"
              >
                Mobile Preview Studio
              </button>
              <button
                onClick={() => { onClose(); onJumpToTab('analytics'); }}
                className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-xs font-medium text-slate-700 border border-slate-200 transition cursor-pointer"
              >
                AI Analytics & Feedback
              </button>
              <button
                onClick={() => { onClose(); onJumpToTab('accounts'); }}
                className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-xs font-medium text-slate-700 border border-slate-200 transition cursor-pointer"
              >
                Connected Accounts
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
