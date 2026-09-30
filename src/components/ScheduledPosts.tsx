import React from 'react';
import { GeneratedPost } from '../types';
import { Calendar, Clock, Trash2, Smartphone, ShieldAlert } from 'lucide-react';

interface ScheduledPostsProps {
  posts: GeneratedPost[];
  onCancelSchedule: (postId: string) => void;
  onOpenPreview: (post: GeneratedPost) => void;
}

export const ScheduledPosts: React.FC<ScheduledPostsProps> = ({
  posts,
  onCancelSchedule,
  onOpenPreview,
}) => {
  const scheduledList = posts.filter((p) => p.status === 'scheduled');

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="border-b border-slate-200/90 pb-5">
        <h2 className="text-2xl font-extrabold text-slate-900">Scheduled Post Pipeline</h2>
        <p className="text-xs text-slate-500 mt-1">
          Automated calendar queue configured for optimal engagement windows.
        </p>
      </div>

      {/* Demo Scheduler Notice */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3 shadow-xs">
        <ShieldAlert className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
        <div className="text-xs text-slate-700 space-y-1">
          <p className="font-bold text-amber-900">Local Queue & Demo Scheduler Active</p>
          <p className="text-slate-600">
            Posts scheduled in hackathon demo mode are queued inside local storage state and simulate automated dispatch at the designated target time.
          </p>
        </div>
      </div>

      {/* List */}
      {scheduledList.length === 0 ? (
        <div className="text-center py-16 p-8 rounded-2xl bg-white border border-slate-200/90 space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mx-auto text-slate-500">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">No Posts Currently Scheduled</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Create an event post and choose "Queue & Schedule" in Step 7 to set up an automated release schedule.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {scheduledList.map((post) => (
            <div
              key={post.id}
              className="p-5 rounded-xl bg-white border border-slate-200/90 hover:border-slate-300 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-100 text-slate-800 uppercase border border-slate-200">
                    {post.platform}
                  </span>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-teal-50 text-teal-800 border border-teal-200">
                    {post.variationType}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-amber-800 font-medium">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>Target: {new Date(post.scheduledDate || '').toLocaleString()}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-900 font-semibold line-clamp-1">
                  "{post.hook}"
                </p>

                <p className="text-xs text-slate-600 line-clamp-2">
                  {post.caption}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 w-full sm:w-auto justify-end">
                <button
                  onClick={() => onOpenPreview(post)}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Smartphone className="w-3.5 h-3.5 text-slate-500" />
                  <span>Preview</span>
                </button>

                <button
                  onClick={() => onCancelSchedule(post.id)}
                  className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition cursor-pointer"
                  title="Cancel scheduled post"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
