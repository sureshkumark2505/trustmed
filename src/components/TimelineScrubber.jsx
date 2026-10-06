import React from 'react';
import { Clock, ChevronRight } from 'lucide-react';
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
    <div className="bg-monitor-card rounded-lg border border-monitor-cardBorder p-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 shadow font-mono">
      {/* Title */}
      <div className="flex items-center gap-2 text-xs text-slate-300">
        <Clock className="w-3.5 h-3.5 text-cyan-400" />
        <span className="font-bold uppercase tracking-wider">7-Hour Clinical Timeline Replay:</span>
        <span className="text-cyan-300 font-black">
          Hour {currentIndex + 1}/7 ({hourLabels[currentIndex]})
        </span>
      </div>

      {/* Interactive Step Buttons */}
      <div className="flex items-center gap-1.5 w-full sm:w-auto justify-between sm:justify-end">
        {hourLabels.map((label, idx) => {
          const isCurrent = idx === currentIndex;
          const isPast = idx < currentIndex;
          const obs = observations[idx] || {};

          // Color flag if high HR or Temp in this observation
          const hasVitalsAlert = (obs.HR && obs.HR > 100) || (obs.Temp && obs.Temp > 38.0);

          return (
            <button
              key={idx}
              onClick={() => handleClick(idx)}
              className={`flex-1 sm:flex-initial px-2.5 py-1.5 rounded text-xs font-bold transition-all relative ${
                isCurrent
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(6,182,212,0.6)] ring-2 ring-cyan-300 scale-105 z-10'
                  : isPast
                  ? 'bg-slate-800/90 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                  : 'bg-slate-900/60 text-slate-500 hover:text-slate-300 border border-slate-800'
              }`}
            >
              <div className="flex flex-col items-center">
                <span>{label}</span>
                {/* Micro indicator dot */}
                <div className="flex items-center gap-0.5 mt-0.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    hasVitalsAlert 
                      ? 'bg-rose-400' 
                      : isCurrent 
                      ? 'bg-slate-950' 
                      : 'bg-slate-600'
                  }`} />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
