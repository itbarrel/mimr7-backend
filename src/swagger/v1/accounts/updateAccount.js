module.exports = {
    consumes: [
        'application/json',
    ],
    description: 'Update Account',
    operationId: 'updateAccount',
    parameters: [{
        description: 'Account ID',
        in: 'path',
        name: 'id',
        required: true,
        type: 'string',
        format: 'uuid',
    }],
    produces: ['application/json'],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    properties: {
                        name: {
                            type: 'string',
                        },
                        api_key: {
                            type: 'string',
                        },
                        description: {
                            type: 'string',
                            format: 'text',
                        },
                        active: {
                            type: 'boolean',
                        },
                        status: {
                            type: 'boolean',
                        },
                    },

                    type: 'object',
                },
            },
        },
        description: 'Body for Login',
        required: true,
    },
    responses: {
        200: {
            description: '{id:" ",name:" ",active: " ",api_key:" ",createAt:" ",updatedAt:" ",deletedAt:" "}',
        },
        401: {
            description: 'Token Expire',
        },
        500: {
            description: 'Something went wrong',
        },
    },
    tags: ['v1/Accounts'],
}
