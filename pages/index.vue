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
  async asyncData({ app, store, error, payload }) {
    if (payload) {
      return payload
    }

    try {
      const page = await store.dispatch(
        'page/fetchById',
        app.$wp.settings('front_page')
      )
      store.commit('app/sidebar', page.show_sidebar)

      return page
    } catch (e) {
      error({ statusCode: 404, message: 'Post not found' })
    }
  },
  head() {
    return {
      title: this.title.rendered + ' | ' + this.$wp.settings('title')
    }
  }
}
</script>
