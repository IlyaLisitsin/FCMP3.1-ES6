const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, arg) => {
    const { mode } = arg;

    const isProd = mode === 'production';

    return{
        entry: {
            'main': __dirname + '/src/js/main',
        },
        output: {
            path: __dirname +  '/public',
            publicPath: './',
            chunkFilename: '[name].js',
            filename: '[name].js'
        },
        optimization: {
            minimize: isProd
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
                    use:  [
                        'style-loader',
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        ...(isProd ? ['postcss-loader'] : []),
                        'sass-loader',
                        {
                            loader: "./custom-loader.js"
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
            new webpack.ProvidePlugin({
                'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
            }),
            new MiniCssExtractPlugin({
                filename: '[name].css',
            }),
            new HtmlWebpackPlugin({
                inject: true,
                template: __dirname + '/src/index.html',
                filename: 'index.html'
            }),
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
}