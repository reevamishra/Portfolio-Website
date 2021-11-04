const { patchWebpackConfig } = require('next-global-css');

module.exports = {
  swcMinify: true,
  productionBrowserSourceMaps: true,
  images: {
    disableStaticImages: true,
  },
  exportPathMap: async () => ({ '/': { page: '/Home' } }),
  webpack(config, { isServer }) {
    // Disable NextJS global CSS warnings
    patchWebpackConfig(config, { isServer });

    // Configure Webpack patches
    config.module.rules.push(
      {
        test: /\.svg$/,
        use: '@svgr/webpack',
      },
      {
        test: /\.(woff2|png|jpg|mp4|glb)$/,
        type: 'asset/resource',
      },
      {
        test: /\.glsl$/,
        type: 'asset/source',
      },
      {
        test: /\.mdx$/,
        use: ['next-swc-loader', 'mdx-loader'],
      }
    );

    return config;
  },
};
