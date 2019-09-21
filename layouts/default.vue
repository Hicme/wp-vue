<template>
  <div class="document-wrapper" :class="{ 'with-sidebar': isSidebar }">
    <app-loader />
    <app-header />
    <main class="main-wrapper">
      <nuxt />
    </main>
    <app-sidebar v-if="isSidebar" />
    <app-footer />
  </div>
</template>

<script>
import AppLoader from '~/components/Loader'
import AppHeader from '~/components/header/Header'
import AppSidebar from '~/components/sidebar/Sidebar'
import AppFooter from '~/components/footer/Footer'

export default {
  components: {
    AppLoader,
    AppHeader,
    AppSidebar,
    AppFooter
  },
  computed: {
    isSidebar() {
      return this.$store.getters['app/sidebar']
    }
  }
}
</script>
