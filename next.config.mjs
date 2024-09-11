/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
};

/** @type {(nextConfig: NextConfig) => NextConfig} */
const withSvgr = (nextConfig = {}) => {
  return {
    ...nextConfig,
    webpack(config, options) {
      const urlLoader = {};

      const nextImageLoader = config.module.rules.find(
        (rule) => rule.loader === "next-image-loader"
      );

      if (nextImageLoader) {
        urlLoader.loader = nextImageLoader.loader;
        urlLoader.options = nextImageLoader.options;
      }

      const svgrLoader = {
        loader: "@svgr/webpack",
        options: {
          typescript: true,
          titleProp: true,
          exportType: "named",
          replaceAttrValues: {
            "#000": "{props.color || `#000`}",
            "#000000": "{props.color || `#000`}",
          },
          svgProps: {
            fill: "currentcolor",
          },
        },
      };

      config.module.rules.push({
        test: /\.svg$/,
        rules: [
          {
            issuer: /\.[jt]sx?$/,
            use: [svgrLoader],
          },
          {
            dependency: nextImageLoader?.dependency ?? { not: ["url"] },
            issuer: nextImageLoader?.issuer ?? { not: /\.(css|scss|sass)$/ },
            use: [urlLoader],
          },
        ],
      });

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  };
};

// Use ES module export syntax
export default () => {
  const plugins = [withSvgr];
  return plugins.reduce((acc, plugin) => plugin(acc), nextConfig);
};
