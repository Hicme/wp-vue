<template>
  <section class="blog">
    <header>
      <h1>{{ title.rendered }}</h1>
    </header>
    <div class="breadcrumbs">
      <breadcrumbs />
    </div>
    <div class="posts-list">
      <div class="row">
        <post v-for="post in objects" :key="post.id" :post="post" />
      </div>
    </div>
    <div v-if="totalPages > pageNumber" class="pagination">
      <pagination
        :total-pages="totalPages"
        :page-number="pageNumber"
        :base="'/blog/'"
      />
    </div>
  </section>
</template>

<script>
import Breadcrumbs from '@/components/header/Breadcrumbs'
import Post from '~/components/post/Post'
import Pagination from '~/components/Pagination'

export default {
  components: {
    Breadcrumbs,
    Post,
    Pagination
  },
  data() {
    return {
      title: {
        rendered: 'Blog'
      }
    }
  },
  async asyncData({ app, params, error, store }) {
    try {
      store.commit('app/sidebar', app.$wp.settings('show_sidebar_on_archive'))
      return await store.dispatch('post/fetchPaged', 1)
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
