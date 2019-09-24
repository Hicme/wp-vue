<template>
  <div class="col-sm-6 mb-2 mt-2" :class="field.class">
    <label :for="'field_' + field.name">{{ field.label }}</label>
    <select
      :id="'field_' + field.name"
      v-model.lazy="model"
      class="form-control"
      :class="{ 'is-invalid': validation }"
    >
      <option disabled value="">Select {{ field.label }}</option>
      <option
        v-for="(values, index) in field.values"
        :key="index"
        :value="index"
      >
        {{ values }}
      </option>
    </select>
    <div v-if="validation" class="invalid-feedback" v-html="validation" />
  </div>
</template>

<script>
export default {
  props: {
    field: {
      required: true,
      type: Object
    }
  },
  computed: {
    validation() {
      const errors = this.$store.getters['cart/validation']

      if (
        errors[this.field.section] &&
        errors[this.field.section][this.field.name]
      ) {
        return errors[this.field.section][this.field.name]
      }
      return false
    },
    model: {
      get() {
        return this.$store.getters['cart/user'][this.field.name]
      },
      set(value) {
        this.$store.commit('cart/userField', {
          field: this.field.name,
          value
        })
      }
    }
  }
}
</script>
