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
        try {
            await Item.create(item)
            ctx.status = 201
        } catch (error) {
            logger.error(error)
        }
    })
    .patch('/items/:id', permissionCheck, async ctx => {
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
            if (!item) {
                ctx.status = 404
                return
            }
            ctx.body = { ...item.toJSON(), ...patchData }
        } catch (error) {
            logger.error(error)
            ctx.status = 500
        }
    })
    .delete('/items/:id', permissionCheck, async ctx => {
        if (ctx.state.user.privilege !== 'admin') {
            ctx.status = 403
            ctx.body = 'Only admin can delete items'
            return
        }
        try {
            const result = await Item.findByIdAndRemove(ctx.params.id)
            if (result) {
                ctx.body = result
            } else {
                ctx.status = 404
            }
        } catch (error) {
            logger.error(error)
            ctx.status = 404
        }
    })
export default router
