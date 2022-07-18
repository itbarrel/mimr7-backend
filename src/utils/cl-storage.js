const { createNamespace, getNamespace } = require('cls-hooked');

createNamespace('dynamicForm');
const storage = getNamespace('dynamicForm');
storage.run(() => { });

module.exports = storage;
