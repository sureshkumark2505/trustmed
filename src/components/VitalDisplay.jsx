import React from 'react';
import { Activity, Droplets, Thermometer, Wind, Zap, AlertCircle } from 'lucide-react';

export default function VitalDisplay({ observation = {}, previousObservation = {} }) {
  const {
    HR = 80,
    O2Sat = 98,
    SBP = 120,
    DBP = 80,
    MAP = 80,
    Temp = 37.0,
    Resp = 16,
    EtCO2 = 35,
    FiO2 = 21,
    Lactate = 1.2,
    WBC = 7.5,
    pH = 7.40,
    Creatinine = 0.9,
    Glucose = 100
  } = observation;

  // Visual abnormality helper
  const isHrAbnormal = HR > 100 || HR < 55;
  const isSpo2Abnormal = O2Sat < 93;
  const isTempAbnormal = Temp > 38.0 || Temp < 36.0;
  const isBpAbnormal = SBP < 95 || SBP > 160 || MAP < 65;
  const isRespAbnormal = Resp > 22 || Resp < 10;
  const isLactateAbnormal = Lactate > 2.0;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 w-full">
      {/* 1. Heart Rate (HR) */}
      <div className={`p-2.5 rounded border transition-all ${
        isHrAbnormal 
          ? 'bg-rose-950/20 border-rose-500/50 shadow-[0_0_12px_rgba(244,63,94,0.2)]' 
          : 'bg-monitor-card border-monitor-cardBorder'
      }`}>
        <div className="flex items-center justify-between text-clinical-ecg mb-1">
          <span className="text-[11px] font-mono font-bold tracking-wider">HR</span>
          <span className="text-[10px] text-slate-400 font-mono">bpm</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className={`text-2xl lg:text-3xl font-mono font-black tracking-tight ${
            isHrAbnormal ? 'text-rose-400 animate-pulse' : 'text-clinical-ecg'
          }`}>
            {HR ?? '--'}
          </span>
          <span className="text-[10px] text-slate-400 font-mono">60-100</span>
        </div>
      </div>

      {/* 2. SpO2 */}
      <div className={`p-2.5 rounded border transition-all ${
        isSpo2Abnormal 
          ? 'bg-cyan-950/30 border-cyan-400/60 shadow-[0_0_12px_rgba(6,182,212,0.25)]' 
          : 'bg-monitor-card border-monitor-cardBorder'
      }`}>
        <div className="flex items-center justify-between text-clinical-spo2 mb-1">
          <span className="text-[11px] font-mono font-bold tracking-wider">SpO₂</span>
          <span className="text-[10px] text-slate-400 font-mono">%</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className={`text-2xl lg:text-3xl font-mono font-black tracking-tight ${
            isSpo2Abnormal ? 'text-amber-400' : 'text-clinical-spo2'
          }`}>
            {O2Sat ?? '--'}
          </span>
          <span className="text-[10px] text-slate-400 font-mono">&gt;94%</span>
        </div>
      </div>

      {/* 3. NIBP / MAP */}
      <div className={`p-2.5 rounded border transition-all ${
        isBpAbnormal 
          ? 'bg-sky-950/30 border-rose-500/60 shadow-[0_0_12px_rgba(244,63,94,0.25)]' 
          : 'bg-monitor-card border-monitor-cardBorder'
      }`}>
        <div className="flex items-center justify-between text-clinical-bp mb-1">
          <span className="text-[11px] font-mono font-bold tracking-wider">BP (MAP)</span>
          <span className="text-[10px] text-slate-400 font-mono">mmHg</span>
        </div>
        <div className="flex flex-col">
          <div className="flex items-baseline justify-between">
            <span className="text-xl lg:text-2xl font-mono font-black text-clinical-bp tracking-tight">
              {SBP ?? '--'}/{DBP ?? '--'}
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] font-mono mt-0.5">
            <span className="text-slate-400">MAP:</span>
            <span className={`font-bold ${MAP < 65 ? 'text-rose-400 font-black' : 'text-white'}`}>
              {MAP ?? '--'}
            </span>
          </div>
        </div>
      </div>

      {/* 4. Temp */}
      <div className={`p-2.5 rounded border transition-all ${
        isTempAbnormal 
          ? 'bg-rose-950/20 border-rose-500/50' 
          : 'bg-monitor-card border-monitor-cardBorder'
      }`}>
        <div className="flex items-center justify-between text-clinical-temp mb-1">
          <span className="text-[11px] font-mono font-bold tracking-wider">TEMP</span>
          <span className="text-[10px] text-slate-400 font-mono">°C</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className={`text-2xl lg:text-3xl font-mono font-black tracking-tight ${
            isTempAbnormal ? 'text-rose-400 font-black' : 'text-clinical-temp'
          }`}>
            {Temp ? Number(Temp).toFixed(1) : '--'}
          </span>
          <span className="text-[10px] text-slate-400 font-mono">36.5-37.5</span>
        </div>
      </div>

      {/* 5. Resp Rate */}
      <div className={`p-2.5 rounded border transition-all ${
        isRespAbnormal 
          ? 'bg-amber-950/20 border-amber-500/50' 
          : 'bg-monitor-card border-monitor-cardBorder'
      }`}>
        <div className="flex items-center justify-between text-clinical-resp mb-1">
          <span className="text-[11px] font-mono font-bold tracking-wider">RESP</span>
          <span className="text-[10px] text-slate-400 font-mono">/min</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className={`text-2xl lg:text-3xl font-mono font-black tracking-tight ${
            isRespAbnormal ? 'text-amber-400 font-black' : 'text-clinical-resp'
          }`}>
            {Resp ?? '--'}
          </span>
          <span className="text-[10px] text-slate-400 font-mono">12-20</span>
        </div>
      </div>

      {/* 6. EtCO2 */}
      <div className="p-2.5 rounded border bg-monitor-card border-monitor-cardBorder">
        <div className="flex items-center justify-between text-clinical-etco2 mb-1">
          <span className="text-[11px] font-mono font-bold tracking-wider">EtCO₂</span>
          <span className="text-[10px] text-slate-400 font-mono">mmHg</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-2xl lg:text-3xl font-mono font-black text-clinical-etco2 tracking-tight">
            {EtCO2 ?? '--'}
          </span>
          <span className="text-[10px] text-slate-400 font-mono">35-45</span>
        </div>
      </div>

      {/* 7. FiO2 */}
      <div className="p-2.5 rounded border bg-monitor-card border-monitor-cardBorder">
        <div className="flex items-center justify-between text-sky-400 mb-1">
          <span className="text-[11px] font-mono font-bold tracking-wider">FiO₂</span>
          <span className="text-[10px] text-slate-400 font-mono">%</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-2xl lg:text-3xl font-mono font-black text-sky-400 tracking-tight">
            {FiO2 ?? '21'}
          </span>
          <span className="text-[10px] text-slate-400 font-mono">21-40</span>
        </div>
      </div>

      {/* 8. Serum Lactate (Critical Sepsis Metabolic Marker) */}
      <div className={`p-2.5 rounded border transition-all ${
        isLactateAbnormal 
          ? 'bg-rose-950/30 border-rose-500/60 shadow-[0_0_12px_rgba(244,63,94,0.25)]' 
          : 'bg-monitor-card border-monitor-cardBorder'
      }`}>
        <div className="flex items-center justify-between text-rose-400 mb-1">
          <span className="text-[11px] font-mono font-bold tracking-wider">LACTATE</span>
          <span className="text-[10px] text-slate-400 font-mono">mmol/L</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className={`text-2xl lg:text-3xl font-mono font-black tracking-tight ${
            isLactateAbnormal ? 'text-rose-400 font-black animate-pulse' : 'text-slate-200'
          }`}>
            {Lactate ? Number(Lactate).toFixed(1) : '--'}
          </span>
          <span className="text-[10px] text-slate-400 font-mono">&lt;2.0</span>
        </div>
      </div>
    </div>
  );
}
