// @ts-check

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: true,
});

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  typescript: {
    ignoreBuildErrors: process.env.NO_TS === "true",
  },
  webpack: (config, {}) => {
    if (process.env.UNMINIFY === "true") {
      config.optimization.minimize = false;
    }

    config.optimization.splitChunks.cacheGroups = {
      core: {
        test: /[\\/]node_modules[\\/](react|react-dom|@emotion|@mantine|@tabler|@jsonforms)[\\/]/,
        name: "core",
        chunks: "all",
      },

      firebase: {
        test: /[\\/]node_modules[\\/](@firebase)[\\/]/,
        name: "firebase",
        chunks: "all",
      },
    };

    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
