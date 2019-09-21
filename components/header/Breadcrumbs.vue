<template>
  <nav v-if="breadcrumbsLinks" class="breadcrumbs">
    <ol class="breadcrumb">
      <li
        v-for="(item, index) in breadcrumbsLinks"
        :key="index"
        class="breadcrumb-item"
        :class="{ active: !item.clickable }"
      >
        <n-link v-if="item.clickable" :to="item.url">
          {{ item.name }}
        </n-link>
        <span v-else>
          {{ item.name }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: 'Breadcrumbs',
  computed: {
    breadcrumbsLinks() {
      const base = []

      base.push({
        name: 'Home',
        url: '/',
        clickable: true
      })

      switch (this.$route.name) {
        case 'page':
          base.push({
            name: this.$parent.title.rendered,
            url: this.$route.path,
            clickable: false
          })
          break

        case 'shop':
          base.push({
            name: this.$parent.title.rendered,
            url: this.$route.path,
            clickable: false
          })
          break

        case 'shop-page-id':
          base.push({
            name: this.$parent.title.rendered,
            url: this.$route.path,
            clickable: false
          })
          break

        case 'shop-slug':
          base.push({
            name: 'Shop',
            url: '/shop/',
            clickable: true
          })

          base.push({
            name: this.$parent.product.title.rendered,
            url: this.$route.path,
            clickable: false
          })
          break

        case 'blog':
          base.push({
            name: this.$parent.title.rendered,
            url: this.$route.path,
            clickable: false
          })
          break

        case 'blog-page-id':
          base.push({
            name: this.$parent.title.rendered,
            url: this.$route.path,
            clickable: false
          })
          break

        case 'blog-slug':
          base.push({
            name: 'Blog',
            url: '/blog/',
            clickable: true
          })

          base.push({
            name: this.$parent.post.title.rendered,
            url: this.$route.path,
            clickable: false
          })
          break

        case 'category-slug':
          base.push({
            name: 'Blog',
            url: '/blog/',
            clickable: true
          })

          base.push({
            name: this.$parent.category.name,
            url: this.$route.path,
            clickable: false
          })
          break

        default:
          return false
      }

      return base
    }
  }
}
</script>
