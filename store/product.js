export const actions = {
  async fetchPaged({ commit }, page) {
    const { status, response, headers } = await this.$wp.rest(
      this.$wp.settings('products'),
      {
        page
      }
    )

    if (status) {
      return {
        pageNumber: parseInt(page),
        objects: response,
        totalPosts: parseInt(headers['x-wp-total'], 10),
        totalPages: parseInt(headers['x-wp-totalpages'], 10)
      }
    }

    return false
  },
  async fetchBySlug({ commit }, slug) {
    const response = await this.$wp.rest(this.$wp.settings('products'), {
      slug
    })

    if (response.status) {
      return response.response.length !== 0 ? response.response[0] : false
    }

    return false
  }
}
