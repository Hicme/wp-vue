<template>
  <div class="header-search">
    <input
      v-model="search"
      type="text"
      placeholder="Search..."
      class="form-control"
    />
    <div v-if="results" class="search-results">
      <div
        v-for="(result, index) in results"
        :key="index"
        class="search-results__line"
      >
        { result.text }
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      results: false
    }
  },
  watch: {
    search() {
      this.debounceSearch()
    }
  },
  created() {
    this.debounceSearch = this._.debounce(this.getSearch, 500)
  },
  methods: {
    async getSearch() {
      const result = await this.$store.dispatch('search/fetch', this.search)

      if (result) {
        this.results = result.data
      } else {
        this.results = false
      }
    }
  }
}
</script>
