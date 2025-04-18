const defaultTheme = require('tailwindcss/defaultTheme');
const windmill = require('@windmill/react-ui/config');

module.exports = windmill({
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // Tailwind v3+ uses `content` instead of `purge`
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        bottom: '0 5px 6px -7px rgba(0, 0, 0, 0.6), 0 2px 4px -5px rgba(0, 0, 0, 0.06)',
      },
    },
  },
 
});
