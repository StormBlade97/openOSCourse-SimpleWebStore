import auth from 'basic-auth'
import { User } from '../models'
import { logger } from '../lib/logger'

const authService = async (ctx, next) => {
    const credential = await auth(ctx.request)
    // if invalid credentials
    if (credential === undefined) {
        ctx.status = 401
        ctx.body = 'Missing credentials in the header'
    } else {
        try {
            const user = await User.findOne({
                username: credential.name
            })
            if (!user || user.password !== credential.pass)
                throw new Error('Wrong username or password')
            ctx.state.user = user
            await next(ctx)
        } catch (error) {
            logger.error(error)
            ctx.status = 401
            ctx.body = error.message
        }
    }
}

export default authService
