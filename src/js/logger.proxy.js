const loggerProxy = (object, params) => {
    const handler = {
        get: function(obj, prop) {
            const returnedVal = object[prop]()
            console.log(`%c MEHTOD: ${prop}`, 'background: #222; color: #bada55');
            console.log(`%c TEXT QUERY: ${params.textQuery}`, 'background: #222; color: #bada55');
            console.log(`%c LANGUAGE QUERY: ${params.languageQuery}`, 'background: #222; color: #bada55');
            console.log(`%c SOURCE QUERY: ${params.sourcesQuery}`, 'background: #222; color: #bada55');

            return returnedVal
        }
    }
    return new Proxy(object, handler)
}

export default loggerProxy