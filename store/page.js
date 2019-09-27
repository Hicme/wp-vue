export const state = () => ({
  page: false
})

export const getters = {
  page: state => state.page
}

export const mutations = {
  page(state, data) {
    state.page = data
  }
}

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
      commit('page', response)
      return response
    }

    return false
  },
  async fetchPreview({ commit }, id) {
    this.commit('app/changeLoader', true)
    const { status, response } = await this.$wp.ajax({
      action: 'loadPreview',
      id
    })

    this.commit('app/changeLoader', false)

    if (status) {
      commit('page', response.data)
      return response.data
    }

    return false
  }
}
