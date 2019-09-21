<template>
  <nav class="col-md-6 col-sm-4 navbar">
    <ul class="navbar__nav">
      <li
        v-for="link in menu"
        :key="link.ID"
        class="navbar__nav-item"
        :class="{ 'has-submenu': link.submenu }"
      >
        <nuxt-link
          class="navbar__nav-link"
          no-prefetch
          exact
          active-class="active"
          :to="link.url"
        >
          {{ link.title }}
        </nuxt-link>
        <sub-menu v-if="link.submenu" :childrens="link.children" :depth="1" />
      </li>
    </ul>
  </nav>
</template>

<script>
import SubMenu from '@/components/header/menu/SubMenu'

export default {
  components: {
    SubMenu
  },
  computed: {
    menu() {
      return this.$store.getters['menu/menu']
    }
  }
}
</script>
