<template>
  <div class="header-search">
    <input
      v-model="search"
      type="text"
      placeholder="Search..."
      class="form-control"
      @focus="active = true"
      @blur="active = false"
    />
    <div v-if="results && show" class="search-results">
      <div
        v-for="result in results"
        :key="result.ID"
        class="search-results__line"
      >
        <div v-if="result.link" class="search-results__line_title">
          <nuxt-link no-prefetch exact active-class="active" :to="result.link">
            <div v-html="result.title" />
          </nuxt-link>
        </div>
        <div v-else class="search-results__line_title" v-html="result.title" />
        <div class="search-results__line_desc">
          <div
            v-for="(desc, index) in result.description"
            :key="index"
            v-html="desc"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      active: false,
      show: false,
      results: false
    }
  },
  watch: {
    search() {
      this.debounceSearch()
    },
    active() {
      this._.delay(this.toggleSHow, 1000)
    }
  },
  created() {
    this.debounceSearch = this._.debounce(this.getSearch, 500)
  },
  methods: {
    toggleSHow() {
      this.show = !this.show
    },
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
