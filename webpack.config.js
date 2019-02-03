const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

const config = {
    mode: 'development',
    entry: ['react-dev-utils/webpackHotDevClient', './src/index.js'],
    devServer: {
        port: 8000,
        contentBase: __dirname + '/docs',
        historyApiFallback: true,
    },
    output: {
        path: path.resolve(__dirname, 'docs'),
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
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: __dirname + '/src/index.html',
            hash: true,
        }),
        new Dotenv({
            path: './.env',
            systemvars: true,
        }),
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css',
        }),
    ],
};

module.exports = config;
