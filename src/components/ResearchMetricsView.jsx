import React from 'react';
import { Database, Award, GitBranch, Cpu, BarChart3, ArrowDown, ShieldCheck, ExternalLink, Info } from 'lucide-react';

export default function ResearchMetricsView() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4 sm:p-6 font-mono">
      {/* Top Banner */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-purple-950/70 via-indigo-950/60 to-slate-900 border border-purple-500/40 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-purple-600/30 border border-purple-400/40 text-purple-300">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white tracking-wider uppercase">
                Faculty & Project Defense Research Metrics
              </h2>
              <p className="text-xs text-purple-200/80">
                Authoritative validation results, PhysioNet 2019 dataset distribution, and benchmark comparisons
              </p>
            </div>
          </div>
          <span className="text-[11px] px-3 py-1 rounded bg-purple-900/60 border border-purple-400/50 text-purple-200 font-bold">
            PhysioNet Challenge 2019
          </span>
        </div>
      </div>

      {/* Grid: Dataset & Model Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Dataset Breakdown */}
        <div className="p-5 rounded-xl bg-monitor-card border border-monitor-cardBorder shadow-lg space-y-4">
          <div className="flex items-center gap-2 border-b border-monitor-cardBorder pb-2.5">
            <Database className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              1. PhysioNet 2019 Dataset Audit
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded bg-monitor-panel border border-monitor-cardBorder text-center">
              <div className="text-[10px] text-slate-400 uppercase">Total Patients</div>
              <div className="text-xl font-black text-cyan-400 my-1">40,331</div>
              <div className="text-[10px] text-slate-400">Hospital A + B</div>
            </div>

            <div className="p-3 rounded bg-monitor-panel border border-monitor-cardBorder text-center">
              <div className="text-[10px] text-slate-400 uppercase">Eligible Sepsis</div>
              <div className="text-xl font-black text-rose-400 my-1">2,199</div>
              <div className="text-[10px] text-slate-400">6-Hour Horizon</div>
            </div>

            <div className="p-3 rounded bg-monitor-panel border border-monitor-cardBorder text-center">
              <div className="text-[10px] text-slate-400 uppercase">6-Hour Eligibility</div>
              <div className="text-xl font-black text-emerald-400 my-1">75.00%</div>
              <div className="text-[10px] text-slate-400">Pre-Sepsis Window</div>
            </div>
          </div>

          <div className="p-3 rounded bg-monitor-panel border border-monitor-cardBorder text-xs space-y-1.5">
            <div className="text-slate-300 font-bold mb-1">Sample Split Distribution:</div>
            <div className="flex justify-between text-slate-400">
              <span>• Training Samples:</span>
              <span className="text-white font-bold">699,866 (Reference Cohort)</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>• Validation Samples:</span>
              <span className="text-white font-bold">152,201</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>• Test Samples:</span>
              <span className="text-white font-bold">152,893</span>
            </div>
            <div className="flex justify-between text-slate-400 pt-1 border-t border-slate-800">
              <span>• Cross-Dataset Patient Leakage:</span>
              <span className="text-emerald-400 font-bold">0.0% (Zero Leakage)</span>
            </div>
          </div>
        </div>

        {/* 2. Model Performance Benchmarks */}
        <div className="p-5 rounded-xl bg-monitor-card border border-monitor-cardBorder shadow-lg space-y-4">
          <div className="flex items-center gap-2 border-b border-monitor-cardBorder pb-2.5">
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              2. Validated Model Performance (Test Split)
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400">
                  <th className="pb-2">Metric</th>
                  <th className="pb-2">Logistic Reg</th>
                  <th className="pb-2 text-emerald-400">XGBoost (Selected)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr>
                  <td className="py-1.5 font-bold">Test ROC-AUC</td>
                  <td className="py-1.5">0.663646</td>
                  <td className="py-1.5 text-emerald-400 font-bold">0.664158</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-bold">Test PR-AUC</td>
                  <td className="py-1.5">0.021537</td>
                  <td className="py-1.5 text-emerald-400 font-bold">0.023582</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-bold">Precision (@0.69)</td>
                  <td className="py-1.5">0.015442</td>
                  <td className="py-1.5 text-emerald-400 font-bold">0.043169</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-bold">Recall (@0.69)</td>
                  <td className="py-1.5">0.599860</td>
                  <td className="py-1.5 text-emerald-400 font-bold">0.118715</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-bold">F1-Score (@0.69)</td>
                  <td className="py-1.5">0.030109</td>
                  <td className="py-1.5 text-emerald-400 font-bold">0.063315</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-2.5 rounded bg-amber-950/30 border border-amber-500/30 text-[11px] text-amber-200">
            *The 0.69 operating threshold was optimized on validation F1. Threshold-based metrics reflect this research operating point.
          </div>
        </div>
      </div>

      {/* Authoritative System Flowchart */}
      <div className="p-5 rounded-xl bg-monitor-card border border-monitor-cardBorder shadow-lg space-y-4">
        <div className="flex items-center gap-2 border-b border-monitor-cardBorder pb-2.5">
          <GitBranch className="w-4 h-4 text-purple-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            3. Authoritative TrustMed Architecture & Decision Pipeline
          </h3>
        </div>

        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 overflow-x-auto text-[11px] text-slate-300 leading-relaxed">
          <pre className="font-mono text-cyan-300">
{`PhysioNet 2019 Dataset (40,331 Patients)
        ↓
Patient-Level Clean Data Split (699k Train / 152k Val / 152k Test)
        ↓
ML Prediction Engine (XGBoost 238 Flattened Features: 7 Hours × 34 Variables)
        ↓
AI 6-Hour Prediction Output (P >= 0.69)
        ↓
 ┌─────────────────────────────────────────────────────────────┐
 │                                                             │
SHAP Explanation Engine                 Adaptive Patient Similarity
(Top-10 Feature Attributions)           (Cosine Distance to 699k Train Set)
 │                                                             │
 └──────────────────────────────┬──────────────────────────────┘
                                ↓
                 Multi-Dimensional Trust Validation
                                ↓
 ┌──────────────────────────────┼──────────────────────────────┐
 │                              │                              │
Explanation Consistency    Evidence Quality          Predictive Uncertainty
(Perturbation Stability)   mean(Cons, Fam, Conf)     (|2P - 1| × 100)
 │                              │                              │
 └──────────────────────────────┼──────────────────────────────┘
                                ↓
                  OOD Detection / Patient Familiarity
                                ↓
                     Clinical Trust Index (CTI)
        CTI = 0.30(Cons) + 0.30(Evidence) + 0.20(Conf) + 0.20(Fam)
                                ↓
                     Clinical Decision Engine
                     ┌──────────┼──────────┐
                     ↓          ↓          ↓
                   ACCEPT     REVIEW     DEFER`}
          </pre>
        </div>
      </div>
    </div>
  );
}
