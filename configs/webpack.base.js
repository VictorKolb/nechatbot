const WebpackNotifierPlugin = require("webpack-notifier");
const webpack = require("webpack");
const merge = require("webpack-merge");
const path = require("path");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const NODE_ENV = process.env.NODE_ENV || "development";

const production = {
  mode: "production",
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        sourceMap: true,
        uglifyOptions: {
          compress: {
            inline: false,
          },
        },
      }),
    ],
  },
};

const development = {
  mode: "development",
  devtool: "source-map",
};

const srcPath = path.resolve(`./src`);
console.log("srcPath", srcPath);
const common = {
  context: srcPath,

  resolve: {
    modules: [srcPath, "node_modules"],
    extensions: [".js", ".jsx"],
  },

  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
      "process.env.NODE_ENV": JSON.stringify(NODE_ENV),
    }),
    new WebpackNotifierPlugin(),
    new CleanWebpackPlugin(["build", "public"], {
      root: path.resolve("./"),
      verbose: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: "babel-loader",
        options: {
          babelrc: false,
          presets: [
            "@babel/preset-flow",
            [
              "@babel/preset-env",
              {
                modules: false,
                useBuiltIns: false,
                targets: {
                  browsers: ["last 2 versions"],
                },
              },
            ],
          ],
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "file-loader",
            options: {
              publicPath: "/assets/",
            },
          },
          {
            loader: "svgo-loader",
            options: {
              plugins: [{ removeTitle: true }],
            },
          },
        ],
      },
      {
        test: /\.(woff2?|ttf|eot|jpe?g|png|gif)$/,
        use: ["file-loader?name=[name].[hash:8].[ext]"],
      },
    ],
  },

  optimization: {
    runtimeChunk: false,
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor_app",
          chunks: "all",
          minChunks: 2,
        },
      },
    },
  },
};

const config = merge([
  common,
  NODE_ENV === "production" ? production : development,
]);

module.exports = config;
