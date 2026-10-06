import React from 'react';
import { ShieldCheck, CheckCircle2, ChevronRight, HelpCircle, Layers } from 'lucide-react';

export default function TrustIndexCard({ analysis = {}, onOpenValidation = () => {} }) {
  const {
    clinical_trust_index = 78,
    trust_level = 'MODERATE-HIGH',
    explanation_consistency = 88,
    evidence_quality = 81,
    confidence = 61.57,
    familiarity = 77,
    ood_score = 23,
    uncertainty = 38.43
  } = analysis;

  // Determine trust color theme
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

  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, clinical_trust_index)) / 100) * circumference;

  return (
    <div className="bg-monitor-card rounded-lg border border-monitor-cardBorder p-4 flex flex-col justify-between relative overflow-hidden h-full shadow-lg">
      {/* Background radial glow */}
      <div 
        className="absolute -right-10 -top-10 w-44 h-44 rounded-full opacity-15 blur-2xl pointer-events-none transition-all duration-700"
        style={{ backgroundColor: ctiColor }}
      />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-monitor-cardBorder pb-2.5">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" style={{ color: ctiColor }} />
          <span className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
            Clinical Trust Index
          </span>
        </div>
        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${badgeClass}`}>
          {trust_level}
        </span>
      </div>

      {/* Main Gauge & Compact 4-Pillars Summary */}
      <div className="flex items-center justify-between my-2">
        {/* Circular Progress Gauge */}
        <div className="relative flex items-center justify-center">
          <svg className="w-28 h-28 transform -rotate-90">
            <circle
              cx="56"
              cy="56"
              r={radius}
              stroke="rgba(30, 48, 77, 0.4)"
              strokeWidth="9"
              fill="transparent"
            />
            <circle
              cx="56"
              cy="56"
              r={radius}
              stroke={ctiColor}
              strokeWidth="9"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
              style={{ filter: `drop-shadow(0 0 6px ${ctiColor}99)` }}
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-2xl font-mono font-black text-white tracking-tight">
              {Math.round(clinical_trust_index)}
            </span>
            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">
              / 100 CTI
            </span>
          </div>
        </div>

        {/* 4 Trust Pillars Breakdown */}
        <div className="flex flex-col gap-1 text-[11px] font-mono pl-2 w-48">
          <div className="flex items-center justify-between bg-monitor-panel/60 px-2 py-0.5 rounded border border-slate-800">
            <span className="text-slate-400">Consistency:</span>
            <span className="font-bold text-emerald-400">{explanation_consistency}</span>
          </div>
          <div className="flex items-center justify-between bg-monitor-panel/60 px-2 py-0.5 rounded border border-slate-800">
            <span className="text-slate-400">Evidence:</span>
            <span className="font-bold text-sky-400">{evidence_quality}</span>
          </div>
          <div className="flex items-center justify-between bg-monitor-panel/60 px-2 py-0.5 rounded border border-slate-800">
            <span className="text-slate-400">Confidence:</span>
            <span className="font-bold text-blue-400">{confidence.toFixed(0)}%</span>
          </div>
          <div className="flex items-center justify-between bg-monitor-panel/60 px-2 py-0.5 rounded border border-slate-800">
            <span className="text-slate-400">Familiarity:</span>
            <span className="font-bold text-purple-400">{familiarity}%</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <button
        onClick={onOpenValidation}
        className="w-full mt-1 py-1.5 px-3 bg-slate-800/80 hover:bg-slate-700/80 active:scale-[0.99] rounded border border-slate-700/80 text-xs font-mono text-slate-300 hover:text-white flex items-center justify-between transition-all group"
      >
        <span className="flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          Inspect Trust Validation Layers
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
}
