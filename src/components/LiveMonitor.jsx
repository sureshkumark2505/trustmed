import React from 'react';
import Waveform from './Waveform';
import VitalDisplay from './VitalDisplay';
import SepsisRiskCard from './SepsisRiskCard';
import TrustIndexCard from './TrustIndexCard';
import RiskAlertButton from './RiskAlertButton';
import TimelineScrubber from './TimelineScrubber';

export default function LiveMonitor({
  patient = {},
  currentObservation = {},
  previousObservation = {},
  currentTimeIndex = 6,
  onSelectTimeIndex = () => {},
  analysis = {},
  alertActive = true,
  alertAcknowledged = false,
  onOpenValidation = () => {},
  onAcknowledge = () => {},
  isMuted = false,
  onToggleMute = () => {}
}) {
  const {
    HR = 118,
    O2Sat = 91,
    Resp = 29,
    EtCO2 = 45
  } = currentObservation;

  return (
    <div className="w-full h-full max-w-[1720px] mx-auto p-2 sm:p-2.5 flex flex-col justify-between gap-1.5 font-mono min-h-0 overflow-hidden">
      {/* 1. Timeline Scrubber (Compact ~40px) */}
      <TimelineScrubber
        observations={patient.observations || []}
        currentIndex={currentTimeIndex}
        onSelectIndex={onSelectTimeIndex}
      />

      {/* 2. High-Risk Alert Bar (Compact ~54px) */}
      <RiskAlertButton
        riskLevel={analysis.risk_level}
        riskPercentage={analysis.risk_percentage}
        cti={analysis.clinical_trust_index}
        decision={analysis.decision}
        alertActive={alertActive}
        alertAcknowledged={alertAcknowledged}
        onOpenValidation={onOpenValidation}
        onAcknowledge={onAcknowledge}
        isMuted={isMuted}
        onToggleMute={onToggleMute}
      />

      {/* 3. Main Content Area (2-Column CSS Grid, min-h-0, flex-1) */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.9fr)] gap-2 flex-1 min-h-0 items-stretch">
        {/* Left: Live Physiological Monitor (4 Waveforms) */}
        <div className="bg-monitor-panel/60 border border-monitor-cardBorder rounded-lg p-2 flex flex-col justify-between gap-1 min-h-0 shadow-inner">
          <div className="flex items-center justify-between border-b border-monitor-cardBorder pb-0.5 text-[11px] shrink-0">
            <span className="font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <span className="text-clinical-ecg">●</span> Live Physiological Telemetry
            </span>
            <span className="text-[9px] text-slate-400">25 mm/s • ICU Bed 04</span>
          </div>

          {/* ECG II Waveform */}
          <Waveform
            type="ECG"
            label="ECG II"
            hr={HR}
            color="#10B981"
          />

          {/* SpO2 Plethysmograph */}
          <Waveform
            type="SpO2"
            label="SpO2 PLETH"
            hr={HR}
            spo2={O2Sat}
            color="#06B6D4"
          />

          {/* Respiratory Impedance */}
          <Waveform
            type="RESP"
            label="RESP"
            resp={Resp}
            color="#F59E0B"
          />

          {/* EtCO2 Capnography */}
          <Waveform
            type="EtCO2"
            label="EtCO2"
            resp={Resp}
            etco2={EtCO2}
            color="#A855F7"
          />
        </div>

        {/* Right: TrustMed Engine Result (Sepsis Risk + CTI Cards) */}
        <div className="flex flex-col justify-between gap-1.5 min-h-0">
          {/* 6-Hour Sepsis Risk */}
          <div className="flex-1 min-h-0 flex flex-col">
            <SepsisRiskCard analysis={analysis} />
          </div>

          {/* Clinical Trust Index (CTI) */}
          <div className="flex-1 min-h-0 flex flex-col">
            <TrustIndexCard
              analysis={analysis}
              onOpenValidation={onOpenValidation}
            />
          </div>
        </div>
      </div>

      {/* 4. Vital Summary Strip (Compact ~54px) */}
      <div className="shrink-0">
        <VitalDisplay
          observation={currentObservation}
          previousObservation={previousObservation}
        />
      </div>

      {/* 5. Minimal Footer Disclaimer (Compact ~20px) */}
      <footer className="text-center text-[9px] text-slate-500 shrink-0 py-0.5 border-t border-slate-900">
        Research Prototype • Clinical Decision Support Only • TrustMed provides AI-assisted trust information and does not replace qualified clinical judgment.
      </footer>
    </div>
  );
}
