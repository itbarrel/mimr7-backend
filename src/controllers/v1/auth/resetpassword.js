const { UserService } = require('../../../services/resources')

const resetPassword = async (req, res, next) => {
    try {
        const { token, password } = req.body

        const user = await UserService.findByQuery({ resetPasswordToken: token }, true)
        if (user) {
            user.password = password
            user.resetPasswordToken = null
            await user.save()
            res.send({ message: 'Password reset successfully' })
        } else {
            next(new Error('Your Reset Password Link is Invailid'))
        }
    } catch (error) {
        next(error)
    }
}
module.exports = resetPassword
