import React, { useState } from 'react';
import { 
  Shield, 
  Activity, 
  Users, 
  Info, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  X, 
  Calculator, 
  Sliders, 
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function TrustValidationModal({
  isOpen = false,
  onClose = () => {},
  analysis = {},
  patient = {}
}) {
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' | 'shap' | 'similarity' | 'formulas'
  const [showAllShap, setShowAllShap] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);

  if (!isOpen) return null;

  const {
    risk_probability = 0.807845,
    risk_percentage = 80.78,
    risk_level = 'HIGH_RISK',
    clinical_trust_index = 78,
    trust_level = 'MODERATE-HIGH',
    confidence = 61.57,
    uncertainty = 38.43,
    familiarity = 77,
    ood_score = 23,
    explanation_consistency = 88,
    evidence_quality = 81,
    decision = 'REVIEW',
    decision_rationale = 'High predicted risk, but trust evidence requires clinical verification.',
    shap_features = [],
    similarity = {},
    consistency_details = {}
  } = analysis;

  let decisionBadge = 'bg-amber-950/80 border-amber-500 text-amber-300';
  let decisionIcon = <AlertTriangle className="w-5 h-5 text-amber-400" />;

  if (decision === 'ACCEPT') {
    decisionBadge = 'bg-emerald-950/80 border-emerald-500 text-emerald-300';
    decisionIcon = <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
  } else if (decision === 'DEFER') {
    decisionBadge = 'bg-rose-950/80 border-rose-500 text-rose-300';
    decisionIcon = <XCircle className="w-5 h-5 text-rose-400" />;
  }

  const displayedShap = showAllShap ? shap_features : shap_features.slice(0, 5);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-monitor-card border border-monitor-cardBorder rounded-xl w-full max-w-5xl max-h-[85vh] sm:max-h-[calc(100vh-80px)] flex flex-col shadow-2xl overflow-hidden font-mono min-h-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header (Fixed ~50px) */}
        <div className="px-4 py-2.5 bg-monitor-panel border-b border-monitor-cardBorder flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded bg-blue-950/70 border border-blue-500/40 text-blue-400">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-white tracking-wide uppercase">
                  TRUST VALIDATION
                </h2>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-900/50 border border-blue-500/30 text-blue-300 font-bold">
                  Patient: {patient.id || 'TM-HIGH-001'}
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-950/70 border border-rose-500/40 text-rose-300 font-bold">
                  6-Hour Risk: {risk_percentage.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation (Fixed ~36px) */}
        <div className="flex items-center gap-1 px-4 pt-1 border-b border-monitor-cardBorder bg-monitor-card shrink-0 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('summary')}
            className={`px-3 py-1.5 font-bold rounded-t transition-all border-b-2 cursor-pointer ${
              activeTab === 'summary'
                ? 'border-blue-500 text-white bg-monitor-panel/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Trust Summary
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('shap')}
            className={`px-3 py-1.5 font-bold rounded-t transition-all border-b-2 cursor-pointer ${
              activeTab === 'shap'
                ? 'border-purple-500 text-purple-300 bg-monitor-panel/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Contributing Factors (SHAP)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('similarity')}
            className={`px-3 py-1.5 font-bold rounded-t transition-all border-b-2 cursor-pointer ${
              activeTab === 'similarity'
                ? 'border-cyan-500 text-cyan-300 bg-monitor-panel/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Patient Similarity
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('formulas')}
            className={`px-3 py-1.5 font-bold rounded-t transition-all border-b-2 cursor-pointer ${
              activeTab === 'formulas'
                ? 'border-emerald-500 text-emerald-300 bg-monitor-panel/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Formulas
          </button>
        </div>

        {/* Scrollable Content Area (Only internal content scrolls if needed) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
          {activeTab === 'summary' && (
            <>
              {/* 2-Column Grid of 6 Trust Dimensions (Section 14 & 15) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
                {/* 1. Explanation Consistency */}
                <div className="p-3 rounded-lg bg-monitor-panel border border-monitor-cardBorder space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white uppercase flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-emerald-400" />
                      Explanation Consistency
                    </span>
                    <span className="font-black text-emerald-400 text-sm">
                      {explanation_consistency} / 100
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${explanation_consistency}%` }} />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Stability under Gaussian noise</span>
                    <span className="text-emerald-400 font-bold">Stable</span>
                  </div>
                </div>

                {/* 2. Evidence Quality */}
                <div className="p-3 rounded-lg bg-monitor-panel border border-monitor-cardBorder space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white uppercase flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-sky-400" />
                      Evidence Quality
                    </span>
                    <span className="font-black text-sky-400 text-sm">
                      {evidence_quality} / 100
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-sky-500 h-full rounded-full" style={{ width: `${evidence_quality}%` }} />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>mean(Consistency, Familiarity, Confidence)</span>
                    <span className="text-sky-400 font-bold">Moderate-High</span>
                  </div>
                </div>

                {/* 3. Predictive Confidence */}
                <div className="p-3 rounded-lg bg-monitor-panel border border-monitor-cardBorder space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white uppercase flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-blue-400" />
                      Predictive Confidence
                    </span>
                    <span className="font-black text-blue-400 text-sm">
                      {confidence.toFixed(2)}
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: `${confidence}%` }} />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Formula: |2P - 1| × 100</span>
                    <span className="text-blue-300 font-bold">{confidence.toFixed(1)}% Conf</span>
                  </div>
                </div>

                {/* 4. Predictive Uncertainty */}
                <div className="p-3 rounded-lg bg-monitor-panel border border-monitor-cardBorder space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white uppercase flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-amber-400" />
                      Predictive Uncertainty
                    </span>
                    <span className="font-black text-amber-400 text-sm">
                      {uncertainty.toFixed(2)}
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: `${uncertainty}%` }} />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Formula: 100 - Confidence</span>
                    <span className="text-amber-300 font-bold">{uncertainty.toFixed(1)}% Uncert</span>
                  </div>
                </div>

                {/* 5. Patient Familiarity */}
                <div className="p-3 rounded-lg bg-monitor-panel border border-monitor-cardBorder space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white uppercase flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-purple-400" />
                      Patient Familiarity
                    </span>
                    <span className="font-black text-purple-400 text-sm">
                      {familiarity} / 100
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full rounded-full" style={{ width: `${familiarity}%` }} />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Top-10 Reference Similarity</span>
                    <span className="text-purple-300 font-bold">{familiarity}% Familiar</span>
                  </div>
                </div>

                {/* 6. OOD Risk */}
                <div className="p-3 rounded-lg bg-monitor-panel border border-monitor-cardBorder space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white uppercase flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-rose-400" />
                      OOD Risk
                    </span>
                    <span className="font-black text-rose-400 text-sm">
                      {ood_score} / 100
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-rose-500 h-full rounded-full" style={{ width: `${ood_score}%` }} />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Formula: 100 - Familiarity</span>
                    <span className="text-rose-300 font-bold">{ood_score}% OOD</span>
                  </div>
                </div>
              </div>

              {/* Central Clinical Trust Index (CTI) Banner */}
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-between text-xs">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">Clinical Trust Index (CTI)</div>
                  <div className="text-xl font-black text-cyan-300">{clinical_trust_index} / 100 ({trust_level})</div>
                </div>
                <div className="text-right text-[10px] text-slate-400 font-mono">
                  <div>0.30(Consist) + 0.30(Evidence) + 0.20(Conf) + 0.20(Fam)</div>
                </div>
              </div>

              {/* Clinical Decision Banner (Section 18) */}
              <div className={`p-3 rounded-lg border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 ${decisionBadge}`}>
                <div className="flex items-center gap-2.5">
                  {decisionIcon}
                  <div>
                    <div className="font-black text-sm uppercase tracking-wider text-white">
                      ⚠ {decision === 'REVIEW' ? 'REVIEW REQUIRED' : decision}
                    </div>
                    <div className="text-[11px] text-slate-200">
                      {decision === 'REVIEW' 
                        ? 'AI predicts elevated sepsis risk within the next 6 hours. Clinical verification required.'
                        : decision_rationale}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  <button
                    type="button"
                    onClick={() => setAcknowledged(true)}
                    className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                      acknowledged 
                        ? 'bg-slate-800 text-slate-400 border border-slate-700' 
                        : 'bg-black/50 hover:bg-black/70 text-white border border-white/20'
                    }`}
                  >
                    {acknowledged ? '✓ ACKNOWLEDGED' : 'ACKNOWLEDGE'}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 transition-all cursor-pointer"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: SHAP Top Contributing Factors (Section 16) */}
          {activeTab === 'shap' && (
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-1">
                <span className="font-bold text-white uppercase">TOP CONTRIBUTING FACTORS (SHAP)</span>
                <span className="text-[10px] text-slate-400">Contribution to 6-Hour Sepsis Risk</span>
              </div>

              <div className="space-y-1.5">
                {displayedShap.map((item, idx) => {
                  const isPos = item.value >= 0;
                  const absVal = Math.abs(item.value);
                  const barWidth = Math.min(100, (absVal / 0.65) * 100);

                  return (
                    <div key={idx} className="p-2 rounded bg-monitor-panel border border-monitor-cardBorder flex items-center justify-between gap-2">
                      <div className="w-32 shrink-0">
                        <span className="font-bold text-white block">{item.feature}</span>
                        <span className="text-[9px] text-slate-400">{item.label}</span>
                      </div>

                      <div className="flex-1 flex items-center gap-2">
                        <div className="flex-1 bg-slate-800 h-2.5 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${isPos ? 'bg-rose-500' : 'bg-emerald-400'}`}
                            style={{ width: `${barWidth}%` }}
                          />
                        </div>
                        <span className={`w-14 text-right font-bold text-[11px] ${isPos ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {isPos ? `+${item.value.toFixed(4)}` : item.value.toFixed(4)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setShowAllShap(!showAllShap)}
                className="w-full py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-[11px] flex items-center justify-center gap-1 border border-slate-700 transition-all cursor-pointer"
              >
                <span>{showAllShap ? 'SHOW LESS' : 'VIEW MORE (ALL FACTORS)'}</span>
                {showAllShap ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}

          {/* TAB 3: Patient Similarity (Section 17) */}
          {activeTab === 'similarity' && (
            <div className="space-y-3 text-xs">
              <div className="border-b border-slate-800 pb-1 font-bold text-white uppercase">
                PATIENT SIMILARITY (PhysioNet 2019 Reference Cohort)
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="p-3 rounded bg-monitor-panel border border-monitor-cardBorder text-center">
                  <div className="text-[10px] text-slate-400 uppercase">Top-1</div>
                  <div className="text-xl font-black text-cyan-400 my-0.5">{((similarity.top1 ?? 0.82) * 100).toFixed(0)}%</div>
                  <div className="text-[9px] text-slate-500">Nearest Match</div>
                </div>
                <div className="p-3 rounded bg-monitor-panel border border-monitor-cardBorder text-center">
                  <div className="text-[10px] text-slate-400 uppercase">Top-5</div>
                  <div className="text-xl font-black text-cyan-400 my-0.5">{((similarity.top5 ?? 0.79) * 100).toFixed(0)}%</div>
                  <div className="text-[9px] text-slate-500">Close Cluster</div>
                </div>
                <div className="p-3 rounded bg-monitor-panel border border-monitor-cardBorder text-center">
                  <div className="text-[10px] text-slate-400 uppercase">Top-10</div>
                  <div className="text-xl font-black text-cyan-300 my-0.5">{((similarity.top10 ?? 0.77) * 100).toFixed(0)}%</div>
                  <div className="text-[9px] text-slate-500">Familiarity Base</div>
                </div>
                <div className="p-3 rounded bg-monitor-panel border border-monitor-cardBorder text-center">
                  <div className="text-[10px] text-slate-400 uppercase">Top-50</div>
                  <div className="text-xl font-black text-cyan-200 my-0.5">{((similarity.top50 ?? 0.73) * 100).toFixed(0)}%</div>
                  <div className="text-[9px] text-slate-500">Cohort Density</div>
                </div>
              </div>

              <div className="p-2.5 rounded bg-monitor-panel border border-slate-800 text-[11px] text-slate-300">
                <span>Positive Sepsis Cases in Top-10 Neighbors: </span>
                <strong className="text-amber-400">{Math.round((similarity.top10_positive_rate ?? 0.8) * 10)} / 10 Patients</strong>
              </div>
            </div>
          )}

          {/* TAB 4: Mathematical Formulas */}
          {activeTab === 'formulas' && (
            <div className="space-y-2 text-xs">
              <div className="p-2 rounded bg-monitor-panel border border-slate-700">
                <div className="font-bold text-white mb-0.5">Confidence & Uncertainty:</div>
                <div className="text-blue-300">Confidence = |2P - 1| × 100 • Uncertainty = 100 - Confidence</div>
              </div>
              <div className="p-2 rounded bg-monitor-panel border border-slate-700">
                <div className="font-bold text-white mb-0.5">Explanation Consistency:</div>
                <div className="text-emerald-300">Consistency = ( |Top-K(original) ∩ Top-K(perturbed)| / K ) × 100</div>
              </div>
              <div className="p-2 rounded bg-monitor-panel border border-slate-700">
                <div className="font-bold text-white mb-0.5">Clinical Trust Index:</div>
                <div className="text-purple-300">CTI = 0.30(Consistency) + 0.30(Evidence Quality) + 0.20(Confidence) + 0.20(Familiarity)</div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Fixed Footer (~36px) */}
        <div className="px-4 py-2 bg-monitor-panel border-t border-monitor-cardBorder flex items-center justify-between text-[10px] text-slate-400 shrink-0">
          <div className="flex items-center gap-1.5">
            <Info className="w-3 h-3 text-cyan-400" />
            <span>Research Prototype • Clinical Decision Support Only</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all border border-slate-700 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
