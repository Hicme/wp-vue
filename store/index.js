export const actions = {
  nuxtServerInit({ dispatch }) {
    dispatch('menu/fetch')
    dispatch('sidebar/fetch')
    dispatch('footer/fetch')
  }
}
