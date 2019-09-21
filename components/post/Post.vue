<template>
  <article class="col-sm-6 col-lg-4 loop-post">
    <div class="loop-post__inner">
      <div v-if="post.images_url.thumbnail" class="loop-post__image">
        <nuxt-link :to="'/blog/' + post.slug">
          <img
            :src="post.images_url.thumbnail"
            class="card-img-top"
            :alt="post.title.rendered"
          />
        </nuxt-link>
      </div>
      <div class="loop-post__body">
        <h5 class="loop-post__title">
          <nuxt-link :to="'/blog/' + post.slug">
            {{ post.title.rendered }}
          </nuxt-link>
        </h5>
        <categories :post="post" />
        <div class="loop-post__text" v-html="post.excerpt.rendered" />
      </div>
    </div>
  </article>
</template>

<script>
import Categories from '@/components/post/Categories'

export default {
  components: {
    Categories
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>
