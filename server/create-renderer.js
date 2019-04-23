const LRU = require('lru-cache')
const { createBundleRenderer } = require('vue-server-renderer')
const { webRoot } = require('./config')

module.exports = function createRenderer(bundle, options) {
  return createBundleRenderer(
    bundle,
    Object.assign(options, {
      // for component caching
      cache: new LRU({
        max: 1000,
        maxAge: 1000 * 60 * 15
      }),
      // this is only needed when vue-server-renderer is npm-linked
      basedir: webRoot,
      // recommended for performance
      runInNewContext: false
    })
  )
}
