<template>
  <article class="single-product">
    <div class="breadcrumbs">
      <breadcrumbs />
    </div>
    <header>
      <h1>{{ product.title.rendered }}</h1>
    </header>
    <div class="container">
      <div class="row">
        <div class="col-4">
          <div v-if="product.product_data.images.length">
            <div v-for="image in product.product_data.images" :key="image.id">
              <img :src="image.src" :alt="image.alt" style="max-width:100%" />
            </div>
          </div>
        </div>
        <div class="col-8">
          <h2>Price: <span v-html="product.product_data.price_html"></span></h2>
          <h3>SKU: {{ product.product_data.sku }}</h3>
          <add-to-cart :product="product" />
        </div>
      </div>
    </div>
    <div class="container text-center" v-html="product.excerpt.rendered" />
  </article>
</template>

<script>
import Breadcrumbs from '@/components/header/Breadcrumbs'
import AddToCart from '@/components/product/AddToCart'

export default {
  components: {
    Breadcrumbs,
    AddToCart
  },
  async asyncData({ app, params, error, store, payload }) {
    if (payload) {
      return { product: payload }
    }

    try {
      const product = await store.dispatch('product/fetchBySlug', params.slug)
      return { product }
    } catch (e) {
      error({ statusCode: 404, message: 'Post not found' })
    }
  },
  head() {
    return {
      title: this.product.title.rendered + ' | ' + this.$wp.settings('title')
    }
  }
}
</script>
