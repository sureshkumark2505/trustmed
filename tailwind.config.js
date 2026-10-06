/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        monitor: {
          bg: '#060B13',
          card: '#0B1320',
          panel: '#101B2E',
          cardBorder: '#1A2942',
          grid: '#0E1E36',
          text: '#F1F5F9',
          muted: '#8192A6',
        },
        clinical: {
          ecg: '#10B981',      // Emerald Green (ECG / Normal)
          spo2: '#06B6D4',     // Cyan (SpO2)
          resp: '#F59E0B',     // Amber (Resp)
          etco2: '#A855F7',    // Purple (EtCO2 / AI)
          bp: '#38BDF8',       // Sky Blue (BP/MAP)
          temp: '#F43F5E',     // Rose (Temperature)
          alert: '#EF4444',    // Bright Red (High Risk / Critical Alert)
          warning: '#EAB308',  // Yellow / Amber (Review)
          trust: '#3B82F6',    // Deep Blue / Trust
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'Consolas', 'monospace'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 1.8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'alert-ring': 'alertRing 1.2s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)', boxShadow: '0 0 15px rgba(239, 68, 68, 0.4)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)', boxShadow: '0 0 28px rgba(239, 68, 68, 0.8)' },
        },
        alertRing: {
          '0%': { transform: 'scale(0.98)', opacity: '0.9' },
          '50%': { transform: 'scale(1.02)', opacity: '1' },
          '100%': { transform: 'scale(0.98)', opacity: '0.9' },
        }
      }
    },
  },
  plugins: [],
}
