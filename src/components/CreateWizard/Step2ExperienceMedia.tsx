import React, { useState, useRef, useEffect } from 'react';
import { EventContextObject, EventMediaItem, DetectedVisualContext } from '../../types';
import { 
  Mic, 
  UploadCloud, 
  X, 
  Sparkles, 
  Smile, 
  Lightbulb, 
  AtSign, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight,
  Loader2,
  Scan,
  ShieldCheck
} from 'lucide-react';
import { api } from '../../services/api';

interface Step2Props {
  context: EventContextObject;
  onChange: (updates: Partial<EventContextObject>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step2ExperienceMedia: React.FC<Step2Props> = ({
  context,
  onChange,
  onNext,
  onBack,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [hasVoiceCaptured, setHasVoiceCaptured] = useState(Boolean(context.voiceTranscript));
  const [isAnalyzingMedia, setIsAnalyzingMedia] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [entityInput, setEntityInput] = useState('');
  const recognitionRef = useRef<any>(null);
  const currentTextRef = useRef<string>(context.userExperience || '');
  const speechSessionStartingTextRef = useRef<string>('');

  useEffect(() => {
    currentTextRef.current = context.userExperience || '';
  }, [context.userExperience]);

  const moods = [
    'Excited & Inspired',
    'High-Energy & Buzzing',
    'Thoughtful & Reflective',
    'Proud & Accomplished',
    'Grateful & Community-Driven',
    'Curious & Exploring',
  ];

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let sessionTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          sessionTranscript += event.results[i][0].transcript + ' ';
        }

        const trimmedSpeech = sessionTranscript.trim();
        if (trimmedSpeech) {
          const base = speechSessionStartingTextRef.current.trim();
          const updated = base ? `${base} ${trimmedSpeech}` : trimmedSpeech;
          currentTextRef.current = updated;
          onChange({
            userExperience: updated,
            voiceTranscript: trimmedSpeech,
          });
          setHasVoiceCaptured(true);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed' || event.error === 'permission-denied') {
          setSpeechError('Microphone permission was denied. Please allow microphone access in your browser or type manually.');
        } else if (event.error === 'no-speech') {
          // Handled gracefully
        } else {
          setSpeechError(`Voice notice: ${event.error}. You can continue typing manually.`);
        }
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    } catch (e) {
      console.warn('Failed to initialize speech recognition:', e);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore cleanup stop error
        }
      }
    };
  }, []);

  const toggleRecording = () => {
    setSpeechError(null);
    if (!recognitionRef.current) {
      setSpeechError('Speech recognition is not supported in this browser. Please type manually.');
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        speechSessionStartingTextRef.current = context.userExperience || '';
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (err) {
        console.warn('Recognition start exception:', err);
        try {
          recognitionRef.current.stop();
          setTimeout(() => {
            recognitionRef.current.start();
            setIsRecording(true);
          }, 200);
        } catch (e2) {
          setSpeechError('Could not start microphone. You can type notes directly.');
        }
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        const newMediaItem: EventMediaItem = {
          id: `media-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          dataUrl,
          mimeType: file.type || 'image/jpeg',
          name: file.name,
          aspectRatio: '1:1',
        };

        const existing = context.uploadedMedia || [];
        const updated = [...existing, newMediaItem];
        onChange({ uploadedMedia: updated });

        if (updated.length === 1) {
          analyzeImage(dataUrl, file.type);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeMedia = (id: string) => {
    const updated = (context.uploadedMedia || []).filter((m) => m.id !== id);
    onChange({ uploadedMedia: updated });
    if (updated.length === 0) {
      onChange({ detectedVisualContext: undefined });
    }
  };

  const analyzeImage = async (dataUrl: string, mimeType: string) => {
    setIsAnalyzingMedia(true);
    try {
      const visualContext = await api.analyzeMultimodal({
        images: [{ dataUrl, mimeType }],
        userExperience: context.userExperience || '',
        eventName: context.eventName || '',
        location: context.location || '',
      });

      onChange({ detectedVisualContext: visualContext });
    } catch (err) {
      console.warn('Multimodal extraction error, continuing with user context:', err);
    } finally {
      setIsAnalyzingMedia(false);
    }
  };

  const handleScanMedia = () => {
    if (context.uploadedMedia && context.uploadedMedia.length > 0) {
      const first = context.uploadedMedia[0];
      analyzeImage(first.dataUrl, first.mimeType);
    }
  };

  const addEntity = () => {
    if (!entityInput.trim()) return;
    const current = context.importantEntities || [];
    if (!current.includes(entityInput.trim())) {
      onChange({ importantEntities: [...current, entityInput.trim()] });
    }
    setEntityInput('');
  };

  const removeEntity = (item: string) => {
    onChange({
      importantEntities: (context.importantEntities || []).filter((e) => e !== item),
    });
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl mx-auto bg-white border border-slate-200/90 shadow-sm rounded-2xl p-6 sm:p-8">
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">Step 2 of 7</span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-0.5">Experience & Visual Evidence</h2>
          <p className="text-xs text-slate-500 mt-1">
            Share what you lived. Type raw notes, speak into the mic, or attach photos for visual grounding.
          </p>
        </div>

        {context.uploadedMedia && context.uploadedMedia.length > 0 && (
          <button
            type="button"
            onClick={handleScanMedia}
            disabled={isAnalyzingMedia}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-xs font-semibold transition-colors shrink-0 cursor-pointer disabled:opacity-50"
          >
            {isAnalyzingMedia ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-teal-600" />
            ) : (
              <Scan className="w-3.5 h-3.5 text-teal-600" />
            )}
            <span>{isAnalyzingMedia ? 'Scanning Media...' : 'Scan Photos with Gemini'}</span>
          </button>
        )}
      </div>

      {/* Experience Input Modes */}
      <div className="space-y-5">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Your Real Experience <span className="text-rose-500">*</span>
            </label>

            {/* Voice Dictation Toggle */}
            <div className="flex items-center gap-2">
              {isRecording && (
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 text-[11px] font-semibold border border-rose-200 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span>Listening live...</span>
                </div>
              )}
              <button
                type="button"
                onClick={toggleRecording}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer border ${
                  isRecording
                    ? 'bg-rose-50 border-rose-200 text-rose-700'
                    : hasVoiceCaptured
                    ? 'bg-teal-50 text-teal-800 border-teal-200'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
                title={isRecording ? 'Click to stop voice recording' : 'Click to start voice recording'}
              >
                {isRecording ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
                    <span>Stop Recording</span>
                  </>
                ) : hasVoiceCaptured ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                    <span>✓ Voice captured</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-3.5 h-3.5 text-slate-500" />
                    <span>Voice Input</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <textarea
            rows={4}
            value={context.userExperience}
            onChange={(e) => onChange({ userExperience: e.target.value })}
            placeholder="What happened? What talks did you attend? Who did you meet? What were the standout moments or unexpected highlights? (e.g. Attended keynote on multimodal agents, chatted with student builders at demo tables, packed auditorium)..."
            className="w-full px-4 py-3 rounded-xl bg-slate-50/60 border border-slate-200 focus:bg-white focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors leading-relaxed"
          />

          <div className="flex items-center gap-1.5 mt-1.5 text-xs text-teal-700 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span>AI Refinement Active: Your raw notes or voice dictation will be elevated and polished into platform-native copy—not copy-pasted.</span>
          </div>

          {speechError && (
            <p className="text-xs text-amber-700 mt-1">{speechError}</p>
          )}
        </div>

        {/* Key Takeaway & Mood Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Event Mood / Atmosphere <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Smile className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <select
                value={context.mood}
                onChange={(e) => onChange({ mood: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50/60 border border-slate-200 focus:bg-white focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-sm text-slate-900 focus:outline-none transition-colors appearance-none cursor-pointer"
              >
                {moods.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Single Biggest Takeaway
            </label>
            <div className="relative">
              <Lightbulb className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={context.takeaways}
                onChange={(e) => onChange({ takeaways: e.target.value })}
                placeholder="e.g. Multimodal models are turning raw sensory events into software workflows"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50/60 border border-slate-200 focus:bg-white focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Media Upload & Multimodal Analysis */}
        <div className="space-y-3 pt-2">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Event Photos / Visual Evidence
          </label>

          {/* Upload Area */}
          <div className="relative border-2 border-dashed border-slate-200 hover:border-teal-500 rounded-2xl p-6 text-center transition-colors bg-slate-50/50 hover:bg-teal-50/20">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
              <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
                <UploadCloud className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold text-slate-800">
                Click or drag & drop event photos here
              </p>
              <p className="text-[11px] text-slate-500">
                Supports PNG, JPG, WebP, SVG. Gemini reads banners, screens, crowd, and lighting.
              </p>
            </div>
          </div>

          {/* Uploaded Photos Preview List */}
          {context.uploadedMedia && context.uploadedMedia.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {context.uploadedMedia.map((media) => (
                <div key={media.id} className="relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-100 aspect-square shadow-xs">
                  <img
                    src={media.dataUrl}
                    alt={media.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeMedia(media.id)}
                    className="absolute top-1.5 right-1.5 p-1 rounded-full bg-slate-900/80 text-white hover:bg-rose-600 transition cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  <div className="absolute bottom-0 inset-x-0 bg-slate-900/80 px-2 py-1 text-[10px] text-white truncate">
                    {media.name}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Multimodal AI Extraction Result Box */}
          {context.detectedVisualContext && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Gemini Multimodal Perception Active
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-teal-50 text-teal-800 border border-teal-200">
                  Visual Ground Truth
                </span>
              </div>

              {/* Ground Truth Boundary Warning */}
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-600 flex items-start gap-2 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Separation of Concerns:</strong> The AI separates verified facts you provided from visual cues inferred from photos to prevent false claims.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-white border border-slate-200 shadow-xs">
                  <span className="text-[10px] text-slate-400 font-semibold block">MAIN SUBJECTS</span>
                  <span className="text-slate-800 font-medium">
                    {context.detectedVisualContext.mainSubjects?.join(', ') || 'Event Stage'}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-white border border-slate-200 shadow-xs">
                  <span className="text-[10px] text-slate-400 font-semibold block">VISIBLE BANNERS / TEXT</span>
                  <span className="text-slate-800 font-medium">
                    {context.detectedVisualContext.visibleBannersOrText?.join(', ') || 'TECH ARENA 2026'}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-white border border-slate-200 shadow-xs">
                  <span className="text-[10px] text-slate-400 font-semibold block">ENVIRONMENT & ATMOSPHERE</span>
                  <span className="text-slate-800 font-medium">
                    {context.detectedVisualContext.atmosphere}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-white border border-slate-200 shadow-xs">
                  <span className="text-[10px] text-slate-400 font-semibold block">RECOMMENDED FEED CROP</span>
                  <span className="text-teal-700 font-bold">
                    {context.detectedVisualContext.recommendedCrop || '1:1'} (Optimized for feed thumb-stop)
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Important Entities / Handles Tagging */}
        <div className="space-y-2 pt-2">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Important People / Speakers / Venue Handles
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <AtSign className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={entityInput}
                onChange={(e) => setEntityInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addEntity(); } }}
                placeholder="e.g. Christ College, @christcollege, Prof. Rao, @TechArena"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50/60 border border-slate-200 focus:bg-white focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors"
              />
            </div>
            <button
              type="button"
              onClick={addEntity}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors cursor-pointer"
            >
              Add
            </button>
          </div>

          {context.importantEntities && context.importantEntities.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {context.importantEntities.map((ent) => (
                <span
                  key={ent}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 border border-slate-200 text-slate-800"
                >
                  <span>{ent}</span>
                  <button
                    type="button"
                    onClick={() => removeEntity(ent)}
                    className="text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
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
          <span>Back to Context</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={!context.userExperience}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm shadow-sm transition-colors cursor-pointer"
        >
          <span>Continue to Platform & Strategy</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
