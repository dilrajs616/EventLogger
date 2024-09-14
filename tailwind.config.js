/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/views/**/*.ejs',
    './public/css/**/*.css',
    './src/**/*.js'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
};
