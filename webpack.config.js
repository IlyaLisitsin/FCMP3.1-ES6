const webpack = require('webpack');

module.exports = {
    entry: {
        'main.js': __dirname + '/src/js/main',
        'main-style.css': __dirname + '/src/styles/main.scss'
    },
    output: {
        path: __dirname +  '/public',
        publicPath: '/',
        filename: '[name]'
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'main.css'
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
    optimization: {
        minimize: false
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin,
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