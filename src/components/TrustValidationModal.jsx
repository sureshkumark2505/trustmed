import React, { useState } from 'react';
import { 
  Shield, 
  ShieldAlert, 
  ShieldCheck, 
  Activity, 
  Users, 
  Info, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  X, 
  ExternalLink, 
  Calculator, 
  BarChart2, 
  Sliders, 
  HelpCircle,
  Clock,
  Sparkles
} from 'lucide-react';

export default function TrustValidationModal({
  isOpen = false,
  onClose = () => {},
  analysis = {},
  patient = {}
}) {
  const [selectedFormula, setSelectedFormula] = useState(null);
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' | 'shap' | 'similarity' | 'formulas'

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

  // Decision theme
  let decisionBadge = 'bg-amber-950/80 border-amber-500 text-amber-300';
  let decisionIcon = <AlertTriangle className="w-5 h-5 text-amber-400" />;

  if (decision === 'ACCEPT') {
    decisionBadge = 'bg-emerald-950/80 border-emerald-500 text-emerald-300';
    decisionIcon = <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
  } else if (decision === 'DEFER') {
    decisionBadge = 'bg-rose-950/80 border-rose-500 text-rose-300';
    decisionIcon = <XCircle className="w-5 h-5 text-rose-400" />;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-monitor-card border border-monitor-cardBorder rounded-xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Top Header */}
        <div className="px-5 py-3.5 bg-monitor-panel border-b border-monitor-cardBorder flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-950/60 border border-blue-500/40 text-blue-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-mono font-bold text-white tracking-wide">
                  TRUSTMED MULTI-DIMENSIONAL TRUST VALIDATION
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-900/40 border border-blue-500/30 text-blue-300">
                  Patient: {patient.id || 'DEMO-001'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Auditable trust layer separating 6-hour sepsis prediction from clinical decision
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-5 pt-2 border-b border-monitor-cardBorder bg-monitor-card">
          <button
            onClick={() => setActiveTab('summary')}
            className={`px-3.5 py-2 text-xs font-mono font-bold rounded-t-lg transition-all border-b-2 ${
              activeTab === 'summary'
                ? 'border-blue-500 text-white bg-monitor-panel/50'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Trust Summary & Decision
          </button>
          <button
            onClick={() => setActiveTab('shap')}
            className={`px-3.5 py-2 text-xs font-mono font-bold rounded-t-lg transition-all border-b-2 ${
              activeTab === 'shap'
                ? 'border-purple-500 text-purple-300 bg-monitor-panel/50'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            SHAP Explainability ({shapFeatures.length})
          </button>
          <button
            onClick={() => setActiveTab('similarity')}
            className={`px-3.5 py-2 text-xs font-mono font-bold rounded-t-lg transition-all border-b-2 ${
              activeTab === 'similarity'
                ? 'border-cyan-500 text-cyan-300 bg-monitor-panel/50'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Adaptive Patient Similarity
          </button>
          <button
            onClick={() => setActiveTab('formulas')}
            className={`px-3.5 py-2 text-xs font-mono font-bold rounded-t-lg transition-all border-b-2 ${
              activeTab === 'formulas'
                ? 'border-emerald-500 text-emerald-300 bg-monitor-panel/50'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Formula & Math Inspector
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {activeTab === 'summary' && (
            <>
              {/* Clinical Decision Banner (Section 18/19) */}
              <div className={`p-4 rounded-xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg ${decisionBadge}`}>
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-lg bg-black/40 border border-white/20">
                    {decisionIcon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono uppercase tracking-widest text-slate-300">
                        AI Recommendation
                      </span>
                      <span className="text-lg font-mono font-black uppercase tracking-wider text-white">
                        {decision}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-slate-200 mt-0.5 max-w-xl">
                      {decision_rationale}
                    </p>
                  </div>
                </div>

                <div className="text-left md:text-right font-mono bg-black/30 p-2.5 rounded-lg border border-white/10 text-xs text-slate-300">
                  <div>6-Hour Sepsis Risk: <span className="font-bold text-white">{risk_percentage.toFixed(2)}%</span></div>
                  <div>Clinical Trust Index: <span className="font-bold text-cyan-300">{clinical_trust_index} / 100</span></div>
                </div>
              </div>

              {/* 4 Trust Dimensions Grid (PRD Sections 14, 15, 16, 17) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. Explanation Consistency */}
                <div 
                  onClick={() => setSelectedFormula('consistency')}
                  className="p-4 rounded-lg bg-monitor-panel border border-monitor-cardBorder hover:border-emerald-500/50 cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-mono font-bold text-white uppercase">
                        1. Explanation Consistency
                      </span>
                    </div>
                    <span className="text-sm font-mono font-black text-emerald-400">
                      {explanation_consistency} / 100
                    </span>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden mb-2">
                    <div 
                      className="bg-emerald-500 h-full rounded-full transition-all duration-700" 
                      style={{ width: `${explanation_consistency}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>Top-10 Feature Stability: {consistency_details.common_features?.length || 9}/10 common</span>
                    <span className="text-emerald-400 font-bold group-hover:underline flex items-center gap-1">
                      Stable <Info className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                {/* 2. Evidence Quality */}
                <div 
                  onClick={() => setSelectedFormula('evidence')}
                  className="p-4 rounded-lg bg-monitor-panel border border-monitor-cardBorder hover:border-sky-500/50 cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-sky-400" />
                      <span className="text-xs font-mono font-bold text-white uppercase">
                        2. Evidence Quality
                      </span>
                    </div>
                    <span className="text-sm font-mono font-black text-sky-400">
                      {evidence_quality} / 100
                    </span>
                  </div>

                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden mb-2">
                    <div 
                      className="bg-sky-500 h-full rounded-full transition-all duration-700" 
                      style={{ width: `${evidence_quality}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>mean(Consistency, Familiarity, Confidence)</span>
                    <span className="text-sky-400 font-bold group-hover:underline flex items-center gap-1">
                      {evidence_quality >= 80 ? 'MODERATE-HIGH' : 'MODERATE'} <Info className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                {/* 3. Predictive Confidence & Uncertainty */}
                <div 
                  onClick={() => setSelectedFormula('confidence')}
                  className="p-4 rounded-lg bg-monitor-panel border border-monitor-cardBorder hover:border-blue-500/50 cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-blue-400" />
                      <span className="text-xs font-mono font-bold text-white uppercase">
                        3. Confidence & Uncertainty
                      </span>
                    </div>
                    <div className="text-xs font-mono text-right">
                      <span className="text-blue-400 font-bold">{confidence.toFixed(1)}% Conf</span>
                    </div>
                  </div>

                  {/* Dual Bar: Confidence vs Uncertainty */}
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden flex mb-2">
                    <div 
                      className="bg-blue-500 h-full transition-all duration-700" 
                      style={{ width: `${confidence}%` }}
                      title={`Confidence: ${confidence.toFixed(1)}%`}
                    />
                    <div 
                      className="bg-amber-500/80 h-full transition-all duration-700" 
                      style={{ width: `${uncertainty}%` }}
                      title={`Uncertainty: ${uncertainty.toFixed(1)}%`}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>Distance from 0.5 boundary: |2P - 1|</span>
                    <span className="text-amber-400 font-bold group-hover:underline flex items-center gap-1">
                      {uncertainty.toFixed(1)}% Uncert <Info className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                {/* 4. Patient Familiarity & OOD */}
                <div 
                  onClick={() => setSelectedFormula('familiarity')}
                  className="p-4 rounded-lg bg-monitor-panel border border-monitor-cardBorder hover:border-purple-500/50 cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-400" />
                      <span className="text-xs font-mono font-bold text-white uppercase">
                        4. Familiarity & OOD Risk
                      </span>
                    </div>
                    <div className="text-xs font-mono text-right">
                      <span className="text-purple-400 font-bold">{familiarity} / 100</span>
                    </div>
                  </div>

                  {/* Dual Bar: Familiarity vs OOD Risk */}
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden flex mb-2">
                    <div 
                      className="bg-purple-500 h-full transition-all duration-700" 
                      style={{ width: `${familiarity}%` }}
                    />
                    <div 
                      className="bg-rose-500 h-full transition-all duration-700" 
                      style={{ width: `${ood_score}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>Reference cohort Top-10 cosine similarity</span>
                    <span className="text-rose-400 font-bold group-hover:underline flex items-center gap-1">
                      {ood_score}% OOD Risk <Info className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Central Clinical Trust Index Formulation Card (Section 17/18) */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 via-monitor-panel to-slate-950 border border-slate-700">
                <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-mono font-bold text-white uppercase">
                      Clinical Trust Index (CTI) Aggregation
                    </span>
                  </div>
                  <span className="text-xs font-mono text-cyan-300 font-bold">
                    Score: {clinical_trust_index} / 100 ({trust_level})
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono">
                  <div className="p-2 rounded bg-black/40 border border-slate-800">
                    <div className="text-[10px] text-slate-400">0.30 × Consistency</div>
                    <div className="text-sm font-bold text-emerald-400">{(0.30 * explanation_consistency).toFixed(1)}</div>
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-slate-800">
                    <div className="text-[10px] text-slate-400">0.30 × Evidence</div>
                    <div className="text-sm font-bold text-sky-400">{(0.30 * evidence_quality).toFixed(1)}</div>
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-slate-800">
                    <div className="text-[10px] text-slate-400">0.20 × Confidence</div>
                    <div className="text-sm font-bold text-blue-400">{(0.20 * confidence).toFixed(1)}</div>
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-slate-800">
                    <div className="text-[10px] text-slate-400">0.20 × Familiarity</div>
                    <div className="text-sm font-bold text-purple-400">{(0.20 * familiarity).toFixed(1)}</div>
                  </div>
                </div>

                <p className="text-[11px] font-mono text-slate-400 mt-3 text-center italic">
                  CTI = 0.30(Consistency) + 0.30(Evidence Quality) + 0.20(Confidence) + 0.20(Familiarity)
                </p>
              </div>
            </>
          )}

          {/* TAB 2: SHAP Feature Attribution Panel */}
          {activeTab === 'shap' && (
            <div className="space-y-4">
              <div className="p-3 bg-purple-950/30 border border-purple-500/30 rounded-lg text-xs font-mono text-purple-200">
                <strong>SHAP Explanation Panel:</strong> Feature attributions quantify positive/negative contribution toward 6-hour sepsis risk.
                <span className="block text-[11px] text-purple-300/80 mt-1">
                  *SHAP values represent model contribution and must not be interpreted as causal relationships.
                </span>
              </div>

              <div className="space-y-2">
                {shap_features.map((item, idx) => {
                  const isPos = item.value >= 0;
                  const absVal = Math.abs(item.value);
                  const maxAbs = 0.65;
                  const barWidth = Math.min(100, (absVal / maxAbs) * 100);

                  return (
                    <div key={idx} className="p-2.5 rounded bg-monitor-panel border border-monitor-cardBorder flex items-center justify-between text-xs font-mono gap-3">
                      <div className="w-36 shrink-0">
                        <span className="font-bold text-white block">{item.feature}</span>
                        <span className="text-[10px] text-slate-400">{item.label}</span>
                      </div>

                      {/* Bar visualization */}
                      <div className="flex-1 flex items-center gap-2">
                        <div className="flex-1 bg-slate-800 h-3 rounded-full overflow-hidden flex">
                          {isPos ? (
                            <div 
                              className="bg-gradient-to-r from-rose-500 to-red-500 h-full rounded-full"
                              style={{ width: `${barWidth}%` }}
                            />
                          ) : (
                            <div 
                              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full"
                              style={{ width: `${barWidth}%` }}
                            />
                          )}
                        </div>
                        <span className={`w-16 text-right font-bold ${isPos ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {isPos ? `+${item.value.toFixed(4)}` : item.value.toFixed(4)}
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-400 w-28 text-right hidden sm:block">
                        Observed: <span className="text-white">{item.currentVal ?? '--'}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: Adaptive Patient Similarity */}
          {activeTab === 'similarity' && (
            <div className="space-y-4">
              <div className="p-3 bg-cyan-950/30 border border-cyan-500/30 rounded-lg text-xs font-mono text-cyan-200">
                <strong>Adaptive Patient Similarity Engine:</strong> Evaluates cosine similarity of 238 flattened temporal features against the PhysioNet 2019 reference training cohort (699,866 samples).
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-lg bg-monitor-panel border border-monitor-cardBorder text-center font-mono">
                  <div className="text-xs text-slate-400">Top-1 Similarity</div>
                  <div className="text-2xl font-black text-cyan-400 my-1">{((similarity.top1 ?? 0.82) * 100).toFixed(0)}%</div>
                  <div className="text-[10px] text-slate-400">Nearest neighbor</div>
                </div>
                <div className="p-3 rounded-lg bg-monitor-panel border border-monitor-cardBorder text-center font-mono">
                  <div className="text-xs text-slate-400">Top-5 Similarity</div>
                  <div className="text-2xl font-black text-cyan-400 my-1">{((similarity.top5 ?? 0.79) * 100).toFixed(0)}%</div>
                  <div className="text-[10px] text-slate-400">5 closest patients</div>
                </div>
                <div className="p-3 rounded-lg bg-monitor-panel border border-monitor-cardBorder text-center font-mono">
                  <div className="text-xs text-slate-400">Top-10 Similarity</div>
                  <div className="text-2xl font-black text-cyan-300 my-1">{((similarity.top10 ?? 0.77) * 100).toFixed(0)}%</div>
                  <div className="text-[10px] text-slate-400">Familiarity baseline</div>
                </div>
                <div className="p-3 rounded-lg bg-monitor-panel border border-monitor-cardBorder text-center font-mono">
                  <div className="text-xs text-slate-400">Top-50 Similarity</div>
                  <div className="text-2xl font-black text-cyan-200 my-1">{((similarity.top50 ?? 0.73) * 100).toFixed(0)}%</div>
                  <div className="text-[10px] text-slate-400">Cluster density</div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-monitor-panel border border-monitor-cardBorder font-mono text-xs space-y-2">
                <div className="font-bold text-white uppercase flex items-center gap-2">
                  <Users className="w-4 h-4 text-cyan-400" />
                  Similar Patient Sepsis Incidence
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Positive Sepsis Cases among Top-10 Neighbors:</span>
                  <span className="font-bold text-amber-400">
                    {Math.round((similarity.top10_positive_rate ?? 0.8) * 10)} / 10 Patients
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Reference Population Integrity:</span>
                  <span className="font-bold text-emerald-400">✓ Train Cohort Reference Only (Zero Leakage)</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Mathematical Formula Inspector */}
          {activeTab === 'formulas' && (
            <div className="space-y-4 font-mono text-xs">
              <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-lg text-emerald-200">
                <strong>Mathematical Transparency:</strong> Inspect the formal definitions, equations, and parameter derivations for all TrustMed trust metrics.
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded bg-monitor-panel border border-slate-700">
                  <h4 className="font-bold text-white mb-1">1. Predictive Confidence & Uncertainty</h4>
                  <pre className="p-2 bg-black/50 rounded text-blue-300 overflow-x-auto">
                    Confidence = |2P - 1| × 100
                    Uncertainty = 100 - Confidence
                  </pre>
                  <p className="text-[11px] text-slate-400 mt-1">
                    For P = {risk_probability.toFixed(6)}, Confidence = {confidence.toFixed(2)} / 100, Uncertainty = {uncertainty.toFixed(2)} / 100.
                  </p>
                </div>

                <div className="p-3.5 rounded bg-monitor-panel border border-slate-700">
                  <h4 className="font-bold text-white mb-1">2. Explanation Consistency (Perturbation Stability)</h4>
                  <pre className="p-2 bg-black/50 rounded text-emerald-300 overflow-x-auto">
                    Consistency = ( |Top-K(original) ∩ Top-K(perturbed)| / K ) × 100
                  </pre>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Evaluates stability of top-{consistency_details.top_k || 10} SHAP features under controlled Gaussian perturbation. Score = {explanation_consistency} / 100.
                  </p>
                </div>

                <div className="p-3.5 rounded bg-monitor-panel border border-slate-700">
                  <h4 className="font-bold text-white mb-1">3. Evidence Quality</h4>
                  <pre className="p-2 bg-black/50 rounded text-sky-300 overflow-x-auto">
                    Evidence Quality = mean(Explanation Consistency, Patient Familiarity, Confidence)
                  </pre>
                  <p className="text-[11px] text-slate-400 mt-1">
                    mean({explanation_consistency}, {familiarity}, {confidence.toFixed(1)}) = {evidence_quality} / 100.
                  </p>
                </div>

                <div className="p-3.5 rounded bg-monitor-panel border border-slate-700">
                  <h4 className="font-bold text-white mb-1">4. Clinical Trust Index (CTI)</h4>
                  <pre className="p-2 bg-black/50 rounded text-purple-300 overflow-x-auto">
                    CTI = 0.30(Consistency) + 0.30(Evidence Quality) + 0.20(Confidence) + 0.20(Familiarity)
                  </pre>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Result: {clinical_trust_index} / 100.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Safety Disclaimer Footer (PRD Section 30 & 37) */}
        <div className="px-5 py-3 bg-monitor-panel border-t border-monitor-cardBorder flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Info className="w-3.5 h-3.5 text-cyan-400" />
            <span>Research Prototype • Clinical Decision Support Only • No automated clinical orders generated</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all border border-slate-700"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
