const jwt = require('jsonwebtoken')

const { UserService } = require('../../../services/resources')

const config = require('../../../../config')

const login = async (req, res, next) => {
    try {
        const { credentials } = req.body
        const user = await UserService.findByQuery({ email: credentials.email }, true)

        if (user) {
            const verification = await user.validatePassword(credentials.password)
            if (verification) {
                const role = await user.getRole()
                const { type } = await user.getAccount()
                if (role) {
                    const decodeObj = {
                        id: user.id,
                        email: user.email,
                        userName: user.userName,
                        accountId: user.AccountId,
                        role: role.name,
                        accountType: type,
                    }

                    const jwtToken = jwt.sign(decodeObj, config.jwt.secret, { expiresIn: '2h' })
                    res.send({
                        message: 'Welcome',
                        token: jwtToken,
                        AccountType: type,
                        Role: role.name,
                        user,
                    })
                } else {
                    next(new Error('Role not attached'))
                }
            } else {
                next(new Error('Password do not match'))
            }
        } else {
            next(new Error('User Not Found'))
        }
    } catch (error) {
        next(error)
    }
}

module.exports = login
