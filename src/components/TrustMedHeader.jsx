import React from 'react';
import { 
  Activity, 
  UploadCloud, 
  Play, 
  Pause, 
  RotateCcw, 
  Sliders, 
  BookOpen, 
  Monitor, 
  ChevronDown
} from 'lucide-react';
import { DEMO_PATIENTS } from '../services/demoPatients';

export default function TrustMedHeader({
  selectedPatientId = 'TM-HIGH-001',
  onSelectPatient = () => {},
  onOpenUpload = () => {},
  viewMode = 'clinical',
  onSetViewMode = () => {},
  isPlaying = false,
  onTogglePlay = () => {},
  onReset = () => {},
  playbackSpeed = 1,
  onSetSpeed = () => {}
}) {
  return (
    <header className="w-full bg-monitor-card border-b border-monitor-cardBorder px-3 py-1.5 flex items-center justify-between gap-2 shadow-sm font-mono min-h-0 shrink-0">
      {/* Brand & System Status */}
      <div className="flex items-center gap-2.5 shrink-0">
        <div className="w-7 h-7 rounded bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center shadow-[0_0_8px_rgba(6,182,212,0.4)]">
          <Activity className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-black text-sm tracking-wider text-white">TRUSTMED</span>
            <span className="text-[9px] px-1 py-0.2 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-bold hidden sm:inline">
              6-HOUR SEPSIS AI
            </span>
          </div>
          <div className="text-[9px] text-slate-400 flex items-center gap-1.5">
            <span className="hidden md:inline">AI-Assisted Sepsis Early Warning</span>
            <span className="hidden md:inline">•</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Live Monitoring
            </span>
          </div>
        </div>
      </div>

      {/* View Mode Switcher */}
      <div className="flex items-center bg-monitor-panel p-0.5 rounded border border-monitor-cardBorder text-[11px] shrink-0">
        <button
          type="button"
          onClick={() => onSetViewMode('clinical')}
          className={`px-2.5 py-1 rounded flex items-center gap-1 transition-all cursor-pointer ${
            viewMode === 'clinical'
              ? 'bg-cyan-600 text-white font-bold shadow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Monitor className="w-3 h-3" />
          <span className="hidden sm:inline">Monitor</span>
        </button>
        <button
          type="button"
          onClick={() => onSetViewMode('research')}
          className={`px-2.5 py-1 rounded flex items-center gap-1 transition-all cursor-pointer ${
            viewMode === 'research'
              ? 'bg-purple-600 text-white font-bold shadow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-3 h-3" />
          <span className="hidden sm:inline">Research</span>
        </button>
        <button
          type="button"
          onClick={() => onSetViewMode('sandbox')}
          className={`px-2.5 py-1 rounded flex items-center gap-1 transition-all cursor-pointer ${
            viewMode === 'sandbox'
              ? 'bg-emerald-600 text-white font-bold shadow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sliders className="w-3 h-3" />
          <span className="hidden sm:inline">What-If</span>
        </button>
      </div>

      {/* Patient Selector & Simulation Controls */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Patient Selection Dropdown */}
        <div className="relative">
          <select
            value={selectedPatientId}
            onChange={(e) => onSelectPatient(e.target.value)}
            className="appearance-none bg-monitor-panel hover:bg-slate-800 border border-slate-700 text-slate-200 text-[11px] font-bold rounded px-2.5 py-1 pr-6 cursor-pointer focus:outline-none focus:border-cyan-400 transition-all"
          >
            {DEMO_PATIENTS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.id}: {p.scenario}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3 h-3 text-slate-400 absolute right-1.5 top-2 pointer-events-none" />
        </div>

        {/* Upload Button */}
        <button
          type="button"
          onClick={onOpenUpload}
          className="px-2 py-1 rounded bg-monitor-panel hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-[11px] flex items-center gap-1 transition-all cursor-pointer"
          title="Upload Custom Patient CSV/PSV/JSON"
        >
          <UploadCloud className="w-3 h-3 text-cyan-400" />
          <span className="hidden lg:inline">Upload</span>
        </button>

        {/* Play/Pause & Replay controls */}
        <div className="flex items-center bg-monitor-panel p-0.5 rounded border border-slate-700">
          <button
            type="button"
            onClick={onTogglePlay}
            className={`p-1 rounded transition-all cursor-pointer ${
              isPlaying 
                ? 'bg-amber-600 text-white' 
                : 'bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold'
            }`}
            title={isPlaying ? "Pause Simulation" : "Start Simulation Replay"}
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
          </button>
          <button
            type="button"
            onClick={onReset}
            className="p-1 text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
            title="Reset to t-6"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
          <button
            type="button"
            onClick={() => onSetSpeed(playbackSpeed === 1 ? 2 : (playbackSpeed === 2 ? 5 : 1))}
            className="px-1 text-[9px] text-slate-300 hover:text-white font-bold cursor-pointer"
            title="Cycle Playback Speed"
          >
            {playbackSpeed}x
          </button>
        </div>
      </div>
    </header>
  );
}
