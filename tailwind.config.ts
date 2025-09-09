import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: { ink: '#0F172A', mist: '#F8FAFC' },
      boxShadow: { soft: '0 10px 25px -10px rgba(0,0,0,0.1)' }
    }
  },
  plugins: []
} satisfies Config;
