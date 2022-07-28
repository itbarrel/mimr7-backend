module.exports = {
    consumes: [
        'application/json',
    ],
    description: 'Add Account',
    operationId: 'Addaccount',
    produces: ['application/json'],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid',
                        },
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
                    required: [
                        'name',
                    ],
                    type: 'object',
                },
            },
        },
        description: 'Body for API',
        required: true,
    },
    responses: {
        200: {
            description:
                '{id:" ",name:" ",api_key:" ",description:" ",active: " ",createAt:" ",updatedAt:" ",deletedAt:" "}',
        },
        401: {
            description: 'Token Expire',
        },
        422: {
            description: 'Invalid input',
        },
        500: {
            description: 'Something went wrong',
        },
    },
    tags: ['v1/Accounts'],
}
