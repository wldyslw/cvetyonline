const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: {
        bundle: './client/app.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './public')
    },
    resolve: {
        extensions: ['.js', '.jsx', '.styl']
    },
    module: {
        rules: [
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
                test: /\.woff2?$|\.ttf$|\.otf$|\.eot$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            },
            {
                test: /\.svg$|\.png|\.jpe?g|\.gif|\.ico$/,
                loader: 'file-loader?name=img/[name].[ext]'
            },
            {
                test: /\.json$/,
                loader: 'file-loader?name=[name].[ext]'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'style/bundle.css',
            allChunks: true
        }),
        // new CleanWebpackPlugin('./public', {
        //     exclude: [ 'robots.txt' ],
        //     verbose:  false,
        //     dry:      false
        // }),
        new HtmlWebpackPlugin({
            inject: false,
            title: 'CvetyOnline',
            favicon: './client/assets/images/icon.ico',
            template: './client/templates/template.ejs',
            appMountId: 'root',
            version: '1.4'
        })
    ]
};
