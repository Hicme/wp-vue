<template>
  <div class="px-4 px-lg-0 cart-bg">
    <div class="container text-white py-5 text-center">
      <h1 class="display-4">Shopping Cart</h1>
    </div>
    <div class="pb-5">
      <div class="container">
        <no-ssr>
          <app-cart />
          <app-checkout />
        </no-ssr>
      </div>
    </div>
  </div>
</template>

<script>
import AppCart from '@/components/cart/Cart'
import AppCheckout from '@/components/checkout/Checkout'

export default {
  components: {
    AppCart,
    AppCheckout
  },
  head() {
    return {
      title: 'Cart | ' + this.$wp.settings('title')
    }
  }
}
</script>
