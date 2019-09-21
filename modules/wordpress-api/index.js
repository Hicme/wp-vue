import { resolve } from 'path'
import { loadObjects, loadCategories } from './ssr.js'
import loadSettings from './loadSettings.js'

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
    // if (
    //   process.argv.includes('--posts') ||
    //   process.argv.includes('--products') ||
    //   process.argv.includes('--categories')
    // ) {
    //   console.info('Cleaned default routes.')
    //   routes = []
    // }

    if (process.argv.includes('--posts') || process.argv.includes('--all')) {
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

    if (process.argv.includes('--pages') || process.argv.includes('--all')) {
      const pages = await loadObjects(
        options.url + options.pages,
        {},
        '',
        false
      )
      routes.push(...pages)
      console.info('Added pages routes.')
    }

    if (process.argv.includes('--products') || process.argv.includes('--all')) {
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

    if (
      process.argv.includes('--categories') ||
      process.argv.includes('--all')
    ) {
      const blogCatebories = await loadCategories(
        options.url + options.categories,
        'category',
        options.url + options.posts,
        options.posts_per_page
      )
      routes.push({ route: `/category` })
      routes.push(...blogCatebories)
      console.info('Added categories routes.')
    }
  })
}
