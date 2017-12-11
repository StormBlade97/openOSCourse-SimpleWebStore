import Router from 'koa-router'
import { User } from '../models'
import { permissionCheck } from '../services'

const router = new Router()

router.get('/users', permissionCheck, async ctx => {
    if (ctx.state.user.privilege !== 'admin') {
        ctx.status = 403
        ctx.body = 'Only admin can see this'
        return
    }
    const queryResultSet = await User.find()
    ctx.body = queryResultSet.map(el => el.toJSON())
})

export default router
