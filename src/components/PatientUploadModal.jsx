import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, X, ArrowRight, Database } from 'lucide-react';
import { parseAndValidatePatientData } from '../services/trustmedEngine';

export default function PatientUploadModal({
  isOpen = false,
  onClose = () => {},
  onPatientLoaded = () => {}
}) {
  const [dragActive, setDragActive] = useState(false);
  const [fileData, setFileData] = useState(null);
  const [validationResult, setValidationResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleFile = (file) => {
    setErrorMsg('');
    setValidationResult(null);

    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      const res = parseAndValidatePatientData(content, file.name);

      if (res.success) {
        setValidationResult(res);
        setFileData({
          id: res.patientId,
          name: `Uploaded Patient (${res.patientId})`,
          scenario: `User Upload (${res.format})`,
          age: 65,
          gender: 'Unspecified',
          icu_type: 'ICU',
          icu_los: res.observationCount,
          observations: res.observations
        });
      } else {
        setErrorMsg(res.error || "Unable to read patient data. Please upload a valid CSV/PSV/JSON file.");
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleApply = () => {
    if (fileData) {
      onPatientLoaded(fileData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-monitor-card border border-monitor-cardBorder rounded-xl w-full max-w-xl shadow-2xl overflow-hidden font-mono">
        {/* Header */}
        <div className="px-5 py-3.5 bg-monitor-panel border-b border-monitor-cardBorder flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-white tracking-wider uppercase">
              Upload Patient Clinical Trajectory
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          {/* Dropzone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${
              dragActive 
                ? 'border-cyan-400 bg-cyan-950/20' 
                : 'border-slate-700 hover:border-slate-500 bg-monitor-panel/40'
            }`}
          >
            <UploadCloud className="w-10 h-10 text-cyan-400 mx-auto mb-2 opacity-80" />
            <p className="text-xs text-slate-200 font-bold mb-1">
              Drag & drop patient data file here, or browse
            </p>
            <p className="text-[10px] text-slate-400 mb-3">
              Supports PhysioNet 2019 PSV (.psv), CSV (.csv), or JSON (.json)
            </p>

            <label className="inline-block px-4 py-2 rounded bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold cursor-pointer transition-all shadow-md">
              Browse Local File
              <input
                type="file"
                accept=".psv,.csv,.json,.txt"
                onChange={(e) => e.target.files && handleFile(e.target.files[0])}
                className="hidden"
              />
            </label>
          </div>

          {/* Error display */}
          {errorMsg && (
            <div className="p-3 bg-rose-950/50 border border-rose-500/60 rounded-lg flex items-center gap-2 text-xs text-rose-200">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Validation report card */}
          {validationResult && (
            <div className="p-3.5 bg-slate-900/90 border border-emerald-500/40 rounded-lg space-y-2 text-xs">
              <div className="flex items-center justify-between text-emerald-400 font-bold border-b border-slate-800 pb-1.5">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  DATA VALIDATION SUCCESSFUL
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-600/40 text-emerald-300">
                  {validationResult.format}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 pt-1">
                <div>Patient ID: <span className="text-white font-bold">{validationResult.patientId}</span></div>
                <div>Observations: <span className="text-white font-bold">{validationResult.observationCount} hours</span></div>
                <div>Clinical Features: <span className="text-white font-bold">{validationResult.featureCount} columns</span></div>
                <div>Monitoring Window: <span className="text-white font-bold">t-6 to t</span></div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-monitor-panel border-t border-monitor-cardBorder flex items-center justify-between">
          <span className="text-[10px] text-slate-400">
            Sample datasets available in /data/
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-all"
            >
              Cancel
            </button>
            <button
              disabled={!fileData}
              onClick={handleApply}
              className={`px-4 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 transition-all ${
                fileData
                  ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 cursor-pointer shadow-md'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <span>Load to Monitor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
