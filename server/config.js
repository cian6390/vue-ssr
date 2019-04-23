const { resolve } = require('./helpers')
const expressVersion = require('express/package.json').version
const ssrVersion = require('vue-server-renderer/package.json').version

const env = process.env
const isProd = env.NODE_ENV === 'production'

module.exports = {
  isProd,
  webRoot: resolve('../dist'),
  port: env.PORT || isProd ? 3000 : 8080,
  useMicroCache: env.MICRO_CACHE !== 'false',
  templatePath: resolve('../src/index.template.html'),
  serverBundlePath: resolve('../dist/vue-ssr-server-bundle.json'),
  clientManifestPath: resolve('../dist/vue-ssr-client-manifest.json'),
  serverInfo: `express/${expressVersion} vue-server-renderer/${ssrVersion}`
}
