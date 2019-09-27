<template>
  <section>
    <article>
      <header>
        <h1 v-html="page.title.rendered" />
      </header>
      <div v-html="page.content.rendered" />
    </article>
  </section>
</template>

<script>
export default {
  computed: {
    page() {
      return this.$store.getters['page/page']
    }
  },
  async asyncData({ app, store, route, error, payload }) {
    if (payload) {
      return payload
    }

    try {
      const page = await store.dispatch(
        'page/fetchById',
        app.$wp.settings('front_page')
      )

      if (!page) {
        error({ statusCode: 404, message: 'Post not found' })
      }

      store.commit('app/sidebar', page.show_sidebar)

      return page
    } catch (e) {
      error({ statusCode: 404, message: 'Post not found' })
    }
  },
  head() {
    return {
      title: this.page.title.rendered + ' | ' + this.$wp.settings('title')
    }
  }
}
</script>
