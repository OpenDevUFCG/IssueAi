const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotenvPlugin = require('webpack-dotenv-plugin');

const config = {
    mode: 'development',
    entry: './src/index.js',
    devServer: {
        port: 8000,
        contentBase: __dirname + '/docs',
    },
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: 'bundle.js',
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
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: __dirname + '/src/index.html',
        }),
        new DotenvPlugin({
            sample: './.env.sample',
            path: './.env',
            allowEmptyValues: true,
        }),
    ],
};
module.exports = config;
