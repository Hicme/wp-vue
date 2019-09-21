<template>
  <div class="checkout-fields">
    <div class="checkout-fields__billing">
      <div
        class="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold"
      >
        Billing details
      </div>
      <div class="p-4">
        <div class="row border-bottom">
          <!-- eslint-disable -->
          <component
            v-for="(billing, bKey) in fields.billing"
            :is="'app-' + billing.field_type"
            :key="bKey"
            :field="billing"
          />
          <!-- eslint-enable -->
        </div>
      </div>
    </div>
    <div class="checkout-fields__shipping">
      <div
        class="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold"
      >
        Shipping details
      </div>
      <div class="p-4">
        <div class="row">
          <div class="col">
            <label for="isShipping">
              <input id="isShipping" v-model="model" type="checkbox" />
              Ship to different address?
            </label>
          </div>
        </div>
        <div v-if="model" class="row border-bottom">
          <!-- eslint-disable -->
          <component
            v-for="(shipping, sKey) in fields.shipping"
            :is="'app-' + shipping.field_type"
            :key="sKey"
            :field="shipping"
          />
          <!-- eslint-enable -->
        </div>
      </div>
    </div>
    <div class="checkout-fields__order">
      <div
        class="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold"
      >
        Order details
      </div>
      <div class="p-4">
        <div class="row border-bottom">
          <!-- eslint-disable -->
          <component
            v-for="(order, oKey) in fields.order"
            :is="'app-' + order.field_type"
            :key="oKey"
            :field="order"
          />
          <!-- eslint-enable -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppInput from '@/components/checkout/fields/Input'
import AppSelect from '@/components/checkout/fields/Select'
import AppState from '@/components/checkout/fields/State'
import AppTextarea from '@/components/checkout/fields/Textarea'

export default {
  components: {
    AppInput,
    AppSelect,
    AppState,
    AppTextarea
  },
  computed: {
    fields() {
      return this.$store.getters['cart/fields']
    },
    model: {
      get() {
        return this.$store.getters['cart/user'].ship_to_different_address
      },
      set(value) {
        this.$store.commit('cart/userField', {
          field: 'ship_to_different_address',
          value
        })
      }
    }
  },
  mounted() {
    this.$store.dispatch('cart/fetchFields')
  }
}
</script>
