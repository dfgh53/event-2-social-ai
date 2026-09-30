import React, { useState } from 'react';
import { AspectRatio, GeneratedPost, EventMediaItem } from '../types';
import { 
  X, 
  Crop, 
  ShieldCheck
} from 'lucide-react';

interface MediaOptimizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: GeneratedPost | null;
  mediaItem?: EventMediaItem;
  onApplyCrop: (crop: AspectRatio) => void;
}

export const MediaOptimizerModal: React.FC<MediaOptimizerModalProps> = ({
  isOpen,
  onClose,
  post,
  mediaItem,
  onApplyCrop,
}) => {
  if (!isOpen || !post) return null;

  const [activeCrop, setActiveCrop] = useState<AspectRatio>(post.imageCrop || '1:1');
  const [focalPoint] = useState<{ x: number; y: number }>({ x: 50, y: 40 });

  const crops: { ratio: AspectRatio; name: string; useCase: string; dims: string }[] = [
    { ratio: '1:1', name: 'Square Feed', useCase: 'Universal feed standard for Instagram & LinkedIn desktop', dims: '1080 × 1080' },
    { ratio: '4:5', name: 'Vertical Portrait', useCase: 'Maximum mobile feed viewport area for Instagram & Threads', dims: '1080 × 1350' },
    { ratio: '16:9', name: 'Landscape Widescreen', useCase: 'High-visibility auditorium stage shots for X / Twitter', dims: '1920 × 1080' },
    { ratio: '9:16', name: 'Full-Screen Story', useCase: 'Instagram / YouTube Shorts full immersive viewport', dims: '1080 × 1920' },
  ];

  const getContainerClass = (crop: AspectRatio) => {
    switch (crop) {
      case '1:1':
        return 'w-64 h-64';
      case '4:5':
        return 'w-56 h-70';
      case '16:9':
        return 'w-80 h-44';
      case '9:16':
        return 'w-44 h-80';
      default:
        return 'w-64 h-64';
    }
  };

  const handleApply = () => {
    onApplyCrop(activeCrop);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200/80 text-teal-700 flex items-center justify-center">
              <Crop className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Media Crop & Composition Optimizer</h3>
              <p className="text-xs text-slate-500">
                Calibrate aspect ratio for {post.platform.toUpperCase()} algorithms.
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

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Visual Crop Stage */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center min-h-[280px] relative">
            <div className={`overflow-hidden rounded-xl border-2 border-teal-600 shadow-md relative transition-all duration-300 ${getContainerClass(activeCrop)}`}>
              <img
                src={mediaItem?.dataUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80'}
                alt="Crop preview"
                className="w-full h-full object-cover"
                style={{ objectPosition: `${focalPoint.x}% ${focalPoint.y}%` }}
              />

              {/* Grid overlay for rule of thirds */}
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none border border-white/30">
                <div className="border-r border-b border-white/20" />
                <div className="border-r border-b border-white/20" />
                <div className="border-b border-white/20" />
                <div className="border-r border-b border-white/20" />
                <div className="border-r border-b border-white/20" />
                <div className="border-b border-white/20" />
                <div className="border-r border-white/20" />
                <div className="border-r border-white/20" />
                <div />
              </div>

              {/* Focal Point Indicator */}
              <div
                className="absolute w-6 h-6 rounded-full border-2 border-teal-400 bg-teal-400/20 shadow-sm pointer-events-none -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                style={{ left: `${focalPoint.x}%`, top: `${focalPoint.y}%` }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
              </div>
            </div>

            <p className="text-[11px] text-slate-500 mt-3 font-mono">
              Focal Point: X: {focalPoint.x}% · Y: {focalPoint.y}% (Rule of Thirds Alignment)
            </p>
          </div>

          {/* Aspect Ratio Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {crops.map((c) => {
              const isSelected = activeCrop === c.ratio;
              return (
                <button
                  key={c.ratio}
                  onClick={() => setActiveCrop(c.ratio)}
                  className={`p-3.5 rounded-xl border text-left transition cursor-pointer ${
                    isSelected
                      ? 'bg-teal-50/80 border-teal-600 shadow-xs ring-1 ring-teal-600'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                      <span>{c.ratio}</span>
                      <span className="text-slate-500 font-normal">({c.name})</span>
                    </span>
                    <span className="text-[10px] font-mono text-teal-800">{c.dims}</span>
                  </div>
                  <p className="text-[11px] text-slate-500">{c.useCase}</p>
                </button>
              );
            })}
          </div>

          {/* Preservation Notice */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <span>
              <strong>Identity Integrity:</strong> Event2Social AI does not alter real faces, badges, or attendee identities during optimization. It only recalculates viewport composition.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-xs transition cursor-pointer"
          >
            Apply Crop
          </button>
        </div>
      </div>
    </div>
  );
};
