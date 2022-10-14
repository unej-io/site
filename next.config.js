// @ts-check

const withBundleAnalyzer = require("@next/bundle-analyzer")({ enabled: process.env.ANALYZE === "true", openAnalyzer: true });
const TerserPlugin = require("terser-webpack-plugin");

function itemFn(item) {
  return item;
}
function moduleToFilename(module) {
  return module.identifier().split("/").reduceRight(itemFn);
}

function createTest(filename) {
  return (regexp) => {
    return new RegExp(regexp).test(filename);
  };
}

function createBase(name) {
  return function (...ps) {
    return [name].concat(ps).join(".");
  };
}

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  /**
   * Opt : No typescript checking
   */
  typescript: {
    ignoreBuildErrors: process.env.NO_TS === "true",
  },

  /**
   * Opt : Custom webpack
   */
  webpack: (config, { isServer }) => {
    /**
     * Opt : Unminified bundle
     */
    if (process.env.UNMINIFY === "true") {
      config.optimization.minimize = false;
    }

    /**
     * Opt : Remove all comments (swc minify will not work)
     */
    config.optimization.minimizer = [
      ...(Array.isArray(config.optimization.minimizer) ? config.optimization.minimizer : []),
      new TerserPlugin({ terserOptions: { format: { comments: false } }, extractComments: false }),
    ];

    /**
     * Opt : Split chunks
     */

    const enable = false;
    if (enable) {
      config.optimization.splitChunks.cacheGroups[`io-react`] = {
        test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
        name: "react",
        chunks: "all",
      };

      config.optimization.splitChunks.cacheGroups[`io-ui`] = {
        test: /[\\/]node_modules[\\/](@emotion|@mantine)[\\/]/,
        name(module) {
          const filename = moduleToFilename(module);
          const test = createTest(filename);

          const ui_base = createBase("ui");
          if (test(/[\\/]@mantine[\\/]carousel[\\/]/)) return ui_base("carousel");
          if (test(/[\\/]@mantine[\\/]dates[\\/]/)) return ui_base("dates");
          if (test(/[\\/]@mantine[\\/]dropzone[\\/]/)) return ui_base("dropzone");
          if (test(/[\\/]@mantine[\\/]form[\\/]/)) return ui_base("form");
          if (test(/[\\/]@mantine[\\/]modals[\\/]/)) return ui_base("modals");
          if (test(/[\\/]@mantine[\\/]notifications[\\/]/)) return ui_base("notifications");
          if (test(/[\\/]@mantine[\\/]prism[\\/]/)) return ui_base("prism");
          if (test(/[\\/]@mantine[\\/]rte[\\/]/)) return ui_base("rte");
          if (test(/[\\/]@mantine[\\/]spotlight[\\/]/)) return ui_base("spotlight");
          return ui_base();
        },
        chunks: "all",
      };

      config.optimization.splitChunks.cacheGroups[`io-icon`] = {
        test: /[\\/]node_modules[\\/]@tabler[\\/]/,
        name: "icon",
        chunks: "all",
      };
      config.optimization.splitChunks.cacheGroups[`io-jsonforms`] = {
        test: /[\\/]node_modules[\\/]@jsonforms[\\/]/,
        name: "jsonforms",
        chunks: "all",
      };
      config.optimization.splitChunks.cacheGroups[`io-dnd-kit`] = {
        test: /[\\/]node_modules[\\/]@dnd-kit[\\/]/,
        name: "dnd-kit",
        chunks: "all",
      };

      config.optimization.splitChunks.cacheGroups[`io-firebase`] = {
        test: /[\\/]node_modules[\\/]@firebase[\\/]/,
        name(module) {
          const filename = moduleToFilename(module);
          const test = createTest(filename);

          const firebase_base = createBase("firebase");
          if (test(/[\\/]@firebase[\\/]app[\\/]/)) return firebase_base("app");
          if (test(/[\\/]@firebase[\\/]auth[\\/]/)) return firebase_base("auth");
          if (test(/[\\/]@firebase[\\/]firestore[\\/]/)) return firebase_base("firestore");
          if (test(/[\\/]@firebase[\\/]storage[\\/]/)) return firebase_base("storage");
          if (test(/[\\/]@firebase[\\/]util[\\/]/)) return firebase_base("util");
          if (test(/[\\/]@firebase[\\/]logger[\\/]/)) return firebase_base("logger");
          if (test(/[\\/]@firebase[\\/]component[\\/]/)) return firebase_base("component");
          return firebase_base();
        },
        chunks: "all",
      };

      config.optimization.splitChunks.cacheGroups[`io-ky`] = {
        test: /[\\/]node_modules[\\/]ky[\\/]/,
        name: "ky",
        chunks: "all",
      };
      config.optimization.splitChunks.cacheGroups[`io-swr`] = {
        test: /[\\/]node_modules[\\/]swr[\\/]/,
        name: "swr",
        chunks: "all",
      };
    }

    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
