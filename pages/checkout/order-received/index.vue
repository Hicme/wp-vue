<template>
  <div>
    <h1>Order received</h1>
    <p>Order Id: {{ orderId }}</p>
    <p>Date: {{ date }}</p>
    <p>Total: <span v-html="total"></span></p>
    <p>Payment method: {{ paymentMethod }}</p>
    <p>Shipping method: {{ shippingMethod }}</p>
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.productId">
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
  async asyncData({ route, params, store, error }) {
    try {
      const order = await store.dispatch('cart/getOrder', {
        orderId: route.query.order,
        orderKey: route.query.key
      })

      if (!order) {
        error({ statusCode: 404, message: 'Your order not found' })
      }

      return order
    } catch (e) {
      error({ statusCode: 404, message: 'Your order not found' })
    }
  }
}
</script>
