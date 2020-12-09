const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.js",
    vendor: "./src/vendor/vendor.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
  }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new HtmlWebpackPlugin({
      template: "./src/template.html"
    }),
    new HtmlWebpackPlugin({
      template: './src/jobs.html',
      
      filename: 'jobs.html'
  }),
  new MiniCssExtractPlugin({
    filename: '[name].[hash:8].css'
  }),

  ],
 
 
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
         
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
            },
          },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')({
                overrideBrowserslist: ['last 3 versions', 'ie >9']
                })
              ]
            }
          },
          'sass-loader'
        ],
      },
      {
        test: /\.scss$/i,
        use: [
         
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
            },
          },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')({
                overrideBrowserslist: ['last 3 versions', 'ie >9']
                })
              ]
            }
          },
          'sass-loader'
        ]
      },
  
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
      {
        test: /\.(svg|png|jpeg|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "imgs"
          }
        }
      }
    ]
  }
};
