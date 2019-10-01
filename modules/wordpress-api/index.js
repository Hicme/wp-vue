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
    if (params.type === 'post') {
      console.info('Start load posts archive routes.')

      const posts = await loadObjects(
        options.url + options.posts,
        {},
        'blog/',
        true,
        options.posts_per_page,
        false
      )

      routes.push(...posts)
      routes.push({
        route: `/blog/page`
      })

      console.info('Loaded posts archive routes.')
    }

    if (params.type === 'product') {
      console.info('Start load products archive routes.')

      const posts = await loadObjects(
        options.url + options.products,
        {},
        'shop/',
        true,
        options.posts_per_page,
        false
      )

      routes.push(...posts)
      routes.push({ route: `/shop/page` })

      console.info('Loaded products archive routes.')
    }

    if (params.type === 'all') {
      console.info('Start load post routes.')
      const posts = await loadObjects(
        options.url + options.posts,
        {},
        'blog/',
        true,
        options.posts_per_page
      )

      routes.push(...posts)
      routes.push({ route: `/blog/page` })
      console.info('Loaded posts routes.')

      const pages = await loadObjects(
        options.url + options.pages,
        {},
        '',
        false
      )
      routes.push(...pages)
      console.info('Added pages routes.')

      const products = await loadObjects(
        options.url + options.products,
        {},
        'shop/',
        true
      )
      routes.push(...products)
      routes.push({ route: `/shop/page` })
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
