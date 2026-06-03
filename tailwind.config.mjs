/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Warm Editorial — warm stone/ink ramp (semantic "navy" kept for
        // backwards-compat across pages; now maps to warm neutrals).
        navy: {
          50: '#FAF6EF',
          100: '#EAE3D6',
          200: '#DAD0BF',
          300: '#C2B6A2',
          400: '#9A8E7C',
          500: '#6E6A62',
          600: '#4A4A4A',
          700: '#333230',
          800: '#1F1E1C',
          900: '#141312',
        },
        accent: {
          DEFAULT: '#1A5F6A',
          light: '#2E8290',
          dark: '#134952',
        },
        crst: {
          primary: '#1A5F6A',
          secondary: '#134952',
          accent: '#1A5F6A',
          light: '#EAF3F3',
          gold: '#AC5532',
          red: '#B83A3A',
        },
        // Warm Editorial brand palette (preferred for new work)
        cream: '#FDFBF7',
        sand: '#EAE5D9',
        ink: '#1A1A1A',
        teal: {
          DEFAULT: '#1A5F6A',
          dark: '#134952',
          light: '#EAF3F3',
        },
        terracotta: {
          DEFAULT: '#E8A38B',
          deep: '#AC5532',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        heading: ['"DM Sans"', 'system-ui', 'sans-serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        '6xl': ['3.75rem', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        '7xl': ['4.5rem', { lineHeight: '1.0', letterSpacing: '-0.03em' }],
      },
      backgroundImage: {
        'grid-navy': 'linear-gradient(to right, rgba(30,58,95,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(30,58,95,0.06) 1px, transparent 1px)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      backgroundSize: {
        'grid-40': '40px 40px',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-right': 'slideRight 0.5s ease-out forwards',
        'count-up': 'countUp 2s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
