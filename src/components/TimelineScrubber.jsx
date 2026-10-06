import React from 'react';
import { Clock } from 'lucide-react';
import { playTick } from '../services/audioService';

export default function TimelineScrubber({
  observations = [],
  currentIndex = 6,
  onSelectIndex = () => {}
}) {
  const hourLabels = ['t-6', 't-5', 't-4', 't-3', 't-2', 't-1', 't'];

  const handleClick = (idx) => {
    playTick();
    onSelectIndex(idx);
  };

  return (
    <div className="bg-monitor-card rounded-lg border border-monitor-cardBorder px-3 py-1.5 flex items-center justify-between gap-2 shadow font-mono min-h-0">
      {/* Title */}
      <div className="flex items-center gap-2 text-[11px] text-slate-300 shrink-0">
        <Clock className="w-3.5 h-3.5 text-cyan-400" />
        <span className="font-bold uppercase tracking-wider hidden sm:inline">7-Hour Clinical Timeline Replay:</span>
        <span className="text-cyan-300 font-black">
          Hour {currentIndex + 1}/7 ({hourLabels[currentIndex]})
        </span>
      </div>

      {/* Interactive Step Buttons */}
      <div className="flex items-center gap-1 shrink-0">
        {hourLabels.map((label, idx) => {
          const isCurrent = idx === currentIndex;
          const isPast = idx < currentIndex;
          const obs = observations[idx] || {};

          // Color flag if high HR or Temp in this observation
          const hasVitalsAlert = (obs.HR && obs.HR > 100) || (obs.Temp && obs.Temp > 38.0);

          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleClick(idx)}
              className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all relative cursor-pointer ${
                isCurrent
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_10px_rgba(6,182,212,0.6)] ring-1 ring-cyan-300 font-black scale-105 z-10'
                  : isPast
                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                  : 'bg-slate-900 text-slate-500 hover:text-slate-300 border border-slate-800'
              }`}
            >
              <div className="flex items-center gap-1">
                <span>{label}</span>
                <span className={`w-1.5 h-1.5 rounded-full ${
                  hasVitalsAlert 
                    ? 'bg-rose-400' 
                    : isCurrent 
                    ? 'bg-slate-950' 
                    : 'bg-slate-600'
                }`} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
