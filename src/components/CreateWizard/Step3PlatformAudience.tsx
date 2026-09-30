import React from 'react';
import { 
  EventContextObject, 
  SocialPlatform, 
  Tone, 
  ContentLength, 
  ContentStyle, 
  EmojiLevel, 
  StoryAngle 
} from '../../types';
import { 
  Users, 
  Sparkles, 
  Compass, 
  ArrowLeft, 
  ArrowRight,
  Check
} from 'lucide-react';

interface Step3Props {
  context: EventContextObject;
  onChange: (updates: Partial<EventContextObject>) => void;
  onGenerate: () => void;
  onBack: () => void;
  isGenerating: boolean;
}

export const Step3PlatformAudience: React.FC<Step3Props> = ({
  context,
  onChange,
  onGenerate,
  onBack,
  isGenerating,
}) => {
  const [customPlatformName, setCustomPlatformName] = React.useState(
    context.customPlatforms?.[0] || ''
  );
  const [customAudience, setCustomAudience] = React.useState('');
  const [customCharLimit, setCustomCharLimit] = React.useState('');

  const standardPlatforms = [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      desc: 'Structured storytelling, professional insights, framework takeaways & industry hashtags.',
      icon: '💼',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      desc: 'Visual-forward, emotive hook, conversational formatting, rich hashtags & community tags.',
      icon: '📸',
    },
    {
      id: 'x',
      name: 'X (Twitter)',
      desc: 'Punchy 280-char density, scroll-stopping first 5 words, high signal-to-noise ratio.',
      icon: '⚡',
    },
    {
      id: 'facebook',
      name: 'Facebook',
      desc: 'Community-oriented storytelling, engaging questions, album narrative & sharing.',
      icon: '🌐',
    },
    {
      id: 'threads',
      name: 'Threads',
      desc: 'Casual community tone, open dialogue questions, genuine behind-the-scenes thoughts.',
      icon: '🧵',
    },
    {
      id: 'other',
      name: 'Other',
      desc: 'Custom social channel, newsletter, Discord, or private community platform.',
      icon: '🪄',
    },
  ];

  const rawSelected = context.selectedPlatforms && context.selectedPlatforms.length > 0
    ? context.selectedPlatforms
    : [context.platform || 'linkedin'];

  const selectedList = rawSelected.map((s) => s.toLowerCase());

  const isOtherSelected = selectedList.includes('other') || Boolean(context.customPlatforms && context.customPlatforms.length > 0);

  const togglePlatform = (id: string) => {
    const idLower = id.toLowerCase();
    let updated: string[];
    if (selectedList.includes(idLower)) {
      if (selectedList.length === 1) return; // keep at least one
      updated = selectedList.filter((p) => p !== idLower);
    } else {
      updated = [...selectedList, idLower];
    }
    onChange({
      selectedPlatforms: updated,
      platform: updated[0] as SocialPlatform,
    });
  };

  const handleCustomPlatformChange = (name: string) => {
    setCustomPlatformName(name);
    const updatedCustom = name.trim() ? [name.trim()] : [];
    onChange({
      customPlatforms: updatedCustom,
      customPlatformDetails: {
        ...(context.customPlatformDetails || {}),
        [name]: {
          audience: customAudience,
          characterLimit: customCharLimit,
        },
      },
    });
  };

  const storyAngles: { angle: StoryAngle; label: string; desc: string }[] = [
    { angle: 'What I Learned', label: 'What I Learned', desc: 'Focus on technical insights and mental model shifts' },
    { angle: 'My Experience', label: 'My Experience', desc: 'Personal chronological journey from morning kickoff to wrap' },
    { angle: 'Best Moment', label: 'Best Moment', desc: 'Zeroing in on a single electrifying keynote or demo surprise' },
    { angle: 'Behind the Scenes', label: 'Behind the Scenes', desc: 'Candid reflections, preparation, and hallway track banter' },
    { angle: 'Achievement', label: 'Achievement / Win', desc: 'Celebrating a completed hackathon build, award, or milestone' },
    { angle: 'Networking', label: 'Networking & People', desc: 'Spotlighting brilliant developers, mentors, and partners' },
    { angle: 'Inspirational', label: 'Inspirational', desc: 'Big-picture future vision and motivational call to action' },
    { angle: 'Event Recap', label: 'Full Event Recap', desc: 'Comprehensive executive summary of the day’s highlights' },
  ];

  const tones: Tone[] = ['Professional', 'Casual', 'Energetic', 'Inspirational', 'Minimal', 'Funny'];
  const lengths: ContentLength[] = ['Short', 'Medium', 'Long'];
  const styles: ContentStyle[] = ['Takeaway', 'Story', 'Achievement', 'Networking', 'Experience', 'Promotional'];
  const emojis: EmojiLevel[] = ['None', 'Low', 'Medium', 'High'];

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl mx-auto bg-white border border-slate-200/90 shadow-sm rounded-2xl p-6 sm:p-8">
      {/* Step Header */}
      <div className="border-b border-slate-100 pb-5">
        <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">Step 3 of 7</span>
        <h2 className="text-2xl font-extrabold text-slate-900 mt-0.5">Platform Adaptation & Story Engine</h2>
        <p className="text-xs text-slate-500 mt-1">
          Configure how the AI should adapt the raw event facts to your target audience and distribution channels.
        </p>
      </div>

      {/* Social Platform Multi-Selection */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Target Social Platforms <span className="text-rose-500">*</span>
          </label>
          <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200">
            {selectedList.length} platform{selectedList.length > 1 ? 's' : ''} selected
          </span>
        </div>

        <p className="text-xs text-slate-500">
          Select multiple platforms. Event2Social will synthesize distinct, platform-native content for each network.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {standardPlatforms.map((p) => {
            const isSelected = selectedList.includes(p.id);
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => togglePlatform(p.id)}
                className={`p-3.5 rounded-xl border text-left transition relative flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-teal-50/60 border-teal-600 ring-1 ring-teal-600 shadow-xs'
                    : 'bg-slate-50/60 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{p.icon}</span>
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center border transition ${
                        isSelected
                          ? 'bg-teal-600 border-teal-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs">{p.name}</h4>
                  <p className="text-[10px] text-slate-500 mt-1 line-clamp-2 leading-tight">
                    {p.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Custom "Other" Platform Inputs */}
        {isOtherSelected && (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Custom Social / Community Platform
              </span>
              <span className="text-[11px] text-teal-700 font-semibold">Custom Parameters</span>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Enter platform name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={customPlatformName}
                onChange={(e) => handleCustomPlatformChange(e.target.value)}
                placeholder="e.g. My Community Portal, Discord, Substack, Slack, Mastodon"
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors"
                autoFocus
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-[10px] font-medium text-slate-600 mb-1">
                  Target Audience (Optional)
                </label>
                <input
                  type="text"
                  value={customAudience}
                  onChange={(e) => {
                    setCustomAudience(e.target.value);
                    if (customPlatformName) {
                      onChange({
                        customPlatformDetails: {
                          ...(context.customPlatformDetails || {}),
                          [customPlatformName]: {
                            audience: e.target.value,
                            characterLimit: customCharLimit,
                          },
                        },
                      });
                    }
                  }}
                  placeholder="e.g. VIP community members, developers"
                  className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-600"
                />
              </div>

              <div>
                <label className="block text-[10px] font-medium text-slate-600 mb-1">
                  Character / Length Limit (Optional)
                </label>
                <input
                  type="text"
                  value={customCharLimit}
                  onChange={(e) => {
                    setCustomCharLimit(e.target.value);
                    if (customPlatformName) {
                      onChange({
                        customPlatformDetails: {
                          ...(context.customPlatformDetails || {}),
                          [customPlatformName]: {
                            audience: customAudience,
                            characterLimit: e.target.value,
                          },
                        },
                      });
                    }
                  }}
                  placeholder="e.g. 500 characters, short bulletin"
                  className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-600"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Story Engine Angle Selector */}
      <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-teal-600" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Story Engine Narrative Arc
            </h3>
          </div>
          <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 border border-teal-200/80 px-2 py-0.5 rounded-md">
            Narrative Framework
          </span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          The <strong>Story Engine</strong> structures your raw facts into a proven social arc: Hook → Context → Authentic Perspective → Takeaway → CTA. Select your primary narrative angle:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          {storyAngles.map((sa) => {
            const isSelected = context.storyAngle === sa.angle;
            return (
              <button
                key={sa.angle}
                type="button"
                onClick={() => onChange({ storyAngle: sa.angle })}
                className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 font-semibold shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div className="text-xs font-semibold">{sa.label}</div>
                <div className={`text-[10px] line-clamp-1 mt-0.5 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                  {sa.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Audience Field */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
          Target Audience Profile
        </label>
        <div className="relative">
          <Users className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={context.audience}
            onChange={(e) => onChange({ audience: e.target.value })}
            placeholder="e.g. Students and technology enthusiasts, Startup founders, Senior engineers"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50/60 border border-slate-200 focus:bg-white focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Tone, Style, Length, Emoji Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Tone Selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Desired Tone
          </label>
          <div className="flex flex-wrap gap-1.5">
            {tones.map((t) => {
              const active = context.tone === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => onChange({ tone: t })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    active
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/60'
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        {/* Style Selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Content Focus Style
          </label>
          <div className="flex flex-wrap gap-1.5">
            {styles.map((s) => {
              const active = context.contentStyle === s;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => onChange({ contentStyle: s })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    active
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/60'
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        {/* Length Selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Post Length
          </label>
          <div className="flex gap-2">
            {lengths.map((l) => {
              const active = context.contentLength === l;
              return (
                <button
                  key={l}
                  type="button"
                  onClick={() => onChange({ contentLength: l })}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition text-center cursor-pointer ${
                    active
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/60'
                  }`}
                >
                  {l}
                </button>
              );
            })}
          </div>
        </div>

        {/* Emoji Level */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Emoji Density
          </label>
          <div className="flex gap-2">
            {emojis.map((em) => {
              const active = context.emojiLevel === em;
              return (
                <button
                  key={em}
                  type="button"
                  onClick={() => onChange({ emojiLevel: em })}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition text-center cursor-pointer ${
                    active
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/60'
                  }`}
                >
                  {em}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Navigation Footer with Primary Generate CTA */}
      <div className="flex items-center justify-between pt-5 border-t border-slate-100">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Media</span>
        </button>

        <button
          type="button"
          onClick={onGenerate}
          disabled={isGenerating || selectedList.length === 0}
          className="flex items-center gap-2.5 px-7 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-sm transition-colors cursor-pointer disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4" />
          <span>
            Generate Content for {selectedList.length} Selected Platform{selectedList.length > 1 ? 's' : ''}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
