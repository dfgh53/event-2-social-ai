import React from 'react';
import { EventContextObject } from '../../types';
import { Sparkles, Calendar, MapPin, Tag, ArrowRight } from 'lucide-react';

interface Step1Props {
  context: EventContextObject;
  onChange: (updates: Partial<EventContextObject>) => void;
  onNext: () => void;
  onLoadSample: () => void;
}

export const Step1EventContext: React.FC<Step1Props> = ({
  context,
  onChange,
  onNext,
  onLoadSample,
}) => {
  const eventTypes = [
    'Conference / Tech Symposium',
    'Hackathon / Buildathon',
    'Workshop / Bootcamp',
    'Product Launch',
    'Meetup / Networking',
    'Award Ceremony / Gala',
    'College / Campus Fest',
    'Company Milestone',
    'Other',
  ];

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl mx-auto bg-white border border-slate-200/90 shadow-sm rounded-2xl p-6 sm:p-8">
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">Step 1 of 7</span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-0.5">Event Ground Truth</h2>
          <p className="text-xs text-slate-500 mt-1">
            Specify verified event parameters. The AI treats these as factual anchors and will not hallucinate details.
          </p>
        </div>

        {/* Quick Sample Loader */}
        <button
          type="button"
          onClick={onLoadSample}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-xs font-semibold transition-colors shrink-0 cursor-pointer shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          <span>Load Tech Arena Sample</span>
        </button>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        {/* Event Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Event Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={context.eventName}
            onChange={(e) => onChange({ eventName: e.target.value })}
            placeholder="e.g. Tech Arena 2026, AI Summit Bangalore, Google I/O Extended"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50/60 border border-slate-200 focus:bg-white focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors"
          />
        </div>

        {/* Event Type & Location Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Event Type <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Tag className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <select
                value={context.eventType}
                onChange={(e) => onChange({ eventType: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50/60 border border-slate-200 focus:bg-white focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-sm text-slate-900 focus:outline-none transition-colors appearance-none cursor-pointer"
              >
                {eventTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            {context.eventType === 'Other' && (
              <div className="mt-3 animate-fade-in">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Enter your event type <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={context.customEventType || ''}
                  onChange={(e) => onChange({ customEventType: e.target.value })}
                  placeholder="e.g. College Cultural Festival, Art Exhibition, Science Fair"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50/60 border border-slate-200 focus:bg-white focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors"
                  autoFocus
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Location / Venue <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={context.location}
                onChange={(e) => onChange({ location: e.target.value })}
                placeholder="e.g. Christ College Campus, Bangalore"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50/60 border border-slate-200 focus:bg-white focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Event Date <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="date"
                value={context.date}
                onChange={(e) => onChange({ date: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50/60 border border-slate-200 focus:bg-white focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-sm text-slate-900 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Time / Session Slot (Optional)
            </label>
            <input
              type="text"
              value={context.time || ''}
              onChange={(e) => onChange({ time: e.target.value })}
              placeholder="e.g. 10:00 AM - 5:30 PM, Keynote Session"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50/60 border border-slate-200 focus:bg-white focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Event Description */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Official Event Description / Context
          </label>
          <textarea
            rows={3}
            value={context.description}
            onChange={(e) => onChange({ description: e.target.value })}
            placeholder="Brief summary of what the event was about (e.g. Annual symposium on emerging AI models, robotics, and cloud compute with 800+ attendees)..."
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50/60 border border-slate-200 focus:bg-white focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors leading-relaxed"
          />
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-end pt-5 border-t border-slate-100">
        <button
          type="button"
          onClick={onNext}
          disabled={!context.eventName.trim() || !context.location.trim() || (context.eventType === 'Other' && !context.customEventType?.trim())}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm shadow-sm transition-colors cursor-pointer"
        >
          <span>Continue to Experience & Media</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
