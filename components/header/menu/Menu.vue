<template>
  <nav class="col-md-6 col-sm-4">
    <div class="row">
      <div class="col-12">
        <search />
      </div>
      <div class="col-12 navbar">
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
            <sub-menu
              v-if="link.submenu"
              :childrens="link.children"
              :depth="1"
            />
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import SubMenu from '@/components/header/menu/SubMenu'
import Search from '@/components/header/Search'

export default {
  components: {
    SubMenu,
    Search
  },
  computed: {
    menu() {
      return this.$store.getters['menu/menu']
    }
  }
}
</script>
