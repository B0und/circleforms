module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'display': ['Typo Round', 'sans-serif', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
      'body': ['Montserrat', 'sans-serif', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
      'alternates': ['Montserrat Alternates', 'sans-serif', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif']
    },
    extend: {
      colors: {
        black: {
          DEFAULT: "#0E0E0E",
          darker: '#0c0c0c',
          dark2: '#0F0F0F',
          light: '#121212',
          lighter: '#131313',
          lightest: '#1A1A1A',
        },
        grey: {
          dark: "#2D2D2D",
          DEFAULT: "#999999",
        },
        pink: {
          DEFAULT: '#FF66AA',
          dark: '#5C253D',
          darker: '#3C1526'
        },
        green: {
          DEFAULT: '#ACFF8F',
        },
        red: {
          DEFAULT: '#FF8F8F',
        }
      },
      borderRadius: {
        5: '5px',
        9: '9px',
        70: '70px',
      },
      outlineWidth: {
        3: '3px',
        5: '5px',
      },
      scale: {
        '99': '0.99',
      }
    },
  },
  plugins: [
    require('@whiterussianstudio/tailwind-easing'),
  ],
}