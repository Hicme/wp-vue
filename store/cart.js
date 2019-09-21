export const state = () => ({
  cart: false,
  user: false,
  fields: false,
  shipping: false,
  payment: false
})

export const getters = {
  cart: state => state.cart,
  fields: state => state.fields,
  user: state => state.user,
  shipping: state => state.shipping,
  payment: state => state.payment
}

export const mutations = {
  cart(state, data) {
    state.cart = data
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
  async fetchFields({ commit }) {
    const { status, response } = await this.$wp.ajax({
      action: 'processCheckoutFields'
    })

    if (status) {
      commit('cartFields', response.data.fields)

      if (response.data.user) {
        commit('userFields', response.data.user)
      }

      if (response.data.shipping) {
        commit('shipping', response.data.shipping)
      }

      if (response.data.payment) {
        commit('payment', response.data.payment)
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
  async updateTotals({ commit, getters, dispatch }) {
    const { status } = await this.$wp.ajax({
      action: 'updateTotals',
      ...getters.user
    })

    if (status) {
      dispatch('fetchCart')
    }
  },
  async removeFromCart({ commit }, itemKey) {
    const { status } = await this.$wp.ajax({
      action: 'deleteCartProduct',
      item_key: itemKey
    })
    return status
  },
  async addToCart({ commit }, { id, quantity }) {
    const { status } = await this.$wp.ajax({
      action: 'AddCartProduct',
      id,
      quantity
    })

    return status
  },
  async addCoupon({ commit }, coupon) {
    const { status, response } = await this.$wp.ajax({
      action: 'addCoupon',
      coupon
    })

    return status ? response : false
  },
  async removeCoupon({ commit }, coupon) {
    const { status, response } = await this.$wp.ajax({
      action: 'removeCoupon',
      coupon
    })

    return status ? response : false
  },
  async processCheckout({ commit }) {
    const { status, response } = await this.$wp.ajax({
      action: 'processCheckout',
      billing_email: this.getters['cart/getUser'].billing_email,
      billing_first_name: this.getters['cart/getUser'].billing_first_name,
      billing_last_name: this.getters['cart/getUser'].billing_last_name,
      billing_phone: this.getters['cart/getUser'].billing_phone,
      billing_country: this.getters['cart/getUser'].billing_country,
      billing_state: this.getters['cart/getUser'].billing_state,
      billing_postcode: this.getters['cart/getUser'].billing_postcode,
      billing_address_1: this.getters['cart/getUser'].billing_address_1,
      order_comments: this.getters['cart/getComment'],
      payment_method: this.getters['cart/getUser'].payment_method,
      shipping_method: this.getters['cart/getUser'].shipping_method
    })

    if (status) {
      commit('setOrder', response.data)
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
