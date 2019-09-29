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
    store.dispatch('order/fetch', {
      orderId: route.query.order,
      orderKey: route.query.key
    })
  }
}
</script>
