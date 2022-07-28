module.exports = {
    consumes: [
        'application/json',
    ],
    description: 'Delete Account',
    operationId: 'DeleteAccount',
    parameters: [{
        description: 'Account ID',
        in: 'path',
        name: 'id',
        required: true,
        type: 'string',
        format: 'uuid',
    }],
    produces: ['application/json'],
    responses: {
        200: {
            description: '{ message: Account is deleted }',
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
