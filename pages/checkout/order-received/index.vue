<template>
  <div>
    <view-order v-if="order" />
    <not-found v-else />
  </div>
</template>

<script>
import ViewOrder from '@/components/checkout/order/ViewOrder'
import NotFound from '@/components/checkout/order/NotFound'

export default {
  components: {
    NotFound,
    ViewOrder
  },
  computed: {
    order() {
      return this.$store.getters['order/order']
    }
  },
  created() {
    this.$store.dispatch('order/fetch', {
      orderId: this.$route.query.order,
      orderKey: this.$route.query.key
    })
  }
}
</script>
