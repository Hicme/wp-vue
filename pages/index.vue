<template>
  <section>
    <article>
      <header>
        <h1 v-html="title.rendered" />
      </header>
      <div v-html="content.rendered" />
    </article>
  </section>
</template>

<script>
export default {
  async asyncData({ app, store, route, error, payload }) {
    if (payload) {
      return payload
    }

    if (route.query.preview) {
      try {
        const page = await store.dispatch(
          'page/fetchPreview',
          route.query.page_id
        )

        if (!page) {
          error({ statusCode: 404, message: 'Post not found' })
        }

        store.commit('app/sidebar', page.show_sidebar)

        return page
      } catch (e) {
        error({ statusCode: 404, message: 'Post not found' })
      }
    } else {
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
    }
  },
  head() {
    return {
      title: this.title.rendered + ' | ' + this.$wp.settings('title')
    }
  }
}
</script>
