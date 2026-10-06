import React, { useState, useEffect, useRef } from 'react';
import TrustMedHeader from './components/TrustMedHeader';
import LiveMonitor from './components/LiveMonitor';
import TrustValidationModal from './components/TrustValidationModal';
import PatientUploadModal from './components/PatientUploadModal';
import ResearchMetricsView from './components/ResearchMetricsView';
import WhatIfSandbox from './components/WhatIfSandbox';
import { DEMO_PATIENTS } from './services/demoPatients';
import { analyzePatientData } from './services/trustmedEngine';
import { playAlertBeep, setAudioMuted, getAudioMuted } from './services/audioService';

export default function App() {
  // 1. Patient State
  const [patients, setPatients] = useState(DEMO_PATIENTS);
  const [selectedPatientId, setSelectedPatientId] = useState('TM-HIGH-001');

  // Find currently active patient
  const currentPatient = patients.find(p => p.id === selectedPatientId) || patients[0];

  // 2. Timeline Replay State (0 to 6 -> t-6 to t)
  const [currentTimeIndex, setCurrentTimeIndex] = useState(6);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  // 3. Modals & View Modes
  const [viewMode, setViewMode] = useState('clinical'); // 'clinical' | 'research' | 'sandbox'
  const [trustValidationOpen, setTrustValidationOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  // 4. Audio & Alerts
  const [isMuted, setIsMuted] = useState(false);
  const [alertAcknowledged, setAlertAcknowledged] = useState(false);
  const previousRiskLevelRef = useRef(null);

  // Current observation derived from timeline
  const observations = currentPatient.observations || [];
  const currentObservation = observations[currentTimeIndex] || observations[observations.length - 1] || {};
  const previousObservation = observations[currentTimeIndex > 0 ? currentTimeIndex - 1 : 0] || currentObservation;

  // Build partial slice of observations up to currentTimeIndex for analysis
  const activeObservationSlice = observations.slice(0, currentTimeIndex + 1);
  const activePatientSlice = {
    ...currentPatient,
    observations: activeObservationSlice
  };

  // Run TrustMed Analysis Engine
  const analysis = analyzePatientData(activePatientSlice);

  // Section 26: Alert Sound - Single beep on transition into HIGH_RISK or CRITICAL
  useEffect(() => {
    const currentRisk = analysis.risk_level;
    const prevRisk = previousRiskLevelRef.current;

    if (
      prevRisk !== null &&
      prevRisk !== currentRisk &&
      (currentRisk === 'HIGH_RISK' || currentRisk === 'CRITICAL') &&
      !alertAcknowledged
    ) {
      playAlertBeep();
    }
    previousRiskLevelRef.current = currentRisk;
  }, [analysis.risk_level, alertAcknowledged]);

  // Simulation Replay Timer (Section 4 & 24)
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      const delay = 2500 / playbackSpeed;
      interval = setInterval(() => {
        setCurrentTimeIndex(prev => {
          if (prev < 6) {
            return prev + 1;
          } else {
            setIsPlaying(false); // Finish replay
            return 6;
          }
        });
      }, delay);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  // Handlers
  const handleSelectPatient = (id) => {
    setSelectedPatientId(id);
    setCurrentTimeIndex(6); // Default to full 7-hour history
    setIsPlaying(false);
    setAlertAcknowledged(false);
    previousRiskLevelRef.current = null;
  };

  const handlePatientLoaded = (newPatient) => {
    setPatients(prev => [newPatient, ...prev.filter(p => p.id !== newPatient.id)]);
    setSelectedPatientId(newPatient.id);
    setCurrentTimeIndex(6);
    setIsPlaying(false);
    setAlertAcknowledged(false);
    previousRiskLevelRef.current = null;
  };

  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    setAudioMuted(next);
  };

  const handleReset = () => {
    setCurrentTimeIndex(0);
    setIsPlaying(false);
  };

  return (
    <div className="h-screen max-h-screen w-screen max-w-full overflow-hidden bg-monitor-bg text-monitor-text flex flex-col justify-between selection:bg-cyan-500 selection:text-black">
      {/* 1. Header (Compact ~48px) */}
      <TrustMedHeader
        selectedPatientId={selectedPatientId}
        onSelectPatient={handleSelectPatient}
        onOpenUpload={() => setUploadModalOpen(true)}
        viewMode={viewMode}
        onSetViewMode={setViewMode}
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        onReset={handleReset}
        playbackSpeed={playbackSpeed}
        onSetSpeed={setPlaybackSpeed}
      />

      {/* 2. Main Viewport (flex-1, min-h-0, overflow-hidden on clinical view) */}
      <main className={`flex-1 min-h-0 flex flex-col ${
        viewMode === 'clinical' ? 'overflow-hidden' : 'overflow-y-auto'
      }`}>
        {viewMode === 'clinical' && (
          <LiveMonitor
            patient={currentPatient}
            currentObservation={currentObservation}
            previousObservation={previousObservation}
            currentTimeIndex={currentTimeIndex}
            onSelectTimeIndex={setCurrentTimeIndex}
            analysis={analysis}
            alertActive={analysis.risk_level === 'HIGH_RISK' || analysis.risk_level === 'CRITICAL'}
            alertAcknowledged={alertAcknowledged}
            onOpenValidation={() => setTrustValidationOpen(true)}
            onAcknowledge={() => setAlertAcknowledged(true)}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
          />
        )}

        {viewMode === 'research' && (
          <ResearchMetricsView />
        )}

        {viewMode === 'sandbox' && (
          <WhatIfSandbox
            currentPatient={currentPatient}
            onApplyToPatient={(updated) => handlePatientLoaded(updated)}
          />
        )}
      </main>

      {/* 3. Trust Validation Modal (Fixed Overlay) */}
      <TrustValidationModal
        isOpen={trustValidationOpen}
        onClose={() => setTrustValidationOpen(false)}
        analysis={analysis}
        patient={currentPatient}
      />

      {/* 4. Patient Data Upload Modal */}
      <PatientUploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onPatientLoaded={handlePatientLoaded}
      />
    </div>
  );
}
