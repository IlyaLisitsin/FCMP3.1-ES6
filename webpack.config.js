const webpack = require('webpack');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("mini-css-extract-plugin");


module.exports = {
    entry: {
        'main.js': __dirname + '/src/js/main',
        'common': __dirname + '/src/styles/common.scss',
        'header': __dirname + '/src/styles/header.scss',
        'news-card': __dirname + '/src/styles/news-card.scss',
        'spinner': __dirname + '/src/styles/spinner.scss'
    },
    // entry: path.resolve(__dirname, 'src/js/main.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        // filename: '[name].[hash].js',
        filename: '[name].js'
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        // get the name. E.g. node_modules/packageName/not/this/part.js
                        // or node_modules/packageName
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

                        // npm package names are URL-safe, but some servers don't like @ symbols
                        return `npm.${packageName.replace('@', '')}`;
                    },
                },
            },
        },
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'es2017']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].css'
                        }
                    },
                    { loader: 'extract-loader' },
                    { loader: 'css-loader' },
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: ['./node_modules']
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin,
        // new webpack.HashedModuleIdsPlugin(),
        new webpack.ProvidePlugin({
            'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
        }),
        new HTMLWebpackPlugin({
            template: __dirname + '/public/index.html'
        }),
        new ExtractTextPlugin(__dirname + '/css/[name].css'),
    ],
    devServer: {
        contentBase: './public',
        port: 3000,
        open: true,
        proxy: {
            "/api": "http://localhost:8080"
        }
    },
    resolve: {
        alias: {
            'js': __dirname + '/src/js',
            'header': __dirname + '/src/js/header',
            'news-card': __dirname + '/src/js/news-card',
        },
        extensions: ['.scss', '.js']
    }
}