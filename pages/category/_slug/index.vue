<template>
  <section class="blog">
    <header>
      <h1 @click="thh">Category - {{ category.name }}</h1>
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
        :base="`/category/${category.slug}/`"
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
  async asyncData({ app, params, error, store }) {
    try {
      store.commit('app/sidebar', app.$wp.settings('show_sidebar_on_archive'))

      const category = await store.dispatch('category/fetchBySlug', params.slug)

      const response = await store.dispatch('post/fetchPaged', {
        categories: category.id,
        page: 1
      })

      return { category, ...response }
    } catch (e) {
      error({ statusCode: 404, message: 'Post not found' })
    }
  },
  methods: {
    thh() {
      console.log(this)
    }
  },
  head() {
    return {
      title: this.category.name + ' | ' + this.$wp.settings('title')
    }
  }
}
</script>
