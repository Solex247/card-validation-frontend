import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#101215',
        surface: {
          DEFAULT: '#1A1C21',
          card: '#23262E',
          'card-2': '#2E323C',
        },
        brass: {
          DEFAULT: '#C9A227',
          dim: '#8F7419',
        },
        mint: '#3ECF8E',
        crimson: '#E5484D',
        ink: {
          DEFAULT: '#F5F3EE',
          muted: '#8B8F98',
          faint: '#54585F',
        },
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'monospace'],
      },
      borderRadius: {
        card: '18px',
      },
      keyframes: {
        stamp: {
          '0%': { opacity: '0', transform: 'scale(1.4) rotate(-12deg)' },
          '60%': { opacity: '1', transform: 'scale(0.94) rotate(-12deg)' },
          '100%': { opacity: '1', transform: 'scale(1) rotate(-12deg)' },
        },
        rise: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        stamp: 'stamp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        rise: 'rise 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
};

export default config;
