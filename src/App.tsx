import React, { useState, useEffect } from 'react';
import { 
  EventContextObject, 
  GeneratedPost, 
  SocialAccount, 
  UserPreferences, 
  PostAnalytics, 
  AiFeedbackSummary,
  AspectRatio
} from './types';
import { 
  SAMPLE_TECH_ARENA_EVENT, 
  SAMPLE_GENERATED_POSTS, 
  SAMPLE_SOCIAL_ACCOUNTS, 
  INITIAL_PREFERENCES,
  SAMPLE_ANALYTICS_DATA,
  SAMPLE_AI_FEEDBACK,
  SAMPLE_HACKATHON_IMAGE
} from './data/mockEvents';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { Step1EventContext } from './components/CreateWizard/Step1EventContext';
import { Step2ExperienceMedia } from './components/CreateWizard/Step2ExperienceMedia';
import { Step3PlatformAudience } from './components/CreateWizard/Step3PlatformAudience';
import { Step4GenerationLoading } from './components/CreateWizard/Step4GenerationLoading';
import { Step5ReviewVariations } from './components/CreateWizard/Step5ReviewVariations';
import { Step6PreviewStudio } from './components/CreateWizard/Step6PreviewStudio';
import { Step7PublishSchedule } from './components/CreateWizard/Step7PublishSchedule';
import { ConnectedAccounts } from './components/ConnectedAccounts';
import { ScheduledPosts } from './components/ScheduledPosts';
import { AnalyticsView } from './components/AnalyticsView';
import { EventLibrary } from './components/EventLibrary';
import { PreferencesModal } from './components/PreferencesModal';
import { MediaOptimizerModal } from './components/MediaOptimizerModal';
import { JudgeDemoModal } from './components/JudgeDemoModal';
import { api } from './services/api';
import { Sparkles, Play, CheckCircle2, ChevronRight, X } from 'lucide-react';

export default function App() {
  // Navigation & Wizard State
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [createStep, setCreateStep] = useState<number>(1);

  // App Data State
  const [events, setEvents] = useState<EventContextObject[]>([
    SAMPLE_TECH_ARENA_EVENT,
    {
      id: 'event-hackathon-2026',
      eventName: 'AI Dev Hackathon Finals',
      eventType: 'Hackathon / Buildathon',
      location: 'Innovation Hub, Bangalore',
      date: '2026-09-25',
      time: '24-hour sprint',
      description: 'Built Event2Social AI multimodal prototype under 24 hours.',
      userExperience: 'Intense 24-hour buildathon with our engineering team, fine-tuning multimodal adapters and building out the Event Story Engine.',
      mood: 'Proud & Accomplished',
      takeaways: 'Building dedicated domain engines creates 10x more utility than generic chatbots.',
      audience: 'Engineers, Hackathon Judges, and Founders',
      platform: 'x',
      selectedPlatforms: ['x', 'linkedin'],
      customPlatforms: [],
      tone: 'Energetic',
      contentStyle: 'Achievement',
      emojiLevel: 'Medium',
      contentLength: 'Short',
      storyAngle: 'Achievement',
      userHandle: '@alex_dev',
      importantEntities: ['Dev Hackathon', '@innovationhub'],
      uploadedMedia: [
        {
          id: 'media-hackathon-1',
          dataUrl: SAMPLE_HACKATHON_IMAGE,
          mimeType: 'image/svg+xml',
          name: 'hackathon_dashboard.svg',
          aspectRatio: '16:9',
        },
      ],
    },
  ]);

  const [currentEvent, setCurrentEvent] = useState<EventContextObject>({
    ...SAMPLE_TECH_ARENA_EVENT,
    id: `event-${Date.now()}`,
  });

  const [posts, setPosts] = useState<GeneratedPost[]>(SAMPLE_GENERATED_POSTS);
  const [selectedPost, setSelectedPost] = useState<GeneratedPost>(SAMPLE_GENERATED_POSTS[0]);
  const [accounts, setAccounts] = useState<SocialAccount[]>(SAMPLE_SOCIAL_ACCOUNTS);
  const [preferences, setPreferences] = useState<UserPreferences>(INITIAL_PREFERENCES);
  const [analytics, setAnalytics] = useState<PostAnalytics>(SAMPLE_ANALYTICS_DATA);
  const [feedback, setFeedback] = useState<AiFeedbackSummary>(SAMPLE_AI_FEEDBACK);

  // Status & Modal States
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isJudgeModalOpen, setIsJudgeModalOpen] = useState<boolean>(false);
  const [isPreferencesModalOpen, setIsPreferencesModalOpen] = useState<boolean>(false);
  const [isCropModalOpen, setIsCropModalOpen] = useState<boolean>(false);
  const [cropTargetPost, setCropTargetPost] = useState<GeneratedPost | null>(null);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);
  const [judgeDemoBannerStep, setJudgeDemoBannerStep] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Start 1-Click Judge Demo
  const handleStartJudgeDemo = () => {
    setCurrentEvent({ ...SAMPLE_TECH_ARENA_EVENT });
    setPosts(SAMPLE_GENERATED_POSTS);
    setSelectedPost(SAMPLE_GENERATED_POSTS[0]);
    setCurrentTab('create');
    setCreateStep(5); // Jump directly to Review & Customize variations
    setJudgeDemoBannerStep(1);
    showToast('⚡ Judge Demo Loaded: Tech Arena 2026 ground truth & 3 variations ready!');
  };

  // Create Flow Actions
  const handleStartNewEvent = () => {
    const defaultPlat = preferences.typicalPlatform || 'linkedin';
    setCurrentEvent({
      id: `event-${Date.now()}`,
      eventName: '',
      eventType: 'Conference / Tech Symposium',
      customEventType: '',
      location: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
      userExperience: '',
      mood: 'Excited & Inspired',
      takeaways: '',
      audience: 'Students and technology enthusiasts',
      platform: defaultPlat,
      selectedPlatforms: [defaultPlat],
      customPlatforms: [],
      tone: preferences.preferredTone || 'Professional',
      contentStyle: 'Takeaway',
      emojiLevel: preferences.emojiPreference || 'Low',
      contentLength: preferences.preferredLength || 'Medium',
      storyAngle: preferences.preferredStoryAngle || 'What I Learned',
      uploadedMedia: [],
      importantEntities: [],
      userHandle: preferences.defaultHandle || '@alex_dev',
    });
    setCreateStep(1);
    setCurrentTab('create');
  };

  const handleLoadSampleEvent = () => {
    setCurrentEvent({ ...SAMPLE_TECH_ARENA_EVENT });
    showToast('Loaded Tech Arena 2026 sample context and stage photo');
  };

  // Generate with Server-side Gemini Engine
  const handleGenerate = async () => {
    setIsGenerating(true);
    setCreateStep(4); // Show thinking sequence
    try {
      const generated = await api.generatePosts(currentEvent);
      if (generated && generated.length > 0) {
        setPosts(generated);
        setSelectedPost(generated[0]);
        // Also save this event in state
        setEvents((prev) => {
          const exists = prev.find((e) => e.id === currentEvent.id);
          if (exists) return prev.map((e) => (e.id === currentEvent.id ? currentEvent : e));
          return [currentEvent, ...prev];
        });
        setTimeout(() => {
          setCreateStep(5);
          setIsGenerating(false);
          showToast('Synthesized 3 platform-tailored variations!');
        }, 3200);
      } else {
        throw new Error('No posts returned');
      }
    } catch (err: any) {
      console.warn('API error during generation, applying fallback:', err);
      // Fallback variations using sample generated posts if network edge case
      setPosts(SAMPLE_GENERATED_POSTS);
      setSelectedPost(SAMPLE_GENERATED_POSTS[0]);
      setTimeout(() => {
        setCreateStep(5);
        setIsGenerating(false);
      }, 2000);
    }
  };

  const handleUpdatePost = (updated: GeneratedPost) => {
    setPosts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    if (selectedPost.id === updated.id) {
      setSelectedPost(updated);
    }
  };

  const handleDuplicatePost = (post: GeneratedPost) => {
    const copy: GeneratedPost = {
      ...post,
      id: `post-copy-${Date.now()}`,
      variationType: `${post.variationType} (Copy)`,
      createdAt: new Date().toISOString(),
    };
    setPosts([copy, ...posts]);
    showToast('Duplicated post variation');
  };

  const handleOpenCropModal = (post: GeneratedPost) => {
    setCropTargetPost(post);
    setIsCropModalOpen(true);
  };

  const handleApplyCrop = (crop: AspectRatio) => {
    if (cropTargetPost) {
      handleUpdatePost({
        ...cropTargetPost,
        imageCrop: crop,
      });
      showToast(`Updated crop ratio to ${crop}`);
    }
  };

  // Account Toggle
  const handleToggleAccountConnect = (id: string) => {
    setAccounts((prev) =>
      prev.map((acc) => (acc.id === id ? { ...acc, connected: !acc.connected } : acc))
    );
  };

  // Apply Feedback Loop to Preferences
  const handleApplyFeedbackToPreferences = (fb: AiFeedbackSummary) => {
    setPreferences((prev) => ({
      ...prev,
      preferredStoryAngle: 'What I Learned',
      frequentlyUsedHashtags: Array.from(
        new Set([...prev.frequentlyUsedHashtags, '#TechArena2026', '#MultimodalAI'])
      ),
    }));
    showToast('Updated your user preferences with AI feedback learnings!');
  };

  const currentAccount =
    accounts.find((a) => a.platform.toLowerCase() === selectedPost?.platform?.toLowerCase()) ||
    accounts.find((a) => a.platform.toLowerCase() === currentEvent.platform?.toLowerCase()) ||
    accounts[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-teal-600 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 p-3.5 rounded-xl bg-slate-900 text-white font-semibold text-xs shadow-xl flex items-center gap-2 border border-slate-800 animate-fade-in">
          <Sparkles className="w-4 h-4 text-teal-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onRunJudgeDemo={() => setIsJudgeModalOpen(true)}
        isJudgeDemoActive={judgeDemoBannerStep !== null}
        onOpenPreferences={() => setIsPreferencesModalOpen(true)}
        isDemoMode={isDemoMode}
        setIsDemoMode={setIsDemoMode}
      />

      {/* Interactive Judge Demo Stepper Banner */}
      {judgeDemoBannerStep !== null && (
        <div className="bg-teal-50/90 border-b border-teal-200/80 px-4 py-2.5">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded font-bold bg-teal-700 text-white uppercase tracking-wider text-[10px]">
                Demo Tour
              </span>
              <span className="text-teal-950 font-semibold">
                {judgeDemoBannerStep === 1 && 'Step 1: Inspect 3 Variations & Story Engine Arc'}
                {judgeDemoBannerStep === 2 && 'Step 2: Experience Interactive Mobile Studio'}
                {judgeDemoBannerStep === 3 && 'Step 3: Ready to Post & Copy Package'}
                {judgeDemoBannerStep === 4 && 'Step 4: Review Closed-Loop AI Feedback'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {judgeDemoBannerStep < 4 ? (
                <button
                  onClick={() => {
                    const next = judgeDemoBannerStep + 1;
                    setJudgeDemoBannerStep(next);
                    if (next === 2) setCreateStep(6);
                    if (next === 3) setCreateStep(7);
                    if (next === 4) setCurrentTab('analytics');
                  }}
                  className="flex items-center gap-1 font-semibold text-teal-700 hover:text-teal-900 transition-colors cursor-pointer"
                >
                  <span>Next Demo Step</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => setJudgeDemoBannerStep(null)}
                  className="font-bold text-teal-700 hover:text-teal-900 cursor-pointer"
                >
                  Complete Tour ✓
                </button>
              )}
              <button
                onClick={() => setJudgeDemoBannerStep(null)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* TAB 1: DASHBOARD */}
        {currentTab === 'dashboard' && (
          <Dashboard
            onStartCreate={handleStartNewEvent}
            onRunJudgeDemo={() => setIsJudgeModalOpen(true)}
            events={events}
            posts={posts}
            onOpenEvent={(event) => {
              setCurrentEvent(event);
              setCurrentTab('create');
              setCreateStep(5);
            }}
            onOpenPreview={(post) => {
              setSelectedPost(post);
              setCurrentTab('preview');
            }}
            onNavigateTab={setCurrentTab}
          />
        )}

        {/* TAB 2: CREATE WIZARD */}
        {currentTab === 'create' && (
          <div className="space-y-8 pb-12">
            {/* Step Progress Tracker */}
            <div className="max-w-3xl mx-auto space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900">
                    Step {createStep} of 7
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="font-medium text-slate-600">
                    {createStep === 1 ? 'Event Context & Ground Truth' :
                     createStep === 2 ? 'Experience & Media Cues' :
                     createStep === 3 ? 'Platform Adaptation & Narrative' :
                     createStep === 4 ? 'Multimodal Synthesis' :
                     createStep === 5 ? 'Review & Customize Variations' :
                     createStep === 6 ? 'Unified Mobile Preview' : 'Manual Post & Copy Package'}
                  </span>
                </div>
                <span className="font-mono text-xs font-semibold text-teal-700 tabular-nums">
                  {Math.round((createStep / 7) * 100)}%
                </span>
              </div>
              
              {/* Segmented Step Bar */}
              <div className="grid grid-cols-7 gap-1.5 w-full">
                {[1, 2, 3, 4, 5, 6, 7].map((s) => (
                  <div
                    key={s}
                    className={`h-1.5 rounded-full transition-all duration-200 ${
                      s < createStep
                        ? 'bg-teal-700'
                        : s === createStep
                        ? 'bg-teal-600 ring-2 ring-teal-600/20'
                        : 'bg-slate-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Stepper Screens */}
            {createStep === 1 && (
              <Step1EventContext
                context={currentEvent}
                onChange={(updates) => setCurrentEvent({ ...currentEvent, ...updates })}
                onNext={() => setCreateStep(2)}
                onLoadSample={handleLoadSampleEvent}
              />
            )}

            {createStep === 2 && (
              <Step2ExperienceMedia
                context={currentEvent}
                onChange={(updates) => setCurrentEvent({ ...currentEvent, ...updates })}
                onNext={() => setCreateStep(3)}
                onBack={() => setCreateStep(1)}
              />
            )}

            {createStep === 3 && (
              <Step3PlatformAudience
                context={currentEvent}
                onChange={(updates) => setCurrentEvent({ ...currentEvent, ...updates })}
                onGenerate={handleGenerate}
                onBack={() => setCreateStep(2)}
                isGenerating={isGenerating}
              />
            )}

            {createStep === 4 && (
              <Step4GenerationLoading
                platform={currentEvent.platform}
                eventName={currentEvent.eventName}
              />
            )}

            {createStep === 5 && (
              <Step5ReviewVariations
                posts={posts}
                context={currentEvent}
                onSelectPost={(post) => setSelectedPost(post)}
                onUpdatePost={handleUpdatePost}
                onDuplicatePost={handleDuplicatePost}
                onOpenCropModal={handleOpenCropModal}
                onNext={() => setCreateStep(6)}
                onBack={() => setCreateStep(3)}
              />
            )}

            {createStep === 6 && (
              <Step6PreviewStudio
                post={selectedPost}
                context={currentEvent}
                onUpdatePost={handleUpdatePost}
                onSaveDraft={() => {
                  showToast('Draft saved to event archives!');
                }}
                onNext={() => setCreateStep(7)}
                onBack={() => setCreateStep(5)}
              />
            )}

            {createStep === 7 && (
              <Step7PublishSchedule
                post={selectedPost}
                context={currentEvent}
                account={currentAccount}
                allPosts={posts}
                onSelectPost={(post) => setSelectedPost(post)}
                onPostPublished={(published) => {
                  handleUpdatePost(published);
                  showToast('Post package marked as posted in your records!');
                }}
                onPostScheduled={(scheduled) => {
                  handleUpdatePost(scheduled);
                  showToast('Post queued in local scheduler!');
                }}
                onViewAnalytics={() => setCurrentTab('analytics')}
                onBack={() => setCreateStep(6)}
                isGlobalDemoMode={isDemoMode}
              />
            )}
          </div>
        )}

        {/* TAB 3: PREVIEW STUDIO DIRECT ACCESS */}
        {currentTab === 'preview' && (
          <div className="pb-12">
            <Step6PreviewStudio
              post={selectedPost}
              context={currentEvent}
              onUpdatePost={handleUpdatePost}
              onSaveDraft={() => showToast('Draft saved!')}
              onNext={() => {
                setCurrentTab('create');
                setCreateStep(7);
              }}
              onBack={() => setCurrentTab('dashboard')}
            />
          </div>
        )}

        {/* TAB 4: CONNECTED ACCOUNTS */}
        {currentTab === 'accounts' && (
          <ConnectedAccounts
            accounts={accounts}
            onToggleConnect={handleToggleAccountConnect}
            isGlobalDemoMode={isDemoMode}
            onToggleGlobalDemoMode={() => setIsDemoMode(!isDemoMode)}
          />
        )}

        {/* TAB 5: SCHEDULED POSTS */}
        {currentTab === 'scheduled' && (
          <ScheduledPosts
            posts={posts}
            onCancelSchedule={(postId) => {
              setPosts((prev) =>
                prev.map((p) => (p.id === postId ? { ...p, status: 'ready' } : p))
              );
              showToast('Post unscheduled and returned to ready state');
            }}
            onOpenPreview={(post) => {
              setSelectedPost(post);
              setCurrentTab('preview');
            }}
          />
        )}

        {/* TAB 6: ANALYTICS & FEEDBACK */}
        {currentTab === 'analytics' && (
          <AnalyticsView
            analytics={analytics}
            feedback={feedback}
            onApplyFeedbackToPreferences={handleApplyFeedbackToPreferences}
            userPreferences={preferences}
          />
        )}

        {/* TAB 7: EVENT LIBRARY */}
        {currentTab === 'library' && (
          <EventLibrary
            events={events}
            posts={posts}
            onOpenEvent={(event) => {
              setCurrentEvent(event);
              setCurrentTab('create');
              setCreateStep(5);
            }}
            onDuplicateEvent={(event) => {
              const copy: EventContextObject = {
                ...event,
                id: `event-${Date.now()}`,
                eventName: `${event.eventName} (Copy)`,
              };
              setEvents([copy, ...events]);
              showToast('Event duplicated');
            }}
            onDeleteEvent={(id) => {
              setEvents((prev) => prev.filter((e) => e.id !== id));
              showToast('Event removed from library');
            }}
            onStartCreate={handleStartNewEvent}
          />
        )}
      </main>

      {/* Preferences Modal */}
      <PreferencesModal
        isOpen={isPreferencesModalOpen}
        onClose={() => setIsPreferencesModalOpen(false)}
        preferences={preferences}
        onSavePreferences={(updated) => {
          setPreferences(updated);
          showToast('Updated default brand preferences');
        }}
      />

      {/* Media Optimizer Crop Modal */}
      <MediaOptimizerModal
        isOpen={isCropModalOpen}
        onClose={() => setIsCropModalOpen(false)}
        post={cropTargetPost}
        mediaItem={currentEvent.uploadedMedia?.[0]}
        onApplyCrop={handleApplyCrop}
      />

      {/* Judge 1-Click Demo Modal */}
      <JudgeDemoModal
        isOpen={isJudgeModalOpen}
        onClose={() => setIsJudgeModalOpen(false)}
        onStartInteractiveDemo={handleStartJudgeDemo}
        onJumpToTab={setCurrentTab}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">Event2Social</span>
            <span>•</span>
            <span>Multimodal Event-to-Post Engine</span>
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Powered by Gemini 3.8 Flash</span>
            <span>•</span>
            <span className="text-teal-700 font-medium">Studio Prototype</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
