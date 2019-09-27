export const state = () => ({
  order: false
})

export const getters = {
  order: state => state.order
}

export const mutations = {
  order(state, data) {
    state.order = data
  }
}

export const actions = {
  async fetch({ commit }, { orderId, orderKey }) {
    const { status, response } = await this.$wp.ajax({
      action: 'getOrder',
      orderId,
      orderKey
    })

    if (status) {
      commit('order', response.data)
    }

    return status
  }
}
