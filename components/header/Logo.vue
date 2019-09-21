<template>
  <div class="col-md-2 col-sm-3 header-logo">
    <nuxt-link class="header-logo__link" to="/">
      <img v-if="logo" :src="logo" :alt="title" />
      <span v-else>
        {{ title }}
      </span>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  computed: {
    logo() {
      return this.$wp.settings('logo')
    },
    title() {
      return this.$wp.settings('title')
    }
  }
}
</script>
