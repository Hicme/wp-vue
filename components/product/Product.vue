<template>
  <article class="col-sm-6 col-lg-4 loop-product">
    <div class="loop-product__inner">
      <div class="loop-product__image">
        <nuxt-link :to="'/shop/' + product.slug">
          <span v-if="onSale && salePercentage !== 0" class="archive-sale">
            sale: <span class="sale-amount">{{ salePercentage }}%</span>
          </span>
          <img
            :src="product.product_data.images[0].src"
            class="card-img-top"
            :alt="product.title.rendered"
          />
        </nuxt-link>
      </div>
      <div class="loop-product__body">
        <h5 class="loop-product__title">
          <nuxt-link :to="'/shop/' + product.slug">
            {{ product.title.rendered }}
          </nuxt-link>
        </h5>
        <p>Price: <span v-html="product.product_data.price_html" /></p>
        <add-to-cart :product="product" />
      </div>
    </div>
  </article>
</template>

<script>
import AddToCart from '~/components/product/AddToCart'

export default {
  components: {
    AddToCart
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    onSale() {
      return this.product.product_data.on_sale
    },
    salePercentage() {
      const sale = this.onSale
        ? 100 -
          (parseFloat(this.product.product_data.sale_price) * 100) /
            parseFloat(this.product.product_data.regular_price)
        : 0
      return sale
    }
  }
}
</script>
