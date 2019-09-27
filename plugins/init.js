export default function({ store, route }) {
  store.dispatch('user/fetch')
  store.dispatch('menu/fetch')
  store.dispatch('sidebar/fetch')
  store.dispatch('footer/fetch')

  if (route.query.preview) {
    if (route.query.p) {
      store.dispatch('page/fetchPreview', route.query.p)
    }

    if (route.query.page_id) {
      store.dispatch('page/fetchPreview', route.query.page_id)
    }
  }
}
