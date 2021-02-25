const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        'spotify-gray': 'rgb(24, 24, 24)',
        'spotify-green': 'rgb(29, 185, 84)',
        'spotify-light-green': 'rgb(30, 215, 96)',
      },
      fontFamily: {
        sans: ['Circular Std', ...fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
