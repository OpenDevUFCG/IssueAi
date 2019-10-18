const webpack = require('webpack');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const parentDir = path.join(__dirname, '../');

const config = {
    mode: 'development',
    entry: [`${parentDir}src/index.js`],
    output: {
        path: `${parentDir}public/`,
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
                use: 'url-loader?limit=25000',
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
            template: `${parentDir}src/index.html`,
        }),
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css',
        }),
        new Dotenv({
            systemvars: true,
        }),
    ],
};

module.exports = config;
