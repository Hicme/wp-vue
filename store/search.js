export const state = () => ({})

export const getters = {}

export const mutations = {}

export const actions = {
  async fetch({ commit }, search) {
    const { status, response } = await this.$wp.ajax({
      action: 'getSearchResults',
      search
    })

    if (status) {
      return response
    }

    return false
  }
}
