<template>
  <div class="col-sm-12 mb-2 mt-2" :class="field.class">
    <label :for="'field_' + field.name">{{ field.label }}</label>
    <textarea
      :id="'field_' + field.name"
      v-model.lazy="model"
      class="form-control"
      :class="{ 'is-invalid': field.validation }"
    />
    <div v-if="field.validation" class="invalid-feedback">
      {{ field.validation }}
    </div>
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
