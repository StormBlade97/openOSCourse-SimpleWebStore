import * as http from 'http'
import Koa from 'koa'
import cors from '@koa/cors'
import respond from 'koa-respond'
import bodyParser from 'koa-bodyparser'
import compress from 'koa-compress'
import { env } from './env'

import Mongoose from 'mongoose'
import { logger } from './logger'
import { notFoundHandler } from '../middleware/not-found'
import { errorHandler } from '../middleware/error-handler'
import * as Controllers from '../routes/index'
import { auth } from '../services'

// config mongoose's promise
Mongoose.Promise = global.Promise

/**
 * Creates and returns a new Koa application.
 * Does *NOT* call `listen`!
 *
 * @return {Promise<http.Server>} The configured app.
 */
export async function createServer() {
    logger.debug('Creating server...')
    const app = new Koa()

    // set up the server
    app
        // Top middleware is the error handler.
        .use(errorHandler)
        // Compress all responses.
        .use(compress())
        // Adds ctx.ok(), ctx.notFound(), etc..
        .use(respond())
        // Handles CORS.
        .use(cors())
        // Parses request bodies.
        .use(bodyParser())

        // Load routes (API "controllers")
        .use(Controllers.items.routes())
        .use(Controllers.login.routes())
        // Register authentication
        .use(auth)
        .use(Controllers.users.routes())
        // Default handler when nothing stopped the chain.
        .use(notFoundHandler)

    // Creates a http server ready to listen.
    const server = http.createServer(app.callback())

    // instantiate a connection to our db
    try {
        await Mongoose.connect(`${env.DB_URL}`)
        logger.debug('Database connected')
        // Add a `close` event listener so we can clean up resources.
        server.on('close', () => {
            // Tear down db connection
            Mongoose.disconnect()
            logger.debug('Disconnect database')
            logger.debug('Server closing, bye!')
        })
    } catch (error) {
        console.error(error)
    }
    // throw a close event to server on process interruption
    process.on('SIGINT', () => {
        server.close()
    })
    // throw a close event on nodemon restart ( for development )
    process.once('SIGUSR2', async function() {
        await server.close()
        process.kill(process.pid, 'SIGUSR2')
    })
    logger.debug('Server created, ready to listen', { scope: 'startup' })
    return server
}
