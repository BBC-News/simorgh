var plugins = [
  '@babel/plugin-proposal-object-rest-spread', // allows ...spread notation
  '@babel/plugin-syntax-dynamic-import', // allows `await import()` syntax
  '@babel/transform-runtime',
  [
    'babel-plugin-styled-components',
    {
      ssr: true, // avoid checksum mismatches (different class generation between client & server)
      fileName: false, // prevent filename forming part of class name (duplication)
      pure: true, // aides dead code elimination
    },
  ],
];

// allows dynamic `import()` in Node tests.
if (process.env.NODE_ENV === 'test') {
  plugins.push('dynamic-import-node');
}

if (process.env.NODE_ENV === 'production') {
  plugins.push(["transform-react-remove-prop-types", {
    mode: 'remove',
    removeImport: true
  }]);
}

module.exports = (app) => {
  const isApi = () => {
    return typeof app === 'object' && typeof app.cache === 'function';
  };
  if (isApi()) {
    app.cache(false);
  }

  return {
    presets: [
      [
        app === 'client' ? '@bbc/env-custom' : '@babel/preset-env',
        {
          targets: {
            browsers: [
              'chrome >= 53',
              'firefox >= 45.0',
              'ie >= 11',
              'edge >= 37',
              'safari >= 9',
              'opera >= 40',
              'op_mini >= 18',
              'Android >= 7',
              'and_chr >= 53',
              'and_ff >= 49',
              'ios_saf >= 10',
            ],
            ...(app === 'server' && {
              node: 'current',
            }),
          },
          // analyses code & polyfills only the features that are used, only for the targeted browsers
          useBuiltIns: 'usage',
          corejs: '3',
          debug: false,
        },
      ],
      '@babel/preset-react', // transform JSX to JS
    ],
    plugins: plugins,
    overrides: [
      {
        test: /.*logger.*/,
        sourceType: 'script',
      },
    ],
  };
};
