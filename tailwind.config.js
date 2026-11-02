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
        stradio: {
          midnight: '#191923',
          darkest: '#0E0E14',
          ivory: '#F5F0EB',
          coral: '#FF7A59',
          violet: '#A995DB',
          card: '#22222E',
          border: 'rgba(255, 255, 255, 0.12)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Sora', 'sans-serif'],
      },
      animation: {
        'aura-pulse': 'auraPulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'soundwave-1': 'soundWave 1.2s ease-in-out infinite alternate',
        'soundwave-2': 'soundWave 0.9s ease-in-out infinite alternate 0.2s',
        'soundwave-3': 'soundWave 1.5s ease-in-out infinite alternate 0.4s',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        auraPulse: {
          '0%, 100%': {
            boxShadow: '0 0 25px -3px rgba(255, 122, 89, 0.5), 0 0 50px -5px rgba(169, 149, 219, 0.4)',
            borderColor: '#FF7A59',
          },
          '50%': {
            boxShadow: '0 0 40px 4px rgba(169, 149, 219, 0.6), 0 0 65px 8px rgba(255, 122, 89, 0.4)',
            borderColor: '#A995DB',
          },
        },
        soundWave: {
          '0%': { height: '20%' },
          '100%': { height: '100%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
