<template>
  <div>
    <transition name="fade">
      <form
        novalidate
        class="row py-5 p-4 bg-white rounded shadow-sm"
        @submit.prevent="checkoutFrom"
      >
        <div class="col-lg-6">
          <coupon />
          <fields />
        </div>
        <div class="col-lg-6">
          <shipping-method />
          <payment-method />
          <order-totals />
          <div v-if="errors">
            {{ errors }}
          </div>
          <div class="p-4">
            <button
              type="submit"
              class="btn btn-dark rounded-pill py-2 btn-block"
            >
              Place Order
            </button>
          </div>
        </div>
      </form>
    </transition>
  </div>
</template>

<script>
import Coupon from '@/components/checkout/Coupon'
import Fields from '@/components/checkout/Fields'
import ShippingMethod from '@/components/checkout/Shipping-method'
import PaymentMethod from '@/components/checkout/Payment-method'
import OrderTotals from '@/components/checkout/Order-totals'

export default {
  name: 'CheckoutCompponent',
  components: {
    Coupon,
    Fields,
    ShippingMethod,
    PaymentMethod,
    OrderTotals
  },
  computed: {
    errors() {
      return this.$store.getters['cart/orderMessages']
    }
  },
  beforeDestroy() {
    this.$store.commit('cartFields', false)
    this.$store.commit('shipping', false)
    this.$store.commit('payment', false)
    this.$store.commit('validation', false)
    this.$store.commit('userFields', false)
    this.$store.commit('orderMessages', false)
  },
  methods: {
    async checkoutFrom(e) {
      e.preventDefault()
      const result = await this.$store.dispatch('cart/processOrder')

      if (result) {
        this.$router.push(
          `/checkout/order-received/${result.order_id}?key=${result.order_key}`
        )
      }
    }
  }
}
</script>
