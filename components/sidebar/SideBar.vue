<template>
  <aside>
    <div class="widgets-wrapper">
      <div
        v-for="widget in widgets"
        :id="widget.id"
        :key="widget.id"
        :class="widget.classname"
        v-html="widget.widget_output"
      />
    </div>
  </aside>
</template>

<script>
export default {
  computed: {
    widgets() {
      return this.$store.getters['sidebar/widgets']
    }
  }
}
</script>
