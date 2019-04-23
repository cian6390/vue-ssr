const fs = require('fs');
const express = require('express');
const microcache = require('route-cache');
const favicon = require('serve-favicon');
const config = require('./config');
const helpers = require('./helpers');
const createRenderer = require('./create-renderer');
const devServer = require('../build/dev-server');

const app = express();
const port = config.port;
const isProd = config.isProd;

let renderer;
let readyToRender;

if (isProd) {
  const template = fs.readFileSync(config.templatePath, 'utf-8');
  const bundle = require(config.serverBundlePath);
  const clientManifest = require(config.clientManifestPath);
  const options = { template, clientManifest };
  renderer = createRenderer(bundle, options);
} else {
  readyToRender = devServer(app, config.templatePath, (bundle, options) => {
    renderer = createRenderer(bundle, options);
  });
}

// 靜態資源 cache 一個月
const serve = (path, cache) =>
  express.static(helpers.resolve(path), {
    maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
  });

app.use(favicon('./public/favicon.ico'));
app.use('/dist', serve('../dist', true));
app.use('/public', serve('../public', true));
// app.use('/manifest.json', serve('../public/manifest.json', true))

// 每秒 cache 一次靜態資料
app.use(
  microcache.cacheSeconds(1, req => config.useMicroCache && req.originalUrl)
);

function render(req, res) {
  const s = Date.now();

  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Server', config.serverInfo);

  const handleError = err => {
    if (err.url) {
      res.redirect(err.url);
    } else if (err.code === 404) {
      res.status(404).send('404 | Page Not Found');
    } else {
      // Render Error Page or Redirect
      res.status(500).send('500 | Internal Server Error');
      console.error(`error during render : ${req.url}`);
      console.error(err.stack);
    }
  };

  const context = {
    url: req.url,
    lang: req.acceptsLanguages('en-US', 'zh-TW') || 'en-US'
  };

  renderer.renderToString(context, (err, html) => {
    if (err) {
      return handleError(err);
    }
    res.send(html);
    if (!isProd) {
      console.log(`whole request: ${Date.now() - s}ms`);
    }
  });
}

app.get('*', function(req, res) {
  if (isProd) {
    render(req, res);
  } else {
    readyToRender.then(() => render(req, res)).catch(err => console.error(err));
  }
});

app.listen(port, () => console.log(`server started at port:${port}`));
