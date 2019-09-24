<template>
  <div class="col-sm-6 mb-2 mt-2" :class="field.class">
    <label :for="'field_' + field.name">{{ field.label }}</label>
    <input
      :id="'field_' + field.name"
      v-model.lazy="model"
      type="text"
      class="form-control"
      :class="{ 'is-invalid': field.validation }"
      :placeholder="field.label"
    />
    <div
      v-if="field.validation"
      class="invalid-feedback"
      v-html="field.validation"
    />
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
