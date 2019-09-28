const { Nuxt, Builder } = require('nuxt')
const { isUrl, waitFor } = require('@nuxt/utils')
const config = require('./nuxt.config.js')
const path = require('path')
const Chalk = require('chalk')
const consola = require('consola')
const fsExtra = require('fs-extra')
const htmlMinifier = require('html-minifier')
const params = require('optimist').argv

config.dev = false

  // const nuxt = new Nuxt(config)

  // new Builder(nuxt)
  //   .build()
  //   .then(() => nuxt.renderRoute('/'))
  //   .then(({
  //     html,
  //     error,
  //     redirected
  //   }) => {
  //     console.log(error, redirected, html)
  //   })


  class Regenerate {
    constructor() {
      this.nuxt = new Nuxt(config)
      this.builder = new Builder(this.nuxt)

      this.srcBuiltPath = path.resolve(this.nuxt.options.buildDir, 'dist', 'client')
      this.distPath = this.nuxt.options.generate.dir
      this.distNuxtPath = path.join(
        this.distPath,
        isUrl(this.nuxt.options.build.publicPath) ? '' : this.nuxt.options.build.publicPath
      )
    }

    async generate(rebuild = false) {
      if (!params.link) {
        consola.debug('Nothing to do here!')
        return false
      }

      consola.debug('Initializing generator...')

      await this.init(rebuild)

      consola.debug('Preparing routes for generate...')

      const routes = await this.initRoutes()

      consola.info('Generating pages')

      const errors = await this.generateRoutes(routes)

      // Done hook
      await this.nuxt.callHook('generate:done', this.nuxt, errors)

      return { errors }
    }

    async init(rebuild) {
      await this.nuxt.ready()

      // Call before hook
      await this.nuxt.callHook('generate:before', this.nuxt, this.nuxt.options.generate)

      if (rebuild) {
        this.builder.forGenerate()
        await this.builder.build()
        await this.initDist()
      }
    }

    async initDist() {
      await fsExtra.copy(this.srcBuiltPath, this.distNuxtPath)
    }

    async initRoutes(route) {
      let routes = []

      routes.push({
        route: params.link,
        payload: false
      })

      await this.nuxt.callHook('generate:extendRoutes', routes)

      return routes
    }

    async generateRoutes(routes) {
      const errors = []

      // Start generate process
      while (routes.length) {
        let n = 0
        await Promise.all(
          routes
          .splice(0, this.nuxt.options.generate.concurrency)
          .map(async ({
            route,
            payload
          }) => {
            await waitFor(n++ * this.nuxt.options.generate.interval)
            await this.generateRoute({
              route,
              payload,
              errors
            })
          })
        )
      }

      // Improve string representation for errors
      // TODO: Use consola for more consistency
      errors.toString = () => this._formatErrors(errors)

      return errors
    }

    _formatErrors (errors) {
      return errors
        .map(({ type, route, error }) => {
          const isHandled = type === 'handled'
          const color = isHandled ? 'yellow' : 'red'

          let line = Chalk[color](` ${route}\n\n`)

          if (isHandled) {
            line += Chalk.grey(JSON.stringify(error, undefined, 2) + '\n')
          } else {
            line += Chalk.grey(error.stack)
          }

          return line
        })
        .join('\n')
    }

    async generateRoute ({ route, payload = {}, errors = [] }) {
      let html
      const pageErrors = []

      try {
        const res = await this.nuxt.server.renderRoute(route, {
          _generate: true,
          payload
        })
        ;({ html } = res)
        if (res.error) {
          pageErrors.push({ type: 'handled', route, error: res.error })
        }
      } catch (err) {
        pageErrors.push({ type: 'unhandled', route, error: err })
        errors.push(...pageErrors)

        await this.nuxt.callHook('generate:routeFailed', {
          route,
          errors: pageErrors
        })
        consola.error(this._formatErrors(pageErrors))

        return false
      }

      try {
        html = this.minifyHtml(html)
      } catch (err) {
        const minifyErr = new Error(
          `HTML minification failed. Make sure the route generates valid HTML. Failed HTML:\n ${html}`
        )
        pageErrors.push({ type: 'unhandled', route, error: minifyErr })
      }

      let fileName

      if (this.nuxt.options.generate.subFolders) {
        fileName = path.join(route, path.sep, 'index.html') // /about -> /about/index.html
        fileName = fileName === '/404/index.html' ? '/404.html' : fileName // /404 -> /404.html
      } else {
        fileName = route.length > 1 ? path.join(path.sep, route + '.html') : path.join(path.sep, 'index.html')
      }

      // Call hook to let user update the path & html
      const page = { route, path: fileName, html }
      await this.nuxt.callHook('generate:page', page)

      page.path = path.join(this.distPath, page.path)

      // Make sure the sub folders are created
      await fsExtra.mkdirp(path.dirname(page.path))
      await fsExtra.writeFile(page.path, page.html, 'utf8')

      await this.nuxt.callHook('generate:routeCreated', {
        route,
        path: page.path,
        errors: pageErrors
      })

      if (pageErrors.length) {
        consola.error('Error generating ' + route)
        errors.push(...pageErrors)
      } else {
        consola.success('Generated ' + route)
      }

      return true
    }

    minifyHtml (html) {
      let minificationOptions = this.nuxt.options.build.html.minify

      // Legacy: Override minification options with generate.minify if present
      // TODO: Remove in Nuxt version 3
      if (typeof this.nuxt.options.generate.minify !== 'undefined') {
        minificationOptions = this.nuxt.options.generate.minify
        consola.warn('generate.minify has been deprecated and will be removed in the next major version.' +
          ' Use build.html.minify instead!')
      }

      if (!minificationOptions) {
        return html
      }

      return htmlMinifier.minify(html, minificationOptions)
    }

  }

  const reg = new Regenerate

  reg.generate()

// npm run srd -- --type=page --link=/page_slug