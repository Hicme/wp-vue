<template>
  <section class="shop">
    <header>
      <h1>{{ title.rendered }}</h1>
    </header>
    <div class="breadcrumbs">
      <breadcrumbs />
    </div>
    <div class="products-list">
      <div class="row">
        <product
          v-for="product in objects"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
    <div class="pagination">
      <pagination
        :total-pages="totalPages"
        :page-number="pageNumber"
        :base="'/shop/'"
      />
    </div>
  </section>
</template>

<script>
import Breadcrumbs from '@/components/header/Breadcrumbs'
import Product from '@/components/product/Product'
import Pagination from '@/components/Pagination'

export default {
  name: 'Shop',
  components: {
    Breadcrumbs,
    Product,
    Pagination
  },
  data() {
    return {
      title: {
        rendered: 'Shop'
      }
    }
  },
  async asyncData({ app, params, error, store, payload }) {
    if (payload) {
      return { product: payload }
    }

    try {
      store.commit('app/sidebar', app.$wp.settings('show_sidebar_on_archive'))
      return await store.dispatch('product/fetchPaged', 1)
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
