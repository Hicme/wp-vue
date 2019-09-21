<template>
  <nav>
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: isInFirstPage }">
        <a
          class="page-link"
          aria-label="Go to first page"
          :href="`${base}page/1/`"
          @click.prevent="onClickFirstPage"
        >
          First
        </a>
      </li>
      <li class="page-item" :class="{ disabled: isInFirstPage }">
        <a
          class="page-link"
          aria-label="Go to previous page"
          :href="`${base}page/${pageNumber - 1}/`"
          @click.prevent="onClickPreviousPage"
        >
          Previous
        </a>
      </li>
      <li
        v-for="(page, index) in pages"
        :key="index"
        class="page-item"
        :class="{ active: isPageActive(page.name) }"
      >
        <a
          class="page-link"
          :aria-label="`Go to page number ${page.name}`"
          :href="`${base}page/${page.name}/`"
          :disabled="page.isDisabled"
          @click.prevent="onClickPage(page.name)"
        >
          {{ page.name }}
        </a>
      </li>
      <li class="page-item" :class="{ disabled: isInLastPage }">
        <a
          class="page-link"
          aria-label="Go to next page"
          :href="`${base}page/${pageNumber + 1}/`"
          @click.prevent="onClickNextPage"
        >
          Next
        </a>
      </li>
      <li class="page-item" :class="{ disabled: isInLastPage }">
        <a
          class="page-link"
          aria-label="Go to last page"
          :href="`${base}page/${totalPages}/`"
          @click.prevent="onClickLastPage"
        >
          Last
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    maxVisibleButtons: {
      type: Number,
      default: 3
    },
    totalPages: {
      type: Number,
      required: true
    },
    pageNumber: {
      type: Number,
      required: true
    },
    base: {
      type: String,
      required: true
    }
  },
  computed: {
    startPage() {
      if (this.pageNumber === 1) {
        return 1
      }

      if (this.pageNumber === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons + 1
      }
      return this.pageNumber - 1
    },
    endPage() {
      return Math.min(
        this.startPage + this.maxVisibleButtons - 1,
        this.totalPages
      )
    },
    pages() {
      const range = []

      for (let i = this.startPage; i <= this.endPage; i++) {
        if (i !== 0) {
          range.push({
            name: i,
            isDisabled: i === this.pageNumber
          })
        }
      }
      return range
    },
    isInFirstPage() {
      return this.pageNumber === 1
    },
    isInLastPage() {
      return this.pageNumber === this.totalPages
    }
  },
  methods: {
    onClickFirstPage() {
      this.$emit('pagechanged', 1)
      this.$router.push(`${this.base}page/1/`)
    },
    onClickPreviousPage() {
      this.$emit('pagechanged', this.pageNumber - 1)
      this.$router.push(`${this.base}page/${this.pageNumber - 1}/`)
    },
    onClickPage(page) {
      this.$emit('pagechanged', page)
      this.$router.push(`${this.base}page/${page}/`)
    },
    onClickNextPage() {
      this.$emit('pagechanged', this.pageNumber + 1)
      this.$router.push(`${this.base}page/${this.pageNumber + 1}/`)
    },
    onClickLastPage() {
      this.$emit('pagechanged', this.totalPages)
      this.$router.push(`${this.base}page/${this.totalPages}/`)
    },
    isPageActive(page) {
      return this.pageNumber === page
    }
  }
}
</script>

<style lang="scss" scoped></style>
