import React, { useState } from 'react';
import { 
  GeneratedPost, 
  EventContextObject, 
  SocialAccount 
} from '../../types';
import { 
  Copy, 
  Check, 
  Download, 
  ExternalLink, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Hash, 
  AtSign, 
  FileText, 
  BookmarkCheck
} from 'lucide-react';

interface Step7Props {
  post: GeneratedPost;
  context: EventContextObject;
  account?: SocialAccount;
  allPosts?: GeneratedPost[];
  onSelectPost?: (post: GeneratedPost) => void;
  onPostPublished?: (publishedPost: GeneratedPost) => void;
  onPostScheduled?: (scheduledPost: GeneratedPost) => void;
  onViewAnalytics?: () => void;
  onBack: () => void;
  isGlobalDemoMode?: boolean;
}

export const Step7PublishSchedule: React.FC<Step7Props> = ({
  post,
  context,
  account,
  allPosts = [],
  onSelectPost,
  onPostPublished,
  onBack,
}) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [isMarkedPosted, setIsMarkedPosted] = useState<boolean>(
    post.status === 'manually_posted' || post.status === 'published'
  );
  const [activePlatformPost, setActivePlatformPost] = useState<GeneratedPost>(post);

  React.useEffect(() => {
    setActivePlatformPost(post);
  }, [post]);

  const currentPost = activePlatformPost;

  const currentMediaUrl =
    currentPost.selectedMediaUrl ||
    context.uploadedMedia?.[0]?.dataUrl ||
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" fill="%23f1f5f9"><rect width="100%" height="100%" fill="%23f8fafc"/><text x="50%" y="50%" fill="%2394a3b8" font-family="sans-serif" font-size="20" text-anchor="middle">Event Media Preview</text></svg>';

  const hashtagsText = (currentPost.hashtags || []).map(h => (h.startsWith('#') ? h : `#${h}`)).join(' ');
  const mentionsText = (currentPost.mentions || []).map(m => (m.handle.startsWith('@') ? m.handle : `@${m.handle}`)).join(' ');

  const fullPostText = [
    currentPost.caption,
    mentionsText ? `\n${mentionsText}` : '',
    hashtagsText ? `\n${hashtagsText}` : '',
  ].filter(Boolean).join('\n');

  const handleCopy = async (text: string, type: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2500);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const handleDownloadImage = () => {
    try {
      const link = document.createElement('a');
      link.href = currentMediaUrl;
      const cleanName = (context.eventName || 'event-post')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-');
      link.download = `${cleanName}-${currentPost.platform || 'social'}-image.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setCopiedType('image_downloaded');
      setTimeout(() => setCopiedType(null), 2500);
    } catch (e) {
      console.error('Failed to download image:', e);
    }
  };

  const getPlatformUrl = (platform: string): string | null => {
    const p = platform.toLowerCase();
    if (p.includes('instagram')) return 'https://www.instagram.com/';
    if (p.includes('linkedin')) return 'https://www.linkedin.com/feed/';
    if (p === 'x' || p.includes('twitter')) return 'https://x.com/compose/post';
    if (p.includes('facebook')) return 'https://www.facebook.com/';
    if (p.includes('threads')) return 'https://www.threads.net/';
    return null;
  };

  const platformUrl = getPlatformUrl(currentPost.platform);

  const handleMarkAsPosted = () => {
    const updated: GeneratedPost = {
      ...currentPost,
      status: 'manually_posted',
    };
    setIsMarkedPosted(true);
    if (onPostPublished) {
      onPostPublished(updated);
    }
  };

  const platformPosts = allPosts.length > 0 ? allPosts : [currentPost];

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto pb-8 bg-white border border-slate-200/90 shadow-sm rounded-2xl p-6 sm:p-8">
      {/* Header */}
      <div className="border-b border-slate-100 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">Step 7 of 7</span>
          <span className="text-slate-300">•</span>
          <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Ready to Post
          </span>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 mt-0.5">Manual Post & Copy Package</h2>
        <p className="text-xs text-slate-500 mt-1">
          Your content is generated, verified, and formatted for each platform. Copy the content below and post it directly to your desired handle.
        </p>
      </div>

      {/* Platform Switcher Tabs (If multiple posts exist) */}
      {platformPosts.length > 1 && (
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
              Select Platform Content to Copy:
            </span>
            <span className="text-[11px] text-teal-700 font-semibold">
              {platformPosts.length} platforms available
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {platformPosts.map((p) => {
              const isActive = p.id === currentPost.id || p.platform === currentPost.platform;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setActivePlatformPost(p);
                    if (onSelectPost) onSelectPost(p);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  <span className="uppercase">{p.platform}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/10 font-normal">
                    {p.variationType}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Ready-to-Post Status Banner */}
      <div className="p-5 rounded-xl bg-emerald-50/80 border border-emerald-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-white text-emerald-800 border border-emerald-200 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Ready for manual posting
            </span>
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              {currentPost.platform}
            </span>
          </div>
          <p className="text-xs text-slate-600">
            Copy the content below and post it directly on your desired <strong className="text-slate-900">@{context.userHandle || account?.handle || 'handle'}</strong>. No connected account permissions required.
          </p>
        </div>

        {/* Action Button: Open Official Platform */}
        {platformUrl && (
          <a
            href={platformUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer shrink-0"
          >
            <span>Open {currentPost.platform.toUpperCase()}</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        )}
      </div>

      {/* Readiness Verification Checklist */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
        <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
          Package Verification Checklist
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-white border border-slate-200 flex items-center gap-2 text-slate-700 shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 font-medium block">CAPTION</span>
              <strong className="text-slate-900 text-xs">{currentPost.caption.length} chars</strong>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-white border border-slate-200 flex items-center gap-2 text-slate-700 shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 font-medium block">MEDIA CROP</span>
              <strong className="text-slate-900 text-xs">{currentPost.imageCrop || '1:1'} ratio</strong>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-white border border-slate-200 flex items-center gap-2 text-slate-700 shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 font-medium block">HASHTAGS</span>
              <strong className="text-slate-900 text-xs">{currentPost.hashtags?.length || 0} ready</strong>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-white border border-slate-200 flex items-center gap-2 text-slate-700 shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 font-medium block">MENTIONS</span>
              <strong className="text-slate-900 text-xs">{currentPost.mentions?.length || 0} handles</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Prominent Quick Action Copy Toolbar */}
      <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span>1-Click Copy Actions</span>
          </span>
          {copiedType && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              Copied to clipboard!
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {/* Copy All Button */}
          <button
            type="button"
            onClick={() => handleCopy(fullPostText, 'all')}
            className={`py-2.5 px-4 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
              copiedType === 'all'
                ? 'bg-emerald-600 text-white'
                : 'bg-teal-600 hover:bg-teal-700 text-white'
            }`}
          >
            {copiedType === 'all' ? (
              <>
                <Check className="w-4 h-4" />
                <span>✓ ALL COPIED!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>COPY ALL POST</span>
              </>
            )}
          </button>

          {/* Copy Caption Button */}
          <button
            type="button"
            onClick={() => handleCopy(currentPost.caption, 'caption')}
            className={`py-2.5 px-4 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer border ${
              copiedType === 'caption'
                ? 'bg-emerald-600 border-emerald-600 text-white'
                : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200 shadow-xs'
            }`}
          >
            {copiedType === 'caption' ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>✓ CAPTION COPIED</span>
              </>
            ) : (
              <>
                <FileText className="w-4 h-4 text-teal-600" />
                <span>COPY CAPTION</span>
              </>
            )}
          </button>

          {/* Copy Hashtags Button */}
          <button
            type="button"
            onClick={() => handleCopy(hashtagsText, 'hashtags')}
            className={`py-2.5 px-4 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer border ${
              copiedType === 'hashtags'
                ? 'bg-emerald-600 border-emerald-600 text-white'
                : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200 shadow-xs'
            }`}
          >
            {copiedType === 'hashtags' ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>✓ TAGS COPIED</span>
              </>
            ) : (
              <>
                <Hash className="w-4 h-4 text-slate-500" />
                <span>COPY HASHTAGS</span>
              </>
            )}
          </button>

          {/* Download Image Button */}
          <button
            type="button"
            onClick={handleDownloadImage}
            className={`py-2.5 px-4 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer border ${
              copiedType === 'image_downloaded'
                ? 'bg-emerald-600 border-emerald-600 text-white'
                : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200 shadow-xs'
            }`}
          >
            {copiedType === 'image_downloaded' ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>✓ DOWNLOADED</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-slate-500" />
                <span>DOWNLOAD IMAGE</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Manual Post Package Detailed Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Media Preview & Image Info (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-800 uppercase tracking-wide">
                Post Media
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-white border border-slate-200 text-slate-700">
                {currentPost.imageCrop || '1:1'}
              </span>
            </div>

            <div className="relative rounded-lg overflow-hidden border border-slate-200 bg-white group">
              <img
                src={currentMediaUrl}
                alt="Event Media"
                className="w-full h-auto object-cover max-h-72"
              />
              <button
                type="button"
                onClick={handleDownloadImage}
                className="absolute bottom-2 right-2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-900 text-white text-[11px] font-semibold transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-500 leading-normal">
              Formatted for <strong className="text-slate-800">{currentPost.platform.toUpperCase()}</strong> feeds. Attach when posting manually.
            </p>
          </div>

          {/* Manual Posting Guide Box */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <h4 className="font-semibold text-slate-800 flex items-center gap-1.5">
              <span>Quick Posting Steps</span>
            </h4>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-600 text-[11px]">
              <li>Click <strong>COPY ALL POST</strong> above.</li>
              <li>Download the optimized image if needed.</li>
              <li>Open your <strong>{currentPost.platform.toUpperCase()}</strong> app or web feed.</li>
              <li>Paste the caption directly into the composer.</li>
              <li>Attach the downloaded image and tap Post!</li>
            </ol>
          </div>
        </div>

        {/* Right Column: Text Content Modules (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Caption Box */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-teal-600" />
                <span>Caption Content</span>
              </label>
              <button
                type="button"
                onClick={() => handleCopy(currentPost.caption, 'caption')}
                className="flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-800 transition cursor-pointer"
              >
                {copiedType === 'caption' ? (
                  <span className="text-emerald-700 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Copied
                  </span>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Caption</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap font-sans select-all shadow-xs">
              {currentPost.caption}
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span>Style: <strong className="text-slate-700">{currentPost.variationType}</strong></span>
              <span>{currentPost.caption.length} characters</span>
            </div>
          </div>

          {/* Hashtags Box */}
          {currentPost.hashtags && currentPost.hashtags.length > 0 && (
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Hash className="w-4 h-4 text-slate-600" />
                  <span>Hashtags</span>
                </label>
                <button
                  type="button"
                  onClick={() => handleCopy(hashtagsText, 'hashtags')}
                  className="flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-800 transition cursor-pointer"
                >
                  {copiedType === 'hashtags' ? (
                    <span className="text-emerald-700 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Copied
                    </span>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Hashtags</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {currentPost.hashtags.map((tag, idx) => {
                  const tagText = tag.startsWith('#') ? tag : `#${tag}`;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleCopy(tagText, `tag-${idx}`)}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 transition flex items-center gap-1 cursor-pointer shadow-xs"
                      title="Click to copy this hashtag"
                    >
                      <span>{tagText}</span>
                      {copiedType === `tag-${idx}` && (
                        <Check className="w-3 h-3 text-emerald-600" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Mentions Box */}
          {currentPost.mentions && currentPost.mentions.length > 0 && (
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <AtSign className="w-4 h-4 text-slate-600" />
                  <span>Suggested Mentions</span>
                </label>
                <button
                  type="button"
                  onClick={() => handleCopy(mentionsText, 'mentions')}
                  className="flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-800 transition cursor-pointer"
                >
                  {copiedType === 'mentions' ? (
                    <span className="text-emerald-700 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Copied
                    </span>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Mentions</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {currentPost.mentions.map((m, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-xs bg-white border border-slate-200 text-slate-700 flex items-center gap-1.5 shadow-xs"
                  >
                    <strong>{m.handle}</strong>
                    <span className="text-[10px] text-slate-400">({m.reason})</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Full Assembled Post (All In One) */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-teal-600" />
                <span>Complete Ready Post (All-In-One)</span>
              </label>
              <button
                type="button"
                onClick={() => handleCopy(fullPostText, 'all')}
                className="flex items-center gap-1 px-3 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-xs font-semibold transition cursor-pointer"
              >
                {copiedType === 'all' ? (
                  <span className="flex items-center gap-1 text-emerald-800">
                    <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied Full Post!
                  </span>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Full Post</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 whitespace-pre-wrap font-sans max-h-56 overflow-y-auto select-all shadow-xs leading-relaxed">
              {fullPostText}
            </div>
          </div>
        </div>
      </div>

      {/* Completion & Record Status Footer */}
      <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            isMarkedPosted ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
          }`}>
            <BookmarkCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              {isMarkedPosted ? 'Marked as Manually Posted' : 'Manual Post Ready'}
            </h4>
            <p className="text-xs text-slate-500">
              {isMarkedPosted 
                ? 'Recorded in your event post history as shared.'
                : 'After copying and sharing to your handle, mark as posted to track in history.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          {!isMarkedPosted ? (
            <button
              type="button"
              onClick={handleMarkAsPosted}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs transition flex items-center gap-2 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Mark as Manually Posted</span>
            </button>
          ) : (
            <span className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Status: Manually Posted</span>
            </span>
          )}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-5 border-t border-slate-100">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Preview Studio</span>
        </button>
      </div>
    </div>
  );
};
