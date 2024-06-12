const flowbit = require('flowbite-react/tailwind')
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.jsx',
    './src/**/*.js',
    flowbit.content()
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbit.plugin()
  ],
}

