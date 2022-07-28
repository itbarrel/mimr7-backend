const jwt = require('jsonwebtoken')
const config = require('../../config')

const badErrors = ['JsonWebTokenError', 'TokenExpiredError']

const verifyToken = async (req, res, next) => {
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
        jwt.verify(token, config.jwt.secret)
        next()
    } catch (error) {
        if (error && badErrors.includes(error.name)) {
            return res.status(401).send({ message: error.message })
        }

        next(error)
    }
}

module.exports = verifyToken
