import React from 'react';
import { EventContextObject, GeneratedPost } from '../types';
import { 
  FolderKanban, 
  MapPin, 
  Calendar, 
  Copy, 
  Trash2, 
  ArrowRight,
  Plus
} from 'lucide-react';

interface EventLibraryProps {
  events: EventContextObject[];
  posts: GeneratedPost[];
  onOpenEvent: (event: EventContextObject) => void;
  onDuplicateEvent: (event: EventContextObject) => void;
  onDeleteEvent: (eventId: string) => void;
  onStartCreate: () => void;
}

export const EventLibrary: React.FC<EventLibraryProps> = ({
  events,
  posts,
  onOpenEvent,
  onDuplicateEvent,
  onDeleteEvent,
  onStartCreate,
}) => {
  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/90 pb-5">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Event Library & Content Archives</h2>
          <p className="text-xs text-slate-500 mt-1">
            Revisit past conferences, create new story angles, or duplicate verified context for new campaigns.
          </p>
        </div>

        <button
          onClick={onStartCreate}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Create From New Event</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {events.map((event) => {
          const eventPosts = posts.filter((p) => p.eventId === event.id);
          const thumbnail = event.uploadedMedia?.[0]?.dataUrl;

          return (
            <div
              key={event.id}
              className="rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 transition-colors flex flex-col justify-between overflow-hidden shadow-xs group"
            >
              {/* Card Image Banner */}
              <div className="h-44 w-full bg-slate-100 relative overflow-hidden">
                {thumbnail ? (
                  <img
                    src={thumbnail}
                    alt={event.eventName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <FolderKanban className="w-12 h-12" />
                  </div>
                )}
                <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/90 backdrop-blur-xs text-slate-800 border border-slate-200 shadow-xs">
                    {event.eventType}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-900 text-white uppercase">
                    {event.platform}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-[10px] font-semibold bg-white/95 text-teal-800 border border-slate-200 shadow-xs">
                  {eventPosts.length} Variations
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-teal-800 transition-colors">
                    {event.eventName}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{event.date}</span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 mt-2 italic">
                    "{event.userExperience}"
                  </p>
                </div>

                {/* Footer Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-1.5">
                  <button
                    onClick={() => onOpenEvent(event)}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Open Studio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onDuplicateEvent(event)}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                    title="Duplicate Event Context"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onDeleteEvent(event.id)}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                    title="Delete Event"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
