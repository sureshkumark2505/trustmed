import React from 'react';

export default function VitalDisplay({ observation = {}, previousObservation = {} }) {
  const {
    HR = 118,
    O2Sat = 91,
    SBP = 98,
    DBP = 48,
    MAP = 65,
    Temp = 38.6,
    Resp = 29,
    EtCO2 = 45,
    FiO2 = 45,
    Lactate = 3.4
  } = observation;

  const isHrAbnormal = HR > 100 || HR < 55;
  const isSpo2Abnormal = O2Sat < 93;
  const isTempAbnormal = Temp > 38.0 || Temp < 36.0;
  const isBpAbnormal = SBP < 95 || SBP > 160 || MAP < 65;
  const isRespAbnormal = Resp > 22 || Resp < 10;
  const isLactateAbnormal = Lactate > 2.0;

  return (
    <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 w-full font-mono min-h-0">
      {/* 1. Heart Rate (HR) */}
      <div className={`p-1.5 rounded border transition-all flex flex-col justify-between ${
        isHrAbnormal 
          ? 'bg-rose-950/30 border-rose-500/60 shadow-[0_0_8px_rgba(244,63,94,0.2)]' 
          : 'bg-monitor-card border-monitor-cardBorder'
      }`}>
        <div className="flex items-center justify-between text-clinical-ecg">
          <span className="text-[10px] font-bold tracking-wider">HR</span>
          <span className="text-[9px] text-slate-400">bpm</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className={`text-xl lg:text-2xl font-black tracking-tight ${
            isHrAbnormal ? 'text-rose-400 animate-pulse' : 'text-clinical-ecg'
          }`}>
            {HR ?? '--'}
          </span>
          <span className="text-[9px] text-slate-500">60-100</span>
        </div>
      </div>

      {/* 2. SpO2 */}
      <div className={`p-1.5 rounded border transition-all flex flex-col justify-between ${
        isSpo2Abnormal 
          ? 'bg-cyan-950/30 border-cyan-400/60 shadow-[0_0_8px_rgba(6,182,212,0.25)]' 
          : 'bg-monitor-card border-monitor-cardBorder'
      }`}>
        <div className="flex items-center justify-between text-clinical-spo2">
          <span className="text-[10px] font-bold tracking-wider">SpO₂</span>
          <span className="text-[9px] text-slate-400">%</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className={`text-xl lg:text-2xl font-black tracking-tight ${
            isSpo2Abnormal ? 'text-amber-400' : 'text-clinical-spo2'
          }`}>
            {O2Sat ?? '--'}
          </span>
          <span className="text-[9px] text-slate-500">&gt;94%</span>
        </div>
      </div>

      {/* 3. NIBP */}
      <div className={`p-1.5 rounded border transition-all flex flex-col justify-between ${
        isBpAbnormal 
          ? 'bg-sky-950/30 border-rose-500/60' 
          : 'bg-monitor-card border-monitor-cardBorder'
      }`}>
        <div className="flex items-center justify-between text-clinical-bp">
          <span className="text-[10px] font-bold tracking-wider">BP</span>
          <span className="text-[9px] text-slate-400">mmHg</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-lg lg:text-xl font-black text-clinical-bp tracking-tight">
            {SBP ?? '--'}/{DBP ?? '--'}
          </span>
          <span className="text-[9px] text-slate-400">90-120</span>
        </div>
      </div>

      {/* 4. MAP */}
      <div className={`p-1.5 rounded border transition-all flex flex-col justify-between ${
        MAP < 65 
          ? 'bg-rose-950/30 border-rose-500/60' 
          : 'bg-monitor-card border-monitor-cardBorder'
      }`}>
        <div className="flex items-center justify-between text-sky-300">
          <span className="text-[10px] font-bold tracking-wider">MAP</span>
          <span className="text-[9px] text-slate-400">mmHg</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className={`text-xl lg:text-2xl font-black tracking-tight ${
            MAP < 65 ? 'text-rose-400' : 'text-white'
          }`}>
            {MAP ?? '--'}
          </span>
          <span className="text-[9px] text-slate-500">&gt;65</span>
        </div>
      </div>

      {/* 5. Temp */}
      <div className={`p-1.5 rounded border transition-all flex flex-col justify-between ${
        isTempAbnormal 
          ? 'bg-rose-950/20 border-rose-500/50' 
          : 'bg-monitor-card border-monitor-cardBorder'
      }`}>
        <div className="flex items-center justify-between text-clinical-temp">
          <span className="text-[10px] font-bold tracking-wider">TEMP</span>
          <span className="text-[9px] text-slate-400">°C</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className={`text-xl lg:text-2xl font-black tracking-tight ${
            isTempAbnormal ? 'text-rose-400' : 'text-clinical-temp'
          }`}>
            {Temp ? Number(Temp).toFixed(1) : '--'}
          </span>
          <span className="text-[9px] text-slate-500">36.5-37.5</span>
        </div>
      </div>

      {/* 6. Resp Rate */}
      <div className={`p-1.5 rounded border transition-all flex flex-col justify-between ${
        isRespAbnormal 
          ? 'bg-amber-950/20 border-amber-500/50' 
          : 'bg-monitor-card border-monitor-cardBorder'
      }`}>
        <div className="flex items-center justify-between text-clinical-resp">
          <span className="text-[10px] font-bold tracking-wider">RESP</span>
          <span className="text-[9px] text-slate-400">/min</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className={`text-xl lg:text-2xl font-black tracking-tight ${
            isRespAbnormal ? 'text-amber-400' : 'text-clinical-resp'
          }`}>
            {Resp ?? '--'}
          </span>
          <span className="text-[9px] text-slate-500">12-20</span>
        </div>
      </div>

      {/* 7. EtCO2 */}
      <div className="p-1.5 rounded border bg-monitor-card border-monitor-cardBorder flex flex-col justify-between">
        <div className="flex items-center justify-between text-clinical-etco2">
          <span className="text-[10px] font-bold tracking-wider">EtCO₂</span>
          <span className="text-[9px] text-slate-400">mmHg</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-xl lg:text-2xl font-black text-clinical-etco2 tracking-tight">
            {EtCO2 ?? '--'}
          </span>
          <span className="text-[9px] text-slate-500">35-45</span>
        </div>
      </div>

      {/* 8. FiO2 */}
      <div className="p-1.5 rounded border bg-monitor-card border-monitor-cardBorder flex flex-col justify-between">
        <div className="flex items-center justify-between text-sky-400">
          <span className="text-[10px] font-bold tracking-wider">FiO₂</span>
          <span className="text-[9px] text-slate-400">%</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-xl lg:text-2xl font-black text-sky-400 tracking-tight">
            {FiO2 ?? '21'}
          </span>
          <span className="text-[9px] text-slate-500">21-40</span>
        </div>
      </div>
    </div>
  );
}
