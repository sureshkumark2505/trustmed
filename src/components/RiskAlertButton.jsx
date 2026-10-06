import React from 'react';
import { AlertCircle, CheckCircle2, ChevronRight, Volume2, VolumeX, Eye } from 'lucide-react';

export default function RiskAlertButton({
  riskLevel = 'HIGH_RISK',
  riskPercentage = 80.78,
  cti = 78,
  decision = 'REVIEW',
  alertActive = true,
  alertAcknowledged = false,
  onOpenValidation = () => {},
  onAcknowledge = () => {},
  isMuted = false,
  onToggleMute = () => {}
}) {
  const isHighRiskOrCrit = riskLevel === 'HIGH_RISK' || riskLevel === 'CRITICAL';
  const isReview = riskLevel === 'REVIEW';

  return (
    <div className="w-full flex items-center justify-between gap-2.5 bg-monitor-card px-3 py-2 rounded-lg border border-monitor-cardBorder shadow-lg font-mono min-h-0">
      {/* Alert Status Info (Left) */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="flex items-center gap-2 shrink-0">
          {isHighRiskOrCrit ? (
            <span className="text-xl">🚨</span>
          ) : isReview ? (
            <AlertCircle className="w-5 h-5 text-amber-400" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          )}

          <div className="truncate">
            <div className={`text-xs sm:text-sm font-black tracking-wider uppercase truncate ${
              isHighRiskOrCrit 
                ? 'text-rose-400' 
                : isReview 
                ? 'text-amber-400' 
                : 'text-emerald-400'
            }`}>
              {isHighRiskOrCrit 
                ? (riskLevel === 'CRITICAL' ? 'CRITICAL RISK DETECTED' : 'HIGH RISK DETECTED')
                : isReview
                ? 'REVIEW RECOMMENDED'
                : 'NORMAL MONITORING'}
            </div>
            <div className="text-[10px] text-slate-400 truncate">
              6-Hour Sepsis Risk: <strong className="text-white">{riskPercentage.toFixed(1)}%</strong> • CTI: <strong className="text-cyan-300">{cti}/100</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons (Right) */}
      <div className="flex items-center gap-2 shrink-0">
        {/* VIEW TRUST Action Button */}
        <button
          id="trustmed-alert-btn"
          type="button"
          onClick={onOpenValidation}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 transition-all cursor-pointer shadow-md ${
            isHighRiskOrCrit
              ? alertActive && !alertAcknowledged
                ? 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-[0_0_18px_rgba(239,68,68,0.7)] animate-pulse-glow border border-red-400 ring-2 ring-red-500/40'
                : 'bg-rose-950/80 hover:bg-rose-900 border border-rose-600/70 text-rose-200'
              : isReview
              ? 'bg-amber-950/70 hover:bg-amber-900 border border-amber-500/60 text-amber-200'
              : 'bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>VIEW TRUST</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        {/* ACK ALERT (when in alert state) */}
        {isHighRiskOrCrit && alertActive && (
          <button
            type="button"
            onClick={onAcknowledge}
            className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer ${
              alertAcknowledged
                ? 'bg-slate-800/80 border-slate-700 text-slate-500'
                : 'bg-rose-950/60 hover:bg-rose-900 border-rose-500/80 text-rose-300'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{alertAcknowledged ? 'ACKED' : 'ACK ALERT'}</span>
          </button>
        )}

        {/* Sound Toggle */}
        <button
          type="button"
          onClick={onToggleMute}
          title={isMuted ? 'Unmute Bedside Alarm' : 'Mute Bedside Alarm'}
          className="p-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
        </button>
      </div>
    </div>
  );
}
