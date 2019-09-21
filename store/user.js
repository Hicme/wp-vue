export const state = () => ({
  user: false
})

export const getters = {
  user: state => state.user,
  isLogged: state => !!state.user
}

export const mutations = {
  user(state, user) {
    state.user = user
  }
}

export const actions = {
  async fetch({ commit }) {
    const { status, response } = await this.$wp.ajax({
      action: 'getUser'
    })

    if (status) {
      commit('user', response.data)
      return true
    }

    return false
  },
  async logIn({ commit }, { username, password, remember }) {
    const { status, response } = await this.$wp.ajax({
      action: 'logInUser',
      username,
      password,
      remember
    })

    if (status) {
      commit('user', response.data)
      return true
    }

    return false
  },
  async logOut({ commit }) {
    const { status, response } = await this.$wp.ajax({
      action: 'logOut'
    })

    if (status) {
      commit('user', false)
      return response
    }

    return false
  },
  async register({ commit }, { email, password, confirmPassword }) {
    const { status, response } = await this.$wp.ajax({
      action: 'registerUser',
      email,
      password,
      confirmPassword
    })

    if (status) {
      commit('user', response.data)
      return true
    }

    return response
  },
  async resetPassword({ commit }, { email }) {
    const { response } = await this.$wp.ajax({
      action: 'resetPassword',
      email
    })

    return response.data
  },
  async validateKey({ commit }, { key, login }) {
    const { status } = await this.$wp.ajax({
      action: 'validateKeys',
      key,
      login
    })

    return status
  },
  async setPassword({ commit }, { login, key, password, confirmPassword }) {
    const { response } = await this.$wp.ajax({
      action: 'tryChangePassword',
      login,
      key,
      password,
      confirmPassword
    })

    return response.data
  }
}
