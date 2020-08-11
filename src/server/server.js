import express from 'express'
import bodyParser from 'body-parser'
import { SetupServiceRoutes } from './Services/index'
import path from 'path'
import fs from 'fs'
import _ from 'lodash'

const app = express()
const port = 3000

// setup body parsing
app.use(bodyParser.json({ limit: '15mb' }))
app.use(bodyParser.urlencoded({ limit: '15mb', extended: false }))

// install all service routes
SetupServiceRoutes(app)

// if dev setup webpack support
if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack')
  const webpackMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')

  const configs = require('../../configs/webpack.dev.config')

  const middlewares = {}

  _.each(configs, (config) => {
    const { name, hotOutputPath } = config
    delete config.name
    delete config.hotOutputPath
    const compiler = webpack(config)
    const middleware = webpackMiddleware(compiler, {
      publicPath: config.output.publicPath,
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
      }
    })

    app.use(middleware)
    app.use(webpackHotMiddleware(compiler, {
      path: hotOutputPath
    }))

    middlewares[name] = middleware
  })

  app.get(['/', '*'], async function response (req, res) {
    res.write(middlewares.client.fileSystem.readFileSync(path.join(__dirname, '../client/index.html')))
    res.end()
  })
} else {
  const clientFolder = path.join(__dirname, '../client')
  app.use('/', express.static(clientFolder))

  const rootClientHTML = fs.readFileSync(path.join(__dirname, '../client/index.html'))

  app.get('*', function response (req, res) {
    res.write(rootClientHTML)
    res.end()
  })
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
