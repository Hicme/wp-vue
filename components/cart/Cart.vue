<template>
  <section class="cart-section">
    <cart-empty v-if="isEmpty" />
    <cart-products v-else />
  </section>
</template>

<script>
import CartEmpty from '@/components/cart/CartEmpty'
import CartProducts from '@/components/cart/CartProducts'

export default {
  components: {
    CartEmpty,
    CartProducts
  },
  computed: {
    isEmpty() {
      return !this.$store.getters['cart/cart'].products
    }
  }
}
</script>
