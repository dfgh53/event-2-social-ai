import React, { useState } from 'react';
import { 
  Sparkles, 
  PenTool, 
  Layers, 
  Smartphone, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Clock, 
  Eye, 
  Copy, 
  Check, 
  BookmarkCheck,
  Calendar,
  MapPin
} from 'lucide-react';
import { EventContextObject, GeneratedPost } from '../types';

interface DashboardProps {
  onStartCreate: () => void;
  onRunJudgeDemo: () => void;
  events: EventContextObject[];
  posts: GeneratedPost[];
  onOpenEvent: (event: EventContextObject) => void;
  onOpenPreview: (post: GeneratedPost) => void;
  onNavigateTab: (tab: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onStartCreate,
  events,
  posts,
  onOpenEvent,
  onOpenPreview,
  onNavigateTab,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const readyPosts = posts.filter(p => p.status === 'ready' || p.status === 'draft' || p.status === 'ready_to_post');
  const postedCount = posts.filter(p => p.status === 'manually_posted' || p.status === 'published').length;

  const handleCopyPost = async (post: GeneratedPost) => {
    try {
      const hashtagsStr = (post.hashtags || []).map(h => (h.startsWith('#') ? h : `#${h}`)).join(' ');
      const mentionsStr = (post.mentions || []).map(m => (m.handle.startsWith('@') ? m.handle : `@${m.handle}`)).join(' ');
      const fullText = [post.caption, mentionsStr, hashtagsStr].filter(Boolean).join('\n\n');

      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(fullText);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = fullText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedId(post.id);
      setTimeout(() => setCopiedId(null), 2500);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Workspace Header Banner */}
      <div className="rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
            <span>Event Content Studio</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Event Content Dashboard
          </h1>

          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            Turn your event photos, notes, and session takeaways into platform-native social content. Generate variations, verify accuracy, and copy ready-to-share packages for your handles.
          </p>

          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <button
              onClick={onStartCreate}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>Create Event Post</span>
              <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
            </button>

            <button
              onClick={() => onNavigateTab('preview')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Smartphone className="w-3.5 h-3.5 text-slate-500" />
              <span>Preview Studio</span>
            </button>

            <button
              onClick={() => onNavigateTab('library')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs font-semibold transition-colors cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              <span>Event Library</span>
            </button>
          </div>
        </div>
      </div>

      {/* Operational Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Events Captured</p>
            <h4 className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">{events.length}</h4>
            <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-3 h-3 text-teal-600" />
              <span>In local records</span>
            </p>
          </div>
          <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
            <Layers className="w-4 h-4 text-slate-600" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Posts Generated</p>
            <h4 className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">{posts.length}</h4>
            <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1 font-medium">
              <Zap className="w-3 h-3 text-teal-600" />
              <span>Across platforms</span>
            </p>
          </div>
          <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
            <Zap className="w-4 h-4 text-teal-600" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Ready to Post</p>
            <h4 className="text-2xl font-bold text-teal-700 mt-1 tabular-nums">{readyPosts.length}</h4>
            <p className="text-[11px] text-teal-700 mt-0.5 flex items-center gap-1 font-medium">
              <Clock className="w-3 h-3 text-teal-600" />
              <span>Available to copy</span>
            </p>
          </div>
          <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
            <Copy className="w-4 h-4 text-teal-700" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Shared / Posted</p>
            <h4 className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">{postedCount}</h4>
            <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1 font-medium">
              <BookmarkCheck className="w-3 h-3 text-teal-600" />
              <span>Recorded in history</span>
            </p>
          </div>
          <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
            <BookmarkCheck className="w-4 h-4 text-slate-600" />
          </div>
        </div>
      </div>

      {/* Quick Copy Hub (When posts are ready) */}
      {readyPosts.length > 0 && (
        <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Copy className="w-4 h-4 text-teal-700" />
              <h3 className="font-bold text-sm text-slate-900">
                Quick Copy to Social Handles
              </h3>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                Ready to Post
              </span>
            </div>
            <p className="text-xs text-slate-500">
              One-click copy any generated caption directly from the dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            {readyPosts.slice(0, 3).map((post) => (
              <div
                key={post.id}
                className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-2 text-xs">
                    <span className="font-mono font-semibold uppercase text-teal-800">
                      {post.platform}
                    </span>
                    <span className="text-slate-500 text-[11px]">
                      {post.variationType}
                    </span>
                  </div>
                  <p className="text-xs text-slate-800 line-clamp-3 leading-relaxed">
                    {post.caption}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2.5 border-t border-slate-100">
                  <button
                    onClick={() => onOpenPreview(post)}
                    className="text-[11px] font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3 h-3 text-slate-500" />
                    <span>Preview</span>
                  </button>

                  <button
                    onClick={() => handleCopyPost(post)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer border ${
                      copiedId === post.id
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'bg-teal-50 hover:bg-teal-100 text-teal-800 border-teal-200'
                    }`}
                  >
                    {copiedId === post.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Post</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grid of Events & Content Variations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Events Column */}
        <div className="lg:col-span-2 space-y-3.5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-teal-700" />
              <span>Captured Events</span>
            </h3>
            <button
              onClick={() => onNavigateTab('library')}
              className="text-xs text-teal-700 hover:text-teal-800 font-semibold transition-colors cursor-pointer"
            >
              View All Events ({events.length}) →
            </button>
          </div>

          <div className="space-y-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 shadow-xs transition-colors group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  {event.uploadedMedia?.[0]?.dataUrl ? (
                    <img
                      src={event.uploadedMedia[0].dataUrl}
                      alt={event.eventName}
                      className="w-16 h-16 rounded-lg object-cover border border-slate-200 shrink-0 bg-slate-100"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                      <Layers className="w-6 h-6" />
                    </div>
                  )}

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-slate-900 text-sm group-hover:text-teal-800 transition-colors">
                        {event.eventName || 'Untitled Event'}
                      </h4>
                      <span className="text-xs text-slate-500 font-medium">
                        · {event.eventType === 'Other' && event.customEventType ? event.customEventType : event.eventType}
                      </span>
                      {event.selectedPlatforms && event.selectedPlatforms.length > 0 ? (
                        <div className="flex items-center gap-1 ml-1">
                          {event.selectedPlatforms.slice(0, 3).map((plat, idx) => (
                            <span key={idx} className="px-1.5 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-100 text-slate-700 border border-slate-200">
                              {plat}
                            </span>
                          ))}
                          {event.selectedPlatforms.length > 3 && (
                            <span className="text-[10px] text-slate-400">+{event.selectedPlatforms.length - 3}</span>
                          )}
                        </div>
                      ) : (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-100 text-slate-700 border border-slate-200">
                          {event.platform}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{event.location}</span>
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{event.date}</span>
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 line-clamp-2 italic">"{event.userExperience}"</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <button
                    onClick={() => onOpenEvent(event)}
                    className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    Open Studio
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Variations Column */}
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-slate-700" />
              <span>Content Variations</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">{readyPosts.length} ready</span>
          </div>

          <div className="space-y-3">
            {readyPosts.slice(0, 3).map((post) => (
              <div
                key={post.id}
                className="p-4 rounded-xl bg-white border border-slate-200 hover:border-slate-300 shadow-xs transition-colors space-y-2.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-900">
                    {post.variationType}
                  </span>
                  <span className="text-[10px] text-slate-500 uppercase font-mono">{post.platform}</span>
                </div>

                <p className="text-xs font-semibold text-slate-800 line-clamp-2">
                  "{post.hook}"
                </p>

                <p className="text-xs text-slate-600 line-clamp-2">
                  {post.caption}
                </p>

                <div className="flex items-center justify-between pt-2.5 border-t border-slate-100">
                  <button
                    onClick={() => onOpenPreview(post)}
                    className="flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-800 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Live Preview</span>
                  </button>

                  <button
                    onClick={() => handleCopyPost(post)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer border ${
                      copiedId === post.id
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {copiedId === post.id ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-slate-500" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={() => onNavigateTab('preview')}
              className="w-full py-2.5 rounded-xl border border-dashed border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors text-center cursor-pointer shadow-xs"
            >
              Open Full Preview Studio →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
