const path = require('path');

module.exports = {
  mode: 'jit',
  content: [path.resolve(__dirname, 'src', '**', '*')],
  purge: {
    options: {
      safelist: [
        'text-lime-500',
        'text-purple-500',
        'text-fuchsia-500',
        'text-green-500',
        'text-teal-500',
        'text-blue-500',
        'text-gray-500',
        'text-yellow-500',
        'text-aqua-500',
        'text-olive-500',
        'text-maroon-500',
        'text-navy-500',
        'text-silver-500',
      ],
    },
  },
  theme: {
    extend: {
      colors: {
        'aqua-500': '#00CCCC',
        'olive-500': '#808000',
        'maroon-500': '#800000',
        'navy-500': '#000080',
        'silver-500': '#64748B',
      },
    },
  },
  plugins: [],
};
