import { seed, purge } from '../lib/seed'
import { env } from '../lib/env'
import { logger } from '../lib/logger'
import mongoose from 'mongoose'

mongoose
  .connect(env.DB_URL)
  .then(purge)
  .then(() =>
    seed({
      numberOfCustomer: 10,
      numberOfItem: 50
    })
  )
  .then(() => logger.debug('Database seeded'))
  .catch(err => {
    logger.error(err)
    process.exit(1)
  })
  .then(() => process.exit())
