module.exports = {
    plugins: [
        require('autoprefixer')({
            browsers: 'chrome >= 42, safari >= 8, ie >= 6, firefox >= 10',
            features: {
                autoprefixer: {remove: false}
            }
        })
    ]
}