const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base");
const webpackNodeExternals = require("webpack-node-externals");

const config = {
  target: "node",

  entry: {
    app: ["@babel/polyfill", "./index.js"],
  },

  output: {
    filename: "[name].js",
    chunkFilename: "[name].[hash].js",

    path: path.resolve("./build"),
  },

  externals: [webpackNodeExternals()],

  plugins: [
    new webpack.DefinePlugin({
      TARGET: JSON.stringify("node"),
    }),
  ],
};

module.exports = merge(baseConfig, config);
