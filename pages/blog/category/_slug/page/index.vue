<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    this.$router.push(`/category/${this.$route.params.slug}/`)
  }
}
</script>
