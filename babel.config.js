module.exports = api => {
  const isTest = api.env('test');
  const presets = ['@babel/preset-typescript'];
  const plugins = [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import'
  ];

  api.cache(true);

  if (isTest) {
    presets.unshift([
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ]);
  } else {
    presets.unshift([
      '@babel/preset-env',
      {
        corejs: '2',
        useBuiltIns: 'usage',
        modules: false
      }
    ]);
  }

  return { presets, plugins };
};
