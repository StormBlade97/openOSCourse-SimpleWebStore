import Router from 'koa-router'
import { Item } from '../models'
import _ from 'lodash'
import { logger } from '../lib/logger'
import { permissionCheck } from '../services'

const router = new Router()

router
    .get('/items', async ctx => {
        const allItems = await Item.find()
        ctx.body = allItems.map(el => el.toJSON())
    })
    .post('/items', permissionCheck, async ctx => {
        if (ctx.state.user.privilege !== 'admin') {
            ctx.status = 403
            ctx.body = 'Only admin can add new item'
            return
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
    .patch('/items/:id', permissionCheck, async ctx => {
        console.log(_.has(ctx.request.body, ['price, image, name']))
        if (
            ctx.state.user.privilege !== 'admin' &&
            Object.keys(ctx.request.body).filter(key =>
                /^(name|price|image)$/.test(key)
            ).length > 0
        ) {
            ctx.status = 403
            ctx.body = 'Only admin can modify item name and price'
            return
        }
        const patchData = _.pick(ctx.request.body, [
            'name',
            'image',
            'stock',
            'price'
        ])
        try {
            const item = await Item.findOneAndUpdate(
                { _id: ctx.params.id },
                patchData
            )
            ctx.body = { ...item.toJSON(), ...patchData }
        } catch (error) {
            logger.error(error)
            ctx.status = 500
        }
    })
export default router
