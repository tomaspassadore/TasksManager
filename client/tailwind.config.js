/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        /* Dark colors */
        darkBackgroundColor: '#202020', // custom
        darkFormColor: colors.zinc[800],
        darkPrimaryColor: colors.zinc[700],
        darkSecondaryColor: colors.zinc[600],
        darkButtonPrimary: colors.indigo[600],
        darkButtonSecondary: colors.zinc[600],
        darkButtonPrimaryHover: colors.indigo[700],
        darkButtonSecondaryHover: '#46464d', // custom
        darkTextColor: '#fff',
        darkBorderColor: '#202023',

        /* Light colors */
        backgroundColor: '#fff',
        formColor: '#ffffff',
        primaryColor: '#ffffff',
        secondaryColor: colors.zinc[600],
        buttonPrimary: colors.indigo[600],
        buttonSecondary: colors.neutral[200],
        buttonPrimaryHover: colors.indigo[800],
        buttonSecondaryHover: '#f7f7f7',
        textColor: '#000',
        borderColor: colors.neutral[200]
      }
    }
  },
  plugins: []
}
