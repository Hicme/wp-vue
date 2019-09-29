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
  }
}
</script>
