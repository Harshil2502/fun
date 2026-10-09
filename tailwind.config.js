/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: 'var(--bg-canvas)',
        surface: {
          DEFAULT: 'var(--bg-surface)',
          warm: 'var(--bg-surface-warm)',
        },
        seam: 'var(--border-seam)',
        pencil: 'var(--border-pencil)',
        ink: {
          DEFAULT: 'var(--text-ink)',
          muted: 'var(--text-ink-muted)',
        },
        rb: {
          violet: 'var(--rb-violet)',
          indigo: 'var(--rb-indigo)',
          blue: 'var(--rb-blue)',
          green: 'var(--rb-green)',
          yellow: 'var(--rb-yellow)',
          orange: 'var(--rb-orange)',
          red: 'var(--rb-red)',
          'violet-wash': 'var(--rb-violet-wash)',
          'indigo-wash': 'var(--rb-indigo-wash)',
          'blue-wash': 'var(--rb-blue-wash)',
          'green-wash': 'var(--rb-green-wash)',
          'yellow-wash': 'var(--rb-yellow-wash)',
          'orange-wash': 'var(--rb-orange-wash)',
          'red-wash': 'var(--rb-red-wash)',
        },
      },
      fontFamily: {
        hand: ['Caveat', 'cursive', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', 'serif'],
      },
      boxShadow: {
        'paper-flat': 'var(--shadow-paper-flat)',
        'paper-lift': 'var(--shadow-paper-lift)',
        'paper-hover': 'var(--shadow-paper-hover)',
        wax: 'var(--shadow-wax)',
      },
      borderRadius: {
        stamp: '2px',
        note: '6px',
        card: '12px',
        book: '20px',
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
      },
    },
  },
  plugins: [],
}
