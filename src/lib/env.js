import yenv from 'yenv'
import { keyblade } from 'keyblade'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

/**
 * We just export what `yenv()` returns.
 * `keyblade` will make sure we don't rely on undefined values.
 */
export const env = keyblade(yenv(), {
  message: key => `[yenv] ${key} not found in the loaded environment`
})
