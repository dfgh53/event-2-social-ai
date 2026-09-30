import React, { useState } from 'react';
import { PostAnalytics, AiFeedbackSummary, UserPreferences } from '../types';
import { 
  BarChart3, 
  Sparkles, 
  ShieldAlert, 
  CheckCircle2, 
  Lightbulb,
  Zap,
  Check,
  TrendingUp
} from 'lucide-react';
import { SAMPLE_ANALYTICS_DATA, SAMPLE_AI_FEEDBACK } from '../data/mockEvents';

interface AnalyticsViewProps {
  analytics?: PostAnalytics;
  feedback?: AiFeedbackSummary;
  onApplyFeedbackToPreferences: (feedback: AiFeedbackSummary) => void;
  userPreferences: UserPreferences;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  analytics = SAMPLE_ANALYTICS_DATA,
  feedback = SAMPLE_AI_FEEDBACK,
  onApplyFeedbackToPreferences,
}) => {
  const [applied, setApplied] = useState(false);

  const handleApply = () => {
    onApplyFeedbackToPreferences(feedback);
    setApplied(true);
    setTimeout(() => setApplied(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/90 pb-5">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Post-Event Analytics & AI Feedback Loop</h2>
          <p className="text-xs text-slate-500 mt-1">
            Performance tracking combined with closed-loop Gemini recommendations to optimize future event content.
          </p>
        </div>

        {/* Demo Notice Badge */}
        <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1.5 shrink-0">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
          <span>Simulated Analytics (Demo Mode)</span>
        </span>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        <div className="p-4 rounded-xl bg-white border border-slate-200/90 text-center shadow-xs">
          <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">REACH</span>
          <div className="text-xl font-bold text-slate-900 mt-1 font-mono tabular-nums">{analytics.reach.toLocaleString()}</div>
          <span className="text-[11px] text-teal-700 font-medium">+34% vs avg</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/90 text-center shadow-xs">
          <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">IMPRESSIONS</span>
          <div className="text-xl font-bold text-slate-900 mt-1 font-mono tabular-nums">{analytics.impressions.toLocaleString()}</div>
          <span className="text-[11px] text-slate-600 font-medium">Top quartile</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/90 text-center shadow-xs">
          <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">ENGAGEMENT</span>
          <div className="text-xl font-bold text-teal-700 mt-1 font-mono tabular-nums">{analytics.engagementRate}%</div>
          <span className="text-[11px] text-teal-800 font-medium">High ratio</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/90 text-center shadow-xs">
          <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">REACTIONS</span>
          <div className="text-xl font-bold text-slate-900 mt-1 font-mono tabular-nums">{analytics.likes}</div>
          <span className="text-[11px] text-slate-500 font-medium">Likes & Cheers</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/90 text-center shadow-xs">
          <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">COMMENTS</span>
          <div className="text-xl font-bold text-slate-900 mt-1 font-mono tabular-nums">{analytics.comments}</div>
          <span className="text-[11px] text-slate-500 font-medium">Discussions</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/90 text-center shadow-xs">
          <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">SHARES</span>
          <div className="text-xl font-bold text-slate-900 mt-1 font-mono tabular-nums">{analytics.shares}</div>
          <span className="text-[11px] text-slate-500 font-medium">Reposts</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/90 text-center shadow-xs">
          <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">SAVES</span>
          <div className="text-xl font-bold text-teal-700 mt-1 font-mono tabular-nums">{analytics.saves}</div>
          <span className="text-[11px] text-teal-700 font-medium">Bookmarked</span>
        </div>
      </div>

      {/* Closed-Loop AI Feedback Engine */}
      <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200/80 flex items-center justify-center text-teal-700">
              <Sparkles className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">Closed-Loop AI Feedback Engine</h3>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-teal-50 text-teal-800 border border-teal-200">
                  Adaptive Learning
                </span>
              </div>
              <p className="text-xs text-slate-500">
                The engine analyzes performance data to update your future event presets automatically.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Content Score</span>
              <span className="text-2xl font-bold text-teal-700 font-mono tabular-nums">{feedback.contentPerformanceScore}/100</span>
            </div>
            <button
              onClick={handleApply}
              disabled={applied}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-xs transition cursor-pointer shadow-xs ${
                applied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-teal-600 hover:bg-teal-700 text-white'
              }`}
            >
              {applied ? <Check className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
              <span>{applied ? 'Learnings Applied to Defaults!' : 'Apply Feedback to Future Defaults'}</span>
            </button>
          </div>
        </div>

        {/* Feedback Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* What Worked */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>What Worked in This Post</span>
            </h4>
            <div className="space-y-2">
              {feedback.whatWorked?.map((item: string, idx: number) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200 text-xs text-slate-700 leading-relaxed flex items-start gap-2.5"
                >
                  <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations for Next Time */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-teal-600" />
              <span>Tactical Tips for Your Next Event</span>
            </h4>
            <div className="space-y-2">
              {feedback.nextEventRecommendations?.map((rec: string, idx: number) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200 text-xs text-slate-700 leading-relaxed flex items-start gap-2.5"
                >
                  <span className="text-teal-700 font-bold mt-0.5">→</span>
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Audience Reception & Tone Tweak */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 border-t border-slate-100 text-xs">
          <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200 space-y-1">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
              Audience Reception Analysis
            </span>
            <p className="text-slate-700 leading-relaxed">
              {feedback.audienceReceptionAnalysis}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200 space-y-1">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
              Suggested Tone & Cadence Tweak
            </span>
            <p className="text-slate-700 leading-relaxed">
              {feedback.suggestedToneTweak}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
