import React, { useState } from 'react';
import { UserPreferences, Tone, SocialPlatform, ContentLength, EmojiLevel, StoryAngle } from '../types';
import { X, Settings, RotateCcw } from 'lucide-react';
import { INITIAL_PREFERENCES } from '../data/mockEvents';

interface PreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: UserPreferences;
  onSavePreferences: (prefs: UserPreferences) => void;
}

export const PreferencesModal: React.FC<PreferencesModalProps> = ({
  isOpen,
  onClose,
  preferences,
  onSavePreferences,
}) => {
  if (!isOpen) return null;

  const [localPrefs, setLocalPrefs] = useState<UserPreferences>({ ...preferences });
  const [hashtagInput, setHashtagInput] = useState('');

  const tones: Tone[] = ['Professional', 'Casual', 'Energetic', 'Inspirational', 'Minimal', 'Funny'];
  const platforms: SocialPlatform[] = ['linkedin', 'instagram', 'x', 'threads'];
  const lengths: ContentLength[] = ['Short', 'Medium', 'Long'];
  const emojis: EmojiLevel[] = ['None', 'Low', 'Medium', 'High'];
  const storyAngles: StoryAngle[] = [
    'What I Learned',
    'My Experience',
    'Best Moment',
    'Behind the Scenes',
    'Achievement',
    'Networking',
    'Inspirational',
    'Event Recap',
  ];

  const handleAddHashtag = () => {
    if (!hashtagInput.trim()) return;
    const formatted = hashtagInput.startsWith('#') ? hashtagInput.trim() : `#${hashtagInput.trim()}`;
    if (!localPrefs.frequentlyUsedHashtags.includes(formatted)) {
      setLocalPrefs({
        ...localPrefs,
        frequentlyUsedHashtags: [...localPrefs.frequentlyUsedHashtags, formatted],
      });
    }
    setHashtagInput('');
  };

  const handleRemoveHashtag = (tag: string) => {
    setLocalPrefs({
      ...localPrefs,
      frequentlyUsedHashtags: localPrefs.frequentlyUsedHashtags.filter((t) => t !== tag),
    });
  };

  const handleSave = () => {
    onSavePreferences(localPrefs);
    onClose();
  };

  const handleReset = () => {
    setLocalPrefs({ ...INITIAL_PREFERENCES });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200/80 text-teal-700 flex items-center justify-center">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Default Brand & Creation Preferences</h3>
              <p className="text-xs text-slate-500">
                These defaults pre-populate every new event post you create.
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          {/* Default Platform */}
          <div>
            <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Typical Platform
            </label>
            <div className="grid grid-cols-4 gap-2">
              {platforms.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setLocalPrefs({ ...localPrefs, typicalPlatform: p })}
                  className={`py-2 rounded-xl font-semibold uppercase transition cursor-pointer text-xs ${
                    localPrefs.typicalPlatform === p
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Preferred Tone */}
          <div>
            <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Default Tone
            </label>
            <div className="flex flex-wrap gap-2">
              {tones.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setLocalPrefs({ ...localPrefs, preferredTone: t })}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
                    localPrefs.preferredTone === t
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Preferred Story Angle */}
          <div>
            <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Default Story Angle
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {storyAngles.map((sa) => (
                <button
                  key={sa}
                  type="button"
                  onClick={() => setLocalPrefs({ ...localPrefs, preferredStoryAngle: sa })}
                  className={`p-2 rounded-lg text-left transition cursor-pointer ${
                    localPrefs.preferredStoryAngle === sa
                      ? 'bg-slate-900 text-white font-semibold shadow-xs'
                      : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {sa}
                </button>
              ))}
            </div>
          </div>

          {/* Preferred Length & Emoji Density */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Default Post Length
              </label>
              <div className="flex gap-2">
                {lengths.map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLocalPrefs({ ...localPrefs, preferredLength: l })}
                    className={`flex-1 py-1.5 rounded-lg font-semibold transition text-center cursor-pointer ${
                      localPrefs.preferredLength === l
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Default Emoji Density
              </label>
              <div className="flex gap-2">
                {emojis.map((em) => (
                  <button
                    key={em}
                    type="button"
                    onClick={() => setLocalPrefs({ ...localPrefs, emojiPreference: em })}
                    className={`flex-1 py-1.5 rounded-lg font-semibold transition text-center cursor-pointer ${
                      localPrefs.emojiPreference === em
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {em}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Default User Handle */}
          <div>
            <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Default Social Handle
            </label>
            <input
              type="text"
              value={localPrefs.defaultHandle || ''}
              onChange={(e) => setLocalPrefs({ ...localPrefs, defaultHandle: e.target.value })}
              placeholder="e.g. @alex_builder or @acmetech"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors"
            />
          </div>

          {/* Frequently Used Hashtags */}
          <div className="space-y-2">
            <label className="block font-semibold text-slate-700 uppercase tracking-wider">
              Frequently Used Hashtags
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={hashtagInput}
                onChange={(e) => setHashtagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddHashtag(); } }}
                placeholder="e.g. #BuildInPublic, #TechEvents"
                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors"
              />
              <button
                type="button"
                onClick={handleAddHashtag}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                Add Tag
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {localPrefs.frequentlyUsedHashtags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 border border-slate-200 text-slate-700"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveHashtag(tag)}
                    className="text-slate-400 hover:text-slate-700 cursor-pointer ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Defaults</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-xs transition cursor-pointer"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
