import React, { useEffect, useRef } from 'react';

/**
 * Real-time 60fps Canvas Waveform Renderer for ICU Bedside Monitor.
 * Compact clinical sweep bar with realistic morphology for ECG, SpO2, Resp, and EtCO2.
 */
export default function Waveform({ type = 'ECG', hr = 80, spo2 = 98, resp = 16, etco2 = 35, color = '#10B981', label = 'ECG II' }) {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const sweepPosRef = useRef(0);
  const historyRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Initialize history buffer if empty
    if (historyRef.current.length !== width) {
      historyRef.current = new Array(width).fill(height / 2);
    }

    let lastTime = performance.now();

    const render = (time) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      // Speed of sweep across monitor screen (pixels per second)
      const sweepSpeed = 75; // px/sec
      const dx = sweepSpeed * dt;
      sweepPosRef.current = (sweepPosRef.current + dx) % width;

      // Calculate instantaneous signal value based on waveform type
      let yVal = height / 2;
      const t = time / 1000;

      if (type === 'ECG') {
        // Frequency based on HR: beats per sec = hr / 60
        const bps = Math.max(0.5, hr / 60);
        const beatCycle = (t * bps) % 1.0; // 0 to 1 cycle of single heartbeat
        const mid = height * 0.54;
        const amp = height * 0.42;

        if (beatCycle < 0.12) {
          // P Wave (atrial depolarization)
          yVal = mid - Math.sin((beatCycle / 0.12) * Math.PI) * (amp * 0.18);
        } else if (beatCycle < 0.20) {
          // PR Segment (baseline)
          yVal = mid;
        } else if (beatCycle < 0.24) {
          // Q Wave (slight dip)
          yVal = mid + (amp * 0.15);
        } else if (beatCycle < 0.30) {
          // R Wave (sharp high positive spike)
          yVal = mid - (amp * 0.95);
        } else if (beatCycle < 0.36) {
          // S Wave (sharp negative dip)
          yVal = mid + (amp * 0.35);
        } else if (beatCycle < 0.44) {
          // ST Segment
          yVal = mid;
        } else if (beatCycle < 0.65) {
          // T Wave (ventricular repolarization)
          yVal = mid - Math.sin(((beatCycle - 0.44) / 0.21) * Math.PI) * (amp * 0.32);
        } else {
          // Isoelectric baseline
          yVal = mid + (Math.sin(t * 12) * 0.5); // tiny physiological baseline noise
        }
      } else if (type === 'SpO2') {
        // Plethysmograph pulse wave matching heart rate
        const bps = Math.max(0.5, hr / 60);
        const cycle = (t * bps) % 1.0;
        const mid = height * 0.65;
        const amp = height * 0.48 * (spo2 / 100);

        if (cycle < 0.25) {
          // Rapid systolic rise
          yVal = mid - Math.sin((cycle / 0.25) * (Math.PI / 2)) * amp;
        } else if (cycle < 0.45) {
          // Dicrotic notch descent
          yVal = mid - amp * (1 - (cycle - 0.25) * 2.2);
        } else if (cycle < 0.55) {
          // Secondary diastolic peak
          yVal = mid - amp * (0.35 + Math.sin(((cycle - 0.45) / 0.10) * Math.PI) * 0.12);
        } else {
          // Diastolic runoff to baseline
          yVal = mid - amp * 0.35 * (1 - (cycle - 0.55) / 0.45);
        }
      } else if (type === 'RESP') {
        // Respiratory impedance wave (smooth sinusoidal breaths)
        const rps = Math.max(0.15, resp / 60);
        const mid = height * 0.52;
        const amp = height * 0.36;
        yVal = mid - Math.sin(t * rps * 2 * Math.PI) * amp + (Math.sin(t * 2) * 1.0);
      } else if (type === 'EtCO2') {
        // Capnogram box wave
        const rps = Math.max(0.15, resp / 60);
        const cycle = (t * rps) % 1.0;
        const baseline = height * 0.82;
        const plateauHeight = height * 0.82 - (height * 0.60 * (etco2 / 50));

        if (cycle < 0.10) {
          // Phase I (inspiratory baseline)
          yVal = baseline;
        } else if (cycle < 0.20) {
          // Phase II (rapid expiratory upstroke)
          yVal = baseline - ((baseline - plateauHeight) * ((cycle - 0.10) / 0.10));
        } else if (cycle < 0.60) {
          // Phase III (alveolar plateau with slight upward slope)
          const slope = (cycle - 0.20) * 6;
          yVal = plateauHeight - slope;
        } else if (cycle < 0.70) {
          // Phase 0 (rapid inspiratory downstroke)
          yVal = plateauHeight + ((baseline - plateauHeight) * ((cycle - 0.60) / 0.10));
        } else {
          yVal = baseline;
        }
      }

      // Store in history buffer at current sweep position
      const curIdx = Math.floor(sweepPosRef.current);
      historyRef.current[curIdx] = yVal;

      // Draw onto canvas
      ctx.clearRect(0, 0, width, height);

      // Subtle horizontal grid line for baseline
      ctx.strokeStyle = 'rgba(30, 58, 102, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      // Render waveform path
      ctx.lineWidth = 1.6;
      ctx.strokeStyle = color;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowColor = color;
      ctx.shadowBlur = 5;

      const gap = 14; // width of erase cursor head

      // Segment 1: from sweep cursor + gap to end
      ctx.beginPath();
      let started = false;
      for (let x = curIdx + gap; x < width; x++) {
        const y = historyRef.current[x] ?? (height / 2);
        if (!started) {
          ctx.moveTo(x, y);
          started = true;
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Segment 2: from start to sweep cursor
      ctx.beginPath();
      started = false;
      for (let x = 0; x < curIdx; x++) {
        const y = historyRef.current[x] ?? (height / 2);
        if (!started) {
          ctx.moveTo(x, y);
          started = true;
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Draw glowing erase cursor bar
      ctx.shadowBlur = 0;
      const grad = ctx.createLinearGradient(curIdx, 0, curIdx + gap, 0);
      grad.addColorStop(0, 'rgba(6, 11, 19, 0)');
      grad.addColorStop(0.5, 'rgba(6, 11, 19, 0.95)');
      grad.addColorStop(1, 'rgba(6, 11, 19, 1)');
      ctx.fillStyle = grad;
      ctx.fillRect(curIdx, 0, gap, height);

      // Leading beam point
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(curIdx, yVal, 2.2, 0, Math.PI * 2);
      ctx.fill();

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [type, hr, spo2, resp, etco2, color]);

  return (
    <div className="relative w-full h-[52px] sm:h-[56px] lg:h-[60px] bg-monitor-card/90 rounded border border-monitor-cardBorder overflow-hidden flex items-center px-2 min-h-0">
      {/* Label and parameter info overlay */}
      <div className="absolute left-2 top-1 z-10 flex items-center gap-1.5 pointer-events-none">
        <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-1.5 py-0.2 rounded bg-black/60 border border-white/10" style={{ color }}>
          {label}
        </span>
        <span className="text-[9px] font-mono text-slate-400">
          {type === 'ECG' && `HR ${hr}`}
          {type === 'SpO2' && `PLETH ${spo2}%`}
          {type === 'RESP' && `IMP ${resp}/m`}
          {type === 'EtCO2' && `CAPNO ${etco2}mmHg`}
        </span>
      </div>

      {/* Real-time Canvas */}
      <canvas
        ref={canvasRef}
        width={560}
        height={60}
        className="w-full h-full block"
      />
    </div>
  );
}
