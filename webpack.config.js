const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
    mode: 'development',
    entry: ['react-dev-utils/webpackHotDevClient', './src/index.js'],
    devServer: {
        port: 8000,
        contentBase: __dirname + '/public',
        historyApiFallback: true,
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.[hash].js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2|png|gif)$/,
                use: 'url-loader?limit=10000',
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.(eot|md|svg|ttf|woff|woff2)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                    },
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: __dirname + '/src/index.html',
            hash: true,
        }),
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css',
        }),
    ],
};

module.exports = config;
