const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const AsyncChunkNames = require('webpack-async-chunk-names-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: {
        'main.js': __dirname + '/src/js/main',
        'header.js': __dirname + '/src/js/header',
        'news-card.js': __dirname + '/src/js/news-card',
        // 'main-style.css': __dirname + '/src/styles/main.scss'
        // 'header.css':  __dirname + '/src/styles/header.scss'
    },
    // entry: path.resolve(__dirname, 'src/js/main.js'),
    output: {
        path: __dirname +  '/public',
        publicPath: '/',
        filename: '[name]',
        // chunkFilename: '[name]'
    },
    optimization: {
        minimize: false,
        splitChunks: {
            chunks: "async"
        }
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
            { test: /\.css$/, loader: 'style-loader!css-loader'},
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
        new AsyncChunkNames(),
        new BundleAnalyzerPlugin(),
        new HTMLWebpackPlugin({
            template: __dirname + '/public/index.html'
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