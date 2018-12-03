import loggerProxy from './logger.proxy'

const responseFactory = ({
     method,
     endpoint,
     textQuery,
     languageQuery,
     sourcesQuery,
     apiKey
}) => {
    method ? method = method.toUpperCase() : method = 'GET'

    const url = `${endpoint}?q=${textQuery}&language=${languageQuery}&sources=${sourcesQuery}&pageSize=10&apiKey=${apiKey}`;


    const casesObj = {
        'GET': function () {
            return fetch(url).then(res => res.json())
        },
        'POST': function () {
            return fetch(url, { method: 'POST' }).then(res => res.json())
        },
        'PUT': function () {
            return fetch(url, { method: 'PUT' }).then(res => res.json())
        },
        'DELETE': function () {
            return fetch(url, { method: 'DELETE' }).then(res => res.json())
        },
    }

    const proxy = loggerProxy(casesObj, {
        textQuery,
        languageQuery,
        sourcesQuery,
    })

    return proxy[method]
}

export default responseFactory