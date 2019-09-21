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
  methods: {
    async checkoutFrom() {
      await this.$store.dispatch('cart/processCheckout')
      alert('Form submitted')
    }
  }
}
</script>
