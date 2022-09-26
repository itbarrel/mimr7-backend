const { transporter } = require('../utils')
const logger = require('../../config/logger')
const config = require('../../config')

class EmailService {
    constructor() {
        // eslint-disable-next-line no-unused-vars
        const defaultMailOptions = {
            from: config.email.from,
            to: 'someone@yopmail.com',
            subject: 'NodeJs App',
            text: 'Hello Sir/Miss, hope you are fine. This can be a test mail.',
        }
    }

    async sendEmail(mailOptions = this.defaultMailOptions) {
        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                logger.info(error)
            } else {
                logger.info(`Email sent: ${info.response}`)
            }
        })
    }

    async signUpEmail(email, name, password) {
        const mailOptions = {
            from: config.email.from,
            to: email,
            subject: 'Welcome to the Mimr7',
            text: `Hello ${name}, Welcome Onboard.
            Hope you are fine. Here are your credaitials
            Email: ${email}.
            Password: ${password}`,
        }

        await this.sendEmail(mailOptions)
    }

    async forgetPasswordEmail(email, name, token) {
        const { frontenddomain } = config
        const link = `${frontenddomain}/auth/reset-password?token=${token}`
        const mailOptions = {
            from: config.email.from,
            to: email,
            subject: 'Forget Password Email',
            html: `Hello hope you are fine Here is your reset password link Click on <a href=${link}>Link</a>`,
        }

        await this.sendEmail(mailOptions)
    }
}

module.exports = new EmailService()
