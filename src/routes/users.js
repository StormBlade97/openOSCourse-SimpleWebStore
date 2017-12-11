import Router from 'koa-router'
import { User } from '../models'

const router = new Router()

router.get('/users', async ctx => {
  const queryResultSet = await User.find()
  ctx.body = queryResultSet.map(el => el.toJSON())
})

export default router
