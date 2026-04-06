/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ebf2ff',
          100: '#dbe7ff',
          500: '#4f7cff',
          600: '#3b66f6',
          700: '#2f51d7',
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
        },
        violet: {
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        income: '#16a34a',
        expense: '#dc2626',
        balance: '#2563eb',
        surface: {
          900: '#0c1528',
          850: '#111c34',
          800: '#16233f',
          700: '#1f3156',
        },
      },
      boxShadow: {
        soft: '0 10px 30px rgba(15, 23, 42, 0.08)',
        glass: '0 10px 30px rgba(10, 18, 36, 0.35)',
        glow: '0 0 0 1px rgba(79, 124, 255, 0.15), 0 12px 35px rgba(79, 124, 255, 0.25)',
      },
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui'],
        heading: ['Space Grotesk', 'ui-sans-serif', 'system-ui'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 600ms ease-out both',
      },
    },
  },
  plugins: [],
}

