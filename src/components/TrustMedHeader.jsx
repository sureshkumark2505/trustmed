import React from 'react';
import { 
  Activity, 
  UploadCloud, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  Sliders, 
  BookOpen, 
  Monitor, 
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { DEMO_PATIENTS } from '../services/demoPatients';

export default function TrustMedHeader({
  selectedPatientId = 'TM-HIGH-001',
  onSelectPatient = () => {},
  onOpenUpload = () => {},
  viewMode = 'clinical', // 'clinical' | 'research' | 'sandbox'
  onSetViewMode = () => {},
  isPlaying = false,
  onTogglePlay = () => {},
  onReset = () => {},
  playbackSpeed = 1,
  onSetSpeed = () => {},
  isMuted = false,
  onToggleMute = () => {}
}) {
  return (
    <header className="w-full bg-monitor-card border-b border-monitor-cardBorder px-4 py-2.5 flex flex-col md:flex-row items-center justify-between gap-3 shadow-md">
      {/* Brand & System Status */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 flex items-center justify-center shadow-[0_0_12px_rgba(6,182,212,0.4)]">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-black text-base tracking-wider text-white">TRUSTMED</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-bold">
                6-HOUR SEPSIS AI
              </span>
            </div>
            <div className="text-[10px] font-mono text-slate-400 flex items-center gap-2">
              <span>XGBoost v1</span>
              <span>•</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Analysis Ready
              </span>
            </div>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-monitor-panel p-1 rounded-lg border border-monitor-cardBorder text-xs font-mono">
          <button
            onClick={() => onSetViewMode('clinical')}
            className={`px-3 py-1 rounded flex items-center gap-1.5 transition-all ${
              viewMode === 'clinical'
                ? 'bg-cyan-600 text-white font-bold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clinical Monitor</span>
          </button>
          <button
            onClick={() => onSetViewMode('research')}
            className={`px-3 py-1 rounded flex items-center gap-1.5 transition-all ${
              viewMode === 'research'
                ? 'bg-purple-600 text-white font-bold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Faculty / Research</span>
          </button>
          <button
            onClick={() => onSetViewMode('sandbox')}
            className={`px-3 py-1 rounded flex items-center gap-1.5 transition-all ${
              viewMode === 'sandbox'
                ? 'bg-emerald-600 text-white font-bold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">What-If Sandbox</span>
          </button>
        </div>
      </div>

      {/* Patient Selector & Monitoring Controls */}
      <div className="flex items-center gap-2.5 w-full md:w-auto justify-between md:justify-end font-mono">
        {/* Patient Selection Dropdown */}
        <div className="relative">
          <select
            value={selectedPatientId}
            onChange={(e) => onSelectPatient(e.target.value)}
            className="appearance-none bg-monitor-panel hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-1.5 pr-8 cursor-pointer focus:outline-none focus:border-cyan-400 transition-all"
          >
            {DEMO_PATIENTS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.id}: {p.scenario}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
        </div>

        {/* Upload Button */}
        <button
          onClick={onOpenUpload}
          className="px-2.5 py-1.5 rounded-lg bg-monitor-panel hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs flex items-center gap-1.5 transition-all"
          title="Upload Custom Patient CSV/PSV/JSON"
        >
          <UploadCloud className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden lg:inline">Upload</span>
        </button>

        {/* Simulation Play/Pause Controls */}
        <div className="flex items-center bg-monitor-panel p-0.5 rounded-lg border border-slate-700">
          <button
            onClick={onTogglePlay}
            className={`p-1.5 rounded transition-all ${
              isPlaying 
                ? 'bg-amber-600 text-white' 
                : 'bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold'
            }`}
            title={isPlaying ? "Pause Simulation Replay" : "Start Monitoring Replay"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          </button>
          <button
            onClick={onReset}
            className="p-1.5 text-slate-400 hover:text-slate-200 transition-all"
            title="Reset Monitoring to t-6"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          
          {/* Speed Toggle */}
          <button
            onClick={() => onSetSpeed(playbackSpeed === 1 ? 2 : (playbackSpeed === 2 ? 5 : 1))}
            className="px-1.5 py-0.5 text-[10px] text-slate-300 hover:text-white font-bold"
            title="Cycle Playback Speed"
          >
            {playbackSpeed}x
          </button>
        </div>

        {/* Mute audio button */}
        <button
          onClick={onToggleMute}
          className="p-2 rounded-lg bg-monitor-panel hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-all"
          title={isMuted ? 'Unmute Audio Alarms' : 'Mute Audio Alarms'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
        </button>
      </div>
    </header>
  );
}
