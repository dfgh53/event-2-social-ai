import React, { useEffect, useState } from 'react';
import { Sparkles, CheckCircle2, Loader2 } from 'lucide-react';

interface Step4Props {
  platform: string;
  eventName: string;
}

export const Step4GenerationLoading: React.FC<Step4Props> = ({ platform, eventName }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { title: 'Locking Event Ground Truth', desc: 'Separating user-confirmed facts from unverified assumptions' },
    { title: 'Ingesting Multimodal Visuals', desc: 'Analyzing stage screens, crowd density, and lighting vibe' },
    { title: 'Engineering Narrative Framework', desc: 'Constructing Hook → Context → Authentic Experience → Takeaway → CTA arc' },
    { title: `Calibrating ${platform.toUpperCase()} Architecture`, desc: 'Optimizing viewport thumb-stop cadence, tone & tags' },
    { title: 'Synthesizing Platform-Tailored Variations', desc: 'Polishing narrative, insight-driven, and high-signal drafts' },
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setActiveStep(1), 700);
    const timer2 = setTimeout(() => setActiveStep(2), 1400);
    const timer3 = setTimeout(() => setActiveStep(3), 2200);
    const timer4 = setTimeout(() => setActiveStep(4), 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <div className="py-12 px-4 max-w-xl mx-auto space-y-6 animate-fade-in text-center">
      {/* Animated Core Icon */}
      <div className="mx-auto w-16 h-16 rounded-2xl bg-slate-900 text-teal-400 flex items-center justify-center shadow-md">
        <Sparkles className="w-8 h-8 text-teal-400" />
      </div>

      <div className="space-y-1.5">
        <h3 className="text-2xl font-extrabold text-slate-900">
          Synthesizing Content for <span className="text-teal-700">{eventName}</span>
        </h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Gemini 3.8 Flash is analyzing multimodal visual cues, audience framing, and platform requirements.
        </p>
      </div>

      {/* Stepper progress */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/90 space-y-4 text-left shadow-sm">
        {steps.map((step, idx) => {
          const isDone = activeStep > idx;
          const isCurrent = activeStep === idx;
          return (
            <div key={idx} className="flex items-start gap-3">
              <div className="mt-0.5 shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-teal-600" />
                ) : isCurrent ? (
                  <Loader2 className="w-5 h-5 text-teal-600 animate-spin" />
                ) : (
                  <div className="w-5 h-5 rounded-full border border-slate-300 bg-slate-100 flex items-center justify-center text-[10px] text-slate-500 font-semibold">
                    {idx + 1}
                  </div>
                )}
              </div>
              <div>
                <h4
                  className={`text-xs font-semibold ${
                    isDone
                      ? 'text-slate-800'
                      : isCurrent
                      ? 'text-teal-900 font-bold'
                      : 'text-slate-400'
                  }`}
                >
                  {step.title}
                </h4>
                <p className="text-[11px] text-slate-500">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
