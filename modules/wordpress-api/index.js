const { resolve } = require('path')
const { loadObjects, loadCategories } = require('./ssr.js')
const loadSettings = require('./loadSettings.js')
const params = require('optimist').argv

const defaults = {
  posts: '/wp-json/wp/v2/posts',
  pages: '/wp-json/wp/v2/pages',
  categories: '/wp-json/wp/v2/categories',
  products: '/wp-json/wp/v2/product',
  settings: '/wp-json/nuxt/v1/settings',
  menu: '/wp-json/nuxt/v1/menu',
  leftSidebar: '/wp-json/nuxt/v1/left_sidebar',
  footerSidebar: '/wp-json/nuxt/v1/footer_sidebar'
}

export default async function wordpressApi(moduleOptions) {
  const settings = await loadSettings(this.options.wpUrl + defaults.settings)
  const options = { ...defaults, ...settings, ...moduleOptions }

  this.nuxt.hook('ready', nuxt => {
    this.addPlugin({
      src: resolve(__dirname, './plugin.js'),
      fileName: 'wp.js',
      options
    })
  })

  this.nuxt.hook('generate:extendRoutes', async routes => {
    if (process.argv.includes('--posts') || params.type === 'all') {
      console.info('Start load post routes.')
      const posts = await loadObjects(
        options.url + options.posts,
        {},
        'blog/',
        true,
        options.posts_per_page
      )

      routes.push(...posts)
      routes.push({ route: `/blog` })
      routes.push({ route: `/blog/page` })
      console.info('Loaded post routes.')
    }

    if (params.type === 'all') {
      const pages = await loadObjects(
        options.url + options.pages,
        {},
        '',
        false
      )
      routes.push(...pages)
      console.info('Added pages routes.')
    }

    if (process.argv.includes('--products') || params.type === 'all') {
      const products = await loadObjects(
        options.url + options.products,
        {},
        'shop/',
        true
      )
      routes.push({ route: `/shop` })
      routes.push(...products)
      console.info('Added products routes.')
    }

    if (params.type === 'post' || params.type === 'all') {
      const blogCatebories = await loadCategories(
        options.url + options.categories,
        'blog/category',
        options.url + options.posts,
        options.posts_per_page
      )
      routes.push({ route: `/blog/category` })
      routes.push(...blogCatebories)
      console.info('Added categories routes.')
    }
  })
}
