const nextOptions = require('../next.config');

module.exports = {
  core: {
    builder: 'webpack5',
  },
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: { backgrounds: false, docs: false, outline: false },
    },
    '@storybook/addon-a11y',
    '@storybook/addon-postcss',
  ],
  stories: ['../src/**/*.stories.js'],
  webpackFinal(config) {
    // Respect absolute paths
    config.resolve.modules.push('src');

    // Filter to base rules
    const baseExts = ['.css', '.js'];
    config.module.rules = config.module.rules.filter(rule =>
      baseExts.some(ext => rule.test?.test(ext))
    );

    // Use Next Webpack patches
    return nextOptions.webpack(config, { isServer: false });
  },
};
