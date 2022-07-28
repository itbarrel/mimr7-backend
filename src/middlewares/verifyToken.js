const jwt = require('jsonwebtoken')
const config = require('../../config')
const storage = require('../utils/cl-storage')

const badErrors = ['JsonWebTokenError', 'TokenExpiredError']

const verifyToken = async (req, res, next) => {
    storage.run(async () => {
        try {
            const token = req.body.token
                || req.headers.token
                || req.query.token
                || req.headers['x-access-token']
            if (!token) {
                return res
                    .status(403)
                    .send('A token is required for authentication')
            }
            const decoded = jwt.verify(token, config.jwt.secret)
            if (decoded) {
                storage.set('decoded', decoded)
            }
            next()
        } catch (error) {
            if (error && badErrors.includes(error.name)) {
                return res.status(401).send({ message: error.message })
            }

            next(error)
        }
    })
}

module.exports = verifyToken
