import Promise from 'promise-polyfill';
import 'babel-core/register'
// import 'babel-polyfill'

import('../styles/common.scss')


if (!window.Promise) {
    window.Promise = Promise;
}

(function () {
    import('header').then(Header => new Header.default().create())
})()