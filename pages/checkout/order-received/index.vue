<template>
  <div>
    <h1>Order received</h1>
    <p>Order Id: {{ order.orderId }}</p>
    <p>Date: {{ order.date }}</p>
    <p>Total: <span v-html="order.total"></span></p>
    <p>Payment method: {{ order.paymentMethod }}</p>
    <p>Shipping method: {{ order.shippingMethod }}</p>
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in order.products" :key="product.productId">
          <td>
            <a :href="product.productlink">{{ product.title }}</a>
          </td>
          <td>{{ product.quantity }}</td>
          <td>{{ product.total }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  computed: {
    order() {
      return this.$store.getters['order/order']
    }
  },
  asyncData({ error }) {
    error({ statusCode: 404, message: 'Your order not found' })
  },
  async fetch({ route, store, error }) {
    const order = await store.dispatch('order/fetch', {
      orderId: route.query.order,
      orderKey: route.query.key
    })

    if (!order) {
      error({ statusCode: 404, message: 'Your order not found' })
    }
  }
}
</script>
