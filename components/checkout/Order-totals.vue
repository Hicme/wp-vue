<template>
  <div class="orderSummary">
    <div
      class="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold"
    >
      Order summary
    </div>
    <div class="p-4">
      <p class="font-italic mb-4">
        Shipping and additional costs are calculated based on values you have
        entered.
      </p>
      <ul class="list-unstyled mb-4">
        <li class="d-flex justify-content-between py-3 border-bottom">
          <strong class="text-muted">Subtotal </strong>
          <strong v-html="totals.subtotal" />
        </li>
        <li class="d-flex justify-content-between py-3 border-bottom">
          <strong class="text-muted">Shipping and handling</strong>
          <strong v-html="totals.shipping" />
        </li>
        <li class="d-flex justify-content-between py-3 border-bottom">
          <strong class="text-muted">Tax</strong>
          <strong v-html="totals.tax" />
        </li>
        <li
          v-for="coupon in totals.coupons"
          :key="coupon.code"
          class="d-flex justify-content-between py-3 border-bottom"
        >
          <strong class="text-muted">
            Coupon: <small>{{ coupon.code }}</small>
            <button
              type="button"
              class="btn-danger btn btn-sm"
              @click="removeCoupon(coupon)"
            >
              <span aria-hidden="true">×</span>
            </button>
          </strong>
          <strong v-html="coupon.amount" />
        </li>
        <li class="d-flex justify-content-between py-3 border-bottom">
          <strong class="text-muted">Total</strong>
          <h5 class="font-weight-bold" v-html="totals.total" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    totals() {
      return this.$store.getters['cart/cart']
    }
  },
  methods: {
    async removeCoupon(coupon) {
      await this.$store.dispatch('cart/removeCoupon', coupon.code)
    }
  }
}
</script>
