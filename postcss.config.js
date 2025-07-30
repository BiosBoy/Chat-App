/* eslint-disable global-require */
const cssConfig = {
  development: {
    'postcss-preset-env': {
      stage: 3,
      features: {
        'nesting-rules': true,
        'custom-properties': true,
        'custom-media-queries': true
      },
      autoprefixer: {
        add: false,
        grid: true,
        cascade: false,
        remove: false
      }
    },
    cssnano: {
      preset: [
        'default',
        {
          normalizeWhitespace: false
        }
      ]
    }
  },
  production: {
    'postcss-preset-env': {
      stage: 3,
      features: {
        'nesting-rules': true,
        'custom-properties': true,
        'custom-media-queries': true
      },
      autoprefixer: {
        add: true,
        grid: true,
        remove: true
      }
    },
    cssnano: {
      discardComments: {
        removeAll: true
      },
      discardUnused: true,
      mergeIdents: false,
      reduceIdents: false,
      sourcemap: true
    }
  }
};

// postcss-preset-env use autoprefixer under the hood,
// so we don't need to import it additionally
module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-preset-env')(cssConfig['postcss-preset-env']),
    require('cssnano')(cssConfig['cssnano'])
  ]
};
