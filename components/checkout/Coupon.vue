<template>
  <div class="fromCoupon">
    <div
      class="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold"
    >
      Coupon code
    </div>
    <div class="p-4">
      <p class="font-italic mb-4">
        If you have a coupon code, please enter it in the box below
      </p>
      <div class="input-group mb-4 border rounded-pill p-2">
        <input
          v-model="coupunCode"
          type="text"
          placeholder="Apply coupon"
          aria-describedby="button-addon3"
          class="form-control border-0"
          :class="{ 'is-invalid': empty || error }"
          @keydown="removeErrors"
        />
        <div class="input-group-append border-0">
          <button
            id="button-addon3"
            type="button"
            class="btn btn-dark px-4 rounded-pill"
            @click="applyCoupon"
          >
            <i class="fa fa-gift mr-2"></i>
            Apply coupon
          </button>
        </div>
      </div>
      <div v-if="empty" class="alert alert-danger">
        Coupon code can't be empty
      </div>
      <div v-if="error" class="alert alert-danger">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      coupunCode: '',
      empty: false,
      error: false,
      errorMessage: ''
    }
  },
  methods: {
    async applyCoupon() {
      this.error = false
      this.errorMessage = ''

      if (this.coupunCode !== '') {
        this.empty = false

        const response = await this.$store.dispatch(
          'cart/addCoupon',
          this.coupunCode
        )

        if (!response.status) {
          this.error = true
          this.errorMessage = response.data.message
        } else {
          this.removeErrors()
        }
      } else {
        this.empty = true
      }
    },
    removeErrors() {
      this.empty = false
      this.error = false
      this.errorMessage = ''
    }
  }
}
</script>
