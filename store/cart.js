export const state = () => ({
  cart: false,
  user: false,
  fields: false,
  validation: false,
  shipping: false,
  payment: false,
  orderMessages: false
})

export const getters = {
  cart: state => state.cart,
  fields: state => state.fields,
  validation: state => state.validation,
  user: state => state.user,
  shipping: state => state.shipping,
  payment: state => state.payment,
  orderMessages: state => state.orderMessages
}

export const mutations = {
  cart(state, data) {
    state.cart = data
  },
  validation(state, data) {
    state.validation = data
  },
  cartFields(state, data) {
    state.fields = data
  },
  cartField(state, data) {
    state.fields[data.section][data.field].values = data.value
  },
  userFields(state, data) {
    state.user = data
  },
  userField(state, data) {
    state.user[data.field] = data.value
  },
  shipping(state, data) {
    state.shipping = data
  },
  payment(state, data) {
    state.payment = data
  },
  orderMessages(state, data) {
    state.orderMessages = data
  }
}

export const actions = {
  async fetchCart({ commit }) {
    const { status, response } = await this.$wp.ajax({
      action: 'getCartProducts'
    })

    if (status) {
      commit('cart', response.data)
    }
  },
  async fetchFields({ commit, getters }, update = false) {
    let posted = {
      action: 'processCheckoutFields'
    }

    if (update) {
      posted = {
        ...posted,
        user_datas: true,
        ...getters.user
      }
    }

    const { status, response } = await this.$wp.ajax(posted)

    if (status) {
      commit('cartFields', response.data.checkout_fields)
      commit('shipping', response.data.shipping_methods)
      commit('payment', response.data.payment_methods)
      commit('validation', response.data.validation)

      if (response.data.user_datas) {
        commit('userFields', response.data.user_datas)
      }

      if (response.data.cart_content) {
        commit('cart', response.data.cart_content)
      }
    }
  },
  async fechStates({ commit }, { code, field }) {
    const { status, response } = await this.$wp.ajax({
      action: 'getStates',
      code
    })

    if (status) {
      const section = field.split('_')[0]
      commit('cartField', {
        field: section + '_state',
        section,
        value: Object.keys(response.data).length > 0 ? response.data : false
      })
    }
  },
  async removeFromCart({ commit }, itemKey) {
    const { status, response } = await this.$wp.ajax({
      action: 'deleteCartProduct',
      item_key: itemKey
    })

    if (status) {
      commit('cart', response.data.data)
    }

    return status
  },
  async addToCart({ commit }, { id, quantity }) {
    const { status, response } = await this.$wp.ajax({
      action: 'addCartProduct',
      id,
      quantity
    })

    if (status) {
      commit('cart', response.data.data)
      return response.data
    }

    return false
  },
  async addCoupon({ commit }, coupon) {
    const { status, response } = await this.$wp.ajax({
      action: 'addCoupon',
      coupon
    })

    if (status) {
      commit('cart', response.data.data)
    }

    return response
  },
  async removeCoupon({ commit }, coupon) {
    const { status, response } = await this.$wp.ajax({
      action: 'removeCoupon',
      coupon
    })

    if (status) {
      commit('cart', response.data.data)
      return response.data
    }

    return false
  },
  async processOrder({ commit, getters }) {
    const { status, response } = await this.$wp.ajax({
      action: 'processOrder',
      user_datas: true,
      ...getters.user
    })

    if (!status) {
      if (response.data.validation) {
        commit('validation', response.data.validation)
      }

      if (response.data.message) {
        commit('orderMessages', response.message)
      }
    } else {
      commit('cart', false)

      return response.data
    }

    return false
  },
  async getOrder({ commit }, { orderId, orderKey }) {
    const { status, response } = await this.$wp.ajax({
      action: 'getOrder',
      orderId,
      orderKey
    })

    if (status) {
      return response.data
    }

    return false
  }
}
