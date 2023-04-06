module.exports.hashGenerator = require('./hashGenerator')
module.exports.removeChars = require('./downcase')
module.exports.sequelize = require('./dbConnection')
// module.exports.plugMiddleware = require('./plugMiddleware')
module.exports.pick = require('./pick')
module.exports.transporter = require('./EmailTransportor')

module.exports.downcase = (str) => str.toLowerCase()
