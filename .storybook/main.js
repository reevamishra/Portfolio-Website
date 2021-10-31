const path = require('path');
const postcssOptions = require('../postcss.config');
const nextOptions = require('../next.config');

module.exports = {
  core: {
    builder: 'webpack5',
  },
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-controls',
    '@storybook/addon-a11y',
    '@storybook/addon-toolbars',
  ],
  stories: ['../src/**/*.stories.js'],
  webpackFinal(config, { mode }) {
    // Respect absolute paths
    config.resolve.modules.push(path.resolve(process.cwd(), 'src'));

    // Configure base loaders
    config.module.rules = [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions,
            },
          },
        ],
        sideEffects: true,
      },
    ];

    // Use Next Webpack patches
    return nextOptions.webpack(config, { isServer: false });
  },
};
