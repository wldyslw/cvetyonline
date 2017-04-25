const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: {
        bundle: './src/app.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './static'),
    },
    resolve: {
        extensions: ['.js', '.jsx', '.styl']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: [/node_modules/],
                loader: "babel-loader",
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!stylus-loader',
                    publicPath: '../'
                })
            },
            {
                test: /\.woff2?$|\.ttf$|\.eot$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            },
            {
                test: /\.svg$|\.png|\.jpe?g|\.gif$/,
                loader: 'file-loader?name=img/[name].[ext]'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'style/bundle.css',
            allChunks: true
        }),
        new CleanWebpackPlugin('./static', {
            exclude:  ['index.html'],
            verbose:  false,
            dry:      false
        })
    ],
    devServer: {
        contentBase: "./static",
    }
};