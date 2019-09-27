<template>
  <section>
    <article>
      <header>
        <h1 v-html="title.rendered" />
      </header>
      <div class="breadcrumbs">
        <breadcrumbs />
      </div>
      <div v-html="content.rendered" />
    </article>
  </section>
</template>

<script>
import Breadcrumbs from '@/components/header/Breadcrumbs'

export default {
  components: {
    Breadcrumbs
  },
  async asyncData({ app, store, route, params, error, payload }) {
    if (payload) {
      return payload
    }

    try {
      const page = await store.dispatch('page/fetchBySlug', params.page)
      store.commit('app/sidebar', page.show_sidebar)

      if (!page) {
        error({ statusCode: 404, message: 'Post not found' })
      }

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
