const { addBeforeLoader, loaderByName } = require('@craco/craco');

module.exports = {
  plugins: [
    {
      plugin: {
        overrideWebpackConfig({ webpackConfig }) {
          addBeforeLoader(webpackConfig, loaderByName('file-loader'), {
            test: /\.glsl$/,
            use: 'raw-loader',
          });

          return webpackConfig;
        },
      },
    },
  ],
  style: {
    postcss: {
      mode: 'extends',
      plugins: [
        require('postcss-flexbugs-fixes'),
        require('postcss-preset-env')({
          autoprefixer: {
            flexbox: 'no-2009',
          },
          stage: 3,
          features: {
            'nesting-rules': true,
            'custom-media-queries': {
              importFrom: 'src/app/index.css',
            },
          },
        }),
      ],
    },
  },
};
