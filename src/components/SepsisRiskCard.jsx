import React from 'react';
import { AlertTriangle, CheckCircle, ShieldAlert, Clock, Sparkles } from 'lucide-react';

export default function SepsisRiskCard({ analysis = {} }) {
  const {
    risk_probability = 0.807845,
    risk_percentage = 80.78,
    risk_level = 'HIGH_RISK',
    threshold = 0.69,
    prediction_horizon = 'Next 6 Hours',
    decision = 'REVIEW'
  } = analysis;

  // Determine styles by risk level
  const isCritical = risk_level === 'CRITICAL';
  const isHighRisk = risk_level === 'HIGH_RISK';
  const isReview = risk_level === 'REVIEW';
  const isNormal = risk_level === 'NORMAL';

  let statusColor = '#10B981';
  let badgeBg = 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400';
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

  // Calculate SVG circular stroke
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, risk_percentage)) / 100) * circumference;

  return (
    <div className="bg-monitor-card rounded-lg border border-monitor-cardBorder p-4 flex flex-col justify-between relative overflow-hidden h-full shadow-lg">
      {/* Background radial glow */}
      <div 
        className="absolute -right-10 -top-10 w-44 h-44 rounded-full opacity-15 blur-2xl pointer-events-none transition-all duration-700"
        style={{ backgroundColor: statusColor }}
      />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-monitor-cardBorder pb-2.5">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4" style={{ color: statusColor }} />
          <span className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
            6-Hour Sepsis Risk
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 bg-monitor-panel/80 px-2 py-0.5 rounded border border-slate-700/50">
          <Clock className="w-3 h-3 text-cyan-400" />
          <span>Horizon: {prediction_horizon}</span>
        </div>
      </div>

      {/* Main Gauge & Value Display */}
      <div className="flex items-center justify-between my-2">
        {/* Circular Progress Meter */}
        <div className="relative flex items-center justify-center">
          <svg className="w-28 h-28 transform -rotate-90">
            {/* Background track */}
            <circle
              cx="56"
              cy="56"
              r={radius}
              stroke="rgba(30, 48, 77, 0.4)"
              strokeWidth="9"
              fill="transparent"
            />
            {/* Threshold indicator notch at 0.69 */}
            <circle
              cx="56"
              cy="56"
              r={radius}
              stroke="rgba(255, 255, 255, 0.25)"
              strokeWidth="11"
              strokeDasharray={`${circumference * 0.01} ${circumference}`}
              strokeDashoffset={circumference - (0.69 * circumference)}
              fill="transparent"
            />
            {/* Animated risk fill */}
            <circle
              cx="56"
              cy="56"
              r={radius}
              stroke={statusColor}
              strokeWidth="9"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
              style={{ filter: `drop-shadow(0 0 6px ${statusColor}99)` }}
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-2xl font-mono font-black text-white tracking-tight">
              {risk_percentage.toFixed(1)}%
            </span>
            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">
              Risk
            </span>
          </div>
        </div>

        {/* Status Details */}
        <div className="flex flex-col items-end gap-1.5 pl-2">
          <div className={`px-2.5 py-1 rounded border text-xs font-mono font-bold tracking-wider uppercase ${badgeBg}`}>
            {riskText}
          </div>
          <div className="text-right">
            <div className="text-[11px] font-mono text-slate-400">
              Prob: <span className="text-white font-bold">{risk_probability.toFixed(4)}</span>
            </div>
            <div className="text-[10px] font-mono text-slate-400">
              Threshold: <span className="text-amber-400 font-semibold">{threshold}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-2 border-t border-monitor-cardBorder flex items-center justify-between text-[10px] font-mono text-slate-400">
        <span>Model: XGBoost Ensemble</span>
        <span className="text-slate-400 italic">Validation Cutoff</span>
      </div>
    </div>
  );
}
