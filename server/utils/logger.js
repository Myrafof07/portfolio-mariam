/**
  Simple logger pour remplacer Morgan
 */
export const logger = {
  info(msg, data = {}) {
    console.log(`[INFO] ${msg}`, data);
  },
  warn(msg, data = {}) {
    console.warn(`[WARN] ${msg}`, data);
  },
  error(msg, data = {}) {
    console.error(`[ERROR] ${msg}`, data);
  },
  debug(msg, data = {}) {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`[DEBUG] ${msg}`, data);
    }
  }
};
