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
  const lastAlertStateRef = useRef(null);

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

  // Audio alert on high risk transition
  useEffect(() => {
    const isHighRisk = analysis.risk_level === 'HIGH_RISK' || analysis.risk_level === 'CRITICAL';
    if (isHighRisk && lastAlertStateRef.current !== analysis.risk_level) {
      if (!alertAcknowledged) {
        playAlertBeep();
      }
      lastAlertStateRef.current = analysis.risk_level;
    } else if (!isHighRisk) {
      lastAlertStateRef.current = analysis.risk_level;
    }
  }, [analysis.risk_level, alertAcknowledged]);

  // Simulation Replay Timer
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      const delay = 2500 / playbackSpeed;
      interval = setInterval(() => {
        setCurrentTimeIndex(prev => {
          if (prev < 6) {
            return prev + 1;
          } else {
            setIsPlaying(false); // finish replay
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
    lastAlertStateRef.current = null;
  };

  const handlePatientLoaded = (newPatient) => {
    setPatients(prev => [newPatient, ...prev.filter(p => p.id !== newPatient.id)]);
    setSelectedPatientId(newPatient.id);
    setCurrentTimeIndex(6);
    setIsPlaying(false);
    setAlertAcknowledged(false);
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
    <div className="min-h-screen bg-monitor-bg text-monitor-text flex flex-col justify-between selection:bg-cyan-500 selection:text-black">
      {/* Top Navigation & Status Bar */}
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
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Main Viewport */}
      <main className="flex-1 flex flex-col justify-center py-2">
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

      {/* Trust Validation Modal */}
      <TrustValidationModal
        isOpen={trustValidationOpen}
        onClose={() => setTrustValidationOpen(false)}
        analysis={analysis}
        patient={currentPatient}
      />

      {/* Patient Data Upload Modal */}
      <PatientUploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onPatientLoaded={handlePatientLoaded}
      />
    </div>
  );
}
