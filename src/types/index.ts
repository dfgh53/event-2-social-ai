export type SocialPlatform = 'instagram' | 'linkedin' | 'x' | 'threads' | 'facebook' | string;

export type Tone = 'Professional' | 'Casual' | 'Energetic' | 'Inspirational' | 'Minimal' | 'Funny';

export type ContentLength = 'Short' | 'Medium' | 'Long';

export type ContentStyle = 'Story' | 'Takeaway' | 'Achievement' | 'Networking' | 'Experience' | 'Promotional';

export type EmojiLevel = 'None' | 'Low' | 'Medium' | 'High';

export type StoryAngle = 
  | 'My Experience'
  | 'What I Learned'
  | 'Best Moment'
  | 'Behind the Scenes'
  | 'Achievement'
  | 'Networking'
  | 'Inspirational'
  | 'Event Recap';

export type AspectRatio = '1:1' | '4:5' | '16:9' | '9:16';

export interface EventMediaItem {
  id: string;
  dataUrl: string; // base64 or URL
  mimeType: string;
  name: string;
  aspectRatio?: AspectRatio;
  focalPoint?: { x: number; y: number }; // percentage 0-100
  aiCaption?: string;
  aiDetectedTags?: string[];
  isAiEnhanced?: boolean;
}

export interface DetectedVisualContext {
  mainSubjects: string[];
  environment: string;
  visibleBannersOrText: string[];
  activities: string[];
  atmosphere: string;
  visualHighlights: string[];
  recommendedCrop: AspectRatio;
}

export interface EventContextObject {
  id: string;
  eventName: string;
  eventType: string;
  customEventType?: string;
  location: string;
  date: string;
  time?: string;
  description: string;
  userExperience: string;
  voiceTranscript?: string;
  mood: string;
  takeaways: string;
  audience: string;
  platform: SocialPlatform; // primary or active platform
  selectedPlatforms: string[]; // multi-selected platforms
  customPlatforms?: string[]; // user-entered custom platforms
  customPlatformDetails?: { [platform: string]: { audience?: string; characterLimit?: string; tone?: string; format?: string } };
  tone: Tone;
  contentStyle: ContentStyle;
  emojiLevel: EmojiLevel;
  contentLength: ContentLength;
  storyAngle: StoryAngle;
  uploadedMedia: EventMediaItem[];
  detectedVisualContext?: DetectedVisualContext;
  importantEntities: string[]; // people, speakers, sponsors
  userHandle: string;
  brandPreferences?: {
    customHashtags?: string[];
    typicalCallToAction?: string;
  };
}

export interface StoryStructure {
  hook: string;
  whatHappened: string;
  personalExperience: string;
  keyTakeaway: string;
  close: string;
  callToAction: string;
}

export type PostStatus = 
  | 'draft' 
  | 'generated' 
  | 'edited' 
  | 'ready_to_post' 
  | 'ready' 
  | 'scheduled' 
  | 'publishing' 
  | 'published' 
  | 'manually_posted' 
  | 'failed';

export interface GeneratedPost {
  id: string;
  eventId: string;
  platform: SocialPlatform;
  variationType: string; // e.g. "Personal Narrative", "Professional Takeaway", "High-Energy Buzz"
  hook: string;
  caption: string;
  hashtags: string[];
  mentions: { handle: string; confirmed: boolean; reason: string }[];
  callToAction: string;
  visualRecommendation: string;
  imageCrop: AspectRatio;
  confidenceNotes: string[]; // Separation of confirmed facts vs AI inferences
  storyStructure?: StoryStructure;
  selectedMediaId?: string;
  selectedMediaUrl?: string; // per-platform image association
  userEdited?: boolean;
  status: PostStatus;
  scheduledDate?: string;
  publishedUrl?: string;
  postId?: string;
  publishedMode?: 'demo' | 'live';
  createdAt: string;
}

export interface UserPreferences {
  preferredTone: Tone;
  typicalPlatform: SocialPlatform;
  preferredLength: ContentLength;
  emojiPreference: EmojiLevel;
  preferredStoryAngle: StoryAngle;
  frequentlyUsedHashtags: string[];
  defaultHandle: string;
  autoOptimizeMedia: boolean;
}

export interface SocialAccount {
  id: string;
  platform: SocialPlatform;
  accountName: string;
  handle: string;
  avatarUrl: string;
  connected: boolean;
  isDemo: boolean;
  lastActive: string;
}

export interface PostAnalytics {
  postId: string;
  platform: SocialPlatform;
  reach: number;
  impressions: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  engagementRate: number; // percentage
  topPerformingHook: string;
  isSimulated: boolean;
  recordedAt: string;
}

export interface AiFeedbackSummary {
  whatWorked: string[];
  audienceReceptionAnalysis: string;
  contentPerformanceScore: number; // 0-100
  nextEventRecommendations: string[];
  suggestedToneTweak: string;
}
