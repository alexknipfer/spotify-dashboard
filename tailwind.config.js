const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false,
  variants: {
    margin: ['responsive', 'last'],
  },
  theme: {
    extend: {
      colors: {
        'spotify-gray': 'rgb(24, 24, 24)',
        'spotify-green': '#1db954',
        'spotify-light-green': 'rgb(30, 215, 96)',
      },
      borderColor: {
        'spotify-green': '#1db954',
      },
      height: {
        thumbnail: '3.125rem',
      },
      width: {
        thumbnail: '3.125rem',
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
