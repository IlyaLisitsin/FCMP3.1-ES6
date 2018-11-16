import Header from 'header'
import Promise from 'promise-polyfill';

if (!window.Promise) {
    window.Promise = Promise;
}

(function () {
    new Header().create()
})()