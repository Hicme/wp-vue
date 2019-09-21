<template>
  <article class="single-post">
    <div class="breadcrumbs">
      <breadcrumbs />
    </div>
    <header>
      <h1 @click="thh">{{ post.title.rendered }}</h1>
    </header>
    <div class="container">
      <div class="row">
        <div class="col-4">
          <div v-if="post.images_url.large">
            <img
              :src="post.images_url.large"
              class="card-img-top"
              :alt="post.title.rendered"
            />
          </div>
        </div>
        <div class="col-8">
          <categories :post="post" />
          <div v-html="post.excerpt.rendered" />
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import Breadcrumbs from '@/components/header/Breadcrumbs'
import Categories from '@/components/post/Categories'

export default {
  components: {
    Breadcrumbs,
    Categories
  },
  async asyncData({ app, params, error, store, payload }) {
    if (payload) {
      return { post: payload }
    }

    try {
      const post = await store.dispatch('post/fetchBySlug', params.slug)
      return { post }
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
      title: this.post.title.rendered + ' | ' + this.$wp.settings('title')
    }
  }
}
</script>
