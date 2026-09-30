import { EventContextObject, GeneratedPost, SocialAccount, PostAnalytics, UserPreferences, AiFeedbackSummary } from '../types';

// High-fidelity SVG-based realistic event images for demo
export const SAMPLE_TECH_ARENA_IMAGE = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="%230f172a" />
      <stop offset="40%" stop-color="%231e1b4b" />
      <stop offset="100%" stop-color="%23311042" />
    </linearGradient>
    <linearGradient id="stage" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="%230284c7" stop-opacity="0.8" />
      <stop offset="100%" stop-color="%23a855f7" stop-opacity="0.1" />
    </linearGradient>
    <linearGradient id="neon" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="%2338bdf8" />
      <stop offset="50%" stop-color="%23818cf8" />
      <stop offset="100%" stop-color="%23c084fc" />
    </linearGradient>
  </defs>
  <rect width="800" height="800" fill="url(%23bg)" />
  <!-- Stage Lights & Beams -->
  <polygon points="100,0 250,800 150,800" fill="url(%23stage)" opacity="0.3"/>
  <polygon points="700,0 550,800 650,800" fill="url(%23stage)" opacity="0.3"/>
  <polygon points="400,0 300,800 500,800" fill="url(%23stage)" opacity="0.4"/>
  <!-- Stage Screen Backdrop -->
  <rect x="150" y="160" width="500" height="280" rx="16" fill="%23090d16" stroke="%2338bdf8" stroke-width="3" stroke-opacity="0.7"/>
  <!-- Screen Content -->
  <text x="400" y="240" font-family="system-ui, sans-serif" font-weight="900" font-size="44" fill="url(%23neon)" text-anchor="middle" letter-spacing="3">TECH ARENA 2026</text>
  <text x="400" y="290" font-family="system-ui, sans-serif" font-weight="600" font-size="20" fill="%2394a3b8" text-anchor="middle">Christ College Campus • Emerging AI & Quantum Tech</text>
  <text x="400" y="340" font-family="system-ui, sans-serif" font-weight="700" font-size="24" fill="%2338bdf8" text-anchor="middle">[ KEYNOTE: BUILDING WITH NEXT-GEN MULTIMODAL AGENTS ]</text>
  <rect x="320" y="375" width="160" height="32" rx="16" fill="%2338bdf8" fill-opacity="0.2"/>
  <text x="400" y="397" font-family="system-ui, sans-serif" font-weight="600" font-size="14" fill="%237dd3fc" text-anchor="middle">ANNUAL SYMPOSIUM</text>
  <!-- Speaker on Stage Silhouette -->
  <circle cx="400" cy="480" r="28" fill="%23f8fafc"/>
  <path d="M360,570 C360,510 440,510 440,570 Z" fill="%23e2e8f0"/>
  <!-- Audience Silhouettes in Foreground -->
  <path d="M0,660 Q200,600 400,640 T800,650 L800,800 L0,800 Z" fill="%23050811"/>
  <circle cx="160" cy="640" r="32" fill="%230b0f19"/>
  <circle cx="280" cy="620" r="36" fill="%230e1526"/>
  <circle cx="520" cy="630" r="34" fill="%230b0f19"/>
  <circle cx="660" cy="650" r="30" fill="%230e1526"/>
  <!-- Glowing Laptops & Phones in crowd -->
  <rect x="260" y="670" width="40" height="25" rx="4" fill="%2338bdf8" opacity="0.8"/>
  <rect x="505" y="680" width="30" height="20" rx="3" fill="%23c084fc" opacity="0.8"/>
</svg>`;

export const SAMPLE_HACKATHON_IMAGE = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
  <defs>
    <linearGradient id="codebg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="%23022c22" />
      <stop offset="50%" stop-color="%23064e3b" />
      <stop offset="100%" stop-color="%23020617" />
    </linearGradient>
  </defs>
  <rect width="800" height="800" fill="url(%23codebg)" />
  <rect x="100" y="140" width="600" height="400" rx="16" fill="%230f172a" stroke="%2310b981" stroke-width="2"/>
  <circle cx="140" cy="170" r="8" fill="%23ef4444"/>
  <circle cx="165" cy="170" r="8" fill="%23f59e0b"/>
  <circle cx="190" cy="170" r="8" fill="%2310b981"/>
  <text x="400" y="260" font-family="monospace" font-size="32" font-weight="bold" fill="%2334d399" text-anchor="middle">&lt;DEV_HACKATHON_FINALS /&gt;</text>
  <text x="400" y="320" font-family="sans-serif" font-size="22" fill="%23f8fafc" text-anchor="middle">Building Event2Social AI • 24hr Sprint</text>
  <text x="400" y="380" font-family="monospace" font-size="16" fill="%2394a3b8" text-anchor="middle">Status: Multimodal Engine 100% Operational</text>
  <path d="M50,700 Q400,600 750,700 L750,800 L50,800 Z" fill="%23030712"/>
</svg>`;

export const SAMPLE_TECH_ARENA_EVENT: EventContextObject = {
  id: 'event-tech-arena-2026',
  eventName: 'Tech Arena 2026',
  eventType: 'Conference / Tech Symposium',
  location: 'Christ College Campus, Bangalore',
  date: '2026-09-28',
  time: '10:00 AM - 5:30 PM',
  description: 'Annual technology summit bringing together over 800 students, engineers, and researchers exploring next-generation multimodal AI, robotics, and cloud compute.',
  userExperience: 'An exciting technology event where I attended talks on emerging AI models, interacted with student builders and faculty, and learned practical ways to bridge multimodal sensors with automated production workflows.',
  mood: 'Excited & Inspired',
  takeaways: 'Multimodal AI is shifting from conversational toys to structured event-understanding engines. The future of software is context-aware automation.',
  audience: 'Students and technology enthusiasts',
  platform: 'linkedin',
  selectedPlatforms: ['linkedin', 'instagram', 'x'],
  customPlatforms: [],
  tone: 'Professional',
  contentStyle: 'Takeaway',
  emojiLevel: 'Low',
  contentLength: 'Medium',
  storyAngle: 'What I Learned',
  userHandle: '@alex_dev',
  importantEntities: ['Christ College', 'Tech Arena Organizers', 'Prof. Rao (Keynote)'],
  brandPreferences: {
    customHashtags: ['#TechArena2026', '#MultimodalAI', '#StudentBuilders'],
    typicalCallToAction: 'What are you building with multimodal models this week?'
  },
  uploadedMedia: [
    {
      id: 'media-1',
      dataUrl: SAMPLE_TECH_ARENA_IMAGE,
      mimeType: 'image/svg+xml',
      name: 'tech_arena_main_stage.svg',
      aspectRatio: '1:1',
      focalPoint: { x: 50, y: 35 },
      aiCaption: 'Main stage auditorium at Tech Arena 2026 showing illuminated backdrop and keynote audience.',
      aiDetectedTags: ['stage', 'symposium', 'multimodal keynote', 'tech conference']
    }
  ],
  detectedVisualContext: {
    mainSubjects: ['Keynote stage', 'Illuminated backdrop banner reading TECH ARENA 2026', 'Auditorium crowd'],
    environment: 'High-tech university auditorium with atmospheric blue and violet spotlights',
    visibleBannersOrText: ['TECH ARENA 2026', 'Christ College Campus', 'Annual Symposium'],
    activities: ['Keynote presentation on next-gen multimodal agents', 'Student laptop interaction'],
    atmosphere: 'Energetic, focused, and forward-looking',
    visualHighlights: ['Clean glowing stage backdrop', 'Engaged tech audience'],
    recommendedCrop: '1:1'
  }
};

export const INITIAL_PREFERENCES: UserPreferences = {
  preferredTone: 'Professional',
  typicalPlatform: 'linkedin',
  preferredLength: 'Medium',
  emojiPreference: 'Low',
  preferredStoryAngle: 'What I Learned',
  frequentlyUsedHashtags: ['#TechArena2026', '#MultimodalAI', '#BuildInPublic'],
  defaultHandle: '@alex_dev',
  autoOptimizeMedia: true
};

export const SAMPLE_SOCIAL_ACCOUNTS: SocialAccount[] = [
  {
    id: 'acc-li',
    platform: 'linkedin',
    accountName: 'Alex Morgan',
    handle: 'alex-morgan-tech',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    connected: true,
    isDemo: true,
    lastActive: 'Just now'
  },
  {
    id: 'acc-ig',
    platform: 'instagram',
    accountName: 'Alex | AI & Code',
    handle: '@alex_builds',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    connected: true,
    isDemo: true,
    lastActive: '2 hours ago'
  },
  {
    id: 'acc-x',
    platform: 'x',
    accountName: 'Alex Morgan ⚡',
    handle: '@alex_dev',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    connected: true,
    isDemo: true,
    lastActive: 'Yesterday'
  },
  {
    id: 'acc-th',
    platform: 'threads',
    accountName: 'Alex Morgan',
    handle: '@alex_builds',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    connected: false,
    isDemo: true,
    lastActive: 'Not connected'
  }
];

export const SAMPLE_GENERATED_POSTS: GeneratedPost[] = [
  {
    id: 'post-var-1',
    eventId: 'event-tech-arena-2026',
    platform: 'linkedin',
    variationType: 'Professional / Insight-Driven',
    hook: 'The biggest shift in AI this year isn’t just smarter text—it’s full context ingestion.',
    caption: `The biggest shift in AI this year isn’t just smarter text—it’s full context ingestion.

Yesterday I had the privilege of attending Tech Arena 2026 at Christ College Campus. Amidst the talks and student showcases, one overarching principle stood out:

Software is rapidly moving from reactive prompt-and-response toward real-time multimodal understanding. When an engine can digest event visuals, speaker transcripts, and atmosphere simultaneously, content creation transforms from a chore into a seamless extension of the experience.

Key takeaway: Don’t just build wrappers around models. Build domain engines that understand the entire workflow lifecycle.

Grateful to the organizing team and fellow builders for the high-impact conversations. What are you building with multimodal architectures right now?`,
    hashtags: ['#TechArena2026', '#MultimodalAI', '#SoftwareEngineering', '#StudentBuilders', '#TechInnovation'],
    mentions: [
      { handle: '@ChristCollege', confirmed: true, reason: 'Host campus venue' },
      { handle: '@TechArena2026', confirmed: false, reason: 'Suggested official event account (needs confirmation)' }
    ],
    callToAction: 'What are you building with multimodal architectures right now?',
    visualRecommendation: 'High-contrast 1:1 square crop highlighting the glowing auditorium banner and keynote silhouette.',
    imageCrop: '1:1',
    confidenceNotes: [
      'Confirmed fact: User attended Tech Arena 2026 at Christ College Campus.',
      'Confirmed fact: Focused on emerging AI talks and student interaction.',
      'AI-Inferred context: Visual stage backdrop identified as keynote auditorium with blue/violet lighting.'
    ],
    storyStructure: {
      hook: 'The biggest shift in AI this year isn’t just smarter text—it’s full context ingestion.',
      whatHappened: 'Attended Tech Arena 2026 at Christ College Campus with 800+ attendees.',
      personalExperience: 'Exchanged ideas with student builders and faculty on automated production workflows.',
      keyTakeaway: 'The future belongs to domain engines that model entire workflows, not just text generation.',
      close: 'Grateful for the energy and conversations on campus.',
      callToAction: 'What are you building with multimodal models this week?'
    },
    status: 'ready',
    createdAt: new Date().toISOString()
  },
  {
    id: 'post-var-2',
    eventId: 'event-tech-arena-2026',
    platform: 'instagram',
    variationType: 'Visual Storytelling & Atmosphere',
    hook: 'I walked into Christ College expecting routine keynote slides. I walked out inspired. ✨',
    caption: `I walked into Christ College expecting routine keynote slides. I walked out with a notebook full of architectural breakthroughs. ✨

Attending Tech Arena 2026 reminded me why in-person gatherings matter so much for builders. Sitting in that packed auditorium watching live multimodal demonstrations, the energy was unreal.

Instead of talking about theory, speakers and student teams demonstrated real applications connecting camera feeds and audio transcripts straight into contextual outputs.

My personal highlight was speaking with student researchers pushing boundary cases in low-latency reasoning.

If you’re building today, remember: real-world context always beats synthetic benchmarks! 🚀

What are you creating this week? Drop your project below! 👇`,
    hashtags: ['#TechArena2026', '#StudentBuilders', '#AIHackathon', '#CollegeTech', '#Innovation', '#BangaloreTech', '#BuildInPublic'],
    mentions: [
      { handle: '@ChristCollege', confirmed: true, reason: 'Event host location' }
    ],
    callToAction: 'What are you creating this week? Drop your project below! 👇',
    visualRecommendation: 'Widescreen 16:9 or 4:5 vertical stage photo capturing the auditorium atmosphere.',
    imageCrop: '4:5',
    confidenceNotes: [
      'Confirmed fact: User attended event talks and interacted with peers.',
      'Fact boundary preserved: No hallucinated awards or unmentioned speakers were added.'
    ],
    storyStructure: {
      hook: 'I walked into Christ College expecting routine slides; walked out inspired. ✨',
      whatHappened: 'Participated in live sessions and hallway tracks at Tech Arena.',
      personalExperience: 'Deep-dive conversations with student researchers on multimodal pipelines.',
      keyTakeaway: 'Contextual ground truth beats synthetic prompts every single time.',
      close: 'A standout experience for our tech ecosystem.',
      callToAction: 'What are you creating this week? Drop your project below! 👇'
    },
    status: 'ready',
    createdAt: new Date().toISOString()
  },
  {
    id: 'post-var-3',
    eventId: 'event-tech-arena-2026',
    platform: 'x',
    variationType: 'Punchy High-Signal Post',
    hook: '⚡ Tech Arena 2026 delivered. 3 rapid takeaways:',
    caption: `⚡ Tech Arena 2026 delivered. 3 rapid takeaways:

1/ Multimodal AI is moving from text prompts to real-time event understanding.
2/ Student builder velocity is outrunning legacy enterprise stacks.
3/ In-person developer density remains unmatched.

Grateful to @ChristCollege and the organizers for an electric symposium! 🚀`,
    hashtags: ['#TechArena2026', '#Developers', '#MultimodalAI'],
    mentions: [
      { handle: '@ChristCollege', confirmed: true, reason: 'Venue partner' }
    ],
    callToAction: 'What are you building with multimodal models today?',
    visualRecommendation: 'Landscape 16:9 mobile crop of keynote stage screen.',
    imageCrop: '16:9',
    confidenceNotes: [
      'Confirmed fact: User attended and experienced high energy.',
      'Calibrated for X 280-char limit.'
    ],
    storyStructure: {
      hook: '⚡ Tech Arena 2026 delivered. 3 rapid takeaways:',
      whatHappened: 'Full day symposium on modern AI and compute at Christ College.',
      personalExperience: 'High-energy discussions across developer demo tables.',
      keyTakeaway: 'Three distinct learnings captured directly from the session floor.',
      close: 'Grateful to @ChristCollege and organizers!',
      callToAction: 'What are you building with multimodal models today?'
    },
    status: 'ready',
    createdAt: new Date().toISOString()
  }
];

export const SAMPLE_ANALYTICS_DATA: PostAnalytics = {
  postId: 'post-var-1',
  platform: 'linkedin',
  reach: 3840,
  impressions: 5920,
  likes: 312,
  comments: 48,
  shares: 26,
  saves: 64,
  engagementRate: 7.6,
  topPerformingHook: 'The biggest shift in AI this year isn’t just smarter text—it’s full context ingestion.',
  isSimulated: true,
  recordedAt: '2026-09-29T14:30:00Z'
};

export const SAMPLE_AI_FEEDBACK: AiFeedbackSummary = {
  whatWorked: [
    'The contrarian opening hook ("The biggest shift...") stopped the scroll, resulting in 42% higher click-throughs than average.',
    'Separating the technical takeaway into a clean paragraph made it easily bookmarkable (64 saves).',
    'Specific mention of the venue (@ChristCollege) brought local audience shares.'
  ],
  audienceReceptionAnalysis: 'Audience was predominantly technical professionals and engineering students who responded enthusiastically to practical system takeaways rather than generic hype.',
  contentPerformanceScore: 92,
  nextEventRecommendations: [
    'Incorporate a direct quote from a keynote speaker or teammate in variation #2.',
    'Add a secondary photo carousel: 1st image stage banner, 2nd image working prototype demo.',
    'Post between 8:30 AM - 10:00 AM on LinkedIn for peak mid-week visibility.'
  ],
  suggestedToneTweak: 'Maintain the "Insight-Driven" angle as your primary preset—it generated 3.2x more comments than standard recap posts.'
};
