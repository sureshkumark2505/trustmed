import React from 'react';
import { ShieldCheck, ChevronRight, Layers } from 'lucide-react';

export default function TrustIndexCard({ analysis = {}, onOpenValidation = () => {} }) {
  const {
    clinical_trust_index = 78,
    trust_level = 'MODERATE-HIGH',
    explanation_consistency = 88,
    evidence_quality = 81,
    confidence = 61.57,
    familiarity = 77
  } = analysis;

  let ctiColor = '#3B82F6';
  let badgeClass = 'bg-blue-950/70 border-blue-500/50 text-blue-300';

  if (clinical_trust_index >= 85) {
    ctiColor = '#10B981';
    badgeClass = 'bg-emerald-950/70 border-emerald-500/50 text-emerald-300';
  } else if (clinical_trust_index >= 70) {
    ctiColor = '#38BDF8';
    badgeClass = 'bg-sky-950/70 border-sky-500/50 text-sky-300';
  } else if (clinical_trust_index >= 55) {
    ctiColor = '#F59E0B';
    badgeClass = 'bg-amber-950/70 border-amber-500/50 text-amber-300';
  } else {
    ctiColor = '#EF4444';
    badgeClass = 'bg-rose-950/70 border-rose-500/50 text-rose-300';
  }

  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, clinical_trust_index)) / 100) * circumference;

  return (
    <div className="bg-monitor-card rounded-lg border border-monitor-cardBorder p-2.5 flex flex-col justify-between relative overflow-hidden shadow font-mono min-h-0">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-monitor-cardBorder pb-1.5">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5" style={{ color: ctiColor }} />
          <span className="text-[11px] font-bold tracking-wider text-slate-200 uppercase">
            Clinical Trust Index
          </span>
        </div>
        <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border uppercase ${badgeClass}`}>
          {trust_level}
        </span>
      </div>

      {/* Main Gauge & Compact 4 Pillars */}
      <div className="flex items-center justify-between my-1">
        {/* Progress Gauge */}
        <div className="relative flex items-center justify-center shrink-0">
          <svg className="w-20 h-20 transform -rotate-90">
            <circle
              cx="40"
              cy="40"
              r={radius}
              stroke="rgba(30, 48, 77, 0.4)"
              strokeWidth="7"
              fill="transparent"
            />
            <circle
              cx="40"
              cy="40"
              r={radius}
              stroke={ctiColor}
              strokeWidth="7"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-700 ease-out"
              style={{ filter: `drop-shadow(0 0 5px ${ctiColor}88)` }}
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-lg font-black text-white tracking-tight leading-none">
              {Math.round(clinical_trust_index)}
            </span>
            <span className="text-[8px] text-slate-400 uppercase tracking-widest mt-0.5">
              / 100 CTI
            </span>
          </div>
        </div>

        {/* 4 Pillars Mini Grid */}
        <div className="grid grid-cols-2 gap-1 text-[9px] pl-2 flex-1">
          <div className="bg-monitor-panel px-1.5 py-0.5 rounded border border-slate-800 flex justify-between">
            <span className="text-slate-400">Consist:</span>
            <span className="font-bold text-emerald-400">{explanation_consistency}</span>
          </div>
          <div className="bg-monitor-panel px-1.5 py-0.5 rounded border border-slate-800 flex justify-between">
            <span className="text-slate-400">Evidence:</span>
            <span className="font-bold text-sky-400">{evidence_quality}</span>
          </div>
          <div className="bg-monitor-panel px-1.5 py-0.5 rounded border border-slate-800 flex justify-between">
            <span className="text-slate-400">Conf:</span>
            <span className="font-bold text-blue-400">{confidence.toFixed(0)}%</span>
          </div>
          <div className="bg-monitor-panel px-1.5 py-0.5 rounded border border-slate-800 flex justify-between">
            <span className="text-slate-400">Familiar:</span>
            <span className="font-bold text-purple-400">{familiarity}%</span>
          </div>
        </div>
      </div>

      {/* Button to open validation modal */}
      <button
        type="button"
        onClick={onOpenValidation}
        className="w-full py-1 px-2 bg-slate-800/90 hover:bg-slate-700 active:scale-[0.99] rounded border border-slate-700 text-[10px] text-slate-300 hover:text-white flex items-center justify-between transition-all group cursor-pointer"
      >
        <span className="flex items-center gap-1.5">
          <Layers className="w-3 h-3 text-cyan-400" />
          <span>Inspect Trust Validation Layers</span>
        </span>
        <ChevronRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
}
