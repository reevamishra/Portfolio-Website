const { patchWebpackConfig } = require('next-global-css');

module.exports = {
  images: {
    disableStaticImages: true,
  },
  poweredByHeader: false,
  exportPathMap: async () => ({
    '/404': { page: '/404' },
    '/articles': { page: '/Articles' },
    '/contact': { page: '/Contact' },
    '/projects/devtech-tools': { page: '/DevTechTools' },
    '/projects/device-models': { page: '/DeviceModels' },
    '/': { page: '/Home' },
  }),
  webpack(config, { isServer }) {
    // Disable NextJS global CSS warnings
    patchWebpackConfig(config, { isServer });

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
      }
    );

    return config;
  },
};
