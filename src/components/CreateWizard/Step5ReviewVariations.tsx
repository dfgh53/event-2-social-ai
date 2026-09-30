import React, { useState } from 'react';
import { 
  GeneratedPost, 
  EventContextObject, 
  AspectRatio 
} from '../../types';
import { 
  RotateCcw, 
  Edit3, 
  Copy, 
  Check, 
  Hash, 
  AtSign, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  ArrowRight, 
  ArrowLeft, 
  Crop 
} from 'lucide-react';
import { api } from '../../services/api';

interface Step5Props {
  posts: GeneratedPost[];
  context: EventContextObject;
  onSelectPost: (post: GeneratedPost) => void;
  onUpdatePost: (updatedPost: GeneratedPost) => void;
  onDuplicatePost: (post: GeneratedPost) => void;
  onOpenCropModal: (post: GeneratedPost) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step5ReviewVariations: React.FC<Step5Props> = ({
  posts,
  context,
  onSelectPost,
  onUpdatePost,
  onDuplicatePost,
  onOpenCropModal,
  onNext,
  onBack,
}) => {
  const [selectedPostId, setSelectedPostId] = useState<string>(posts[0]?.id || '');
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editedCaption, setEditedCaption] = useState<string>('');
  const [regeneratingPostId, setRegeneratingPostId] = useState<string | null>(null);
  const [showRegenMenuId, setShowRegenMenuId] = useState<string | null>(null);
  const [expandedStoryId, setExpandedStoryId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [platformFilter, setPlatformFilter] = useState<string>('all');

  const platformsInPosts = Array.from(new Set(posts.map((p) => p.platform.toLowerCase())));

  const filteredPosts = platformFilter === 'all'
    ? posts
    : posts.filter((p) => p.platform.toLowerCase() === platformFilter.toLowerCase());

  const regenModes = [
    { mode: 'Make it more professional', label: 'More Professional' },
    { mode: 'Make it more exciting', label: 'More Exciting & Vibrant' },
    { mode: 'Make it shorter', label: 'Shorter & Punchier' },
    { mode: 'Make it more personal', label: 'More Personal & Authentic' },
    { mode: 'Add stronger hook', label: 'Stronger Scroll-Stopping Hook' },
    { mode: 'Add takeaway', label: 'Emphasize Key Takeaways' },
    { mode: 'Reduce emojis', label: 'Minimal / No Emojis' },
    { mode: 'Increase emojis', label: 'Add Expressive Emojis' },
    { mode: 'Change storytelling angle', label: 'Shift Storytelling Angle' },
  ];

  const handleStartEdit = (post: GeneratedPost) => {
    setEditingPostId(post.id);
    setEditedCaption(post.caption);
  };

  const handleSaveEdit = (post: GeneratedPost) => {
    onUpdatePost({
      ...post,
      caption: editedCaption,
    });
    setEditingPostId(null);
  };

  const handleRegenerate = async (post: GeneratedPost, mode: string) => {
    setRegeneratingPostId(post.id);
    setShowRegenMenuId(null);
    try {
      const updated = await api.regeneratePost({
        eventContext: context,
        currentPost: post,
        regenerationMode: mode,
      });
      onUpdatePost(updated);
    } catch (err) {
      console.error('Regeneration error:', err);
    } finally {
      setRegeneratingPostId(null);
    }
  };

  const handleCopyCaption = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleToggleMention = (postId: string, handleIndex: number, confirmed: boolean) => {
    const post = posts.find((p) => p.id === postId);
    if (!post) return;
    const updatedMentions = [...post.mentions];
    updatedMentions[handleIndex] = {
      ...updatedMentions[handleIndex],
      confirmed,
    };
    onUpdatePost({ ...post, mentions: updatedMentions });
  };

  const handleRemoveMention = (postId: string, handleIndex: number) => {
    const post = posts.find((p) => p.id === postId);
    if (!post) return;
    const updatedMentions = post.mentions.filter((_, idx) => idx !== handleIndex);
    onUpdatePost({ ...post, mentions: updatedMentions });
  };

  const activePost = posts.find((p) => p.id === selectedPostId) || posts[0];

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/90 pb-4">
        <div>
          <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">Step 5 of 7</span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-0.5">Review & Customize Variations</h2>
          <p className="text-xs text-slate-500 mt-1">
            Compare platform-tailored variations. Edit captions, regenerate angles, or inspect the story arc.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              if (activePost) onSelectPost(activePost);
              onNext();
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-sm transition-colors cursor-pointer"
          >
            <span>Preview in Mobile Studio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Multi-Platform Filter Bar */}
      {platformsInPosts.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-1 shrink-0">
            Platform:
          </span>
          <button
            type="button"
            onClick={() => setPlatformFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 cursor-pointer ${
              platformFilter === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
            }`}
          >
            All Platforms ({posts.length})
          </button>
          {platformsInPosts.map((plt) => {
            const count = posts.filter((p) => p.platform.toLowerCase() === plt).length;
            return (
              <button
                key={plt}
                type="button"
                onClick={() => setPlatformFilter(plt)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors uppercase tracking-wider shrink-0 cursor-pointer ${
                  platformFilter === plt
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                {plt} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* Variations Selection Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {filteredPosts.map((post, index) => {
          const isSelected = post.id === selectedPostId;
          const isRegen = regeneratingPostId === post.id;
          const isStoryExpanded = expandedStoryId === post.id;
          const isEditing = editingPostId === post.id;

          return (
            <div
              key={post.id}
              className={`rounded-2xl border transition-all flex flex-col justify-between overflow-hidden bg-white ${
                isSelected
                  ? 'border-teal-600 ring-1 ring-teal-600 shadow-md'
                  : 'border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              {/* Card Header */}
              <div className="p-4 border-b border-slate-100 bg-slate-50/60 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                      {index + 1}
                    </span>
                    <h3 className="font-bold text-slate-900 text-xs truncate">
                      {post.variationType}
                    </h3>
                  </div>

                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                    {post.platform}
                  </span>
                </div>

                {/* Hook Callout */}
                <div className="p-2.5 rounded-lg bg-teal-50/80 border border-teal-200/80 text-[11px] font-semibold text-teal-950 line-clamp-2">
                  Hook: "{post.hook}"
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-3 flex-1">
                {/* Caption View / Edit */}
                {isEditing ? (
                  <div className="space-y-2">
                    <textarea
                      rows={8}
                      value={editedCaption}
                      onChange={(e) => setEditedCaption(e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-slate-50 border border-teal-500 text-xs text-slate-900 focus:outline-none"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingPostId(null)}
                        className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-[11px] text-slate-700 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveEdit(post)}
                        className="px-2.5 py-1 rounded bg-teal-600 hover:bg-teal-700 text-[11px] text-white font-semibold cursor-pointer"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-slate-700 whitespace-pre-line leading-relaxed max-h-56 overflow-y-auto pr-1 scrollbar-thin">
                    {post.caption}
                  </div>
                )}

                {/* Hashtags */}
                <div className="pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-500 mb-1">
                    <Hash className="w-3 h-3 text-teal-600" />
                    <span>SMART HASHTAGS</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {post.hashtags?.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Mentions & Safety Verification */}
                {post.mentions && post.mentions.length > 0 && (
                  <div className="pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-500 mb-1">
                      <AtSign className="w-3 h-3 text-slate-600" />
                      <span>SUGGESTED MENTIONS</span>
                    </div>
                    <div className="space-y-1">
                      {post.mentions.map((m, mIdx) => (
                        <div
                          key={m.handle}
                          className="flex items-center justify-between p-1.5 rounded bg-slate-50 border border-slate-200 text-[10px]"
                        >
                          <div>
                            <span className="font-semibold text-slate-900">{m.handle}</span>
                            <span className="text-slate-500 ml-1">({m.reason})</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {m.confirmed ? (
                              <span className="text-emerald-800 font-semibold text-[9px] px-1.5 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                                Confirmed
                              </span>
                            ) : (
                              <button
                                onClick={() => handleToggleMention(post.id, mIdx, true)}
                                className="px-1.5 py-0.5 rounded bg-teal-50 hover:bg-teal-100 text-teal-800 text-[9px] font-semibold transition border border-teal-200 cursor-pointer"
                              >
                                Confirm
                              </button>
                            )}
                            <button
                              onClick={() => handleRemoveMention(post.id, mIdx)}
                              className="text-slate-400 hover:text-rose-600 p-0.5 cursor-pointer"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Story Structure Inspector Accordion */}
                {post.storyStructure && (
                  <div className="pt-2 border-t border-slate-100">
                    <button
                      onClick={() => setExpandedStoryId(isStoryExpanded ? null : post.id)}
                      className="flex items-center justify-between w-full text-[10px] font-semibold text-teal-800 uppercase tracking-wider py-1 cursor-pointer"
                    >
                      <span className="flex items-center gap-1">
                        <Layers className="w-3 h-3" />
                        <span>Story Arc Breakdown</span>
                      </span>
                      {isStoryExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>

                    {isStoryExpanded && (
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] space-y-1.5 text-slate-700 mt-1">
                        <div><strong className="text-slate-900">1. Hook:</strong> {post.storyStructure.hook}</div>
                        <div><strong className="text-slate-900">2. Context:</strong> {post.storyStructure.whatHappened}</div>
                        <div><strong className="text-slate-900">3. Perspective:</strong> {post.storyStructure.personalExperience}</div>
                        <div><strong className="text-slate-900">4. Key Takeaway:</strong> {post.storyStructure.keyTakeaway}</div>
                        <div><strong className="text-slate-900">5. Close:</strong> {post.storyStructure.close}</div>
                        <div><strong className="text-slate-900">6. Call To Action:</strong> {post.storyStructure.callToAction}</div>
                      </div>
                    )}
                  </div>
                )}

                {/* Confidence Notes */}
                {post.confidenceNotes && post.confidenceNotes.length > 0 && (
                  <div className="p-2 rounded bg-slate-50 border border-slate-200 text-[10px] text-slate-600 space-y-0.5">
                    <div className="font-semibold text-slate-800 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-teal-600" />
                      <span>Verified Ground Truth</span>
                    </div>
                    {post.confidenceNotes.map((note, nIdx) => (
                      <div key={nIdx} className="truncate">• {note}</div>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="p-3 bg-slate-50/80 border-t border-slate-100 space-y-2">
                {/* Main Action Bar */}
                <div className="flex items-center justify-between gap-1.5">
                  <button
                    onClick={() => {
                      setSelectedPostId(post.id);
                      onSelectPost(post);
                    }}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-1 ${
                      isSelected
                        ? 'bg-teal-600 text-white shadow-xs'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {isSelected ? <Check className="w-3 h-3" /> : null}
                    <span>{isSelected ? 'Selected' : 'Select'}</span>
                  </button>

                  {/* Regenerate Dropdown Trigger */}
                  <div className="relative">
                    <button
                      onClick={() => setShowRegenMenuId(showRegenMenuId === post.id ? null : post.id)}
                      disabled={isRegen}
                      className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 transition cursor-pointer"
                      title="Regenerate this variation"
                    >
                      <RotateCcw className={`w-3.5 h-3.5 ${isRegen ? 'animate-spin text-teal-600' : ''}`} />
                    </button>

                    {/* Regeneration Modes Menu */}
                    {showRegenMenuId === post.id && (
                      <div className="absolute right-0 bottom-full mb-2 w-56 rounded-xl bg-white border border-slate-200 shadow-xl p-1.5 z-30 space-y-1">
                        <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Regeneration Presets
                        </div>
                        {regenModes.map((item) => (
                          <button
                            key={item.mode}
                            onClick={() => handleRegenerate(post, item.mode)}
                            className="w-full text-left px-2 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition cursor-pointer"
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Edit Caption Button */}
                  <button
                    onClick={() => handleStartEdit(post)}
                    className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 transition cursor-pointer"
                    title="Edit caption text"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  {/* Optimize Media Crop */}
                  <button
                    onClick={() => onOpenCropModal(post)}
                    className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 transition cursor-pointer"
                    title="Optimize media crop"
                  >
                    <Crop className="w-3.5 h-3.5" />
                  </button>

                  {/* Copy Button */}
                  <button
                    onClick={() => handleCopyCaption(post.caption, post.id)}
                    className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 transition cursor-pointer"
                    title="Copy full post text"
                  >
                    {copiedId === post.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-5 border-t border-slate-200/90">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Configuration</span>
        </button>

        <button
          type="button"
          onClick={() => {
            if (activePost) onSelectPost(activePost);
            onNext();
          }}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm shadow-sm transition-colors cursor-pointer"
        >
          <span>Continue to Mobile Preview Studio</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
