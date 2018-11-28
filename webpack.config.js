const webpack = require('webpack');

module.exports = (env, arg) => {
    const { mode } = arg;

    const isProd = mode === 'production';
    const isDev = mode === 'development';

    console.log(2133, isProd)
    return{
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
            minimize: isProd,
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin,
            new webpack.ProvidePlugin({
                'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
            })
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