<template>
  <div class="formPayment">
    <div
      class="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold"
    >
      Payment
    </div>
    <div class="p-4">
      <div
        v-if="methods"
        class="payment_methods"
        :class="{ 'is-invalid': validation }"
      >
        <div
          v-for="(method, index) in methods"
          :key="method.id"
          class="form-check"
        >
          <input
            :id="'paymentMethod_' + index"
            v-model="model"
            class="form-check-input"
            type="radio"
            :value="method.id"
          />
          <label class="form-check-label" :for="'paymentMethod_' + index">
            <p>{{ method.title }}</p>
            <small>{{ method.description }}</small>
          </label>
        </div>
      </div>
      <div v-else class="no_payment_methods alert alert-info">
        Sorry, no payment methods was found.
      </div>
      <div v-if="validation" class="invalid-feedback" v-html="validation" />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    validation() {
      const errors = this.$store.getters['cart/validation']

      if (errors.payment_method) {
        return errors.payment_method
      }
      return false
    },
    model: {
      get() {
        return this.$store.getters['cart/user'].payment_method
      },
      set(value) {
        this.$store.commit('cart/userField', {
          field: 'payment_method',
          value
        })
      }
    },
    methods() {
      return this.$store.getters['cart/payment']
    }
  }
}
</script>
