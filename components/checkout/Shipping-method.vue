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
      <div
        v-if="methods"
        class="shippingMethods"
        :class="{ 'is-invalid': validation }"
      >
        <div v-for="(method, index) in methods" :key="index" class="form-check">
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

      <div v-if="validation" class="invalid-feedback" v-html="validation" />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    validation() {
      return this.$store.getters['cart/validation'].shipping_method
    },
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
