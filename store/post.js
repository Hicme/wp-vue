export const actions = {
  async fetchPaged({ commit }, filters) {
    const { status, response, headers } = await this.$wp.rest(
      this.$wp.settings('posts'),
      { ...filters }
    )

    if (status) {
      return {
        pageNumber: parseInt(filters.page),
        objects: response,
        totalPosts: parseInt(headers['x-wp-total'], 10),
        totalPages: parseInt(headers['x-wp-totalpages'], 10)
      }
    }

    return false
  },
  async fetchBySlug({ obj }, slug) {
    const response = await this.$wp.rest(this.$wp.settings('posts'), { slug })

    if (response.status) {
      return response.response.length !== 0 ? response.response[0] : false
    }

    return false
  }
}
