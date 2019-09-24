<template>
  <div class="formShipping">
    <div
      class="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold"
    >
      Shipping
    </div>
    <div class="p-4">
      <p class="font-italic mb-4">
        Shipping methods based on values you have entered.
      </p>
      <div v-if="methods.methods" class="shippingMethods">
        <div
          v-for="(method, index) in methods.methods"
          :key="index"
          class="form-check"
        >
          <input
            :id="'shippingMethod_' + index"
            v-model="selected"
            type="radio"
            :value="method.id"
            class="shipping_method form-check-input"
          />
          <label :for="'shippingMethod_' + index" class="form-check-label">
            {{ method.name }} (<span v-html="method.price" />)
          </label>
        </div>
      </div>
      <div v-else class="no_shipping alert alert-info">
        Sorry, no shippng methods for you.
      </div>

      <div v-if="!false" class="invalid-feedback">
        Please, select shipping method.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    selected: {
      get() {
        return this.$store.getters['cart/user'].shipping_method
      },
      set(value) {
        this.$store.commit('cart/userField', {
          field: 'shipping_method',
          value
        })
      }
    },
    methods() {
      return this.$store.getters['cart/shipping']
    }
  }
}
</script>
