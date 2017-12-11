import Router from 'koa-router'
import { Item } from '../models'
import _ from 'lodash'
import { logger } from '../lib/logger'

const router = new Router()

router
  .get('/items', async ctx => {
    const allItems = await Item.find()
    ctx.body = allItems.map(el => el.toJSON())
  })
  .post('/items', async ctx => {
    // if user doesnt have permission to do this operation, blockem
    console.log(ctx.state.user)
    if (!/^(staff|admin)$/.test(ctx.state.user.privilege)) {
      ctx.status = 403
      ctx.body = 'Only admin or staff personnel can edit items'
    }

    const item = ctx.request.body
    if (_.has(item, ['name', 'price'])) {
      ctx.status = 400
      ctx.body = 'item must have name and price'
    }
    try {
      await Item.create(item)
      ctx.status = 200
    } catch (error) {
      logger.error(error)
    }
  })

export default router
