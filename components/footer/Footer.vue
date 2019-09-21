<template>
  <footer>
    <div class="container">
      <div class="row">
        <div
          v-for="(sides, index) in widgets"
          :key="index"
          :class="'widgets-' + index"
          class="col-md-6 col-sm-12"
        >
          <div
            v-for="widget in sides"
            :id="widget.id"
            :key="widget.id"
            :class="widget.classname"
            v-html="widget.widget_output"
          />
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  computed: {
    widgets() {
      return this.$store.getters['footer/widgets']
    }
  }
}
</script>
