const dotenv = require('dotenv')
const path = require('path')
const Joi = require('joi')

dotenv.config({ path: path.join(__dirname, '../.env') })

const envVarsSchema = Joi.object()
    .keys({
        NODE_ENV: Joi.string().valid('production', 'development', 'test', 'docker').required(),
        SERVER_PORT: Joi.number().default(3000),
        DB_URL: Joi.string().required().description('Mongo DB url'),
        JWT_SECRET: Joi.string().required().description('JWT secret key'),
        // JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes '),
        // JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days a'),
        // JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
        //   .default(10)
        //   .description('minutes after which reset password token expires'),
        // JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
        //   .default(10)
        //   .description('minutes after which verify email token expires'),
        // SMTP_HOST: Joi.string().description('server that will send the emails'),
        // SMTP_PORT: Joi.number().description('port to connect to the email server'),
        // SMTP_USERNAME: Joi.string().description('username for email server'),
        // SMTP_PASSWORD: Joi.string().description('password for email server'),
        // EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
    })
    .unknown()

const { value: env, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env)

if (error) {
    throw new Error(`Config validation error: ${error.message}`)
}

module.exports = {
    env: env.NODE_ENV,
    port: env.SERVER_PORT,
    postgres: {
        url: env.DB_URL + (env.NODE_ENV === 'test' ? '-test' : ''),
        options: {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
    jwt: {
        secret: env.JWT_SECRET,
        accessExpirationMinutes: env.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: env.JWT_REFRESH_EXPIRATION_DAYS,
        resetPasswordExpirationMinutes: env.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
        verifyEmailExpirationMinutes: env.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
    },
    email: {
        smtp: {
            host: env.SMTP_HOST,
            port: env.SMTP_PORT,
            auth: {
                user: env.SMTP_USERNAME,
                pass: env.SMTP_PASSWORD,
            },
            apikey: env.SMTP_APIKEY || null,
        },
        from: env.SMTP_SENDER_EMAIL || 'someone@yopmail.com',
    },
    frontenddomain: env.frontenddomain || 'localhost:4200',

    OPEN_AI_KEY: env.OPEN_AI_KEY,
}
