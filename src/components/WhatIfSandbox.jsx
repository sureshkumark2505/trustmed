import React, { useState } from 'react';
import { Sliders, RotateCcw, Sparkles, Activity, ShieldCheck, Zap, Info } from 'lucide-react';
import { analyzePatientData } from '../services/trustmedEngine';

export default function WhatIfSandbox({ currentPatient, onApplyToPatient }) {
  const initialObs = currentPatient?.observations?.[6] || {
    HR: 118,
    O2Sat: 91,
    Temp: 38.6,
    SBP: 96,
    MAP: 62,
    DBP: 46,
    Resp: 29,
    EtCO2: 45,
    FiO2: 45,
    Lactate: 3.4,
    WBC: 17.2,
    pH: 7.30
  };

  const [sandboxObs, setSandboxObs] = useState({ ...initialObs });
  const [noiseLevel, setNoiseLevel] = useState(0);

  // Construct sandbox patient object with updated observation at hour t
  const sandboxPatient = {
    ...currentPatient,
    id: `SANDBOX-${currentPatient?.id || 'CUSTOM'}`,
    expected_risk: undefined, // calculate dynamically
    observations: [
      ...(currentPatient?.observations?.slice(0, 6) || []),
      { ...sandboxObs, hour: 't' }
    ]
  };

  const sandboxAnalysis = analyzePatientData(sandboxPatient, { perturbationNoise: noiseLevel });

  const handleChange = (key, val) => {
    setSandboxObs(prev => ({
      ...prev,
      [key]: Number(val)
    }));
  };

  const handleReset = () => {
    setSandboxObs({ ...initialObs });
    setNoiseLevel(0);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4 sm:p-6 font-mono">
      {/* Banner */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-950/70 via-teal-950/60 to-slate-900 border border-emerald-500/40 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-600/30 border border-emerald-400/40 text-emerald-300">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white tracking-wider uppercase">
              Interactive What-If & Perturbation Sandbox
            </h2>
            <p className="text-xs text-emerald-200/80">
              Adjust physiological vitals or inject noise to test explanation consistency & trust engine response live
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1.5 border border-slate-700"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Parameters</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sliders Column (2 cols wide on desktop) */}
        <div className="lg:col-span-2 p-5 rounded-xl bg-monitor-card border border-monitor-cardBorder shadow-lg space-y-4">
          <h3 className="text-sm font-bold text-white uppercase border-b border-monitor-cardBorder pb-2 flex items-center justify-between">
            <span>Bedside Physiological Parameters</span>
            <span className="text-xs text-cyan-400 font-normal">Real-Time Adjustment</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Heart Rate */}
            <div className="space-y-1.5 bg-monitor-panel p-3 rounded border border-slate-800">
              <div className="flex justify-between">
                <span className="text-clinical-ecg font-bold">Heart Rate (HR)</span>
                <span className="text-white font-bold">{sandboxObs.HR} bpm</span>
              </div>
              <input
                type="range"
                min="40"
                max="180"
                value={sandboxObs.HR}
                onChange={(e) => handleChange('HR', e.target.value)}
                className="w-full accent-clinical-ecg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>40</span>
                <span>Normal: 60-100</span>
                <span>180</span>
              </div>
            </div>

            {/* SpO2 */}
            <div className="space-y-1.5 bg-monitor-panel p-3 rounded border border-slate-800">
              <div className="flex justify-between">
                <span className="text-clinical-spo2 font-bold">SpO2 Saturation</span>
                <span className="text-white font-bold">{sandboxObs.O2Sat}%</span>
              </div>
              <input
                type="range"
                min="70"
                max="100"
                value={sandboxObs.O2Sat}
                onChange={(e) => handleChange('O2Sat', e.target.value)}
                className="w-full accent-clinical-spo2 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>70%</span>
                <span>Normal: &gt;94%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Temperature */}
            <div className="space-y-1.5 bg-monitor-panel p-3 rounded border border-slate-800">
              <div className="flex justify-between">
                <span className="text-clinical-temp font-bold">Temperature</span>
                <span className="text-white font-bold">{sandboxObs.Temp}°C</span>
              </div>
              <input
                type="range"
                min="35.0"
                max="41.5"
                step="0.1"
                value={sandboxObs.Temp}
                onChange={(e) => handleChange('Temp', e.target.value)}
                className="w-full accent-clinical-temp cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>35.0°C</span>
                <span>Normal: 36.5-37.5</span>
                <span>41.5°C</span>
              </div>
            </div>

            {/* SBP */}
            <div className="space-y-1.5 bg-monitor-panel p-3 rounded border border-slate-800">
              <div className="flex justify-between">
                <span className="text-clinical-bp font-bold">Systolic BP (SBP)</span>
                <span className="text-white font-bold">{sandboxObs.SBP} mmHg</span>
              </div>
              <input
                type="range"
                min="50"
                max="200"
                value={sandboxObs.SBP}
                onChange={(e) => handleChange('SBP', e.target.value)}
                className="w-full accent-clinical-bp cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>50</span>
                <span>Normal: 90-120</span>
                <span>200</span>
              </div>
            </div>

            {/* Respiration Rate */}
            <div className="space-y-1.5 bg-monitor-panel p-3 rounded border border-slate-800">
              <div className="flex justify-between">
                <span className="text-clinical-resp font-bold">Respiration Rate</span>
                <span className="text-white font-bold">{sandboxObs.Resp} /min</span>
              </div>
              <input
                type="range"
                min="8"
                max="50"
                value={sandboxObs.Resp}
                onChange={(e) => handleChange('Resp', e.target.value)}
                className="w-full accent-clinical-resp cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>8</span>
                <span>Normal: 12-20</span>
                <span>50</span>
              </div>
            </div>

            {/* Lactate */}
            <div className="space-y-1.5 bg-monitor-panel p-3 rounded border border-slate-800">
              <div className="flex justify-between">
                <span className="text-rose-400 font-bold">Serum Lactate</span>
                <span className="text-white font-bold">{sandboxObs.Lactate} mmol/L</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="12.0"
                step="0.1"
                value={sandboxObs.Lactate}
                onChange={(e) => handleChange('Lactate', e.target.value)}
                className="w-full accent-rose-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>0.5</span>
                <span>Normal: &lt;2.0</span>
                <span>12.0</span>
              </div>
            </div>
          </div>

          {/* Controlled Noise Perturbation Injection */}
          <div className="mt-4 p-4 rounded-lg bg-purple-950/30 border border-purple-500/30 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-purple-300 font-bold flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-purple-400" />
                Perturbation Noise Injection (Tests Explanation Consistency):
              </span>
              <span className="text-white font-black bg-purple-900/80 px-2 py-0.5 rounded border border-purple-400/40">
                ±{noiseLevel}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="25"
              value={noiseLevel}
              onChange={(e) => setNoiseLevel(Number(e.target.value))}
              className="w-full accent-purple-400 cursor-pointer"
            />
            <p className="text-[10px] text-purple-300/70">
              Simulates sensor noise & physiological jitter to verify if SHAP top-10 explanations remain consistent.
            </p>
          </div>
        </div>

        {/* Real-time Recalculated Output Column */}
        <div className="p-5 rounded-xl bg-monitor-card border border-monitor-cardBorder shadow-lg space-y-4 flex flex-col justify-between">
          <h3 className="text-sm font-bold text-white uppercase border-b border-monitor-cardBorder pb-2">
            Dynamic Trust Engine Output
          </h3>

          {/* Risk Card */}
          <div className="p-3.5 rounded-lg bg-monitor-panel border border-slate-800 space-y-1">
            <div className="text-[10px] text-slate-400 uppercase">Predicted 6-Hour Sepsis Risk</div>
            <div className="text-3xl font-black text-rose-400">
              {sandboxAnalysis.risk_percentage.toFixed(1)}%
            </div>
            <div className="text-[11px] text-slate-300">
              Level: <span className="font-bold text-white uppercase">{sandboxAnalysis.risk_level}</span>
            </div>
          </div>

          {/* CTI Card */}
          <div className="p-3.5 rounded-lg bg-monitor-panel border border-slate-800 space-y-1">
            <div className="text-[10px] text-slate-400 uppercase">Clinical Trust Index (CTI)</div>
            <div className="text-3xl font-black text-cyan-400">
              {sandboxAnalysis.clinical_trust_index} <span className="text-xs text-slate-400 font-normal">/ 100</span>
            </div>
            <div className="text-[11px] text-slate-300">
              Trust Level: <span className="font-bold text-cyan-300">{sandboxAnalysis.trust_level}</span>
            </div>
          </div>

          {/* Trust Components */}
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Explanation Consistency:</span>
              <span className="text-emerald-400 font-bold">{sandboxAnalysis.explanation_consistency} / 100</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Predictive Confidence:</span>
              <span className="text-blue-400 font-bold">{sandboxAnalysis.confidence.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Patient Familiarity:</span>
              <span className="text-purple-400 font-bold">{sandboxAnalysis.familiarity}%</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>OOD Divergence Risk:</span>
              <span className="text-rose-400 font-bold">{sandboxAnalysis.ood_score}%</span>
            </div>
          </div>

          {/* Decision */}
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-700 text-center">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">Recommended Clinical Action</div>
            <div className={`text-base font-black uppercase mt-0.5 ${
              sandboxAnalysis.decision === 'ACCEPT' 
                ? 'text-emerald-400' 
                : sandboxAnalysis.decision === 'REVIEW' 
                ? 'text-amber-400' 
                : 'text-rose-400'
            }`}>
              {sandboxAnalysis.decision}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
