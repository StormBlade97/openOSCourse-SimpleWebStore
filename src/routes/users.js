import Router from 'koa-router'
import { User } from '../models'
import { logger } from '../lib/logger'
import { permissionCheck } from '../services'
import _ from 'lodash'

const router = new Router()

router
    .get('/users', permissionCheck, async ctx => {
        if (ctx.state.user.privilege !== 'admin') {
            ctx.status = 403
            ctx.body = 'Only admin can see this'
            return
        }
        const queryResultSet = await User.find()
        ctx.body = queryResultSet.map(el => el.toJSON())
    })
    // this route is for altering users.
    // creation of customer is in the logout
    .post('/users', permissionCheck, async ctx => {
        if (ctx.state.user.privilege !== 'admin') {
            ctx.status = 403
            return
        }
        try {
            const user = await User.create(ctx.request.body)
            if (!user) {
                ctx.status = 400
            } else {
                ctx.status = 201
                ctx.body = user
            }
        } catch (error) {
            logger.error(error)
            ctx.status = 400
        }
    })
    .patch('/users/:id', async ctx => {
        if (ctx.state.user.privilege !== 'admin') {
            ctx.status = 403
            return
        }
        try {
            const user = await User.findByIdAndUpdate(
                ctx.params.id,
                ctx.request.body
            )
            if (!user) {
                ctx.status = 404
            } else {
                ctx.body = {
                    ...user.toJSON(),
                    ..._.pick(ctx.request.body, [
                        'username',
                        'password',
                        'privilege'
                    ])
                }
            }
        } catch (error) {
            logger.error(error)
            ctx.status = 400
        }
    })
    .delete('/users/:id', async ctx => {
        if (ctx.state.user.privilege !== 'admin') {
            ctx.status = 403
            return
        }
        try {
            const target = await User.findById(ctx.params.id)
            if (!target) {
                ctx.status = 404
                return
            } else {
                if (target.privilege === 'admin') {
                    ctx.status = 403
                    ctx.body = 'Cannot remove another admin account'
                    return
                }
                await User.findByIdAndRemove(target.id)
                ctx.status = 204
            }
        } catch (error) {
            logger.error(error)
            ctx.status = 400
        }
    })

export default router
