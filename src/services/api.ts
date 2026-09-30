import {
  EventContextObject,
  GeneratedPost,
  SocialPlatform,
  DetectedVisualContext,
  SocialAccount,
  PostAnalytics,
  AiFeedbackSummary
} from '../types';

export const api = {
  // Analyze uploaded media + experience
  async analyzeMultimodal(data: {
    images: { dataUrl: string; mimeType: string }[];
    userExperience: string;
    eventName: string;
    location: string;
  }): Promise<DetectedVisualContext> {
    const res = await fetch('/api/analyze-multimodal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error(`Multimodal analysis failed (${res.status})`);
    }
    const json = await res.json();
    return json.visualContext;
  },

  // Generate 3+ platform-adapted variations
  async generatePosts(context: EventContextObject): Promise<GeneratedPost[]> {
    const res = await fetch('/api/generate-posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(context),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Generation failed (${res.status})`);
    }
    const json = await res.json();
    return json.posts;
  },

  // Regenerate a single post preserving user-provided event facts
  async regeneratePost(params: {
    eventContext: EventContextObject;
    currentPost: GeneratedPost;
    regenerationMode: string;
    customInstructions?: string;
  }): Promise<GeneratedPost> {
    const res = await fetch('/api/regenerate-post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Regeneration failed (${res.status})`);
    }
    const json = await res.json();
    return json.post;
  },

  // Smart tags suggester
  async getSmartTags(params: {
    eventName: string;
    eventType: string;
    platform: SocialPlatform;
    context: string;
    keywords?: string;
  }): Promise<{
    eventSpecificHashtags: string[];
    topicHashtags: string[];
    trendingTags: string[];
    suggestedMentions: { handle: string; confirmed: boolean; reason: string }[];
  }> {
    const res = await fetch('/api/smart-tags', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (!res.ok) {
      throw new Error('Failed to fetch smart tags');
    }
    const json = await res.json();
    return json.tags;
  },

  // Optimize media crop recommendation
  async optimizeMedia(params: {
    platform: SocialPlatform;
    detectedSubjects?: string[];
  }): Promise<{ crop: string; reason: string; focalPoint: { x: number; y: number } }> {
    const res = await fetch('/api/optimize-media', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    const json = await res.json();
    return json.optimization;
  },

  // Publish / Schedule
  async publish(params: {
    post: GeneratedPost;
    account?: SocialAccount;
    mode: 'demo' | 'live';
    scheduleDate?: string;
  }): Promise<{
    success: boolean;
    status: string;
    mode: 'demo' | 'live';
    postId: string;
    publishedUrl?: string;
    badgeText?: string;
    message: string;
  }> {
    const res = await fetch('/api/publish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    return res.json();
  },

  // AI Feedback
  async getAiFeedback(params: {
    analytics: PostAnalytics;
    post: GeneratedPost;
    eventName: string;
  }): Promise<AiFeedbackSummary> {
    const res = await fetch('/api/ai-feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    const json = await res.json();
    return json.feedback;
  }
};
