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
    EtCO2 = 45,
    Temp = 38.6,
    SBP = 96,
    MAP = 62,
    DBP = 46,
    FiO2 = 45
  } = currentObservation;

  return (
    <div className="w-full max-w-[1600px] mx-auto p-3 sm:p-4 space-y-3 font-mono flex flex-col justify-between">
      {/* Patient Bedside Banner */}
      <div className="bg-monitor-card border border-monitor-cardBorder px-4 py-2 rounded-lg flex flex-wrap items-center justify-between text-xs gap-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-white uppercase tracking-wider">
              ICU Bed 04 • {patient.name || patient.id || 'TM-HIGH-001'}
            </span>
          </div>
          <span className="text-slate-400">|</span>
          <span className="text-slate-300">
            {patient.gender || 'Male'}, {patient.age || 68}y • {patient.icu_type || 'MICU'}
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-slate-400">
          <span>Scenario: <strong className="text-cyan-300">{patient.scenario || 'Clinical Deterioration'}</strong></span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline text-slate-400">ICU Stay: <strong>Hour {currentTimeIndex + 1}/7</strong></span>
        </div>
      </div>

      {/* Main Top Grid: Waveforms (Left) & Risk + Trust Cards (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
        {/* Left Column: 4 Real-time Physiological Waveforms (7 Cols) */}
        <div className="lg:col-span-7 bg-monitor-panel/60 border border-monitor-cardBorder rounded-lg p-3 space-y-2 flex flex-col justify-between shadow-inner">
          <div className="flex items-center justify-between border-b border-monitor-cardBorder pb-1 text-xs">
            <span className="font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <span className="text-clinical-ecg">●</span> Live Bedside Waveform Telemetry
            </span>
            <span className="text-[10px] text-slate-400">25 mm/s • Sweep Telemetry</span>
          </div>

          {/* 1. Lead II ECG */}
          <Waveform
            type="ECG"
            label="ECG II"
            hr={HR}
            color="#10B981"
          />

          {/* 2. SpO2 Plethysmograph */}
          <Waveform
            type="SpO2"
            label="SpO2 PLETH"
            hr={HR}
            spo2={O2Sat}
            color="#06B6D4"
          />

          {/* 3. Respiratory Impedance */}
          <Waveform
            type="RESP"
            label="RESP"
            resp={Resp}
            color="#F59E0B"
          />

          {/* 4. EtCO2 Capnography */}
          <Waveform
            type="EtCO2"
            label="EtCO2"
            resp={Resp}
            etco2={EtCO2}
            color="#A855F7"
          />
        </div>

        {/* Right Column: Sepsis Risk Card & Clinical Trust Index Card (5 Cols) */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
          {/* Card 1: 6-Hour Sepsis Risk */}
          <SepsisRiskCard analysis={analysis} />

          {/* Card 2: Clinical Trust Index (CTI) */}
          <TrustIndexCard
            analysis={analysis}
            onOpenValidation={onOpenValidation}
          />
        </div>
      </div>

      {/* Middle Row: 8-Vital Clinical HUD Display */}
      <VitalDisplay
        observation={currentObservation}
        previousObservation={previousObservation}
      />

      {/* 7-Hour Historical Timeline Scrubber */}
      <TimelineScrubber
        observations={patient.observations || []}
        currentIndex={currentTimeIndex}
        onSelectIndex={onSelectTimeIndex}
      />

      {/* Bottom Action & Alert Banner */}
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

      {/* Subtle Regulatory & Safety Disclaimer (PRD Section 30 & 37) */}
      <div className="text-center text-[10px] font-mono text-slate-500 pt-1">
        Research Prototype • Clinical Decision Support Only • TrustMed provides AI-assisted trust information and does not replace qualified clinical judgment.
      </div>
    </div>
  );
}
