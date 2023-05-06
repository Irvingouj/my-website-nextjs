import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        dark: '#222222',
        lightblue: '#f3f6fb;',
      },
      keyframes: {},
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
      },
      backgroundImage: {
        'main-background': 'url("/images/background1.jpg")',
        'second-background': 'url("/images/background2.jpg")',
        'heading-background': 'url("/images/background-heading.png")',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
} satisfies Config;
