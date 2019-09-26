export default {
  mode: 'universal',
  wpUrl: process.env.npm_package_url || '',
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  loading: { color: '#fff' },
  css: [
    '@/node_modules/bootstrap/dist/css/bootstrap.min.css',
    '@/assets/css/main.scss'
  ],
  plugins: [
    '@/plugins/vuelidate',
    '@/plugins/lodash',
    { src: '@/plugins/init', ssr: false },
    { src: '@/plugins/cart', ssr: false }
  ],
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/eslint-module',
    '@nuxtjs/axios',
    'nuxt-purgecss',
    '@/modules/wordpress-api'
  ],
  axios: {},
  purgeCSS: {
    mode: 'webpack',
    enabled: ({ isDev, isClient }) => !isDev && isClient, // or `false` when in dev/debug mode
    paths: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js'
    ],
    styleExtensions: ['.css'],
    whitelist: ['body', 'html', 'nuxt-progress'],
    extractors: [
      {
        extractor: class {
          static extract(content) {
            return content.match(/[A-z0-9-:\\/]+/g)
          }
        },
        extensions: ['html', 'vue', 'js']
      }
    ]
  },
  generate: {
    interval: 350,
    dir: '../front'
  },
  build: {
    extend(config, ctx) {}
  }
}
