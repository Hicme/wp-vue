export default function({ store }) {
  store.dispatch('user/fetch')
  store.dispatch('menu/fetch')
  store.dispatch('sidebar/fetch')
  store.dispatch('footer/fetch')
}
