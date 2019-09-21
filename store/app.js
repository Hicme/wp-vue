export const state = () => ({
  sidebar: false,
  isLoader: false
})

export const getters = {
  sidebar: state => state.sidebar,
  getLoader: state => state.isLoader
}

export const mutations = {
  sidebar(state, data) {
    state.sidebar = data
  },
  changeLoader(state, data) {
    state.isLoader = data
  }
}

export const actions = {}
