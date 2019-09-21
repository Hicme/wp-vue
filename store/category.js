export const actions = {
  async fetchBySlug({ commit }, slug) {
    const response = await this.$wp.rest(this.$wp.settings('categories'), {
      slug
    })

    if (response.status) {
      return response.response.length !== 0 ? response.response[0] : false
    }

    return false
  }
}
