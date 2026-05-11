// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const components = require('./eventParams');

const options = {
    definition: {
        openapi: '3.0.0',

        info: {
            title: 'Event Management APIs',
            version: '1.0.0',
        },

        servers: [
            { url: 'http://localhost:4000' }
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
        }
    },

    apis: ['./routes/*.js']
};

module.exports = swaggerJsdoc(options);



