// @ts-check

const withBundleAnalyzer = require("@next/bundle-analyzer")({ enabled: process.env.ANALYZE === "true", openAnalyzer: true });
const TerserPlugin = require("terser-webpack-plugin");

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
  webpack: (config, {}) => {
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

    const itemFn = (item) => item;
    const moduleToFilename = (module) => module.identifier().split("/").reduceRight(itemFn);

    const cacheGroup = (test, name) => ({ test, name, chunks: "all" });

    config.optimization.splitChunks.cacheGroups = {
      ["react"]: cacheGroup(/[\\/]node_modules[\\/](react|react-dom)[\\/]/, "react"),

      ["ui"]: {
        test: /[\\/]node_modules[\\/](@emotion|@mantine)[\\/]/,
        name(module) {
          const name = "ui";
          const filename = moduleToFilename(module);
          const test = (regexp) => new RegExp(regexp).test(filename);
          const base = (...ps) => [name].concat(ps).join("/");
          if (test(/[\\/]@mantine[\\/]carousel[\\/]/)) return base("carousel");
          if (test(/[\\/]@mantine[\\/]dates[\\/]/)) return base("dates");
          if (test(/[\\/]@mantine[\\/]dropzone[\\/]/)) return base("dropzone");
          if (test(/[\\/]@mantine[\\/]form[\\/]/)) return base("form");
          if (test(/[\\/]@mantine[\\/]modals[\\/]/)) return base("modals");
          if (test(/[\\/]@mantine[\\/]notifications[\\/]/)) return base("notifications");
          if (test(/[\\/]@mantine[\\/]prism[\\/]/)) return base("prism");
          if (test(/[\\/]@mantine[\\/]rte[\\/]/)) return base("rte");
          if (test(/[\\/]@mantine[\\/]spotlight[\\/]/)) return base("spotlight");
          return base();
        },
        chunks: "all",
      },

      ["icon"]: cacheGroup(/[\\/]node_modules[\\/]@tabler[\\/]/, "icon"),
      ["jsonforms"]: cacheGroup(/[\\/]node_modules[\\/]@jsonforms[\\/]/, "jsonforms"),
      ["dnd-kit"]: cacheGroup(/[\\/]node_modules[\\/]@dnd-kit[\\/]/, "dnd-kit"),

      ["firebase"]: {
        test: /[\\/]node_modules[\\/]@firebase[\\/]/,
        name(module) {
          const name = "firebase";
          const filename = moduleToFilename(module);
          const test = (regexp) => new RegExp(regexp).test(filename);
          const base = (...ps) => [name].concat(ps).join("/");
          if (test(/[\\/]@firebase[\\/]app[\\/]/)) return base("app");
          if (test(/[\\/]@firebase[\\/]auth[\\/]/)) return base("auth");
          if (test(/[\\/]@firebase[\\/]firestore[\\/]/)) return base("firestore");
          if (test(/[\\/]@firebase[\\/]storage[\\/]/)) return base("storage");
          if (test(/[\\/]@firebase[\\/]util[\\/]/)) return base("util");
          if (test(/[\\/]@firebase[\\/]logger[\\/]/)) return base("logger");
          if (test(/[\\/]@firebase[\\/]component[\\/]/)) return base("component");
          return base();
        },
        chunks: "all",
      },

      ["ky"]: cacheGroup(/[\\/]node_modules[\\/]ky[\\/]/, "ky"),
      ["swr"]: cacheGroup(/[\\/]node_modules[\\/]swr[\\/]/, "swr"),
    };

    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
