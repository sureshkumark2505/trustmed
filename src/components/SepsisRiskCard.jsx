import React from 'react';
import { ShieldAlert, Clock } from 'lucide-react';

export default function SepsisRiskCard({ analysis = {} }) {
  const {
    risk_probability = 0.807845,
    risk_percentage = 80.78,
    risk_level = 'HIGH_RISK',
    threshold = 0.69,
    prediction_horizon = 'Next 6 Hours'
  } = analysis;

  const isCritical = risk_level === 'CRITICAL';
  const isHighRisk = risk_level === 'HIGH_RISK';
  const isReview = risk_level === 'REVIEW';

  let statusColor = '#10B981';
  let badgeBg = 'bg-emerald-950/70 border-emerald-500/40 text-emerald-400';
  let riskText = 'LOW RISK';

  if (isCritical) {
    statusColor = '#EF4444';
    badgeBg = 'bg-rose-950/80 border-rose-500 text-rose-400 animate-pulse';
    riskText = 'CRITICAL RISK';
  } else if (isHighRisk) {
    statusColor = '#F43F5E';
    badgeBg = 'bg-rose-950/70 border-rose-500/80 text-rose-300';
    riskText = 'HIGH RISK';
  } else if (isReview) {
    statusColor = '#EAB308';
    badgeBg = 'bg-amber-950/70 border-amber-500/60 text-amber-300';
    riskText = 'ELEVATED RISK';
  }

  // Compact circular progress stroke (radius 36)
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, risk_percentage)) / 100) * circumference;

  return (
    <div className="bg-monitor-card rounded-lg border border-monitor-cardBorder p-2.5 flex flex-col justify-between relative overflow-hidden shadow font-mono min-h-0">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-monitor-cardBorder pb-1.5">
        <div className="flex items-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5" style={{ color: statusColor }} />
          <span className="text-[11px] font-bold tracking-wider text-slate-200 uppercase">
            6-Hour Sepsis Risk
          </span>
        </div>
        <span className="text-[9px] text-slate-400 bg-monitor-panel px-1.5 py-0.5 rounded border border-slate-700/50 flex items-center gap-1">
          <Clock className="w-2.5 h-2.5 text-cyan-400" />
          <span>Next 6h</span>
        </span>
      </div>

      {/* Main Gauge & Value Display */}
      <div className="flex items-center justify-between my-1">
        {/* Compact Circular Progress Meter */}
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
            {/* Threshold notch at 0.69 */}
            <circle
              cx="40"
              cy="40"
              r={radius}
              stroke="rgba(255, 255, 255, 0.25)"
              strokeWidth="9"
              strokeDasharray={`${circumference * 0.012} ${circumference}`}
              strokeDashoffset={circumference - (0.69 * circumference)}
              fill="transparent"
            />
            {/* Animated risk stroke */}
            <circle
              cx="40"
              cy="40"
              r={radius}
              stroke={statusColor}
              strokeWidth="7"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-700 ease-out"
              style={{ filter: `drop-shadow(0 0 5px ${statusColor}88)` }}
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-lg font-black text-white tracking-tight leading-none">
              {risk_percentage.toFixed(1)}%
            </span>
            <span className="text-[8px] text-slate-400 uppercase tracking-widest mt-0.5">
              Risk
            </span>
          </div>
        </div>

        {/* Status Details */}
        <div className="flex flex-col items-end gap-1 pl-2">
          <div className={`px-2 py-0.5 rounded border text-[11px] font-bold tracking-wider uppercase ${badgeBg}`}>
            {riskText}
          </div>
          <div className="text-right text-[10px] text-slate-400 space-y-0.5">
            <div>Prob: <span className="text-white font-bold">{risk_probability.toFixed(4)}</span></div>
            <div>Threshold: <span className="text-amber-400 font-semibold">{threshold}</span></div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-1 border-t border-monitor-cardBorder flex items-center justify-between text-[9px] text-slate-500">
        <span>XGBoost Early Warning</span>
        <span>Validation Operating Point</span>
      </div>
    </div>
  );
}
