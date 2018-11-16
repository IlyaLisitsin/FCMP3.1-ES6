import Header from 'header'
import Promise from 'promise-polyfill';
import 'babel-core/register'
import 'babel-polyfill'

if (!window.Promise) {
    window.Promise = Promise;
}

(function () {
    new Header().create()
})()