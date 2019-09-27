<template>
  <no-ssr>
    <transition name="fade">
      <div v-if="isLoader" class="preLoader">
        <div class="preLoader-inner">
          <img src="@/assets/images/preloader.svg" alt="preloader" />
        </div>
      </div>
    </transition>
  </no-ssr>
</template>

<script>
export default {
  computed: {
    isLoader() {
      return this.$store.getters['app/getLoader']
    }
  }
}
</script>
