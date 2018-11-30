module.exports = function logger(source) {
    return source.replace(/font-weight: 400/g, 'font-weight: normal')
}