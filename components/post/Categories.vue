<template>
  <ul v-if="post.extended_categories" class="list-inline">
    <li
      v-for="(category, index) in post.extended_categories"
      :key="category.term_id"
      class="list-inline-item"
    >
      <n-link :to="category.link">
        {{ category.name }}
      </n-link>
      <span v-if="index + 1 < post.extended_categories.length">, </span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>
