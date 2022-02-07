const path = require('path');

module.exports = {
  mode: 'jit',
  content: [path.resolve(__dirname, 'src', '**', '*')],
  purge: {
    options: {
      safelist: ['text-lime-500'],
    },
  },
  theme: {
    extend: {
      colors: {
        'aqua-500': '#00ffff',
        'olive-500': '#808000',
      },
    },
  },
  plugins: [],
};
