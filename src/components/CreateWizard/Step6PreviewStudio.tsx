import React, { useState } from 'react';
import { 
  GeneratedPost, 
  EventContextObject, 
  SocialPlatform, 
  AspectRatio 
} from '../../types';
import { 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  Share2, 
  Repeat2, 
  MoreHorizontal, 
  ThumbsUp, 
  Smile, 
  Sparkles, 
  Crop, 
  Edit3, 
  RotateCcw, 
  Save, 
  ArrowRight, 
  ArrowLeft,
  Check,
  Smartphone,
  Copy
} from 'lucide-react';
import { api } from '../../services/api';

interface Step6Props {
  post: GeneratedPost;
  context: EventContextObject;
  onUpdatePost: (post: GeneratedPost) => void;
  onSaveDraft: () => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step6PreviewStudio: React.FC<Step6Props> = ({
  post,
  context,
  onUpdatePost,
  onSaveDraft,
  onNext,
  onBack,
}) => {
  const [activePlatform, setActivePlatform] = useState<SocialPlatform>(post.platform);
  const [liveCaption, setLiveCaption] = useState<string>(post.caption);
  const [selectedCrop, setSelectedCrop] = useState<AspectRatio>(post.imageCrop || '1:1');
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(312);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isRegenerating, setIsRegenerating] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopyPostContent = async () => {
    try {
      const hashtagsStr = (post.hashtags || []).map(h => (h.startsWith('#') ? h : `#${h}`)).join(' ');
      const mentionsStr = (post.mentions || []).map(m => (m.handle.startsWith('@') ? m.handle : `@${m.handle}`)).join(' ');
      const fullText = [liveCaption, mentionsStr, hashtagsStr].filter(Boolean).join('\n\n');
      
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
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  const displayImage =
    context.uploadedMedia?.[0]?.dataUrl ||
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" fill="%231e293b"><rect width="100%" height="100%" fill="%230f172a"/><text x="50%" y="50%" fill="%2364748b" font-family="sans-serif" font-size="20" text-anchor="middle">Event Media Preview</text></svg>';

  const handleCaptionChange = (newCaption: string) => {
    setLiveCaption(newCaption);
    onUpdatePost({
      ...post,
      caption: newCaption,
    });
  };

  const handleCropChange = (crop: AspectRatio) => {
    setSelectedCrop(crop);
    onUpdatePost({
      ...post,
      imageCrop: crop,
    });
  };

  const handlePlatformChange = (platform: SocialPlatform) => {
    setActivePlatform(platform);
    onUpdatePost({
      ...post,
      platform,
    });
  };

  const handleQuickRegenerate = async (mode: string) => {
    setIsRegenerating(true);
    try {
      const updated = await api.regeneratePost({
        eventContext: context,
        currentPost: post,
        regenerationMode: mode,
      });
      setLiveCaption(updated.caption);
      onUpdatePost(updated);
    } catch (err) {
      console.error(err);
    } finally {
      setIsRegenerating(false);
    }
  };

  const getCropClass = (crop: AspectRatio) => {
    switch (crop) {
      case '1:1':
        return 'aspect-square';
      case '4:5':
        return 'aspect-[4/5]';
      case '16:9':
        return 'aspect-[16/9]';
      case '9:16':
        return 'aspect-[9/16]';
      default:
        return 'aspect-square';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/90 pb-4">
        <div>
          <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">Step 6 of 7</span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-0.5">Unified Preview Studio</h2>
          <p className="text-xs text-slate-500 mt-1">
            Exact mobile simulator for {activePlatform.toUpperCase()}. Edits on the left synchronize immediately with the phone preview on the right.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyPostContent}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer border ${
              isCopied
                ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                : 'bg-teal-50 hover:bg-teal-100 text-teal-800 border-teal-200'
            }`}
            title="Copy this post directly to clipboard"
          >
            {isCopied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>✓ Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Post</span>
              </>
            )}
          </button>

          <button
            onClick={onSaveDraft}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold transition cursor-pointer shadow-xs"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Draft</span>
          </button>

          <button
            onClick={onNext}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-sm transition cursor-pointer"
          >
            <span>Ready to Post & Copy →</span>
          </button>
        </div>
      </div>

      {/* Main Studio Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Live Controls & Content Editor (5 cols) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Platform Switcher */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Change Active Platform Preview
              </label>
              {context.selectedPlatforms && context.selectedPlatforms.length > 1 && (
                <span className="text-[11px] font-semibold text-teal-700">
                  {context.selectedPlatforms.length} chosen for this event
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set([
                ...(context.selectedPlatforms || []).map((s) => s.toLowerCase()),
                post.platform.toLowerCase(),
                'instagram',
                'linkedin',
                'x',
                'facebook',
                'threads',
              ])).map((plt) => (
                <button
                  key={plt}
                  onClick={() => handlePlatformChange(plt as SocialPlatform)}
                  className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition text-center uppercase tracking-wider cursor-pointer ${
                    activePlatform.toLowerCase() === plt
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200/60'
                  }`}
                >
                  {plt}
                </button>
              ))}
            </div>
          </div>

          {/* Aspect Ratio & Crop Selector */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Feed Aspect Ratio & Crop
              </label>
              <span className="text-[11px] text-teal-700 font-mono font-medium">
                {selectedCrop === '4:5'
                  ? 'Recommended for Mobile Portals'
                  : selectedCrop === '1:1'
                  ? 'Classic Square Feed'
                  : selectedCrop === '16:9'
                  ? 'Desktop & X Landscape'
                  : 'Full Screen Story'}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {(['1:1', '4:5', '16:9', '9:16'] as AspectRatio[]).map((crop) => (
                <button
                  key={crop}
                  onClick={() => handleCropChange(crop)}
                  className={`py-2 rounded-lg text-xs font-semibold transition text-center cursor-pointer ${
                    selectedCrop === crop
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200/60'
                  }`}
                >
                  {crop}
                </button>
              ))}
            </div>
          </div>

          {/* Live Caption Editor */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Live Caption Editor
              </label>
              <span className="text-[11px] text-slate-400 font-mono">
                {liveCaption.length} characters
              </span>
            </div>
            <textarea
              rows={9}
              value={liveCaption}
              onChange={(e) => handleCaptionChange(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50/60 border border-slate-200 focus:bg-white focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none transition leading-relaxed scrollbar-thin"
              placeholder="Edit caption in real time..."
            />
          </div>

          {/* Quick AI Regeneration Actions */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>1-Click AI Polish</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button
                disabled={isRegenerating}
                onClick={() => handleQuickRegenerate('Make it more professional')}
                className="p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-xs font-medium text-slate-700 border border-slate-200 transition text-left cursor-pointer"
              >
                More Professional
              </button>
              <button
                disabled={isRegenerating}
                onClick={() => handleQuickRegenerate('Make it shorter')}
                className="p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-xs font-medium text-slate-700 border border-slate-200 transition text-left cursor-pointer"
              >
                Punchier & Shorter
              </button>
              <button
                disabled={isRegenerating}
                onClick={() => handleQuickRegenerate('Add stronger hook')}
                className="p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-xs font-medium text-slate-700 border border-slate-200 transition text-left cursor-pointer"
              >
                Stronger Hook
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Realistic Mobile Phone Simulator (6 cols) */}
        <div className="lg:col-span-6 flex justify-center p-6 sm:p-8 rounded-3xl bg-slate-100/70 border border-slate-200">
          <div className="w-full max-w-[390px] rounded-[44px] bg-slate-950 border-[8px] border-slate-800 shadow-2xl p-4 overflow-hidden relative min-h-[640px] flex flex-col justify-between">
            {/* Phone Notch & Status Bar */}
            <div className="w-36 h-4 bg-slate-800 rounded-b-xl mx-auto -mt-4 mb-2 flex items-center justify-center">
              <div className="w-10 h-2 bg-slate-950 rounded-full" />
            </div>

            {/* Platform Native Header */}
            {activePlatform === 'instagram' && (
              <div className="flex items-center justify-between py-2 border-b border-slate-900 text-white">
                <span className="font-extrabold text-sm tracking-tight">Instagram</span>
                <div className="flex items-center gap-3">
                  <Heart className="w-4 h-4" />
                  <MessageCircle className="w-4 h-4" />
                </div>
              </div>
            )}

            {activePlatform === 'linkedin' && (
              <div className="flex items-center justify-between py-2 border-b border-slate-900 text-white">
                <span className="font-bold text-sm tracking-tight text-[#0a66c2]">LinkedIn</span>
                <span className="text-[10px] text-slate-400 font-semibold">Feed</span>
              </div>
            )}

            {activePlatform === 'x' && (
              <div className="flex items-center justify-between py-2 border-b border-slate-900 text-white">
                <span className="font-black text-sm">𝕏</span>
                <span className="text-[11px] font-bold text-slate-400">For you</span>
                <MoreHorizontal className="w-4 h-4 text-slate-400" />
              </div>
            )}

            {activePlatform === 'threads' && (
              <div className="flex items-center justify-center py-2 border-b border-slate-900 text-white">
                <span className="font-bold text-base">@</span>
              </div>
            )}

            {activePlatform === 'facebook' && (
              <div className="flex items-center justify-between py-2 border-b border-slate-900 text-white">
                <span className="font-bold text-sm tracking-tight text-[#1877f2]">facebook</span>
                <span className="text-[10px] text-slate-400 font-semibold">Feed</span>
              </div>
            )}

            {activePlatform !== 'linkedin' && activePlatform !== 'instagram' && activePlatform !== 'x' && activePlatform !== 'threads' && activePlatform !== 'facebook' && (
              <div className="flex items-center justify-between py-2 border-b border-slate-900 text-white">
                <span className="font-bold text-xs tracking-tight text-amber-400 uppercase">{activePlatform}</span>
                <span className="text-[10px] text-slate-400 font-semibold">Channel</span>
              </div>
            )}

            {/* Post Card Content */}
            <div className="flex-1 overflow-y-auto py-2 space-y-3 scrollbar-none">
              {/* User Profile Bar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full ring-2 ring-teal-500/30 overflow-hidden bg-slate-800">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                      alt="Avatar"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-white">
                        {activePlatform === 'linkedin' ? 'Alex Morgan' : 'alex_dev'}
                      </span>
                      {activePlatform === 'linkedin' && (
                        <span className="text-[10px] text-slate-400">• 1st</span>
                      )}
                      {activePlatform === 'x' && (
                        <span className="text-[10px] text-cyan-400">✓</span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400">
                      {activePlatform === 'linkedin'
                        ? 'Full-Stack AI Engineer | Tech Arena Attendee'
                        : `${context.location || 'Bangalore'} • Just now`}
                    </p>
                  </div>
                </div>
                <MoreHorizontal className="w-4 h-4 text-slate-400" />
              </div>

              {/* LinkedIn Post Text Top (LinkedIn shows text above image) */}
              {activePlatform === 'linkedin' && (
                <div className="text-[11px] text-slate-200 whitespace-pre-line leading-relaxed">
                  {liveCaption}
                </div>
              )}

              {/* X Post Text Top */}
              {activePlatform === 'x' && (
                <div className="text-xs text-slate-200 whitespace-pre-line leading-relaxed">
                  {liveCaption}
                </div>
              )}

              {/* Facebook Post Text Top */}
              {activePlatform === 'facebook' && (
                <div className="text-xs text-slate-200 whitespace-pre-line leading-relaxed">
                  {liveCaption}
                </div>
              )}

              {/* Custom / Other Platform Post Text Top */}
              {activePlatform !== 'linkedin' && activePlatform !== 'instagram' && activePlatform !== 'x' && activePlatform !== 'threads' && activePlatform !== 'facebook' && (
                <div className="text-xs text-slate-200 whitespace-pre-line leading-relaxed">
                  {liveCaption}
                </div>
              )}

              {/* Image Container with Dynamic Crop */}
              <div className={`w-full overflow-hidden rounded-xl bg-slate-900 border border-slate-800 relative ${getCropClass(selectedCrop)}`}>
                <img
                  src={displayImage}
                  alt="Event visual"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-slate-950/80 text-[9px] font-mono text-slate-300">
                  {selectedCrop}
                </span>
              </div>

              {/* Instagram & Threads Post Text Below Image */}
              {(activePlatform === 'instagram' || activePlatform === 'threads') && (
                <div className="space-y-1.5">
                  <div className="text-xs text-slate-200 whitespace-pre-line leading-relaxed">
                    <span className="font-bold text-white mr-1.5">alex_dev</span>
                    {liveCaption}
                  </div>
                  <div className="flex flex-wrap gap-1 text-[11px] text-indigo-400 font-medium">
                    {post.hashtags?.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Platform Engagement Action Bars */}
              {activePlatform === 'instagram' && (
                <div className="space-y-2 pt-2 border-t border-slate-900">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          setIsLiked(!isLiked);
                          setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
                        }}
                        className="transition hover:scale-110 cursor-pointer"
                      >
                        <Heart className={`w-5 h-5 ${isLiked ? 'text-rose-500 fill-rose-500' : ''}`} />
                      </button>
                      <MessageCircle className="w-5 h-5" />
                      <Send className="w-5 h-5" />
                    </div>
                    <button onClick={() => setIsSaved(!isSaved)} className="cursor-pointer">
                      <Bookmark className={`w-5 h-5 ${isSaved ? 'text-white fill-white' : ''}`} />
                    </button>
                  </div>
                  <div className="text-[11px] font-bold text-white">
                    {likeCount.toLocaleString()} likes
                  </div>
                </div>
              )}

              {activePlatform === 'linkedin' && (
                <div className="space-y-2 pt-2 border-t border-slate-900">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-3.5 h-3.5 text-[#0a66c2] fill-[#0a66c2]" />
                      <span>{likeCount} reactions</span>
                    </span>
                    <span>48 comments • 26 reposts</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1 pt-1 border-t border-slate-900 text-center text-slate-400 text-[10px] font-semibold">
                    <button
                      onClick={() => setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)}
                      className="py-1 hover:text-white flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <ThumbsUp className="w-3 h-3" /> Like
                    </button>
                    <button className="py-1 hover:text-white flex items-center justify-center gap-1 cursor-pointer">
                      <MessageCircle className="w-3 h-3" /> Comment
                    </button>
                    <button className="py-1 hover:text-white flex items-center justify-center gap-1 cursor-pointer">
                      <Repeat2 className="w-3 h-3" /> Repost
                    </button>
                    <button className="py-1 hover:text-white flex items-center justify-center gap-1 cursor-pointer">
                      <Send className="w-3 h-3" /> Send
                    </button>
                  </div>
                </div>
              )}

              {activePlatform === 'x' && (
                <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-slate-400 text-xs">
                  <span className="flex items-center gap-1 hover:text-slate-200 cursor-pointer">
                    <MessageCircle className="w-3.5 h-3.5" /> 24
                  </span>
                  <span className="flex items-center gap-1 hover:text-teal-400 cursor-pointer">
                    <Repeat2 className="w-3.5 h-3.5" /> 18
                  </span>
                  <span
                    onClick={() => setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)}
                    className="flex items-center gap-1 hover:text-rose-400 cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5" /> {likeCount}
                  </span>
                  <span className="flex items-center gap-1 hover:text-teal-400 cursor-pointer">
                    <Bookmark className="w-3.5 h-3.5" /> 42
                  </span>
                </div>
              )}

              {activePlatform === 'facebook' && (
                <div className="space-y-2 pt-2 border-t border-slate-900">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-3.5 h-3.5 text-[#1877f2] fill-[#1877f2]" />
                      <span>{likeCount} likes</span>
                    </span>
                    <span>14 comments • 9 shares</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1 pt-1 border-t border-slate-900 text-center text-slate-400 text-[10px] font-semibold">
                    <button
                      onClick={() => setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)}
                      className="py-1 hover:text-white flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <ThumbsUp className="w-3 h-3" /> Like
                    </button>
                    <button className="py-1 hover:text-white flex items-center justify-center gap-1 cursor-pointer">
                      <MessageCircle className="w-3 h-3" /> Comment
                    </button>
                    <button className="py-1 hover:text-white flex items-center justify-center gap-1 cursor-pointer">
                      <Share2 className="w-3 h-3" /> Share
                    </button>
                  </div>
                </div>
              )}

              {(activePlatform === 'threads' || (activePlatform !== 'linkedin' && activePlatform !== 'instagram' && activePlatform !== 'x' && activePlatform !== 'facebook')) && (
                <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-slate-400 text-xs">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => {
                        setIsLiked(!isLiked);
                        setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
                      }}
                      className="hover:text-rose-400 transition cursor-pointer"
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'text-rose-500 fill-rose-500' : ''}`} />
                    </button>
                    <button className="hover:text-white transition cursor-pointer">
                      <MessageCircle className="w-4 h-4" />
                    </button>
                    <button className="hover:text-emerald-400 transition cursor-pointer">
                      <Repeat2 className="w-4 h-4" />
                    </button>
                    <button className="hover:text-cyan-400 transition cursor-pointer">
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-[10px] text-slate-500">{likeCount} likes</span>
                </div>
              )}
            </div>

            {/* Phone Home Indicator Bar */}
            <div className="w-32 h-1 bg-slate-700 rounded-full mx-auto mt-2" />
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-5 border-t border-slate-200/90">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Variations</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm shadow-sm transition-colors cursor-pointer"
        >
          <span>Continue to Ready to Post & Copy</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
