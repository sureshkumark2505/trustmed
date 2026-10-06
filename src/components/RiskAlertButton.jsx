import React from 'react';
import { AlertCircle, ShieldAlert, CheckCircle2, ChevronRight, Volume2, VolumeX, Eye } from 'lucide-react';

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
  const isNormal = riskLevel === 'NORMAL';

  return (
    <div className="w-full flex flex-col sm:flex-row items-center gap-3 bg-monitor-card p-3 rounded-lg border border-monitor-cardBorder shadow-xl">
      {/* Primary Action / Alert Button */}
      <div className="flex-1 w-full">
        {isHighRiskOrCrit ? (
          <button
            id="trustmed-alert-btn"
            type="button"
            onClick={onOpenValidation}
            className={`w-full py-3.5 px-5 rounded-lg font-mono font-bold text-sm sm:text-base flex items-center justify-between transition-all duration-300 cursor-pointer ${
              alertActive && !alertAcknowledged
                ? 'bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white shadow-[0_0_25px_rgba(239,68,68,0.7)] animate-pulse-glow border-2 border-red-400'
                : 'bg-rose-950/80 hover:bg-rose-900/90 text-rose-200 border border-rose-600/60 shadow-lg'
            }`}
          >
            <div className="flex items-center gap-2.5 pointer-events-none">
              <span className="text-xl">🚨</span>
              <div className="text-left">
                <div className="text-white font-black tracking-wider uppercase text-sm sm:text-base">
                  {riskLevel === 'CRITICAL' ? 'CRITICAL RISK DETECTED' : 'HIGH RISK DETECTED'}
                </div>
                <div className="text-[11px] text-rose-100/90 font-normal">
                  6-Hour Sepsis Risk: {riskPercentage.toFixed(1)}% • Click to Inspect Trust Validation
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-md border border-white/20 pointer-events-none">
              <Eye className="w-4 h-4 text-white" />
              <span className="text-xs uppercase tracking-wider text-white font-bold">VIEW TRUST</span>
              <ChevronRight className="w-4 h-4 text-white" />
            </div>
          </button>
        ) : isReview ? (
          <button
            type="button"
            onClick={onOpenValidation}
            className="w-full py-3 px-4 rounded-lg bg-amber-950/50 hover:bg-amber-900/60 border border-amber-500/50 text-amber-200 font-mono flex items-center justify-between transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2.5 pointer-events-none">
              <AlertCircle className="w-5 h-5 text-amber-400" />
              <div className="text-left">
                <div className="font-bold text-amber-300 uppercase text-sm tracking-wider">
                  ⚠ REVIEW RECOMMENDED
                </div>
                <div className="text-[11px] text-slate-300">
                  Risk: {riskPercentage.toFixed(1)}% • CTI: {cti}/100 • Clinician Verification Advised
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-amber-300 bg-black/30 px-2.5 py-1 rounded border border-amber-500/30 pointer-events-none">
              <span className="font-bold uppercase">VIEW TRUST</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </button>
        ) : (
          <button
            type="button"
            onClick={onOpenValidation}
            className="w-full py-3 px-4 rounded-lg bg-slate-900/80 hover:bg-slate-800/80 border border-emerald-500/30 text-emerald-300 font-mono flex items-center justify-between transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2.5 pointer-events-none">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <div className="text-left">
                <div className="font-bold text-emerald-300 uppercase text-sm tracking-wider">
                  ● NORMAL MONITORING STATE
                </div>
                <div className="text-[11px] text-slate-400">
                  Risk: {riskPercentage.toFixed(1)}% • Low Sepsis Probability • CTI: {cti}/100
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700 pointer-events-none">
              <span className="font-bold uppercase">VIEW TRUST</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </button>
        )}
      </div>

      {/* Auxiliary controls: Acknowledge & Audio mute */}
      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        {isHighRiskOrCrit && alertActive && (
          <button
            onClick={onAcknowledge}
            className={`px-3 py-2.5 rounded-lg border font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
              alertAcknowledged
                ? 'bg-slate-800 border-slate-700 text-slate-400'
                : 'bg-rose-900/60 hover:bg-rose-800 border-rose-500 text-rose-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{alertAcknowledged ? 'Acknowledged' : 'Ack Alert'}</span>
          </button>
        )}

        <button
          onClick={onToggleMute}
          title={isMuted ? 'Unmute Bedside Audio Alarm' : 'Mute Bedside Audio Alarm'}
          className="p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-all"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
        </button>
      </div>
    </div>
  );
}
