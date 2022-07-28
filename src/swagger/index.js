const v1 = require('./v1')

module.exports = {
    basePath: '/',
    components: {
        schemas: {},
    },
    consumes: ['application/json'],
    info: {
        contact: {
            name: 'Crisishub Backend Team',
        },
        license: {
            name: 'ISO',
        },
        title: 'CrisisHub',
        version: '1.0.0',
    },
    openapi: '3.0.0',
    paths: {
        ...v1,
    },
    produces: ['application/json'],
    schemes: [
        'http',
        'https',
    ],
    servers: [
        {
            description: 'Localserver',
            url: 'http://localhost:3000',
        },

    ],
}
