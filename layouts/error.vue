<template>
  <section
    class="section section--error justify-content-center align-items-center d-flex"
  >
    <div class="container text-center">
      <h1>404</h1>
      <nuxt-link to="/">Home</nuxt-link>
    </div>
  </section>
</template>

<script>
export default {
  name: 'NuxtError',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="css" scoped>
h1 {
  color: red;
}
</style>
