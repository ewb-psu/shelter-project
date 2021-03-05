module.exports = {
    purge: [
      'src/**/*.js',
      'src/**/*.jsx',
      'src/**/*.ts',
      'src/**/*.tsx',
      'public/**/*.html',
    ],
    theme: {
      extend: {
        colors: {
          themeTeal: 'rgba(1, 169, 198,0.7)',
          themeTealFlat: 'rgb(1, 169, 198)'
        },
        width: {
          'extraLarge': '1280px',
          'large': '1024px',
          'medium': '768px',
          'small': '500px',
          'xsmall': '250px'
        }
      },
    },
    variants: {
      backgroundColor: ['responsive', 'hover', 'focus', 'active']
    },
    plugins: [],
  }