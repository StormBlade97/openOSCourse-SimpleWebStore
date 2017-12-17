import Router from 'koa-router'
import serve from 'koa-static'
import path from 'path'

const router = new Router()
router.use('/', serve(path.join(__dirname, '/build')))

export default router
