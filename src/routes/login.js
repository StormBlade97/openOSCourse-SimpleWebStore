import Router from 'koa-router'
import { User } from '../models'
import { logger } from '../lib/logger'
import { auth } from '../services'

const router = new Router()

router.post('/login', auth, async ctx => {
    ctx.body = ctx.state.user
})

export default router
