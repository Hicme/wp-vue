export const state = () => ({
  widgets: false
})

export const getters = {
  widgets: state => state.widgets
}

export const mutations = {
  widgets(state, data) {
    state.widgets = data
  }
}

export const actions = {
  async fetch({ commit }) {
    const { status, response } = await this.$wp.rest(
      this.$wp.settings('footerSidebar')
    )

    if (status) {
      commit('widgets', response)
    }
  }
}
