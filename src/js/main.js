import 'babel-polyfill'
import 'babel-core/register'
import Promise from 'promise-polyfill'
import Header from 'header'

import('../styles/common.scss')

if (!window.Promise) {
    window.Promise = Promise
}

(function () {
    import('../styles/header.scss').then(() => new Header().create()
    )
})()