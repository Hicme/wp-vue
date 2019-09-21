export const state = () => ({
  menu: false
})

export const getters = {
  menu: state => state.menu
}

export const mutations = {
  menu(state, menu) {
    state.menu = menu
  }
}

export const actions = {
  async fetch({ commit }) {
    const { status, response } = await this.$wp.rest(this.$wp.settings('menu'))

    if (status) {
      commit('menu', response)
    }
  }
}
