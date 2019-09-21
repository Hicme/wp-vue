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
          :class="{ 'is-invalid': $v.coupunCode.$error || cError }"
          @change="$v.coupunCode.$touch()"
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
      <div v-if="$v.coupunCode.$error" class="alert alert-danger">
        Coupon code can't be empty
      </div>
      <div v-if="cError && !$v.coupunCode.$error" class="alert alert-danger">
        {{ badCoupon.message }}
      </div>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      coupunCode: '',
      badCoupon: '',
      cError: false
    }
  },
  methods: {
    async applyCoupon() {
      this.$v.coupunCode.$touch()
      this.badCoupon = ''
      this.cError = false
      if (!this.$v.$invalid) {
        const couponCheck = await this.$store.dispatch(
          'cart/addCoupon',
          this.coupunCode
        )
        if (couponCheck.status === 405) {
          this.badCoupon = couponCheck.response.data
          this.cError = true
        }
      }
    },
    removeErrors() {
      this.badCoupon = ''
      this.cError = false
    }
  },
  validations: {
    coupunCode: {
      required
    }
  }
}
</script>
