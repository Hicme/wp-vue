<template>
  <div class="navbar__nav_sub" :class="'submenu_' + depth">
    <ul class="navbar__nav">
      <li v-for="link in childrens" :key="link.ID" :class="link.classes">
        <nuxt-link
          class="nav-link"
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
          :depth="depth + 1"
        />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SubMenu',
  props: {
    childrens: {
      type: Array,
      required: true
    },
    depth: {
      type: Number,
      default: 1
    }
  }
}
</script>
