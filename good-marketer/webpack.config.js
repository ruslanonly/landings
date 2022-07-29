const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require("extract-css-chunks-webpack-plugin");
const FixStyleOnlyEntries = require('webpack-fix-style-only-entries');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, "src", "js", "index.js"),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(s[ac]ss|css)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
          {
            loader: 'sass-loader',
          }
          ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      }
    ],
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({filename: "[name].css"}),
    new CssMinimizerPlugin(),
    new FixStyleOnlyEntries(),
    new HtmlWebpackPlugin({
      filename: `index.html`,
      template: path.resolve(__dirname, "src", "html", 'index.html'),
      inject: false,
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, "src", "public"), to: "public"},
      ],
    })
  ],
};