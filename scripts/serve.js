const express = require('express')
const portfinder = require('portfinder')
const toml = require('toml')
const fs = require('fs')
const path = require('path')
const config = require('../node/config')

const publicDir = path.join(__dirname, '..', 'public')
if (!fs.existsSync(publicDir) || !fs.statSync(publicDir).isDirectory) {
  console.error('You need to run "npm run build" first')
  process.exit(1)
}

function bindRoute (app, routePath) {
  const globPath = routePath.replace(/:[^/]+/g, '*')

  config.availableLanguages.forEach(({ key: lang }, index) => {
    if (config.localization.createDefaultPages && index === 0) {
      app.get(globPath, (_, response) => {
        const staticPath = globPath.split('*').shift()
        response.sendFile(path.join(__dirname, '..', 'public', `${staticPath}index.html`))
      })
    }

    if (config.localization.createLocalizedPages) {
      app.get(`/${lang}${globPath}`, (_, response) => {
        const staticPath = globPath.split('*').shift()
        response.sendFile(path.join(__dirname, '..', 'public', `${lang}${staticPath}index.html`))
      })
    }
  })
}

async function serve () {
  const app = express()
  app.use(express.static(path.join(__dirname, '..', 'public')))

  config.routes.forEach(({ path: routePath }) => bindRoute(app, routePath))

  const netlifyTomlPath = path.join(__dirname, '..', 'netlify.toml')
  if (fs.existsSync(netlifyTomlPath)) {
    const netlifyToml = fs.readFileSync(netlifyTomlPath, { encoding: 'utf8' })
    try {
      const parsedNetlifyToml = toml.parse(netlifyToml)
      parsedNetlifyToml.redirects && parsedNetlifyToml.redirects.forEach(({ from, to, status }) => {
        if (status > 300 && status < 400) {
          app.get(from, (_, res) => {
            console.log('request taken!')
            res.redirect(status, to)
          })
        }
      })
    } catch (error) {
      console.error('Error parsing netlify.toml', error)
      process.exit(1)
    }
  }

  config.availableLanguages.forEach(({ key: lang }) => {
    app.get(`/${lang}/*`, (_, response) => {
      response.status(404).sendFile(path.join(__dirname, '..', 'public', lang, '404', 'index.html'))
    })
  })

  app.get('*', (_, response) => {
    response.status(404).sendFile(path.join(__dirname, '..', 'public', '404.html'))
  })

  const port = await portfinder.getPortPromise({
    port: 9000,
    stopPort: 9100
  })

  app.listen(port)
  console.log(`Listening on http://localhost:${port}`)
}

serve()
