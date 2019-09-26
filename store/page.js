export const actions = {
  async fetchBySlug({ commit }, slug) {
    const { status, response } = await this.$wp.rest(
      this.$wp.settings('pages'),
      { slug }
    )

    if (status) {
      const page = response.length !== 0 ? response[0] : false
      return page
    }

    return false
  },
  async fetchById({ commit }, id) {
    const { status, response } = await this.$wp.rest(
      this.$wp.settings('pages') + `/${id}`
    )

    if (status) {
      return response
    }

    return false
  },
  async fetchPreview({ commit }, id) {
    const { status, response } = await this.$wp.ajax({
      action: 'loadPreview',
      id
    })

    if (status) {
      return response.data
    }

    return false
  }
}
