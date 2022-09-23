const jwt = require('jsonwebtoken')
const config = require('../../../../config')

const { UserService } = require('../../../services/resources')
const { EmailService } = require('../../../services')

const forgetPassword = async (req, res, next) => {
    try {
        const { email } = req.body
        const user = await UserService.findByQuery({ email }, true)

        if (user) {
            const jwtToken = jwt.sign(
                {
                    id: user.id, email: user.email, userName: user.userName, accountId: user.AccountId,
                },
                config.jwt.secret, { expiresIn: '0.5h' },
            )
            const { id } = user
            const resetToken = { resetPasswordToken: jwtToken }
            const updatedUser = await UserService.update(resetToken, { id })
            await EmailService.forgetPasswordEmail(updatedUser.email,
                updatedUser.firstName, updatedUser.resetPasswordToken)

            res.send({ message: 'Forget Password', Token: jwtToken })
        } else {
            next(new Error('User Not Found'))
        }
    } catch (error) {
        next(error)
    }
}

module.exports = forgetPassword
