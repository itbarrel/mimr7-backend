const getAccounts = require('./getAccounts')
const postAccounts = require('./addAccount')
const putAccount = require('./updateAccount')
const deleteAccount = require('./deleteAccount')

module.exports = {
    '/v1/accounts': {
        get: getAccounts,
        post: postAccounts,
    },
    '/v1/accounts/{id}': {
        put: putAccount,
        delete: deleteAccount,
    },
}
