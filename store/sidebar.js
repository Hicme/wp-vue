export const state = () => ({
  widgets: false
})

export const getters = {
  widgets: state => state.sidebar
}

export const mutations = {
  widgets(state, data) {
    state.sidebar = data
  }
}

export const actions = {
  async fetch({ commit }) {
    const { status, response } = await this.$wp.rest(
      this.$wp.settings('leftSidebar')
    )

    if (status) {
      commit('widgets', response)
    }
  }
}
