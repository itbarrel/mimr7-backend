const { createNamespace, getNamespace } = require('cls-hooked')

createNamespace('mimr7')
const storage = getNamespace('mimr7')
storage.run(() => { })

module.exports = storage
